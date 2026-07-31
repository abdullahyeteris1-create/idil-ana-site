import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { VIDEO_POSTER, VIDEO_SRC } from "@/lib/video";
import { SITE_NAME, absoluteUrl, createPageMetadata } from "@/lib/seo";

const description =
  "İlkokul ve ortaokul öğrencileri için online hızlı okuma eğitimi: dersin nasıl işlediği, kullanılan teknikler, gelişen beceriler ve sık sorulan sorular.";

export const metadata: Metadata = createPageMetadata({
  title: "Online Hızlı Okuma Eğitimi",
  description,
  path: "/hizli-okuma-egitimi",
});

const canonical = absoluteUrl("/hizli-okuma-egitimi");

const steps = [
  {
    title: "Ön görüşme ve seviye ölçümü",
    text: "Eğitime başlamadan önce öğrencinin mevcut okuma hızı ve okuduğunu anlama düzeyi ölçülür. Bu ölçüm, programın hangi noktadan başlayacağını ve ilerlemenin neye göre değerlendirileceğini belirler.",
  },
  {
    title: "Seviyeye uygun program",
    text: "Çalışmalar öğrencinin yaşına, sınıf düzeyine ve ölçüm sonuçlarına göre planlanır. İlkokul 1-2, ilkokul 3-4, ortaokul ve lise grupları farklı hedeflerle ilerler.",
  },
  {
    title: "Birebir canlı ders",
    text: "Dersler tamamen online ve birebir yürütülür. Öğrenci evinden katılır; öğretmen o seansta öğretilen tekniği aynı ders içinde egzersizlerle uygulatır.",
  },
  {
    title: "Günlük egzersiz ve takip",
    text: "Ders dışında platform üzerinden günlük egzersiz programı takip edilir. Doğru ve yanlış sayıları, başarı oranı ve çalışma süresi sistemde kayıt altına alınır.",
  },
  {
    title: "Veliye raporlama",
    text: "Öğrencinin okuma hızı ve anlama oranındaki değişim düzenli aralıklarla ölçülür ve veliyle paylaşılır. Böylece ilerleme tahmine değil ölçüme dayanır.",
  },
];

const techniques = [
  {
    title: "Göz ve odak egzersizleri",
    text: "Göz sıçramalarını azaltan, satır takibini güçlendiren ve dikkatin metin üzerinde daha uzun süre kalmasını destekleyen çalışmalar.",
  },
  {
    title: "Kelime grubu okuma",
    text: "Kelimeleri tek tek yerine anlamlı gruplar hâlinde görmeye yönelik pratikler; heceleme alışkanlığının akıcılığı bölmesini azaltır.",
  },
  {
    title: "Anlama kontrollü metinler",
    text: "Her hız çalışmasının ardından anlama soruları gelir. Amaç yalnızca hızı yükseltmek değil, hız artarken anlamayı korumaktır.",
  },
  {
    title: "Dikkat ve konsantrasyon çalışmaları",
    text: "Tarama, eşleştirme ve sıralı yönerge takibi gibi kısa egzersizlerle seçici dikkat desteklenir.",
  },
];

const outcomes = [
  "Okuma hızında ölçülebilir artış",
  "Okuduğunu anlama becerisinde gelişim",
  "Dikkat süresinin uzaması ve odaklanmanın güçlenmesi",
  "Satır kaybetme ve geri dönüşlerin azalması",
  "Kelime dağarcığının genişlemesi",
  "Okuma özgüveninin ve isteğinin artması",
];

const audiences = [
  {
    grade: "İlkokul 1-2",
    text: "Okuma alışkanlığını sevdirerek güçlendirmek, harf-kelime-cümle takibini desteklemek ve anlama becerisinin temelini kurmak.",
  },
  {
    grade: "İlkokul 3-4",
    text: "Akıcı okumayı geliştirmek, kelime dağarcığını genişletmek ve daha uzun metinlerde anlama derinliğini artırmak.",
  },
  {
    grade: "Ortaokul",
    text: "Paragraf düzeyinde anlamayı desteklemek, okuma hızını sistematik artırmak ve sınav odaklı okuma stratejileri kazandırmak.",
  },
  {
    grade: "Lise",
    text: "Sınav temposuna uygun, zaman baskısı altında hızlı ve doğru okuma becerisini geliştirmek.",
  },
];

