/**
 * Tanıtım videosu oynatıcısı.
 *
 * Bilinçli olarak sade bir <video> etiketi: istemci tarafı JavaScript
 * gerektirmez, tarayıcının kendi kontrolleri erişilebilirdir. preload="none"
 * sayesinde kullanıcı oynat'a basana kadar tek bayt indirilmez; o zamana
 * kadar yalnızca 38 KB'lık poster görseli yüklenir.
 *
 * YouTube gömme yerine kendi dosyamızı sunuyoruz: çerez onayı gerektirmez,
 * video bitiminde rakip içerik önerilmez.
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
  return (
    <div
      className={`relative overflow-hidden rounded-[26px] border border-black/10 bg-[#12142b] shadow-[0_30px_80px_-40px_rgba(18,20,43,0.6)] ${className}`}
    >
      <video
        className="block aspect-video w-full"
        controls
        preload="none"
        playsInline
        poster={poster}
        aria-label={label}
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
    </div>
  );
}
