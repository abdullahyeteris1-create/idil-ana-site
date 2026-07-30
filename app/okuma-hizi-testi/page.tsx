import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { ReadingSpeedTest } from "@/components/reading-test/ReadingSpeedTest";
import { SITE_NAME, absoluteUrl, createPageMetadata } from "@/lib/seo";

const description =
  "Ücretsiz online okuma hızı testi: seviyene uygun bir metni oku, dakikada kaç kelime okuduğunu ve okuduğunu anlama oranını anında öğren.";

export const metadata: Metadata = createPageMetadata({
  title: "Okuma Hızı Testi (Ücretsiz)",
  description,
  path: "/okuma-hizi-testi",
});

const canonical = absoluteUrl("/okuma-hizi-testi");

const steps = [
  {
    title: "Sınıfını seç",
    text: "Seviyene uygun uzunlukta bir metin gösterilir; ilkokul ve ortaokul için farklı metinler kullanılır.",
  },
  {
    title: "Metni normal temponla oku",
    text: "Yarış değil ölçüm yapıyoruz. Acele edip anlamadan geçmek sonucu bozar.",
  },
  {
    title: "Beş soruyu yanıtla",
    text: "Okuduğunu anlama oranını ölçeriz. Metne geri dönüş yoktur.",
  },
  {
    title: "Sonucunu gör",
    text: "Okuma hızın, anlama oranın ve ikisini birlikte değerlendiren etkili okuma hızın hesaplanır.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${canonical}#app`,
      name: "Okuma Hızı Testi",
      description,
      url: canonical,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      inLanguage: "tr-TR",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
      publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Okuma Hızı Testi", item: canonical },
      ],
    },
  ],
};

const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function OkumaHiziTestiPage() {
  return (
    <>
      <script
        id="reading-test-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
      />

      <SiteHeader ariaLabel="Okuma hızı testi navigasyonu" />

      <main className="overflow-x-hidden bg-[#fbf7f0] text-[#12142b]">
        <section className="px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0e7a72]">
              Ücretsiz · Kayıt gerekmez
            </p>
            <h1 className="font-heading text-balance text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl">
              Okuma Hızı Testi
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/65">
              Dakikada kaç kelime okuyorsun ve okuduğunun ne kadarını anlıyorsun? Yaklaşık üç
              dakikada ölç, sonucunu hemen gör.
            </p>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-20" aria-label="Okuma hızı testi">
          <div className="mx-auto max-w-3xl">
            <ReadingSpeedTest />
          </div>
        </section>

        <section
          className="bg-[#f2f7fb] px-5 py-16 sm:px-8 sm:py-20"
          aria-labelledby="nasil-calisir"
        >
          <div className="mx-auto max-w-4xl">
            <h2 id="nasil-calisir" className="font-heading text-2xl font-black sm:text-3xl">
              Test nasıl çalışıyor?
            </h2>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-[22px] border border-black/10 bg-white p-6">
                  <span
                    className="font-mono text-sm font-bold text-[#0e7a72]"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-heading text-lg font-black">{step.title}</h3>
                  <p className="mt-2 leading-7 text-black/65">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-[22px] border border-black/10 bg-white p-6 sm:p-8">
              <h3 className="font-heading text-lg font-black">Ölçüm ne kadar kesin?</h3>
              <p className="mt-3 leading-7 text-black/65">
                Bu test tek bir metne dayanır ve bir ön fikir vermek içindir. Metnin konusu,
                zorluğu ve okuyanın o anki dikkati sonucu etkiler. Eğitim sürecinde ölçümler farklı
                metinlerle ve düzenli aralıklarla tekrarlanır; gelişim tek bir sayıya göre değil,
                zaman içindeki değişime göre değerlendirilir.
              </p>
              <p className="mt-4 leading-7 text-black/65">
                Programın nasıl işlediğini{" "}
                <Link
                  href="/hizli-okuma-egitimi"
                  className="font-extrabold text-[#0e7a72] underline-offset-4 hover:text-[#e8502a] hover:underline"
                >
                  hızlı okuma eğitimi sayfasında
                </Link>{" "}
                inceleyebilir, okuma ve dikkat üzerine yazılara{" "}
                <Link
                  href="/blog"
                  className="font-extrabold text-[#0e7a72] underline-offset-4 hover:text-[#e8502a] hover:underline"
                >
                  blogdan
                </Link>{" "}
                ulaşabilirsin.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
