import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE_PATH,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const META_PIXEL_ID = "2057696181799169";
const GOOGLE_ANALYTICS_ID = "G-9GVF5KH9CJ";
const GOOGLE_ADS_ID = "AW-18332625430";

// Türkçe karakterler (ğ, ş, İ, ı) latin-ext alt kümesinde yer alır.
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
});

// Italic yalnızca hero başlığındaki vurguda kullanılıyor; preload edilmesi
// kritik yolu gereksiz büyütür, bu yüzden ayrı ve preload'suz tanımlanır.
const frauncesItalic = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  variable: "--font-fraunces-italic",
  display: "swap",
  preload: false,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

// Yalnızca rakamlar ve kısa etiketler için kullanılıyor, latin-ext gerekmiyor.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
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
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font değişkenleri :root üzerinde tanımlanmalı; globals.css'teki
    // --font-heading/--font-body takma adları :root seviyesinde çözülüyor.
    <html
      lang="tr-TR"
      className={`${jakarta.variable} ${fraunces.variable} ${frauncesItalic.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white antialiased">
        {children}
        {/* Ölçümleme/pazarlama betikleri yalnızca kullanıcı onayından sonra yüklenir.
            (Onaysız çalışan noscript Meta Pixel isteği de bu nedenle kaldırıldı.) */}
        <CookieConsent
          googleAnalyticsId={GOOGLE_ANALYTICS_ID}
          googleAdsId={GOOGLE_ADS_ID}
          metaPixelId={META_PIXEL_ID}
        />
      </body>
    </html>
  );
}
