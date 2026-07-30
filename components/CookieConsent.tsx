"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

const STORAGE_KEY = "idil-cookie-consent";
const CONSENT_CHANGED_EVENT = "idil:cookie-consent-changed";
export const OPEN_COOKIE_SETTINGS_EVENT = "idil:cookie-settings";

type Consent = "granted" | "denied";
/** Sunucuda ve hydration anında tercih bilinemez; banner o an çizilmez. */
type ConsentSnapshot = Consent | "unknown" | null;

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
  // Başka sekmede verilen karar da yansısın.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getConsentSnapshot(): ConsentSnapshot {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Gizli sekme veya depolama kapalıysa onay istenmeye devam edilir.
    return null;
  }
}

const getServerConsentSnapshot = (): ConsentSnapshot => "unknown";

/**
 * KVKK kapsamında ölçümleme/pazarlama çerezleri açık rıza olmadan
 * çalıştırılmaz. Onay verilene kadar GA4, Google Ads ve Meta Pixel
 * betikleri sayfaya hiç eklenmez.
 */
export function CookieConsent({
  googleAnalyticsId,
  googleAdsId,
  metaPixelId,
}: {
  googleAnalyticsId: string;
  googleAdsId: string;
  metaPixelId: string;
}) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const onOpenSettings = () => setSettingsOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const decide = useCallback((value: Consent) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Depolanamazsa tercih yalnızca bu oturum için geçerli olur.
    }
    setSettingsOpen(false);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }, []);

  // Henüz karar verilmemişse ya da kullanıcı tercihini değiştirmek istiyorsa göster.
  const bannerVisible = consent === null || settingsOpen;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            id="google-analytics"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
              gtag('config', '${googleAdsId}');
            `}
          </Script>
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
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        </>
      )}

      {bannerVisible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-0 bottom-0 z-[110] border-t border-black/10 bg-white/98 px-5 py-5 shadow-[0_-12px_40px_-24px_rgba(18,20,43,0.5)] backdrop-blur sm:px-8"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div>
              <p id="cookie-consent-title" className="font-heading text-base font-black text-[#12142b]">
                Çerez tercihleri
              </p>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-black/65">
                Sitenin çalışması için gerekli çerezler dışında, ziyaret istatistiklerini ölçmek ve
                reklam performansını değerlendirmek için çerez kullanmak istiyoruz. Bunlar yalnızca
                onayınızla çalışır. Ayrıntılar için{" "}
                <Link
                  href="/kvkk-aydinlatma-metni"
                  className="font-bold text-[#0e7a72] underline underline-offset-2 hover:text-[#e8502a]"
                >
                  KVKK Aydınlatma Metni
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => decide("denied")}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-black/15 px-5 py-2 text-sm font-extrabold text-[#12142b] transition hover:border-[#12142b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e7a72] lg:flex-none"
              >
                Sadece gerekli
              </button>
              <button
                type="button"
                onClick={() => decide("granted")}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#ff6b47] px-5 py-2 text-sm font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e7a72] lg:flex-none"
              >
                Kabul et
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Kullanıcının verdiği onayı sonradan geri alabilmesi için. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      Çerez tercihleri
    </button>
  );
}
