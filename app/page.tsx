"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { MessageCircle, Check } from "lucide-react";

/* =========================================================
   VERİLER
   ========================================================= */

const groupData = [
  {
    num: "01",
    tag: "Okuma temeli",
    title: "İlkokul 1-2 Hızlı Okuma Eğitimi",
    text: "İlkokul 1 ve 2. sınıf döneminde amaç, öğrencinin okuma alışkanlığını sevdirerek güçlendirmek, harf-kelime-cümle takibini desteklemek ve okuduğunu anlama becerisinin temelini oluşturmaktır.",
    img: "/images/groups/ilkokul-1-2.jpg",
    feats: [
      "Okuma alışkanlığını destekler",
      "Kelime ve cümle takibini güçlendirir",
      "Dikkat ve odaklanmaya katkı sağlar",
      "Okuma özgüvenini artırmaya yardımcı olur",
    ],
  },
  {
    num: "02",
    tag: "Akıcılık ve anlama",
    title: "İlkokul 3-4 Hızlı Okuma Eğitimi",
    text: "Bu dönemde hedef, akıcı okuma becerisini geliştirmek ve okuduğunu anlama düzeyini artırmaktır. Öğrenci artık daha uzun metinlerle çalışmaya hazırlanır.",
    img: "/images/groups/ilkokul-3-4.jpg",
    feats: [
      "Akıcı okuma pratiği yapılır",
      "Kelime dağarcığı genişletilir",
      "Anlama derinliği artırılır",
      "Düzenli hız ölçümleri yapılır",
    ],
  },
  {
    num: "03",
    tag: "Paragraf desteği",
    title: "Ortaokul Hızlı Okuma Eğitimi",
    text: "Ortaokul döneminde paragraf düzeyinde anlama ve daha yüksek hızda okuma hedeflenir; sınav sorularına yönelik okuma stratejileri de desteklenir.",
    img: "/images/groups/ortaokul.jpg",
    feats: [
      "Paragraf düzeyinde anlama desteklenir",
      "Okuma hızı sistematik artırılır",
      "Sınav odaklı okuma stratejileri",
      "Dikkat süresini uzatma çalışmaları",
    ],
  },
  {
    num: "04",
    tag: "Sınav temposu",
    title: "Lise Hızlı Okuma Eğitimi",
    text: "Lise öğrencileri için sınav temposuna uygun, zaman baskısı altında hızlı ve doğru okuma becerisini geliştiren yoğun bir program uygulanır.",
    img: "/images/groups/lise.jpg",
    feats: [
      "Sınav temposuna uygun pratik",
      "Zamanlı okuma egzersizleri",
      "Karmaşık metinlerde anlama desteği",
      "Düzenli performans raporu",
    ],
  },
  {
    num: "05",
    tag: "Her yaşa uygun",
    title: "Genel Hızlı Okuma Eğitimi",
    text: "Her yaş grubuna uygun, bireysel hedeflere göre şekillenen esnek bir program. Yetişkinler ve farklı ihtiyaçlar için de uyarlanabilir.",
    img: "/images/groups/genel.jpg",
    feats: [
      "Bireysel hedeflere göre planlanır",
      "Her yaş grubuna uygundur",
      "Esnek ders programı",
      "Kişiye özel takip",
    ],
  },
];

const processData = [
  {
    label: "Eğitim Nedir?",
    title: "Hızlı okuma eğitimi nedir?",
    lede: "Okuma hızını, anlama becerisini ve dikkati birlikte geliştiren takipli bir çalışma sistemidir. Her öğrenci kendi seviyesinden başlar, düzenli egzersizlerle ilerler.",
    feats: [
      "Okuma hızı ve anlama birlikte ele alınır",
      "Öğrencinin seviyesine göre planlanır",
      "Dikkat ve odak çalışmalarıyla desteklenir",
      "Gelişim düzenli olarak takip edilir",
    ],
  },
  {
    label: "Teknikler",
    title: "Kullanılan teknikler",
    lede: "Göz atlama alışkanlıklarını azaltan, kelime grubu takibini geliştiren ve anlamayı önceliklendiren egzersiz teknikleri kullanılır.",
    feats: [
      "Göz sıçraması ve odak egzersizleri",
      "Kelime grubu okuma pratiği",
      "Anlama kontrollü metin çalışmaları",
      "Düzenli hız-anlama ölçümleri",
    ],
  },
  {
    label: "Online Eğitim",
    title: "Online eğitim nasıl işler?",
    lede: "Dersler tamamen online ve esnek saatlerle yürütülür; öğrenci evinden, öğretmenle birebir bağlantı kurarak çalışır.",
    feats: [
      "Esnek gün ve saat seçenekleri",
      "Birebir, canlı öğretmen desteği",
      "Ekstra donanım gerektirmez",
      "Türkiye'nin her yerinden katılım",
    ],
  },
  {
    label: "Platform",
    title: "Öğrenci paneli ve platform",
    lede: "Öğrenciler günlük egzersiz programlarını platform üzerinden takip eder; veliler ilerlemeyi düzenli raporlarla görür.",
    feats: [
      "Günlük egzersiz programı",
      "Kelime/dakika ilerleme takibi",
      "Veliye düzenli raporlama",
      "Basit, öğrenci dostu arayüz",
    ],
  },
  {
    label: "Neden İdil?",
    title: "Neden İdil Hızlı Okuma?",
    lede: "Alanında deneyimli eğitmen kadrosu, düzenli takip ve gerçek veli geri bildirimleriyle desteklenen bir eğitim modeli sunuyoruz.",
    feats: [
      "Deneyimli, ilgili eğitmenler",
      "Şeffaf, düzenli ilerleme raporu",
      "Gerçek Google değerlendirmeleri",
      "Seviyeye özel program tasarımı",
    ],
  },
];

