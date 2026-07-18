import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactRequestBody = {
  fullName?: unknown;
  phone?: unknown;
  email?: unknown;
  studentGrade?: unknown;
  consentAccepted?: unknown;
  website?: unknown;
};

const SUBJECT = "Yeni Bilgi Talebi";
const RATE_LIMIT_WINDOW_MS = 30_000;
const MAX_BODY_SIZE = 20_000;
const VALID_GRADES = new Set([
  "1. Sınıf",
  "2. Sınıf",
  "3. Sınıf",
  "4. Sınıf",
  "5. Sınıf",
  "6. Sınıf",
  "7. Sınıf",
  "8. Sınıf",
  "Diğer",
]);
const recentSubmissions = new Map<string, number>();

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidPhone(phone: string) {
  if (!/^[+\d\s().-]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 12;
}

function isValidEmail(email: string) {
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || request.headers.get("x-real-ip")?.trim() || "";
}

function createEmailHtml({
  fullName,
  phone,
  email,
  studentGrade,
  submittedAt,
  ip,
  userAgent,
}: {
  fullName: string;
  phone: string;
  email: string;
  studentGrade: string;
  submittedAt: string;
  ip: string;
  userAgent: string;
}) {
  const rows = [
    ["Ad Soyad", fullName],
    ["Telefon", phone],
    ["E-posta", email || "Belirtilmedi"],
    ["Öğrencinin Sınıfı", studentGrade],
    ["Gönderim Tarihi", submittedAt],
    ["KVKK Onayı", "Kabul edildi"],
    ["KVKK Onay Tarihi", submittedAt],
    ...(ip ? [["IP", ip]] : []),
    ...(userAgent ? [["User Agent", userAgent]] : []),
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#12142b;line-height:1.6;max-width:680px;margin:0 auto">
      <h1 style="font-size:24px;margin:0 0 24px">Yeni Bilgi Talebi</h1>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="padding:10px 12px;text-align:left;vertical-align:top;border:1px solid #e5e7eb;background:#f8fafc;width:180px">${escapeHtml(label)}</th>
                <td style="padding:10px 12px;border:1px solid #e5e7eb;word-break:break-word">${escapeHtml(value)}</td>
              </tr>`,
          )
          .join("")}
      </table>
    </div>`;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ ok: false, message: "İstek çok büyük." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Geçersiz form verisi." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false, message: "Geçersiz form verisi." }, { status: 400 });
  }

  const body = payload as ContactRequestBody;
  const fullName = getString(body.fullName, 100);
  const phone = getString(body.phone, 30);
  const email = getString(body.email, 254);
  const studentGrade = getString(body.studentGrade, 30);
  const honeypot = getString(body.website, 200);

  if (body.consentAccepted !== true) {
    return NextResponse.json(
      { ok: false, message: "Devam etmek için KVKK onayını vermelisiniz." },
      { status: 400 },
    );
  }

  if (
    fullName.length < 2 ||
    !isValidPhone(phone) ||
    !isValidEmail(email) ||
    !VALID_GRADES.has(studentGrade)
  ) {
    return NextResponse.json(
      { ok: false, message: "Lütfen form alanlarını kontrol ediniz." },
      { status: 400 },
    );
  }

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL?.trim();
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL?.trim();

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { ok: false, message: "İletişim formu e-posta servisi yapılandırılmamış." },
      { status: 500 },
    );
  }

  const ip = getClientIp(request);
  const userAgent = getString(request.headers.get("user-agent"), 500);
  const rateLimitKey = ip || userAgent || "unknown-client";
  const now = Date.now();
  const previousSubmission = recentSubmissions.get(rateLimitKey);

  if (previousSubmission && now - previousSubmission < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { ok: false, message: "Lütfen tekrar göndermeden önce kısa bir süre bekleyiniz." },
      { status: 429 },
    );
  }

  recentSubmissions.set(rateLimitKey, now);

  const submittedAt = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "medium",
    timeZone: "Europe/Istanbul",
  }).format(new Date(now));

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email || undefined,
      subject: SUBJECT,
      html: createEmailHtml({
        fullName,
        phone,
        email,
        studentGrade,
        submittedAt,
        ip,
        userAgent,
      }),
    });

    if (error || !data?.id) {
      recentSubmissions.delete(rateLimitKey);
      return NextResponse.json(
        { ok: false, message: "E-posta gönderilemedi." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    recentSubmissions.delete(rateLimitKey);
    return NextResponse.json(
      { ok: false, message: "E-posta gönderimi sırasında sunucu hatası oluştu." },
      { status: 500 },
    );
  }
}