// Ana sayfadaki SSS'den farklı sorular; aynı soruların iki URL'de tekrarlanmaması için.
const faq = [
  {
    q: "Online hızlı okuma eğitimi kaç haftada tamamlanır?",
    a: "Program süresi seçilen pakete ve öğrencinin seviyesine göre değişir. Eğitim, ders saatlerinin yanı sıra günlük kısa egzersizlerle sürdürülür; düzenli çalışma, toplam süreden daha belirleyicidir.",
  },
  {
    q: "Derse katılmak için özel bir donanım gerekiyor mu?",
    a: "Hayır. İnternet bağlantısı olan bir bilgisayar, tablet veya telefon yeterlidir. En rahat kullanım için güncel bir tarayıcı ve kesintisiz bağlantı önerilir.",
  },
  {
    q: "Öğrencinin okuma hızı nasıl ölçülüyor?",
    a: "Okuma hızı dakikada okunan kelime sayısı üzerinden ölçülür ve her ölçümün ardından anlama soruları uygulanır. Hız ile anlama birlikte değerlendirildiği için tek başına kelime sayısı yeterli kabul edilmez.",
  },
  {
    q: "Veli sürece nasıl dahil oluyor?",
    a: "Öğrencinin çalışmaları platform üzerinden takip edilebilir; ölçüm sonuçları ve gelişim düzenli olarak veliyle paylaşılır. Eğitim boyunca öğretmenle iletişim kurulabilir.",
  },
  {
    q: "Eğitim yetişkinler için de uygun mu?",
    a: "Genel program yetişkinler dahil farklı yaş gruplarına uyarlanabilir. Bu durumda çalışmalar kişinin hedeflerine ve mevcut okuma düzeyine göre planlanır.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Course",
      "@id": `${canonical}#course`,
      name: "Online Hızlı Okuma Eğitimi",
      description,
      url: canonical,
      inLanguage: "tr-TR",
      provider: {
        "@type": ["Organization", "EducationalOrganization"],
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
      educationalLevel: "İlkokul, ortaokul ve lise",
      teaches: outcomes,
      // Google'ın kurs zengin sonucu için hasCourseInstance zorunlu alan.
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT3H",
        inLanguage: "tr-TR",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Online Hızlı Okuma Eğitimi", item: canonical },
      ],
    },
  ],
};