const reviews = [
  { name: "Dilek K.", text: "Abdullah hoca sayesinde çocuklarımın okuma ve anlama hızları çok ilerledi. Teşekkürler." },
  { name: "Aysu B.", text: "Abdullah hoca duyarlı, öngörüsü yüksek, kıymetli ve işini severek yapan bir hoca. Oğlumun eğitimde seviyesini oldukça yükseltti." },
  { name: "Emine K.", text: "2. tur hızlı okuma kursu aldı oğlum. Derslerimiz saatinde itinayla yapıldı. Okuma hızımız ve dikkatimiz oldukça arttı." },
  { name: "Nazan K.", text: "4. sınıfa giden oğlum Abdullah hocamızdan aldığı derslere hem keyifle katılıyor hem de gelişimi destekleniyor." },
  { name: "Arzu K.", text: "Abdullah öğretmenimiz, oğlumun dakikada okuduğu kelime sayısının düşük olduğunu tespit etti; ilk kur sonunda 89'dan 150 kelimeye çıktı." },
  { name: "Mustafa Y.", text: "5. sınıfa giden oğlum için kurs aldık. Okuma hızı 1 aylık süreçte 130 kelimeden 190 kelimeye ulaştı." },
  { name: "Ayşegül D.", text: "Güvenilir, istediğimiz zaman öğretmenlerimizle iletişim kurabildik. Kızımın okuma hızı yüzde yüz arttı." },
  { name: "Duygu A.", text: "Abdullah öğretmen, disiplinli eğitim planıyla yüksek katkı sundu. Ara ara raporlamalarla ilerlemeyi paylaştı." },
];

const faqData = [
  {
    q: "Hızlı okuma eğitimi kimler için uygundur?",
    a: "İlkokul, ortaokul ve lise öğrencileri için uygundur. Program her öğrencinin mevcut okuma hızı ve seviyesine göre kişiselleştirilir.",
  },
  {
    q: "Online eğitim verimli olur mu?",
    a: "Evet. Dersler birebir ve takipli yürütüldüğü için öğrenci öğretmenle sürekli etkileşim halindedir; egzersizler ve raporlarla ilerleme düzenli takip edilir.",
  },
  {
    q: "Eğitim kaç hafta sürer?",
    a: "Süre öğrencinin başlangıç seviyesine ve hedeflerine göre değişir. Net bir plan için WhatsApp üzerinden bilgi alabilirsiniz.",
  },
  {
    q: "Öğrenci paneli nasıl kullanılır?",
    a: "Kayıt sonrası öğrenciye özel bir panel tanımlanır. Öğrenci günlük egzersizlerini bu panelden takip eder, veli de ilerleme raporlarına aynı yerden ulaşır.",
  },
];

const rsvpText =
  "Daha hızlı oku daha doğru anla İdil Hızlı Okuma okuma hızını anlama becerisini dikkat ve odaklanmayı birlikte geliştirir her öğrenci kendi seviyesinden başlar";
const rsvpWords = rsvpText.split(" ");

const WHATSAPP_URL =
  "https://wa.me/905462396786?text=Merhaba,%20h%C4%B1zl%C4%B1%20okuma%20e%C4%9Fitimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

