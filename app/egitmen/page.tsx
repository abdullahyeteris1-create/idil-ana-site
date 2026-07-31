import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { reviews } from "@/lib/reviews";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, GOOGLE_REVIEW_COUNT, SITE_NAME, absoluteUrl, createPageMetadata } from "@/lib/seo";

const INSTRUCTOR_NAME = "Abdullah Yeter";
const PHOTO = "/images/egitmen/abdullah-yeter.jpg";

const description =
  "Abdullah Yeter kimdir? Ege Üniversitesi Türk Dili ve Edebiyatı mezunu, yaklaşık 7 yıldır hızlı okuma teknikleri eğitimi veren İdil Hızlı Okuma eğitmeni.";

export const metadata: Metadata = createPageMetadata({
  title: "Abdullah Yeter | Hızlı Okuma Eğitmeni",
  description,
  path: "/egitmen",
});

const canonical = absoluteUrl("/egitmen");

const calismaSekli = [
  {
    title: "Ölçümle başlarım",
    text: "İlk derste öğrencinin okuma hızını ve okuduğunu anlama oranını ölçerim. Nereden başladığımızı bilmeden nereye gittiğimizi konuşmak mümkün değil.",
  },
  {
    title: "Hızı tek başına kovalamam",
    text: "Anlamadan hızlanmak bir kazanım değildir. Her hız çalışmasının ardından anlama kontrolü yaparım; ikisi birlikte ilerlemiyorsa programı yavaşlatırım.",
  },
  {
    title: "Her öğrenciyle birebir çalışırım",
    text: "Dersler birebir ve canlı. Bir öğrencinin takıldığı yer ile bir diğerininki aynı olmadığı için, program kalabalık bir sınıf değil tek bir çocuk için kurulur.",
  },
  {
    title: "Veliyi süreç dışında bırakmam",
    text: "Ölçüm sonuçlarını ve gelişimi düzenli olarak paylaşırım. Velinin ilerlemeyi tahminle değil rakamla görmesi, çocuğa verdiği desteği de doğru yere yöneltir.",
  },
];

// Eğitmenden ismen söz eden gerçek Google değerlendirmeleri.
const seciliYorumIsimleri = ["Begum Akhun", "Arzu K.", "Canan Çelik"];
const seciliYorumlar = seciliYorumIsimleri
  .map((isim) => reviews.find((r) => r.name === isim))
  .filter((r): r is (typeof reviews)[number] => Boolean(r));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${canonical}#person`,
      name: INSTRUCTOR_NAME,
      jobTitle: "Hızlı Okuma Eğitmeni",
      description,
      url: canonical,
      image: absoluteUrl(PHOTO),
      knowsLanguage: "tr-TR",
      knowsAbout: [
        "Hızlı okuma teknikleri",
        "Okuduğunu anlama",
        "Dikkat ve odaklanma",
        "Türk dili ve edebiyatı",
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Ege Üniversitesi",
      },
      worksFor: {
        "@type": ["Organization", "EducationalOrganization"],
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: INSTRUCTOR_NAME, item: canonical },
      ],
    },
  ],
};

