import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { href: "/", label: "Ana Sayfa", text: "Eğitim grupları, paketler ve iletişim" },
  {
    href: "/hizli-okuma-egitimi",
    label: "Hızlı Okuma Eğitimi",
    text: "Programın nasıl işlediği ve kullanılan teknikler",
  },
  { href: "/blog", label: "Blog", text: "Okuma, dikkat ve odaklanma üzerine yazılar" },
  { href: "/#paketler", label: "Eğitim Paketleri", text: "Süreye göre paket seçenekleri" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader ariaLabel="Sayfa bulunamadı navigasyonu" />

      <main className="flex min-h-[60vh] items-center bg-[#fbf7f0] px-5 py-20 text-[#12142b] sm:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="font-mono text-sm font-bold tracking-[0.2em] text-[#0e7a72]">404</p>
          <h1 className="mt-4 font-heading text-balance text-4xl font-black leading-tight sm:text-5xl">
            Aradığınız sayfayı bulamadık
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-8 text-black/65">
            Bağlantı değişmiş veya sayfa kaldırılmış olabilir. Aşağıdaki bölümlerden devam
            edebilirsiniz.
          </p>

          <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
            {suggestions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[20px] border border-black/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#17a398]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
              >
                <span className="font-heading text-lg font-black text-[#12142b]">{item.label}</span>
                <span className="mt-1 block text-sm leading-6 text-black/60">{item.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
