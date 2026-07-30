"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  GRADE_OPTIONS,
  GRADE_WPM_RANGES,
  MAX_PLAUSIBLE_WPM,
  MIN_PLAUSIBLE_SECONDS,
  countWords,
  getPassageForGrade,
  getWpmStatus,
  type TestPassage,
} from "@/lib/reading-test";
import { whatsappUrl } from "@/lib/contact";
import {
  trackReadingTestComplete,
  trackReadingTestStart,
  trackWhatsAppClick,
} from "@/lib/tracking";

type Step = "intro" | "reading" | "questions" | "result";

type Result = {
  wpm: number;
  comprehension: number;
  effectiveWpm: number;
  correctCount: number;
  totalQuestions: number;
  seconds: number;
  words: number;
  valid: boolean;
};

/** Okul yılı yaklaşık 180 gün; kazanç hesabında bu sayı kullanılır. */
const SCHOOL_DAYS_PER_YEAR = 180;
const DAILY_MINUTE_OPTIONS = [20, 30, 45, 60];

const card =
  "rounded-[26px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(18,20,43,0.5)] sm:p-9";
const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff6b47] px-7 py-3 font-extrabold text-white transition hover:bg-[#e8502a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e7a72] disabled:cursor-not-allowed disabled:opacity-50";
function computeResult(passage: TestPassage, seconds: number, answers: (number | null)[]): Result {
  const words = countWords(passage);
  const wpm = Math.round(words / (seconds / 60));
  const correctCount = passage.questions.reduce(
    (total, question, index) => (answers[index] === question.correctIndex ? total + 1 : total),
    0,
  );
  const totalQuestions = passage.questions.length;
  const comprehension = Math.round((correctCount / totalQuestions) * 100);

  return {
    wpm,
    comprehension,
    // Etkili okuma hızı: anlamadan okunan kelime sayılmaz.
    effectiveWpm: Math.round(wpm * (comprehension / 100)),
    correctCount,
    totalQuestions,
    seconds: Math.round(seconds),
    words,
    valid: seconds >= MIN_PLAUSIBLE_SECONDS && wpm <= MAX_PLAUSIBLE_WPM,
  };
}

export function ReadingSpeedTest() {
  const [step, setStep] = useState<Step>("intro");
  const [grade, setGrade] = useState("");
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showAnswerWarning, setShowAnswerWarning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [dailyMinutes, setDailyMinutes] = useState(30);

  const startedAtRef = useRef(0);
  const topRef = useRef<HTMLDivElement>(null);
  const passage = grade ? getPassageForGrade(grade) : null;

  // Adım değiştiğinde widget'ın başına dön; uzun metinden sonra kullanıcı
  // sorulara ulaşmak için geri kaydırmak zorunda kalmasın.
  useEffect(() => {
    if (step === "intro") return;
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const startReading = () => {
    if (!grade) return;
    setAnswers(Array(getPassageForGrade(grade).questions.length).fill(null));
    startedAtRef.current = performance.now();
    trackReadingTestStart(grade);
    setStep("reading");
  };

  const finishReading = () => {
    const seconds = (performance.now() - startedAtRef.current) / 1000;
    startedAtRef.current = seconds; // saniye değerini soru adımına taşı
    setStep("questions");
  };

  const submitAnswers = () => {
    if (!passage) return;
    if (answers.some((answer) => answer === null)) {
      setShowAnswerWarning(true);
      return;
    }
    const computed = computeResult(passage, startedAtRef.current, answers);
    setResult(computed);
    setShowAnswerWarning(false);
    setStep("result");
    if (computed.valid) {
      trackReadingTestComplete({
        grade,
        wpm: computed.wpm,
        comprehension: computed.comprehension,
        effectiveWpm: computed.effectiveWpm,
      });
    }
  };

  const restart = () => {
    setStep("intro");
    setResult(null);
    setAnswers([]);
    setShowAnswerWarning(false);
  };

  return (
    <div ref={topRef} className="scroll-mt-24">
      {step === "intro" && (
        <div className={card}>
          <h2 className="font-heading text-2xl font-black sm:text-3xl">Teste başlayalım</h2>
          <p className="mt-4 leading-7 text-black/65">
            Önce sınıfını seç. Sana uygun uzunlukta bir metin göstereceğiz. Metni normal
            temponla, anlayarak oku — yarış değil, ölçüm yapıyoruz. Bitirdiğinde okuduğunla
            ilgili beş soru soracağız.
          </p>

          <fieldset className="mt-7">
            <legend className="text-sm font-extrabold text-[#12142b]">Sınıf</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {GRADE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setGrade(option)}
                  aria-pressed={grade === option}
                  className={`min-h-11 rounded-full border px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e7a72] ${
                    grade === option
                      ? "border-[#ff6b47] bg-[#ff6b47] text-white"
                      : "border-black/15 text-[#12142b] hover:border-[#12142b]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8">
            <button type="button" className={primaryButton} onClick={startReading} disabled={!grade}>
              Metni göster ve süreyi başlat
            </button>
            {!grade && (
              <p className="mt-3 text-sm text-black/55">Devam etmek için bir sınıf seçin.</p>
            )}
          </div>
        </div>
      )}

      {step === "reading" && passage && (
        <div className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0e7a72]">
                {passage.gradeLabel}
              </p>
              <h2 className="mt-1 font-heading text-2xl font-black">{passage.title}</h2>
            </div>
            <p className="flex items-center gap-2 text-sm font-bold text-black/55">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff6b47]" aria-hidden="true" />
              Süre ölçülüyor
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-[65ch]">
            {passage.paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-5 text-[1.05rem] leading-8 text-black/75 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-9 border-t border-black/10 pt-7">
            <button type="button" className={primaryButton} onClick={finishReading}>
              Okumayı bitirdim
            </button>
            <p className="mt-3 text-sm text-black/55">
              Metni bitirir bitirmez bu butona bas; süre burada duracak.
            </p>
          </div>
        </div>
      )}

      {step === "questions" && passage && (
        <div className={card}>
          <h2 className="font-heading text-2xl font-black sm:text-3xl">Okuduğunu anlama soruları</h2>
          <p className="mt-3 leading-7 text-black/65">
            Metne geri dönemezsin — bu, anlama oranını gerçekçi ölçmek için.
          </p>

          <ol className="mt-8 space-y-8">
            {passage.questions.map((question, questionIndex) => (
              <li key={question.question}>
                <fieldset>
                  <legend className="font-heading text-lg font-black text-[#12142b]">
                    {questionIndex + 1}. {question.question}
                  </legend>
                  <div className="mt-4 space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const id = `q${questionIndex}-o${optionIndex}`;
                      const checked = answers[questionIndex] === optionIndex;
                      return (
                        <label
                          key={option}
                          htmlFor={id}
                          className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 leading-6 transition ${
                            checked
                              ? "border-[#17a398] bg-[#edf9f7]"
                              : "border-black/12 hover:border-black/30"
                          }`}
                        >
                          <input
                            id={id}
                            type="radio"
                            name={`question-${questionIndex}`}
                            className="h-5 w-5 shrink-0 accent-[#0e7a72]"
                            checked={checked}
                            onChange={() => {
                              setAnswers((current) => {
                                const next = [...current];
                                next[questionIndex] = optionIndex;
                                return next;
                              });
                              setShowAnswerWarning(false);
                            }}
                          />
                          <span className="text-black/75">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>

          <div className="mt-9 border-t border-black/10 pt-7">
            <button type="button" className={primaryButton} onClick={submitAnswers}>
              Sonucumu göster
            </button>
            {showAnswerWarning && (
              <p className="mt-3 font-bold text-[#b91c1c]" role="alert">
                Sonucu görmek için tüm soruları yanıtlaman gerekiyor.
              </p>
            )}
          </div>
        </div>
      )}

      {step === "result" && result && passage && (
        <ResultView
          result={result}
          passage={passage}
          grade={grade}
          dailyMinutes={dailyMinutes}
          onDailyMinutesChange={setDailyMinutes}
          onRestart={restart}
        />
      )}
    </div>
  );
}

const STATUS_COPY = {
  altinda: {
    baslik: "Beklenen aralığın altında",
    renk: "text-[#b45309]",
    rozet: "bg-[#fef3c7] text-[#92400e]",
    metin:
      "Bu, düzenli çalışmayla en hızlı ilerleme görülen gruptur. Önce okuma akıcılığı ve satır takibi çalışılır; hız, anlama korunarak kademeli artırılır.",
  },
  icinde: {
    baslik: "Beklenen aralıkta",
    renk: "text-[#0e7a72]",
    rozet: "bg-[#d1fae5] text-[#065f46]",
    metin:
      "Okuma hızın sınıf düzeyi için beklenen aralıkta. Buradan sonraki hedef, anlamayı düşürmeden hızı üst banda taşımak ve dikkat süresini uzatmaktır.",
  },
  uzerinde: {
    baslik: "Beklenen aralığın üzerinde",
    renk: "text-[#0e7a72]",
    rozet: "bg-[#d1fae5] text-[#065f46]",
    metin:
      "Okuma hızın sınıf düzeyinin üzerinde. Bu düzeyde çalışma genellikle anlama derinliği, not alma ve sınav metinlerinde zaman yönetimi üzerine kurulur.",
  },
} as const;

function GradeComparison({ grade, wpm }: { grade: string; wpm: number }) {
  const range = GRADE_WPM_RANGES[grade];
  if (!range) return null;

  const status = getWpmStatus(wpm, range);
  const copy = STATUS_COPY[status];

  // Ölçek: beklenen aralık ve kullanıcının sonucu çubuğa rahat sığsın.
  // Uç değerlerde ölçek sınırlanır, yoksa beklenen aralık görünmez hâle gelir.
  const scaleMax = Math.max(range.max * 1.6, Math.min(wpm * 1.1, range.max * 3));
  const toPercent = (value: number) => Math.min((value / scaleMax) * 100, 100);
  const bandLeft = toPercent(range.min);
  const bandWidth = toPercent(range.max) - bandLeft;
  const markerLeft = toPercent(wpm);

  return (
    <div className={card}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-xl font-black sm:text-2xl">Sınıf düzeyine göre</h3>
        <span className={`rounded-full px-3 py-1 text-sm font-extrabold ${copy.rozet}`}>
          {copy.baslik}
        </span>
      </div>

      <p className="mt-4 leading-7 text-black/65">
        <strong className="text-[#12142b]">{grade}</strong> için beklenen okuma hızı{" "}
        <strong className="text-[#12142b]">
          {range.min}–{range.max} kelime/dakika
        </strong>
        . Senin ölçümün <strong className={copy.renk}>{wpm} kelime/dakika</strong>.
      </p>

      <div className="mt-8">
        <div className="relative h-3 rounded-full bg-black/8">
          <div
            className="absolute inset-y-0 rounded-full bg-[#17a398]/35"
            style={{ left: `${bandLeft}%`, width: `${bandWidth}%`, minWidth: "10px" }}
          />
          <div
            className="absolute top-1/2 h-6 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b47]"
            style={{ left: `${markerLeft}%` }}
          />
        </div>
        <div className="relative mt-3 h-5 text-xs font-bold text-black/50">
          <span className="absolute left-0">0</span>
          <span
            className="absolute -translate-x-1/2 whitespace-nowrap text-[#0e7a72]"
            style={{ left: `${bandLeft + bandWidth / 2}%` }}
          >
            beklenen aralık
          </span>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm font-bold text-black/60">
          <span className="h-3 w-1.5 rounded-full bg-[#ff6b47]" aria-hidden="true" />
          senin sonucun
        </p>
      </div>

      <p className="mt-6 leading-7 text-black/65">{copy.metin}</p>
      <p className="mt-4 text-sm leading-6 text-black/50">
        Bu aralıklar İdil Eğitim&apos;in ölçüm deneyimine dayanır ve yol gösterici bir referanstır.
        Tek bir ölçüm tanı niteliği taşımaz; okuma hızı metnin türüne, uzunluğuna ve öğrencinin o
        anki dikkatine göre değişir.
      </p>
    </div>
  );
}

function ResultView({
  result,
  passage,
  grade,
  dailyMinutes,
  onDailyMinutesChange,
  onRestart,
}: {
  result: Result;
  passage: TestPassage;
  grade: string;
  dailyMinutes: number;
  onDailyMinutesChange: (value: number) => void;
  onRestart: () => void;
}) {
  if (!result.valid) {
    return (
      <div className={card}>
        <h2 className="font-heading text-2xl font-black sm:text-3xl">Ölçüm geçerli değil</h2>
        <p className="mt-4 leading-7 text-black/65">
          Metin, okunamayacak kadar kısa sürede tamamlandı ({result.seconds} saniye). Gerçek bir
          sonuç için metni baştan sona okuman gerekiyor.
        </p>
        <button type="button" className={`${primaryButton} mt-7`} onClick={onRestart}>
          Testi yeniden başlat
        </button>
      </div>
    );
  }

  // Örnek senaryo: aynı içerik iki kat hızda okunsaydı süre yarıya inerdi.
  const savedMinutesPerDay = dailyMinutes / 2;
  const savedHoursPerYear = Math.round((savedMinutesPerDay * SCHOOL_DAYS_PER_YEAR) / 60);
  const wordsPerDay = Math.round(result.wpm * dailyMinutes);

  const range = GRADE_WPM_RANGES[grade];
  const rangeNote = range ? ` Sınıf düzeyi için beklenen aralık: ${range.min}-${range.max}.` : "";
  const whatsappMessage = `Merhaba, sitenizdeki okuma hızı testini yaptım. Sonucum: dakikada ${result.wpm} kelime, anlama %${result.comprehension} (${grade}).${rangeNote} Seviyeme uygun program hakkında bilgi almak istiyorum.`;

  return (
    <div className="space-y-6">
      <div className={card}>
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#0e7a72]">
          Sonucun · {grade}
        </p>
        <h2 className="mt-2 font-heading text-2xl font-black sm:text-3xl">Ölçüm tamamlandı</h2>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[20px] bg-[#12142b] p-6 text-center text-white">
            <p className="font-mono text-4xl font-bold leading-none text-[#ffc93c]">{result.wpm}</p>
            <p className="mt-2 text-sm text-white/70">kelime / dakika</p>
          </div>
          <div className="rounded-[20px] border border-black/10 p-6 text-center">
            <p className="font-mono text-4xl font-bold leading-none text-[#0e7a72]">
              %{result.comprehension}
            </p>
            <p className="mt-2 text-sm text-black/60">
              anlama ({result.correctCount}/{result.totalQuestions} doğru)
            </p>
          </div>
          <div className="rounded-[20px] border border-black/10 p-6 text-center">
            <p className="font-mono text-4xl font-bold leading-none text-[#12142b]">
              {result.effectiveWpm}
            </p>
            <p className="mt-2 text-sm text-black/60">etkili okuma hızı</p>
          </div>
        </div>

        <p className="mt-6 leading-7 text-black/65">
          <strong className="text-[#12142b]">Etkili okuma hızı</strong>, okuma hızının anlama
          oranıyla birlikte değerlendirilmiş hâlidir. Hızlı okuyup az anlamak da, yavaş okuyup çok
          anlamak da tek başına yeterli değildir; eğitimde ikisi birlikte geliştirilir.
        </p>
        <p className="mt-3 text-sm leading-6 text-black/55">
          {passage.title} metnini {result.words} kelime · {result.seconds} saniyede okudun. Bu
          ölçüm tek bir metne dayanır; farklı metinlerde sonuç değişebilir.
        </p>
      </div>

      <GradeComparison grade={grade} wpm={result.wpm} />

      <div className={card}>
        <h3 className="font-heading text-xl font-black sm:text-2xl">Bu hız sana ne kazandırır?</h3>
        <p className="mt-3 leading-7 text-black/65">
          Günde ne kadar okuma yaptığını seç, ölçtüğümüz hızla ne anlama geldiğini görelim.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {DAILY_MINUTE_OPTIONS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              onClick={() => onDailyMinutesChange(minutes)}
              aria-pressed={dailyMinutes === minutes}
              className={`min-h-11 rounded-full border px-4 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e7a72] ${
                dailyMinutes === minutes
                  ? "border-[#0e7a72] bg-[#0e7a72] text-white"
                  : "border-black/15 text-[#12142b] hover:border-[#12142b]"
              }`}
            >
              Günde {minutes} dk
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] bg-[#f2f7fb] p-6">
            <p className="font-mono text-3xl font-bold text-[#12142b]">
              {wordsPerDay.toLocaleString("tr-TR")}
            </p>
            <p className="mt-2 text-sm leading-6 text-black/60">
              şu anki hızınla günde okuduğun kelime sayısı
            </p>
          </div>
          <div className="rounded-[20px] bg-[#edf9f7] p-6">
            <p className="font-mono text-3xl font-bold text-[#0e7a72]">{savedHoursPerYear} saat</p>
            <p className="mt-2 text-sm leading-6 text-black/60">
              hızın iki katına çıksaydı bir öğretim yılında (180 gün) kazanacağın süre
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-black/55">
          Bu bir örnek senaryodur, taahhüt değildir. Gelişim öğrencinin başlangıç düzeyine,
          çalışma düzenine ve metin zorluğuna göre değişir.
        </p>
      </div>

      <div className="rounded-[26px] bg-[#12142b] p-7 text-center text-white sm:p-10">
        <h3 className="font-heading text-balance text-2xl font-black sm:text-3xl">
          Seviyene uygun programı birlikte belirleyelim
        </h3>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">
          Sonucunu bize ilet, ücretsiz ön görüşmede hangi çalışmaların uygun olduğunu konuşalım.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            aria-label="Okuma testi sonucuyla WhatsApp üzerinden bilgi al"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#25d366] px-7 py-3 font-extrabold text-white transition hover:bg-[#1ebe5d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Sonucumla WhatsApp&apos;tan yaz
          </a>
          <Link
            href="/#paketler"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-7 py-3 font-extrabold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Eğitim paketlerini gör
          </Link>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="mt-6 min-h-11 text-sm font-bold text-white/60 underline-offset-4 hover:text-white hover:underline"
        >
          Testi yeniden yap
        </button>
      </div>

      <div className={card}>
        <h3 className="font-heading text-xl font-black">Sonucunu nasıl yorumlamalı?</h3>
        <ul className="mt-4 space-y-3 leading-7 text-black/65">
          <li className="flex gap-3">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#17a398]" aria-hidden="true" />
            Anlama oranı %70&apos;in altındaysa, hızı artırmadan önce anlama çalışmaları öne alınır.
          </li>
          <li className="flex gap-3">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#17a398]" aria-hidden="true" />
            Anlama yüksek ama hız düşükse, göz takibi ve kelime grubu okuma çalışmaları öncelikli olur.
          </li>
          <li className="flex gap-3">
            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#17a398]" aria-hidden="true" />
            Tek bir ölçüm kesin sonuç vermez; eğitimde farklı metinlerle düzenli ölçüm yapılır.
          </li>
        </ul>
      </div>
    </div>
  );
}
