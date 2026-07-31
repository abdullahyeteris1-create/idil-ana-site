"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tanıtım videosu oynatıcısı.
 *
 * Davranış: video görünür alana girdiğinde sessiz olarak kendiliğinden başlar,
 * kullanıcı "Sesi aç"a (veya videoya) dokununca ses açılır.
 *
 * Neden görünürlüğe bağlı: sayfa açılır açılmaz oynatmak, sayfayı hiç aşağı
 * kaydırmayan ziyaretçilere de 8,9 MB indirtirdi. IntersectionObserver ile
 * yalnızca videoyu gerçekten gören kullanıcı indiriyor.
 *
 * Hareket azaltma tercihi olan kullanıcılarda otomatik oynatma yapılmaz;
 * onlar için poster ve kontroller gösterilir.
 */
export function VideoPlayer({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [oynuyor, setOynuyor] = useState(false);
  const [sessiz, setSessiz] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Kullanıcı sesi açtıysa kontrol ondadır; otomatik müdahale edilmez.
          if (!video.muted) continue;

          if (entry.isIntersecting) {
            // Sessiz oynatmayı tarayıcılar engellemez; yine de reddedilirse
            // kullanıcı kontrollerle başlatabilir.
            void video.play().catch(() => {});
          } else {
            // Ekrandan çıkınca durdurulur; aksi hâlde görünmeyen video
            // boşuna veri ve pil harcar.
            video.pause();
          }
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const sesiAc = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    if (video.paused) void video.play().catch(() => {});
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-[26px] border border-black/10 bg-[#12142b] shadow-[0_30px_80px_-40px_rgba(18,20,43,0.6)] ${className}`}
    >
      <video
        ref={videoRef}
        className="block aspect-video w-full"
        controls
        muted
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        onPlay={() => setOynuyor(true)}
        onPause={() => setOynuyor(false)}
        // Kullanıcı sesi tarayıcının kendi kontrolünden açarsa da durum güncellenir.
        onVolumeChange={(event) => setSessiz(event.currentTarget.muted)}
        onClick={sessiz ? sesiAc : undefined}
      >
        <source src={src} type="video/mp4" />
        <p className="p-6 text-white">
          Tarayıcınız video oynatmayı desteklemiyor.{" "}
          <a href={src} className="underline" download>
            Videoyu indirin
          </a>
          .
        </p>
      </video>

      {/* Sessiz oynayan videoda sesin kapalı olduğu açıkça belirtilir;
          kullanıcı "tıklayınca ses açılır" davranışını tahmin etmek zorunda kalmaz. */}
      {oynuyor && sessiz && (
        <button
          type="button"
          onClick={sesiAc}
          className="absolute right-4 top-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-extrabold text-white backdrop-blur transition hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M11 5 6 9H3v6h3l5 4V5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="m17 9 4 6m0-6-4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Sesi aç
        </button>
      )}
    </div>
  );
}