/* =========================================================
   ANİMASYON VARYANTLARI
   ========================================================= */

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 0.84, 0.44, 1] },
  },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={reveal}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   SAYAÇ (istatistik) BİLEŞENİ
   ========================================================= */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    function tick(t: number) {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="mono">
      {value}
      {suffix}
    </span>
  );
}

/* =========================================================
   RSVP HIZLI OKUMA DEMOSU
   ========================================================= */

function RsvpDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [speed, setSpeed] = useState(220);
  const [word, setWord] = useState("Hazır");
  const [progress, setProgress] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const interval = 60000 / speed;
    const timer = setInterval(() => {
      const i = indexRef.current % rsvpWords.length;
      setWord(rsvpWords[i]);
      setProgress(((i + 1) / rsvpWords.length) * 100);
      indexRef.current++;
    }, interval);
    return () => clearInterval(timer);
  }, [inView, speed]);

  return (
    <Reveal className="rsvp-card">
      <div ref={ref} className="rsvp-inner">
        <div className="rsvp-top">
          <span className="rsvp-label">Canlı Demo · Hızlı Okuma</span>
          <div className="rsvp-wpm">
            <span className="rsvp-wpm-num mono">{speed}</span>
            <span className="rsvp-wpm-unit">kelime/dk</span>
          </div>
        </div>
        <div className="rsvp-stage">
          <span className="display" style={{ opacity: 1, transition: "opacity .06s linear" }}>
            {word}
          </span>
        </div>
        <div className="rsvp-progress">
          <div style={{ width: `${progress}%` }} id="rsvpBar" />
        </div>
        <div className="rsvp-controls">
          {[
            { label: "Yavaş", val: 220 },
            { label: "Orta", val: 350 },
            { label: "Hızlı", val: 500 },
          ].map((b) => (
            <button
              key={b.val}
              className={`rsvp-btn ${speed === b.val ? "active" : ""}`}
              onClick={() => setSpeed(b.val)}
            >
              {b.label}
            </button>
          ))}
        </div>
        <p className="rsvp-caption">
          Öğrencilerimizin gerçek eğitim panelinden esinlenen mini bir hızlı okuma egzersizi
        </p>
      </div>
    </Reveal>
  );
}

