import type { NextConfig } from "next";

/**
 * Temel güvenlik başlıkları. Content-Security-Policy bilinçli olarak burada
 * tanımlanmadı: GA4, Google Ads, Meta Pixel ve Shopier gibi üçüncü taraf
 * kaynaklarla birlikte nonce üretimi gerektiriyor ve ayrı bir doğrulama
 * turuyla eklenmeli.
 */
const securityHeaders = [
  // MIME tipi tahminini kapatır (XSS'e giden bir sınıf saldırıyı engeller).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sitenin başka bir sayfaya iframe ile gömülüp tıklama hırsızlığına
  // (clickjacking) kullanılmasını engeller.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Dış sitelere yalnızca alan adı bilgisi gider, tam URL gitmez.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Kullanılmayan güçlü tarayıcı API'leri kapatılır.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Next.js sürümünü sızdıran X-Powered-By başlığını kaldırır.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
