import Link from "next/link";
import { CookiePreferencesButton } from "@/components/CookieConsent";
import { SITE_NAME } from "@/lib/seo";

const linkFocus =
  "focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]";

/**
 * Ana sayfa dışındaki sayfaların (blog, eğitim sayfası) ortak başlığı.
 * Daha önce her sayfada birebir kopyalanmıştı.
 */
export function SiteHeader({
  backHref = "/",
  backLabel = "← Ana Sayfa",
  ariaLabel = "Sayfa navigasyonu",
}: {
  backHref?: string;
  backLabel?: string;
  ariaLabel?: string;
}) {
  return (
    <header className="border-b border-black/10 bg-[#fbf7f0]">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-5 sm:px-8"
        aria-label={ariaLabel}
      >
        <Link
          href="/"
          className={`font-heading text-xl font-black text-[#12142b] transition-colors hover:text-[#e8502a] ${linkFocus}`}
        >
          {SITE_NAME}
        </Link>
        <Link
          href={backHref}
          className={`text-sm font-extrabold text-[#0e7a72] transition-colors hover:text-[#e8502a] ${linkFocus}`}
        >
          {backLabel}
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter({ className = "bg-[#12142b]" }: { className?: string }) {
  // Yıl sabit yazılmıştı; her ocak ayında elle güncellenmesi gerekiyordu.
  const year = new Date().getFullYear();

  return (
    <footer className={`${className} px-5 py-10 text-[#fbf7f0] sm:px-8`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {SITE_NAME}. Tüm hakları saklıdır.
        </p>
        <div className="flex flex-wrap gap-5 font-bold">
          <Link href="/">Ana Sayfa</Link>
          <Link href="/hizli-okuma-egitimi">Hızlı Okuma Eğitimi</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#paketler">Paketler</Link>
          <Link href="/#iletisim-formu">İletişim</Link>
          <Link href="/kvkk-aydinlatma-metni">KVKK</Link>
          <CookiePreferencesButton className="font-bold underline-offset-4 hover:underline" />
        </div>
      </div>
    </footer>
  );
}
