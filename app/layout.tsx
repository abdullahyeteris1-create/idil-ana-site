import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.idilegitim.com"),
  title: "İdil Hızlı Okuma | Online ve Yüz Yüze Hızlı Okuma Eğitimi",
  description:
    "İlkokul, ortaokul ve lise öğrencileri için hızlı okuma, okuduğunu anlama, dikkat ve odaklanma becerilerini destekleyen online ve yüz yüze eğitim programı.",
  keywords: [
    "hızlı okuma",
    "hızlı okuma eğitimi",
    "online hızlı okuma",
    "okuduğunu anlama",
    "dikkat geliştirme",
    "odaklanma",
    "ilkokul hızlı okuma",
    "ortaokul hızlı okuma",
    "lise hızlı okuma",
    "İdil Hızlı Okuma",
  ],
  authors: [{ name: "İdil Hızlı Okuma" }],
  creator: "İdil Hızlı Okuma",
  publisher: "İdil Hızlı Okuma",
  alternates: {
    canonical: "https://www.idilegitim.com/",
  },
  openGraph: {
    title: "İdil Hızlı Okuma | Online ve Yüz Yüze Eğitim",
    description:
      "Öğrenciler için hızlı okuma, okuduğunu anlama, dikkat ve odaklanma becerilerini destekleyen takipli eğitim programı.",
    url: "https://www.idilegitim.com/",
    siteName: "İdil Hızlı Okuma",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İdil Hızlı Okuma | Hızlı Okuma Eğitimi",
    description:
      "Online ve yüz yüze hızlı okuma eğitimiyle okuma hızı, anlama, dikkat ve odaklanma becerilerini destekleyen program.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body
        className={`${manrope.variable} ${playfair.variable} min-h-full bg-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
