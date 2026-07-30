"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Beklenmeyen bir hatada varsayılan İngilizce Next.js ekranı yerine
 * Türkçe ve siteye dönüş yolu olan bir sayfa gösterilir.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center bg-[#fbf7f0] px-5 py-20 text-[#12142b] sm:px-8">
      <div className="mx-auto w-full max-w-2xl text-center">
        <h1 className="font-heading text-balance text-3xl font-black leading-tight sm:text-4xl">
          Beklenmeyen bir hata oluştu
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-black/65">
          Sayfa yüklenirken bir sorunla karşılaştık. Tekrar denemek işe yaramazsa ana sayfadan
          devam edebilir veya WhatsApp üzerinden bize ulaşabilirsiniz.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6b47] px-6 py-3 font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
          >
            Tekrar dene
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 px-6 py-3 font-extrabold text-[#12142b] transition hover:border-[#12142b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72]"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </main>
  );
}
