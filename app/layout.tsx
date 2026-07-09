import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const META_PIXEL_ID = "2057696181799169";

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
  title: "İdil Hızlı Okuma | Online Hızlı Okuma Eğitimi",
  description:
    "İlkokul, ortaokul ve lise öğrencileri için okuma hızı, okuduğunu anlama, dikkat ve odaklanma becerilerini destekleyen online hızlı okuma eğitimi.",
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
    title: "İdil Hızlı Okuma | Online Hızlı Okuma Eğitimi",
    description:
      "Öğrenciler için okuma hızı, okuduğunu anlama, dikkat ve odaklanma becerilerini destekleyen takipli online hızlı okuma programı.",
    url: "https://www.idilegitim.com/",
    siteName: "İdil Hızlı Okuma",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İdil Hızlı Okuma | Online Hızlı Okuma Eğitimi",
    description:
      "Online hızlı okuma eğitimiyle okuma hızı, anlama, dikkat ve odaklanma becerilerini destekleyen program.",
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