/* =========================================================
   ANA SAYFA
   ========================================================= */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const group = groupData[activeGroup];
  const panel = processData[activeTab];
  const year = new Date().getFullYear();

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <header id="siteHeader" className={scrolled ? "scrolled" : ""}>
        <div className="wrap nav">
          <a href="#top" className="brand">
            <span className="brand-mark">İ</span>
            <span>
              İdil Hızlı Okuma
              <small>Hızlı oku, doğru anla</small>
            </span>
          </a>
          <nav className="nav-links">
            <a href="#gruplar">Eğitim Grupları</a>
            <a href="#surec">Eğitim Süreci</a>
            <a href="#yorumlar">Yorumlar</a>
            <a href="#sss">SSS</a>
          </nav>
          <div className="nav-cta">
            <a href="https://panel.idilegitim.com" className="btn btn-ghost btn-sm">
              Öğrenci Girişi
            </a>
            <a href={WHATSAPP_URL} className="header-icon-btn" aria-label="WhatsApp">
              <MessageCircle size={19} />
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <Reveal className="eyebrow" delay={0}>
                <span className="eyebrow-dot" />
                Online hızlı okuma eğitimi
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="display">
                  Daha hızlı oku,
                  <br />
                  <em>daha doğru</em> anla.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lede">
                  İdil Hızlı Okuma; okuma hızı, anlama, dikkat ve odaklanmayı öğrencinin
                  seviyesine göre geliştiren takipli bir eğitim programıdır.
                </p>
              </Reveal>
              <Reveal className="hero-ctas" delay={0.15}>
                <a href={WHATSAPP_URL} className="btn btn-primary">
                  WhatsApp&apos;tan Bilgi Al
                </a>
                <a href="#surec" className="hero-link">
                  Eğitim sürecini gör →
                </a>
              </Reveal>
              <Reveal className="badge-row" delay={0.2}>
                <div className="badge">
                  <span className="badge-ic" style={{ background: "var(--coral)" }}>
                    1:1
                  </span>
                  Özel takip
                </div>
                <div className="badge">
                  <span className="badge-ic" style={{ background: "var(--teal)" }}>
                    ⌁
                  </span>
                  Online esnek ders
                </div>
                <div className="badge">
                  <span className="badge-ic" style={{ background: "var(--sun)", color: "var(--ink)" }}>
                    ▲
                  </span>
                  Veli raporu
                </div>
              </Reveal>
            </div>

            <RsvpDemo />
          </div>
        </section>

        {/* ---------- STATS ---------- */}
        <section className="stats">
          <div className="wrap stats-grid">
            <Reveal className="stat">
              <div className="stat-num">
                <Counter to={190} />
              </div>
              <div className="stat-label">kelime/dk&apos;ya çıkan öğrenci hızı*</div>
            </Reveal>
            <Reveal className="stat">
              <div className="stat-num">
                <Counter to={100} suffix="%" />
              </div>
              <div className="stat-label">bazı öğrencilerde okuma hızı artışı*</div>
            </Reveal>
            <Reveal className="stat">
              <div className="stat-num mono">1:1</div>
              <div className="stat-label">özel, takipli online ders yapısı</div>
            </Reveal>
            <Reveal className="stat">
              <div className="stat-num">
                <Counter to={5} />
              </div>
              <div className="stat-label">yaş grubuna göre planlanan program</div>
            </Reveal>
          </div>
          <div className="wrap">
            <p style={{ fontSize: ".72rem", color: "rgba(251,247,240,0.35)", marginTop: 24 }}>
              *Gerçek veli değerlendirmelerinden derlenen örnek sonuçlardır, bireysel sonuçlar
              değişebilir.
            </p>
          </div>
        </section>

        {/* ---------- GROUPS ---------- */}
        <section className="groups" id="gruplar">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="sec-eyebrow">Eğitim Grupları</div>
              <h2 className="display">Yaşa ve hedefe göre program</h2>
              <p>Kartlardan birini seçin, aşağıdaki detay kutusu o gruba göre değişsin.</p>
            </Reveal>

            <Reveal className="group-cards">
              {groupData.map((g, i) => (
                <div
                  key={g.title}
                  className={`group-card ${activeGroup === i ? "active" : ""}`}
                  onClick={() => setActiveGroup(i)}
                >
                  <img src={g.img} alt={g.title} />
                  <div className="group-card-overlay">
                    <span className="num">{g.num}</span>
                    <h3>{g.title.split(" ").slice(0, 2).join(" ")}</h3>
                    <span>{g.tag}</span>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal className="group-detail">
              <div className="group-detail-img">
                <img src={group.img} alt={group.title} />
              </div>
              <div>
                <h3 className="display">{group.title}</h3>
                <p>{group.text}</p>
                <ul className="feat-list">
                  {group.feats.map((f) => (
                    <li key={f}>
                      <span className="feat-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- PROCESS ---------- */}
        <section className="process" id="surec">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="sec-eyebrow">Eğitim Süreci</div>
              <h2 className="display">Eğitim sürecini kısaca tanıyın</h2>
            </Reveal>
            <Reveal className="process-shell">
              <div className="process-tabs">
                {processData.map((p, i) => (
                  <button
                    key={p.label}
                    className={`p-tab ${activeTab === i ? "active" : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    <span className="tnum mono">{String(i + 1).padStart(2, "0")}</span>
                    {p.label}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h3 className="display">{panel.title}</h3>
                  <p className="lede">{panel.lede}</p>
                  <ul className="process-feat">
                    {panel.feats.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </section>

        {/* ---------- REVIEWS ---------- */}
        <section className="reviews" id="yorumlar">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="sec-eyebrow">Google Yorumları</div>
              <h2 className="display">Velilerimiz ne diyor?</h2>
              <p>Velilerimizin Google üzerinden paylaştığı gerçek değerlendirmelerden bazıları.</p>
            </Reveal>
          </div>
          <div className="review-track-wrap">
            <div className="review-track">
              {[...reviews, ...reviews].map((r, i) => {
                const initials = r.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("");
                return (
                  <div className="review-card" key={i}>
                    <div className="stars">★★★★★</div>
                    <p>{r.text}</p>
                    <div className="review-who">
                      <div className="review-avatar">{initials}</div>
                      <div>
                        <strong>{r.name}</strong>
                        <span>Google üzerinden paylaşıldı</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: 34 }}>
            <a
              href="https://www.google.com/search?q=idil+h%C4%B1zl%C4%B1+okuma+yorumlar"
              className="hero-link"
            >
              Tüm Google yorumlarını gör →
            </a>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="faq" id="sss">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="sec-eyebrow">SSS</div>
              <h2 className="display">Kısa cevaplar</h2>
            </Reveal>
            <Reveal className="faq-list">
              {faqData.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                    <button
                      className="faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      {item.q}
                      <span className="faq-plus" />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="faq-a"
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 0.84, 0.44, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <p>{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="cta">
          <div className="wrap">
            <Reveal className="cta-box">
              <h2 className="display">Seviyeye uygun program için bilgi alın</h2>
              <p>
                Ücretsiz ön görüşme ile öğrencinize en uygun hızlı okuma programını birlikte
                belirleyelim.
              </p>
              <div className="cta-ctas">
                <a href={WHATSAPP_URL} className="btn btn-primary">
                  WhatsApp&apos;tan Yazın
                </a>
                <a href="tel:+905462396786" className="btn btn-ghost">
                  Telefonla Bilgi Al
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-brand">
              <span className="brand-mark">İ</span>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", marginTop: 4 }}>
                İdil Hızlı Okuma
              </div>
              <p>Hızlı oku, doğru anla, başarılı ol.</p>
            </div>
            <div className="foot-links">
              <div className="foot-col">
                <h4>Site</h4>
                <a href="#gruplar">Eğitim Grupları</a>
                <a href="#surec">Eğitim Süreci</a>
                <a href="#yorumlar">Google Yorumları</a>
                <a href="#sss">SSS</a>
              </div>
              <div className="foot-col">
                <h4>İletişim</h4>
                <a href="https://panel.idilegitim.com">Öğrenci Girişi</a>
                <a href="https://wa.me/905462396786">WhatsApp</a>
                <a href="tel:+905462396786">+90 546 239 67 86</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {year} İdil Hızlı Okuma. Tüm hakları saklıdır.</span>
            <div className="foot-social">
              <a href="https://www.instagram.com/idilhizliokuma/" aria-label="Instagram">
                <span className="text-sm font-black">IG</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------- FLOATING WHATSAPP ---------- */}
      <motion.a
        href={WHATSAPP_URL}
        aria-label="WhatsApp ile iletişim"
        animate={{ y: [0, -8, 0] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl fixed bottom-6 right-6 z-50"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.a>

      {/* ---------- SAYFAYA ÖZEL STİLLER ---------- */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap");

        :root {
          --ink: #12142b;
          --ink-soft: #1b1f3b;
          --cream: #fbf7f0;
          --coral: #ff6b47;
          --coral-deep: #e8502a;
          --teal: #17a398;
          --teal-deep: #0e7a72;
          --sun: #ffc93c;
          --line: rgba(18, 20, 43, 0.1);
          --line-dark: rgba(251, 247, 240, 0.14);
          --text-dim: rgba(18, 20, 43, 0.62);
          --shadow: 0 20px 60px -20px rgba(18, 20, 43, 0.35);
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "Plus Jakarta Sans", sans-serif;
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        img {
          max-width: 100%;
          display: block;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .display {
          font-family: "Fraunces", serif;
        }
        .mono {
          font-family: "JetBrains Mono", monospace;
        }
        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 32px;
        }
        section {
          position: relative;
        }
        ::selection {
          background: var(--coral);
          color: #fff;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 18px 0;
          transition: background 0.4s ease, padding 0.4s ease, box-shadow 0.4s ease;
        }
        header.scrolled {
          background: rgba(251, 247, 240, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 12px 0;
          box-shadow: 0 1px 0 var(--line);
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 1.08rem;
        }
        .brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, var(--coral), var(--sun));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: "Fraunces", serif;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 6px 16px -4px rgba(255, 107, 71, 0.55);
          flex-shrink: 0;
        }
        .brand small {
          display: block;
          font-weight: 500;
          font-size: 0.68rem;
          color: var(--text-dim);
          letter-spacing: 0.02em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
          font-size: 0.92rem;
          font-weight: 600;
        }
        .nav-links a {
          position: relative;
          padding: 6px 0;
          color: var(--ink);
        }
        .nav-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 2px;
          background: var(--coral);
          transition: width 0.3s ease;
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease,
            background 0.25s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--coral), var(--coral-deep));
          color: #fff;
          box-shadow: 0 10px 24px -8px rgba(255, 107, 71, 0.6);
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 30px -8px rgba(255, 107, 71, 0.75);
        }
        .btn-ghost {
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--line);
        }
        .btn-ghost:hover {
          border-color: var(--ink);
          transform: translateY(-2px);
        }
        .btn-dark {
          background: var(--ink);
          color: var(--cream);
        }
        .btn-sm {
          padding: 9px 16px;
          font-size: 0.8rem;
        }
        .header-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--teal);
          color: #fff;
          box-shadow: 0 8px 18px -6px rgba(23, 163, 152, 0.6);
          transition: transform 0.25s ease;
        }
        .header-icon-btn:hover {
          transform: translateY(-2px) rotate(8deg);
        }

        .hero {
          padding: 168px 0 90px;
          position: relative;
          background: radial-gradient(ellipse 900px 500px at 82% -10%, rgba(255, 201, 60, 0.35), transparent 60%),
            radial-gradient(ellipse 700px 500px at -10% 20%, rgba(23, 163, 152, 0.18), transparent 60%);
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 64px;
          align-items: center;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--coral-deep);
          background: rgba(255, 107, 71, 0.1);
          padding: 8px 16px;
          border-radius: 100px;
          margin-bottom: 22px;
        }
        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--coral);
          animation: pulse 1.8s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.3);
          }
        }
        .hero h1 {
          font-size: clamp(2.6rem, 4.6vw, 4.1rem);
          line-height: 1.04;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-bottom: 24px;
        }
        .hero h1 em {
          font-style: italic;
          font-weight: 500;
          background: linear-gradient(100deg, var(--coral) 0%, var(--coral-deep) 50%, var(--teal) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero p.lede {
          font-size: 1.14rem;
          color: var(--text-dim);
          max-width: 480px;
          margin-bottom: 36px;
          line-height: 1.6;
        }
        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .hero-link {
          font-weight: 700;
          font-size: 0.92rem;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-bottom: 2px solid var(--line);
        }
        .hero-link:hover {
          border-color: var(--ink);
        }
        .badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 100px;
          padding: 8px 16px 8px 8px;
          font-size: 0.82rem;
          font-weight: 600;
          box-shadow: 0 4px 14px -8px rgba(18, 20, 43, 0.2);
        }
        .badge-ic {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.72rem;
          color: #fff;
          flex-shrink: 0;
        }

        .rsvp-card {
          background: var(--ink);
          border-radius: 28px;
          padding: 8px;
          box-shadow: var(--shadow);
          position: relative;
        }
        .rsvp-inner {
          background: linear-gradient(160deg, var(--ink-soft), #0d0f22);
          border-radius: 22px;
          padding: 34px 28px 28px;
          color: var(--cream);
        }
        .rsvp-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }
        .rsvp-label {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(251, 247, 240, 0.55);
          font-weight: 700;
        }
        .rsvp-wpm {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .rsvp-wpm-num {
          font-family: "JetBrains Mono", monospace;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--sun);
        }
        .rsvp-wpm-unit {
          font-size: 0.72rem;
          color: rgba(251, 247, 240, 0.5);
        }
        .rsvp-stage {
          height: 120px;
          border: 1px solid var(--line-dark);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          margin-bottom: 20px;
          overflow: hidden;
        }
        .rsvp-stage::before,
        .rsvp-stage::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255, 107, 71, 0.35);
        }
        .rsvp-stage::before {
          transform: translateX(-26px);
        }
        .rsvp-stage::after {
          transform: translateX(26px);
        }
        .rsvp-stage .display {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 1.9rem;
        }
        .rsvp-progress {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 22px;
        }
        #rsvpBar {
          height: 100%;
          background: linear-gradient(90deg, var(--coral), var(--sun));
          border-radius: 4px;
          transition: width 0.15s linear;
        }
        .rsvp-controls {
          display: flex;
          gap: 10px;
        }
        .rsvp-btn {
          flex: 1;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid var(--line-dark);
          background: rgba(255, 255, 255, 0.04);
          color: var(--cream);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.2s ease;
        }
        .rsvp-btn:hover {
          background: rgba(255, 255, 255, 0.09);
          transform: translateY(-1px);
        }
        .rsvp-btn.active {
          background: var(--coral);
          border-color: var(--coral);
        }
        .rsvp-caption {
          font-size: 0.76rem;
          color: rgba(251, 247, 240, 0.45);
          margin-top: 16px;
          text-align: center;
        }

        .stats {
          background: var(--ink);
          color: var(--cream);
          padding: 56px 0;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stat {
          text-align: center;
          padding: 0 20px;
          border-left: 1px solid var(--line-dark);
        }
        .stat:first-child {
          border-left: none;
        }
        .stat-num {
          font-family: "JetBrains Mono", monospace;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 700;
          color: var(--sun);
          line-height: 1;
        }
        .stat-label {
          font-size: 0.82rem;
          color: rgba(251, 247, 240, 0.6);
          margin-top: 10px;
        }

        .sec-head {
          max-width: 640px;
          margin-bottom: 52px;
        }
        .sec-eyebrow {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--teal-deep);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sec-eyebrow::before {
          content: "";
          width: 24px;
          height: 2px;
          background: var(--teal);
        }
        .sec-head h2 {
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .sec-head p {
          color: var(--text-dim);
          margin-top: 14px;
          font-size: 1.02rem;
          line-height: 1.6;
        }

        .groups {
          padding: 110px 0 60px;
        }
        .group-cards {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 36px;
        }
        .group-card {
          cursor: pointer;
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 3/4;
          background: var(--ink);
          box-shadow: 0 10px 24px -14px rgba(18, 20, 43, 0.4);
          transition: transform 0.35s cubic-bezier(0.16, 0.84, 0.44, 1), box-shadow 0.35s ease;
        }
        .group-card:hover {
          transform: translateY(-6px);
        }
        .group-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.55;
          transition: transform 0.5s ease, opacity 0.3s ease;
        }
        .group-card:hover img {
          transform: scale(1.08);
          opacity: 0.7;
        }
        .group-card.active {
          box-shadow: 0 16px 34px -14px rgba(255, 107, 71, 0.5);
        }
        .group-card.active::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 2.5px solid var(--coral);
          border-radius: 18px;
          z-index: 3;
        }
        .group-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(18, 20, 43, 0.92) 10%, rgba(18, 20, 43, 0.1) 65%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
          z-index: 2;
        }
        .group-card-overlay .num {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.7rem;
          color: var(--sun);
          font-weight: 700;
          margin-bottom: 6px;
        }
        .group-card-overlay h3 {
          color: #fff;
          font-size: 1.02rem;
          font-weight: 700;
          font-family: "Fraunces", serif;
        }
        .group-card-overlay span {
          color: rgba(255, 255, 255, 0.65);
          font-size: 0.78rem;
          margin-top: 2px;
          display: block;
        }

        .group-detail {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 44px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 44px;
          align-items: center;
          box-shadow: 0 20px 50px -30px rgba(18, 20, 43, 0.3);
        }
        .group-detail-img {
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 4/3;
        }
        .group-detail-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .group-detail h3 {
          font-size: 1.7rem;
          margin-bottom: 14px;
        }
        .group-detail p {
          color: var(--text-dim);
          line-height: 1.65;
          margin-bottom: 22px;
        }
        .feat-list {
          display: grid;
          gap: 12px;
        }
        .feat-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.94rem;
          font-weight: 600;
        }
        .feat-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(23, 163, 152, 0.14);
          color: var(--teal-deep);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .process {
          padding: 110px 0;
        }
        .process-shell {
          background: var(--ink-soft);
          border-radius: 28px;
          padding: 52px;
          color: var(--cream);
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 44px;
        }
        .process-tabs {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .p-tab {
          text-align: left;
          padding: 16px 18px;
          border-radius: 14px;
          border: none;
          background: transparent;
          color: rgba(251, 247, 240, 0.55);
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .p-tab .tnum {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.78rem;
          opacity: 0.7;
        }
        .p-tab:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--cream);
        }
        .p-tab.active {
          background: rgba(255, 107, 71, 0.14);
          color: #fff;
        }
        .p-tab.active .tnum {
          color: var(--coral);
        }
        .process-panel h3 {
          font-family: "Fraunces", serif;
          font-size: 1.7rem;
          margin-bottom: 16px;
          font-weight: 600;
        }
        .process-shell p.lede {
          color: rgba(251, 247, 240, 0.68);
          font-size: 1.02rem;
          line-height: 1.65;
          margin-bottom: 24px;
          max-width: 520px;
        }
        .process-feat {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .process-feat li {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--line-dark);
          border-radius: 14px;
          padding: 16px 18px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .reviews {
          padding: 110px 0 100px;
          overflow: hidden;
        }
        .stars {
          color: var(--sun);
          font-size: 0.85rem;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }
        .review-track-wrap {
          position: relative;
          margin: 0 -32px;
        }
        .review-track-wrap::before,
        .review-track-wrap::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 5;
          pointer-events: none;
        }
        .review-track-wrap::before {
          left: 0;
          background: linear-gradient(90deg, var(--cream), transparent);
        }
        .review-track-wrap::after {
          right: 0;
          background: linear-gradient(-90deg, var(--cream), transparent);
        }
        .review-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scrollX 46s linear infinite;
          padding: 0 32px;
        }
        .review-track:hover {
          animation-play-state: paused;
        }
        @keyframes scrollX {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .review-card {
          width: 340px;
          flex-shrink: 0;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 26px;
          box-shadow: 0 14px 30px -22px rgba(18, 20, 43, 0.35);
        }
        .review-card p {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--ink);
          margin-bottom: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .review-who {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .review-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--teal), var(--teal-deep));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .review-who strong {
          font-size: 0.88rem;
          display: block;
        }
        .review-who span {
          font-size: 0.76rem;
          color: var(--text-dim);
        }

        .faq {
          padding: 0 0 110px;
        }
        .faq-list {
          display: grid;
          gap: 14px;
          max-width: 820px;
        }
        .faq-item {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          overflow: hidden;
        }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 22px 26px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
          font-family: "Fraunces", serif;
        }
        .faq-plus {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1.5px solid var(--line);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: transform 0.35s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .faq-plus::before,
        .faq-plus::after {
          content: "";
          position: absolute;
          background: var(--ink);
          transition: transform 0.3s ease;
        }
        .faq-plus::before {
          width: 11px;
          height: 1.6px;
        }
        .faq-plus::after {
          width: 1.6px;
          height: 11px;
        }
        .faq-item.open .faq-plus {
          background: var(--coral);
          border-color: var(--coral);
        }
        .faq-item.open .faq-plus::before,
        .faq-item.open .faq-plus::after {
          background: #fff;
        }
        .faq-item.open .faq-plus::after {
          transform: rotate(90deg) scaleY(0);
        }
        .faq-a p {
          padding: 0 26px 24px;
          color: var(--text-dim);
          line-height: 1.65;
          font-size: 0.94rem;
        }

        .cta {
          padding: 0 0 110px;
        }
        .cta-box {
          background: linear-gradient(135deg, var(--coral) 0%, var(--coral-deep) 55%, #c23d19 100%);
          border-radius: 32px;
          padding: 70px 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
          color: #fff;
        }
        .cta-box::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          top: -220px;
          right: -140px;
        }
        .cta-box::after {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          bottom: -160px;
          left: -100px;
        }
        .cta-box h2 {
          font-size: clamp(1.9rem, 3.4vw, 2.7rem);
          margin-bottom: 16px;
          position: relative;
        }
        .cta-box p {
          opacity: 0.9;
          max-width: 480px;
          margin: 0 auto 34px;
          position: relative;
          font-size: 1.02rem;
        }
        .cta-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
        .cta-box .btn-ghost {
          border-color: rgba(255, 255, 255, 0.5);
          color: #fff;
        }
        .cta-box .btn-ghost:hover {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }
        .cta-box .btn-primary {
          background: #fff;
          color: var(--coral-deep);
          box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.3);
        }
        .cta-box .btn-primary:hover {
          box-shadow: 0 14px 30px -8px rgba(0, 0, 0, 0.4);
        }

        footer {
          background: var(--ink);
          color: var(--cream);
          padding: 64px 0 32px;
        }
        .foot-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--line-dark);
          flex-wrap: wrap;
        }
        .foot-brand .brand-mark {
          margin-bottom: 16px;
        }
        .foot-brand p {
          color: rgba(251, 247, 240, 0.55);
          font-size: 0.9rem;
          max-width: 280px;
          line-height: 1.6;
          margin-top: 10px;
        }
        .foot-links {
          display: flex;
          gap: 64px;
          flex-wrap: wrap;
        }
        .foot-col h4 {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(251, 247, 240, 0.45);
          margin-bottom: 16px;
        }
        .foot-col a {
          display: block;
          font-size: 0.92rem;
          margin-bottom: 12px;
          color: rgba(251, 247, 240, 0.85);
        }
        .foot-col a:hover {
          color: var(--coral);
        }
        .foot-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 28px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .foot-bottom span {
          font-size: 0.8rem;
          color: rgba(251, 247, 240, 0.4);
        }
        .foot-social {
          display: flex;
          gap: 10px;
        }
        .foot-social a {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--line-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .foot-social a:hover {
          background: var(--coral);
          border-color: var(--coral);
          transform: translateY(-3px);
        }

        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 52px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 28px;
          }
          .stat:nth-child(3) {
            border-left: none;
          }
          .group-cards {
            grid-template-columns: repeat(3, 1fr);
          }
          .group-detail {
            grid-template-columns: 1fr;
          }
          .process-shell {
            grid-template-columns: 1fr;
            padding: 32px;
          }
          .process-tabs {
            flex-direction: row;
            overflow-x: auto;
            gap: 8px;
          }
          .foot-links {
            gap: 36px;
          }
        }
        @media (max-width: 640px) {
          .wrap {
            padding: 0 20px;
          }
          .nav-links {
            display: none;
          }
          .hero {
            padding: 130px 0 60px;
          }
          .group-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .stat {
            border-left: none;
            border-top: 1px solid var(--line-dark);
            padding-top: 20px;
          }
          .stat:first-child {
            border-top: none;
            padding-top: 0;
          }
          .cta-box {
            padding: 46px 24px;
          }
          .foot-top {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