const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function EgitmenPage() {
  return (
    <>
      <script
        id="instructor-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
      />

      <SiteHeader ariaLabel="Eğitmen sayfası navigasyonu" />

      <main className="overflow-x-hidden bg-[#fbf7f0] text-[#12142b]">
        {/* ---------- TANITIM ---------- */}
        <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[300px_1fr] md:gap-14">
            {/* Portre dairesel maskeyle üretildi; çerçeve de dairesel olunca
                kenarlar birebir hizalanıyor. */}
            <div className="mx-auto w-full max-w-[300px]">
              <div className="relative aspect-square overflow-hidden rounded-full ring-1 ring-black/10 shadow-[0_28px_70px_-38px_rgba(18,20,43,0.55)]">
                <Image
                  src={PHOTO}
                  alt={`${INSTRUCTOR_NAME}, İdil Hızlı Okuma eğitmeni`}
                  fill
                  priority
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0e7a72]">
                Eğitmen
              </p>
              <h1 className="font-heading text-balance text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                {INSTRUCTOR_NAME}
              </h1>
              <p className="mt-4 text-lg font-bold text-black/70">
                Hızlı Okuma Eğitmeni · Ege Üniversitesi Türk Dili ve Edebiyatı
              </p>
              <p className="mt-6 leading-8 text-black/70">
                Merhaba. Ege Üniversitesi Türk Dili ve Edebiyatı bölümünden mezun oldum ve yaklaşık
                yedi yıldır hızlı okuma teknikleri üzerine eğitim veriyorum. Bugüne kadar ilkokul
                sıralarından üniversiteye hazırlanan öğrencilere, zaman zaman da yetişkinlere eşlik
                ettim.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <WhatsAppLink
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25d366] px-6 py-3 font-extrabold text-white transition hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
                  aria-label="Abdullah Yeter ile WhatsApp üzerinden iletişime geç"
                >
                  WhatsApp&apos;tan yazın
                </WhatsAppLink>
                <Link
                  href="/okuma-hizi-testi"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-6 py-3 font-extrabold text-[#12142b] transition hover:border-[#12142b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
                >
                  Ücretsiz okuma testi
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- HİKÂYE ---------- */}
        <section className="bg-white px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="hikaye-title">
          <div className="mx-auto max-w-3xl">
            <h2 id="hikaye-title" className="font-heading text-3xl font-black sm:text-4xl">
              Bu işi neden yapıyorum?
            </h2>
            <p className="mt-6 leading-8 text-black/70">
              Edebiyat okumuş biri olarak metinle uğraşmak hep işimin merkezindeydi. Ancak
              öğrencilerle çalışmaya başladığımda fark ettiğim şey şuydu: çoğu öğrencinin sorunu
              metni sevmemesi değil, metinle baş edememesiydi. Satırı kaybediyor, aynı cümleye
              defalarca dönüyor, sayfanın sonuna geldiğinde başında ne yazdığını hatırlamıyordu.
            </p>
            <p className="mt-5 leading-8 text-black/70">
              Bu, çalışma azlığıyla değil teknikle ilgili bir sorundu. Doğru yönlendirmeyle
              düzeliyordu. Yedi yıldır yaptığım iş temelde bu: bir öğrencinin okurken nerede
              tökezlediğini bulmak ve o noktayı hedefleyen bir program kurmak.
            </p>
            <p className="mt-5 leading-8 text-black/70">
              Hızlı okumanın metni yarışa çevirmek olduğunu düşünmüyorum. Bir çocuk dakikada iki
              yüz kelime okuyup hiçbir şey anlamıyorsa, orada kazanılmış bir şey yoktur. Bu yüzden
              derslerimde hız ve anlama hep birlikte ölçülür; biri diğerinin önüne geçtiğinde
              programı buna göre düzenlerim.
            </p>
            <p className="mt-5 leading-8 text-black/70">
              Bir de şunu önemsiyorum: çocuk dersten sıkılmamalı. Zorunluluk hissiyle oturulan bir
              masada kalıcı bir gelişme olmuyor. Egzersizleri oyuna yaklaştırmak, öğrencinin kendi
              ilerlemesini görmesini sağlamak, çoğu zaman en iyi motivasyon aracı oluyor.
            </p>
          </div>
        </section>

        {/* ---------- ÇALIŞMA ŞEKLİ ---------- */}
        <section className="px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="calisma-title">
          <div className="mx-auto max-w-5xl">
            <h2 id="calisma-title" className="font-heading text-3xl font-black sm:text-4xl">
              Nasıl çalışıyorum?
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {calismaSekli.map((madde) => (
                <div
                  key={madde.title}
                  className="rounded-[22px] border border-black/10 bg-white p-7 shadow-[0_20px_50px_-40px_rgba(18,20,43,0.5)]"
                >
                  <h3 className="font-heading text-xl font-black text-[#12142b]">{madde.title}</h3>
                  <p className="mt-3 leading-7 text-black/65">{madde.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- VELİ YORUMLARI ---------- */}
        <section className="bg-[#f2f7fb] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="yorum-title">
          <div className="mx-auto max-w-5xl">
            <h2 id="yorum-title" className="font-heading text-3xl font-black sm:text-4xl">
              Velilerin söyledikleri
            </h2>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-[#0e7a72] underline-offset-4 hover:underline"
            >
              {`Google'da ${GOOGLE_RATING} ortalama, ${GOOGLE_REVIEW_COUNT} değerlendirme →`}
            </a>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {seciliYorumlar.map((yorum) => (
                <figure
                  key={yorum.name}
                  className="flex h-full flex-col rounded-[22px] border border-black/10 bg-white p-7"
                >
                  <div className="text-[#ffc93c]" aria-hidden="true">
                    ★★★★★
                  </div>
                  <blockquote className="mt-4 flex-1 leading-7 text-black/70">
                    {yorum.text}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-black/10 pt-4 text-sm font-extrabold text-[#12142b]">
                    {yorum.name}
                    <span className="mt-1 block font-bold text-black/50">
                      Google üzerinden paylaşıldı
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-balance text-3xl font-black leading-tight sm:text-4xl">
              Önce tanışalım
            </h2>
            <p className="mt-5 leading-8 text-black/65">
              Öğrencinizin nerede zorlandığını konuşmak için ücretsiz bir ön görüşme yapalım.
              Dilerseniz önce ücretsiz okuma testini yapıp sonucu bana iletebilirsiniz.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <WhatsAppLink
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6b47] px-7 py-3 font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
                aria-label="Ön görüşme için WhatsApp üzerinden yaz"
              >
                WhatsApp&apos;tan yazın
              </WhatsAppLink>
              <Link
                href="/hizli-okuma-egitimi"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-7 py-3 font-extrabold text-[#12142b] transition hover:border-[#12142b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
              >
                Eğitimi inceleyin
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
