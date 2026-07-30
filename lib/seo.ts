import type { Metadata } from "next";

export const SITE_URL = "https://www.idilegitim.com";
export const SITE_NAME = "İdil Eğitim";
export const DEFAULT_TITLE = "İdil Eğitim | Online Hızlı Okuma ve Dikkat Geliştirme";
export const DEFAULT_DESCRIPTION =
  "Çocuklar için yapay zekâ destekli online hızlı okuma, okuduğunu anlama, dikkat ve odaklanma çalışmaları. Eğitim paketlerini inceleyin.";
export const OG_IMAGE_PATH = "/og-image.png";
export const LOGO_PATH = "/images/icons/idil-logo.png";
export const INSTAGRAM_URL = "https://www.instagram.com/idilhizliokuma/";
export const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/MSQmokPxnHK9FdfN6";

/**
 * Google değerlendirmeleri. Sitede yalnızca düz metin olarak gösterilir;
 * AggregateRating şeması olarak İŞARETLENMEZ. Google'ın structured data
 * kuralları başka bir siteden toplanan puanların işaretlenmesini ve
 * işletmenin kendi hakkındaki yorumları kendi sayfasında yıldızlamasını
 * yasaklıyor.
 *
 * Bu değerler elle güncellenir; yorum sayısı arttıkça buradan değiştirin.
 */
export const GOOGLE_RATING = "5,0";
export const GOOGLE_REVIEW_COUNT = 53;

export const SEO_KEYWORDS = [
  "hızlı okuma eğitimi",
  "online hızlı okuma",
  "çocuklar için hızlı okuma",
  "okuduğunu anlama",
  "dikkat geliştirme",
  "odaklanma eğitimi",
  "hızlı okuma egzersizleri",
  "ilkokul hızlı okuma",
  "ortaokul hızlı okuma",
  "yapay zekâ destekli eğitim",
];

export function absoluteUrl(path = "/") {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: SITE_NAME,
      url: canonical,
      title: socialTitle,
      description,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: "İdil Eğitim online hızlı okuma ve dikkat geliştirme",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