const serializedStructuredData = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function HizliOkumaEgitimiPage() {
  return (
    <>
      <script
        id="course-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializedStructuredData }}
      />

      <SiteHeader ariaLabel="Hızlı okuma eğitimi sayfası navigasyonu" />

      <main className="overflow-x-hidden bg-[#fbf7f0] text-[#12142b]">
        {/* ---------- GİRİŞ ---------- */}
        <section className="px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0e7a72]">
              Eğitim Programı
            </p>
            <h1 className="font-heading text-balance text-4xl font-black leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Online Hızlı Okuma Eğitimi
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-black/65">
              İdil Eğitim&apos;in online hızlı okuma programı; okuma hızını, okuduğunu anlamayı,
              dikkat ve odaklanmayı birlikte geliştiren takipli bir çalışma sistemidir. Her öğrenci
              kendi ölçülen seviyesinden başlar ve gelişimi düzenli olarak raporlanır.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <WhatsAppLink
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6b47] px-6 py-3 font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
                aria-label="WhatsApp üzerinden hızlı okuma eğitimi hakkında bilgi al"
              >
                WhatsApp&apos;tan Bilgi Al
              </WhatsAppLink>
              <Link
                href="/#paketler"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-6 py-3 font-extrabold text-[#12142b] transition hover:border-[#12142b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
              >
                Eğitim Paketlerini İncele
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- NEDİR ---------- */}
        <section className="px-5 pb-16 sm:px-8 sm:pb-24" aria-labelledby="nedir-title">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-black/10">
              <Image
                src="/images/sections/odakli-okuma.jpg"
                alt="Metin üzerinde satır takibi yaparak okuma çalışması yapan öğrenci"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 id="nedir-title" className="font-heading text-3xl font-black sm:text-4xl">
                Hızlı okuma eğitimi nedir?
              </h2>
              <p className="mt-5 leading-8 text-black/70">
                Hızlı okuma, metni aceleyle geçmek değildir. Amaç; gözün satır üzerindeki
                hareketini düzenlemek, kelimeleri tek tek çözmek yerine anlamlı gruplar hâlinde
                görebilmek ve bu sırada anlamayı korumaktır.
              </p>
              <p className="mt-4 leading-8 text-black/70">
                Bu nedenle her hız çalışması anlama ölçümüyle birlikte yürütülür. Öğrencinin
                okuduğunu anlamadan hızlanması hedeflenmez; hız ve anlama birlikte takip edilir.
              </p>
              <p className="mt-4 leading-8 text-black/70">
                Çalışmalar dikkat ve odaklanma egzersizleriyle desteklenir, çünkü okuma yalnızca
                gözle değil; bilgiyi seçme, önceki cümleyle bağ kurma ve anlamı zihinde tutma
                becerisiyle birlikte gelişir.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- KİMLER İÇİN ---------- */}
        <section
          className="bg-[#f2f7fb] px-5 py-16 sm:px-8 sm:py-24"
          aria-labelledby="kimler-title"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="kimler-title" className="font-heading text-3xl font-black sm:text-4xl">
              Kimler için uygun?
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-black/65">
              Program yaş grubuna ve hedefe göre farklılaşır. Aşağıdaki gruplar aynı yöntemi
              izler, ancak metin düzeyi, egzersiz yoğunluğu ve hedefler değişir.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {audiences.map((item) => (
                <div
                  key={item.grade}
                  className="rounded-[22px] border border-black/10 bg-white p-7 shadow-[0_20px_50px_-40px_rgba(18,20,43,0.5)]"
                >
                  <h3 className="font-heading text-xl font-black text-[#12142b]">{item.grade}</h3>
                  <p className="mt-3 leading-7 text-black/65">{item.text}</p>
                </div>
              ))}
            </div>
            <Link
              href="/#gruplar"
              className="mt-8 inline-flex font-extrabold text-[#0e7a72] transition-colors hover:text-[#e8502a] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
            >
              Tüm eğitim gruplarını inceleyin →
            </Link>
          </div>
        </section>

        {/* ---------- TANITIM VİDEOSU ---------- */}
        <section className="px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="video-title">
          <div className="mx-auto max-w-4xl">
            <h2 id="video-title" className="font-heading text-3xl font-black sm:text-4xl">
              Platformu bir dakikada tanıyın
            </h2>
            <p className="mt-4 leading-8 text-black/65">
              Öğrencilerin çalıştığı egzersizler, ölçüm ekranları ve veliye sunulan gelişim raporu.
            </p>
            <VideoPlayer
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              label="İdil Hızlı Okuma platform tanıtım videosu"
              className="mt-8"
            />
          </div>
        </section>

        {/* ---------- SÜREÇ ---------- */}
        <section className="px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="surec-title">
          <div className="mx-auto max-w-4xl">
            <h2 id="surec-title" className="font-heading text-3xl font-black sm:text-4xl">
              Eğitim nasıl işliyor?
            </h2>
            <ol className="mt-10 space-y-6">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-5 rounded-[22px] border border-black/10 bg-white p-6 sm:p-7"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#12142b] font-mono text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-black text-[#12142b]">{step.title}</h3>
                    <p className="mt-2 leading-7 text-black/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- TEKNİKLER ---------- */}
        <section
          className="bg-[#12142b] px-5 py-16 text-[#fbf7f0] sm:px-8 sm:py-24"
          aria-labelledby="teknik-title"
        >
          <div className="mx-auto max-w-6xl">
            <h2 id="teknik-title" className="font-heading text-3xl font-black sm:text-4xl">
              Eğitimde kullanılan teknikler
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {techniques.map((item) => (
                <div key={item.title} className="rounded-[22px] border border-white/12 p-7">
                  <h3 className="font-heading text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- KAZANIMLAR ---------- */}
        <section className="px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="kazanim-title">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <h2 id="kazanim-title" className="font-heading text-3xl font-black sm:text-4xl">
                Eğitim sonunda neler gelişir?
              </h2>
              <p className="mt-4 leading-8 text-black/65">
                Gelişim öğrenciden öğrenciye değişir; başlangıç düzeyi, çalışma düzeni ve metin
                zorluğu sonucu etkiler. Program aşağıdaki becerileri hedefler:
              </p>
              <ul className="mt-7 space-y-3">
                {outcomes.map((item) => (
                  <li key={item} className="flex gap-3 leading-7 text-black/70">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#17a398]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-black/10">
              <Image
                src="/images/sections/online-egitim.jpg"
                alt="Bilgisayar başında online hızlı okuma dersine katılan öğrenci"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------- SSS ---------- */}
        <section
          className="bg-[#f2f7fb] px-5 py-16 sm:px-8 sm:py-24"
          aria-labelledby="sss-title"
        >
          <div className="mx-auto max-w-4xl">
            <h2 id="sss-title" className="font-heading text-3xl font-black sm:text-4xl">
              Sık sorulan sorular
            </h2>
            <div className="mt-10 space-y-4">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-[20px] border border-black/10 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-lg font-black text-[#12142b]">
                    {item.q}
                    <span
                      className="shrink-0 text-2xl font-normal text-[#0e7a72] transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-7 text-black/65">{item.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 leading-7 text-black/65">
              Başka sorularınız mı var?{" "}
              <Link
                href="/#sss"
                className="font-extrabold text-[#0e7a72] transition-colors hover:text-[#e8502a]"
              >
                Ana sayfadaki tüm soruları inceleyin
              </Link>{" "}
              veya doğrudan bize yazın.
            </p>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-balance text-3xl font-black leading-tight sm:text-4xl">
              Öğrencinize uygun programı birlikte belirleyelim
            </h2>
            <p className="mt-5 leading-8 text-black/65">
              Ücretsiz ön görüşmede öğrencinin mevcut düzeyini konuşup hangi grubun ve hangi
              paketin uygun olduğunu birlikte değerlendirelim.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <WhatsAppLink
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6b47] px-6 py-3 font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
                aria-label="WhatsApp üzerinden ön görüşme talep et"
              >
                WhatsApp&apos;tan Yazın
              </WhatsAppLink>
              <Link
                href="/#iletisim-formu"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-6 py-3 font-extrabold text-[#12142b] transition hover:border-[#12142b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
              >
                İletişim Formunu Doldurun
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
