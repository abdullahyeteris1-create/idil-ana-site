import Link from "next/link";
import { CookiePreferencesButton } from "@/components/CookieConsent";
import { SITE_NAME } from "@/lib/seo";

const linkFocus =
  "focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]";
// Parmakla rahat hedeflenebilmesi için bağlantılar en az 44px yüksekliğinde.
const tapTarget = "inline-flex min-h-11 items-center";

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
          className={`${tapTarget} font-heading text-xl font-black text-[#12142b] transition-colors hover:text-[#e8502a] ${linkFocus}`}
        >
          {SITE_NAME}
        </Link>
        <Link
          href={backHref}
          className={`${tapTarget} text-sm font-extrabold text-[#0e7a72] transition-colors hover:text-[#e8502a] ${linkFocus}`}
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
        <div className="flex flex-wrap gap-x-5 font-bold">
          {[
            { href: "/", label: "Ana Sayfa" },
            { href: "/hizli-okuma-egitimi", label: "Hızlı Okuma Eğitimi" },
            { href: "/okuma-hizi-testi", label: "Okuma Hızı Testi" },
            { href: "/blog", label: "Blog" },
            { href: "/#paketler", label: "Paketler" },
            { href: "/#iletisim-formu", label: "İletişim" },
            { href: "/kvkk-aydinlatma-metni", label: "KVKK" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${tapTarget} underline-offset-4 hover:underline`}
            >
              {item.label}
            </Link>
          ))}
          <CookiePreferencesButton
            className={`${tapTarget} font-bold underline-offset-4 hover:underline`}
          />
        </div>
      </div>
    </footer>
  );
}
