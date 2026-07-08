"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Camera,
  CheckCircle2,
  GraduationCap,
  Layers,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  Send,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_NUMBER = "905462396786";
const PHONE_NUMBER = "+905462396786";
const PANEL_URL = "https://panel.idilegitim.com";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=d6d0064a5d54de7c&sxsrf=APpeQnuPoxmC-EuJF4u0RXPN38LzAmd9XA:1783534905038&q=idil+h%C4%B1zl%C4%B1+okuma+yorumlar&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wInRIq3K7mOqUHjNLEag1ly50KxwYGReIYNoHDnCFu1UNzOOohjrwCCil4I6vd-4YPvL1o%3D&uds=AJ5uw19DulAIjewA7JMtOIZPdM0ltMiV_cAGGxgOcAZTMaZx56-02llzucxcAleYSCbl3Nfh6DYkxfhHgI_RE2zfXwNaCI7MPDskTYBqcjCSNJOX0SFrwrT6Fc7X_2cP_IffnFczm0Sc&sa=X&ved=2ahUKEwjt-dWj2cOVAxU_Z_EDHRi_BfwQ3PALegQIORAF&biw=1912&bih=948&dpr=1";
const INSTAGRAM_URL = "https://www.instagram.com/idilhizliokuma/";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Merhaba,%20h%C4%B1zl%C4%B1%20okuma%20e%C4%9Fitimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`;
const heroTitleClass =
  "font-heading max-w-4xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-red-950 sm:text-5xl lg:text-6xl";
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const sectionMotion = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.55, ease: "easeOut" as const },
  variants: fadeUp,
};

const cardHover =
  "transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl";

type EducationGroup = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  image: string;
  gradient: string;
};

type InfoTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

const educationGroups: EducationGroup[] = [
  {
    id: "ilkokul-1-2",
    title: "İlkokul 1-2",
    subtitle: "Okuma temeli",
    description:
      "İlkokul 1 ve 2. sınıf döneminde amaç, öğrencinin okuma alışkanlığını sevdirerek güçlendirmek, harf-kelime-cümle takibini desteklemek ve okuduğunu anlama becerisinin temelini oluşturmaktır.",
    benefits: [
      "Okuma alışkanlığını destekler",
      "Kelime ve cümle takibini güçlendirir",
      "Dikkat ve odaklanmaya katkı sağlar",
      "Okuma özgüvenini artırmaya yardımcı olur",
    ],
    icon: GraduationCap,
    image: "/images/groups/ilkokul-1-2.jpg",
    gradient: "from-red-600 to-orange-500",
  },
  {
    id: "ilkokul-3-4",
    title: "İlkokul 3-4",
    subtitle: "Akıcılık ve anlama",
    description:
      "İlkokul 3 ve 4. sınıf döneminde hızlı okuma çalışmaları, öğrencinin daha akıcı okumasına, metni daha düzenli takip etmesine ve okuduğunu anlama becerisini geliştirmesine yardımcı olur.",
    benefits: [
      "Akıcı okumayı destekler",
      "Okuduğunu anlamaya katkı sağlar",
      "Ders metinlerini takip etmeyi kolaylaştırır",
      "Dikkat süresini geliştirmeye yardımcı olur",
    ],
    icon: BookOpen,
    image: "/images/groups/ilkokul-3-4.jpg",
    gradient: "from-rose-600 to-pink-500",
  },
  {
    id: "ortaokul",
    title: "Ortaokul",
    subtitle: "Paragraf desteği",
    description:
      "Ortaokul döneminde ders yükü arttığı için öğrencinin metinleri daha verimli okuması önem kazanır. Hızlı okuma eğitimi paragraf, yeni nesil sorular ve dikkat gerektiren ders içerikleri için öğrenciyi destekler.",
    benefits: [
      "Paragraf sorularında zamanı verimli kullanmaya yardımcı olur",
      "Yeni nesil sorulara odaklanmayı destekler",
      "Ders metinlerini daha düzenli takip ettirir",
      "Okuma hızı ve anlama dengesini geliştirir",
    ],
    icon: BookOpen,
    image: "/images/groups/ortaokul.jpg",
    gradient: "from-red-700 to-red-500",
  },
  {
    id: "lise",
    title: "Lise",
    subtitle: "Sınav temposu",
    description:
      "Lise döneminde öğrenciler uzun metinler, sınav odaklı paragraf soruları ve yoğun ders içerikleriyle karşılaşır. Hızlı okuma eğitimi, metni daha planlı takip etmeye ve zamanı daha bilinçli kullanmaya yardımcı olur.",
    benefits: [
      "Uzun metinleri verimli okumayı destekler",
      "Ana fikir ve detay takibini güçlendirir",
      "Sınavlarda zaman yönetimine katkı sağlar",
      "Paragraf ve anlama becerilerini destekler",
    ],
    icon: Target,
    image: "/images/groups/lise.jpg",
    gradient: "from-red-950 to-red-700",
  },
  {
    id: "genel",
    title: "Genel",
    subtitle: "Her yaşa uygun",
    description:
      "Genel hızlı okuma programı; öğrenciler, yetişkinler ve okuma verimini artırmak isteyen kişiler için uygundur. Amaç yalnızca hızlı okumak değil, okunan metni daha iyi anlamak ve zamanı daha etkili kullanmaktır.",
    benefits: [
      "Okuma verimini artırmaya yardımcı olur",
      "Dikkat ve odaklanmayı destekler",
      "Bilgiyi daha hızlı taramaya katkı sağlar",
      "Zamanı daha etkili kullanmayı destekler",
    ],
    icon: Users,
    image: "/images/groups/genel.jpg",
    gradient: "from-orange-600 to-red-700",
  },
];

const infoTabs: InfoTab[] = [
  {
    id: "egitim",
    label: "Eğitim Nedir?",
    title: "Hızlı okuma eğitimi nedir?",
    description:
      "Okuma hızını, anlama becerisini ve dikkati birlikte geliştiren takipli bir çalışma sistemidir.",
    bullets: [
      "Okuma hızı ve anlama birlikte ele alınır",
      "Öğrencinin seviyesine göre planlanır",
      "Dikkat ve odak çalışmalarıyla desteklenir",
      "Gelişim düzenli olarak takip edilir",
    ],
    icon: BookOpen,
  },
  {
    id: "teknikler",
    label: "Teknikler",
    title: "Kullanılan temel teknikler",
    description:
      "Teknikler kısa egzersizler, metin çalışmaları ve ölçümlerle pratik hale getirilir.",
    bullets: [
      "Görme alanını genişletme",
      "Kelime gruplama",
      "Süreli okuma çalışmaları",
      "Ana fikir ve detay takibi",
    ],
    icon: Layers,
  },
  {
    id: "online",
    label: "Online Eğitim",
    title: "Online veya yüz yüze ilerleyin",
    description:
      "Program öğrencinin ihtiyacına göre online ya da yüz yüze planlanabilir.",
    bullets: [
      "Esnek ders planı",
      "Öğretmen yönlendirmesi",
      "Evden düzenli egzersiz",
      "WhatsApp üzerinden hızlı bilgi",
    ],
    icon: Monitor,
  },
  {
    id: "platform",
    label: "Platform",
    title: "Öğrenci platformu ile takip",
    description:
      "Öğrenci paneli egzersizleri, gelişim raporlarını ve çalışma düzenini görünür hale getirir.",
    bullets: [
      "Egzersiz takibi",
      "Gelişim raporları",
      "Performans analizi",
      "panel.idilegitim.com girişi",
    ],
    icon: BarChart3,
  },
  {
    id: "neden",
    label: "Neden İdil?",
    title: "Neden İdil Hızlı Okuma?",
    description:
      "Amaç yalnızca ders anlatmak değil; öğrencinin gelişimini düzenli ve sürdürülebilir hale getirmektir.",
    bullets: [
      "Öğrenciye özel çalışma planı",
      "Okuma hızı ve anlama takibi",
      "Veli bilgilendirmesi",
      "Online ve yüz yüze seçenekler",
    ],
    icon: CheckCircle2,
  },
];

const googleReviews = [
  {
    name: "Dilek K.",
    text: "Abdullah hoca sayesinde cocuklarimin okuma ve anlama hızları çok ilerledi. Tesekkurler",
    source: "Google yorumu",
  },
  {
    name: "Aysu B.",
    text: "Abdullah hoca ilk başta duyarlı öngörüsü yüksek kıymetli ve işini severek yapan bir hocadır. Oğlumun aldığı eğitimde kendisinin seviyesini oldukça yükseltti. Çok Tsk ederiz ✌️",
    source: "Google yorumu",
  },
  {
    name: "Emine K.",
    text: "2.tur hızlı okuma kursu aldı oğlum. Derslerimiz saatinde itinayla yapıldı. Derslerin sonucunda okuma hızımız, dikkatimiz oldukça arttı.",
    source: "Google yorumu",
  },
  {
    name: "Nazan K.",
    text: "4. sınıfa giden oğlum Abdullah hocamızdan aldığımız derslere hem keyifle katılıyor hem de gelişimi destekleniyor. Çok teşekkür ediyoruz.",
    source: "Google yorumu",
  },
  {
    name: "Fikret Y.",
    text: "5. sınıfa geçen oğlum yaklaşık 4 aydır hem hızlı okuma hem de Türkçe dersleri alıyor. Çocuğumla kurduğu iletişimden çok memnunuz.",
    source: "Google yorumu",
  },
  {
    name: "Gamze Y.",
    text: "Kızım her derse severek giriyor. Hızlı okuma dersi sonrası Türkçe dersleri ile devam ediyoruz ve kızım isteyerek katılım sağlıyor.",
    source: "Google yorumu",
  },
];

const faqs = [
  {
    question: "Hızlı okuma eğitimi kimler için uygundur?",
    answer:
      "Okuma hızını, okuduğunu anlamayı, dikkati ve odaklanmayı geliştirmek isteyen öğrenciler ve yetişkinler için uygundur.",
  },
  {
    question: "Online eğitim verimli olur mu?",
    answer:
      "Düzenli takip, öğretmen yönlendirmesi ve öğrenciye uygun egzersizlerle online eğitim verimli şekilde yürütülebilir.",
  },
  {
    question: "Eğitim kaç hafta sürer?",
    answer:
      "Süre öğrencinin seviyesi, ihtiyacı ve hedeflerine göre değişir. Ön görüşme sonrasında uygun program planlanır.",
  },
  {
    question: "Öğrenci paneli nasıl kullanılır?",
    answer:
      "Öğrenciler panel.idilegitim.com adresinden giriş yaparak egzersizlerini ve çalışma içeriklerini takip edebilir.",
  },
];

export default function Home() {
  const [activeGroupId, setActiveGroupId] = useState("ilkokul-1-2");
  const [activeInfoTab, setActiveInfoTab] = useState("egitim");
  const [isWhatsAppChatOpen, setIsWhatsAppChatOpen] = useState(false);

  const activeGroup =
    educationGroups.find((group) => group.id === activeGroupId) ??
    educationGroups[0];
  const activeInfo =
    infoTabs.find((tab) => tab.id === activeInfoTab) ?? infoTabs[0];
  const ActiveGroupIcon = activeGroup.icon;
  const ActiveInfoIcon = activeInfo.icon;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff7f5] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-red-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-red-100">
              <Image
                src="/images/icons/idil-logo.png"
                alt="İdil Hızlı Okuma Logosu"
                width={44}
                height={44}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div>
              <p className="text-base font-black text-red-950 sm:text-lg">
                İdil Hızlı Okuma
              </p>
              <p className="text-xs font-medium text-slate-500">
                Hızlı oku, doğru anla
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-700 lg:flex">
            <a href="#kimler" className="hover:text-red-700">
              Eğitim Grupları
            </a>
            <a href="#surec" className="hover:text-red-700">
              Eğitim Süreci
            </a>
            <a href="#yorumlar" className="hover:text-red-700">
              Google Yorumları
            </a>
            <a href="#sss" className="hover:text-red-700">
              SSS
            </a>
            <a href="#iletisim" className="hover:text-red-700">
              İletişim
            </a>
            <a
              href={PANEL_URL} target="_blank" rel="noopener noreferrer">
              
              Öğrenci Girişi
            </a>
          </nav>

          <a
            href={whatsappUrl}
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-emerald-600 lg:h-auto lg:w-auto lg:px-4 lg:py-2 lg:text-sm lg:font-semibold"
          >
            <MessageCircle className="h-5 w-5 lg:mr-2 lg:h-4 lg:w-4" />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(220,38,38,0.14),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.15),_transparent_30%),linear-gradient(180deg,_#ffffff,_#fff7f5)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 lg:grid-cols-2 lg:py-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.55 }}
          >
            <Badge className="mb-4 rounded-full bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-100">
              <Sparkles className="mr-2 h-4 w-4" />
              Online ve yüz yüze hızlı okuma eğitimi
            </Badge>

            <h1 className={heroTitleClass}>
              Daha hızlı oku,
              <span className="block bg-gradient-to-r from-red-700 to-orange-500 bg-clip-text text-transparent">
                daha doğru anla.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              İdil Hızlı Okuma; okuma hızı, anlama, dikkat ve odaklanmayı
              öğrencinin seviyesine göre geliştiren takipli bir eğitim
              programıdır.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                className="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl"
              >
                WhatsApp&apos;tan Bilgi Al
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#surec"
                className="inline-flex items-center justify-center rounded-full border border-red-200 bg-white px-6 py-3 text-base font-semibold text-red-700 transition duration-300 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-lg"
              >
                Eğitim Sürecini Gör
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["1:1", "Özel takip"],
                ["Online", "Esnek ders"],
                ["Rapor", "Veli bilgi"],
              ].map(([value, label]) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm backdrop-blur transition duration-300 hover:shadow-xl"
                >
                  <p className="text-2xl font-black text-red-700">{value}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-600 sm:text-sm">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.08, 1] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 -top-7 h-28 w-28 rounded-full bg-orange-300/40 blur-2xl"
            />
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-red-300/35 blur-2xl"
            />

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl ring-1 ring-red-100"
            >
              <Image
                src="/images/hero/hero-hizli-okuma.png"
                alt="İdil Hızlı Okuma eğitimi"
                width={900}
                height={650}
                priority
                className="max-h-[420px] w-full rounded-[1.5rem] object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="kimler"
        className="mx-auto max-w-7xl px-5 py-8"
        {...sectionMotion}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="rounded-full bg-red-100 px-4 py-2 text-red-700 hover:bg-red-100">
            Eğitim grupları
          </Badge>
          <h2 className="font-heading mt-4 text-balance text-3xl font-black leading-tight tracking-tight text-red-950 sm:text-4xl">
            Yaşa ve hedefe göre program
          </h2>
          <p className="mt-2 leading-7 text-slate-600">
            Kartlardan birini seçin; detay kutusu aynı alanda değişsin.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {educationGroups.map((group, index) => {
            const Icon = group.icon;
            const isActive = group.id === activeGroup.id;

            return (
              <motion.button
                key={group.id}
                type="button"
                onClick={() => setActiveGroupId(group.id)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className={`group h-[210px] rounded-3xl p-0 text-left ${cardHover}`}
                aria-pressed={isActive}
              >
                <Card
                  className={`h-full overflow-hidden border-red-100 bg-white shadow-sm ${
                    isActive ? "shadow-2xl ring-2 ring-red-700" : ""
                  }`}
                >
                  <CardContent className="flex h-full flex-col p-0">
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={group.image}
                        alt={`${group.title} hızlı okuma grubu`}
                        width={360}
                        height={220}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${group.gradient} opacity-70`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-inner ring-1 ring-white/30 backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-4">
                      <h3 className="text-lg font-extrabold tracking-tight text-red-950">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold leading-5 text-slate-600">
                        {group.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={activeGroup.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 grid gap-5 overflow-hidden rounded-[2rem] border border-red-100 bg-white p-5 shadow-xl lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <div
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${activeGroup.gradient} text-white shadow-lg`}
            >
              <ActiveGroupIcon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black tracking-tight text-red-950">
              {activeGroup.title} Hızlı Okuma Eğitimi
            </h3>
            <p className="mt-2 leading-7 text-slate-600">
              {activeGroup.description}
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {activeGroup.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-2 rounded-2xl bg-[#fff7f5] p-3 text-sm font-semibold text-red-950"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-white p-2 shadow-xl ring-1 ring-red-200">
            <Image
              src={activeGroup.image}
              alt={`${activeGroup.title} hızlı okuma eğitimi`}
              width={760}
              height={520}
              className="h-44 w-full rounded-[1.5rem] object-cover lg:h-52"
            />
          </div>
        </motion.div>
      </motion.section>

      <motion.section id="surec" className="bg-white py-8" {...sectionMotion}>
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-red-100 px-4 py-2 text-red-700 hover:bg-red-100">
              Eğitim süreci
            </Badge>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-red-950 sm:text-4xl">
              Eğitim Sürecini Kısaca Tanıyın
            </h2>
          </div>

          <div className="-mx-5 mt-6 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:thin]">
            {infoTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeInfo.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveInfoTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-red-700 text-white shadow-lg"
                      : "bg-[#fff7f5] text-red-700 hover:bg-red-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeInfo.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="mt-5 grid gap-5 rounded-[2rem] border border-red-100 bg-[#fff7f5] p-5 shadow-lg lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-700 text-white shadow-lg">
                <ActiveInfoIcon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight text-red-950">
                {activeInfo.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                {activeInfo.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {activeInfo.bullets.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 rounded-2xl bg-white p-4 text-sm font-semibold text-red-950 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="yorumlar"
        className="bg-[#fff7f5] py-8"
        {...sectionMotion}
      >
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-red-100 px-4 py-2 text-red-700 hover:bg-red-100">
              Google yorumları
            </Badge>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-red-950 sm:text-4xl">
              Google Yorumlarımız
            </h2>
          </div>

          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#fff7f5] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#fff7f5] to-transparent" />

            <div className="google-reviews-marquee flex w-max gap-4 py-2">
              {[...googleReviews, ...googleReviews].map((item, index) => (
                <Card
                  key={`${item.name}-${index}`}
                  className={`h-[240px] w-[290px] shrink-0 rounded-3xl border border-red-100 bg-white shadow-sm sm:w-[320px] ${cardHover}`}
                >
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex gap-1 text-orange-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-700">
                        {item.source}
                      </span>
                    </div>

                    <p className="google-review-text flex-1 leading-7 text-slate-600">
                      &quot;{item.text}&quot;
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-3 border-t border-red-50 pt-3">
                      <p className="font-black text-red-950">{item.name}</p>
                      <span className="text-xs font-semibold text-slate-400">
                        Google
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-red-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-xl"
            >
              Tüm Google yorumlarını gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        <style>{`
          .google-reviews-marquee {
            animation: googleReviewsScroll 38s linear infinite;
          }

          .google-reviews-marquee:hover {
            animation-play-state: paused;
          }

          .google-review-text {
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          @keyframes googleReviewsScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (max-width: 640px) {
            .google-reviews-marquee {
              animation-duration: 48s;
            }
          }
        `}</style>
      </motion.section>

      <motion.section
        id="sss"
        className="mx-auto max-w-4xl px-5 py-8"
        {...sectionMotion}
      >
        <div className="text-center">
          <Badge className="rounded-full bg-red-100 px-4 py-2 text-red-700 hover:bg-red-100">
            Sık sorulan sorular
          </Badge>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-red-950 sm:text-4xl">
            Kısa Cevaplar
          </h2>
        </div>

        <Accordion className="mt-6 space-y-3">
          {faqs.slice(0, 4).map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className={`rounded-3xl border border-red-100 bg-white px-5 shadow-sm ${cardHover}`}
            >
              <AccordionTrigger className="text-left text-base font-bold text-red-950 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-7 text-slate-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>

      <section id="iletisim" className="mx-auto max-w-7xl px-5 pb-8">
        <Card className={`overflow-hidden rounded-[2rem] border-white bg-gradient-to-br from-red-700 via-red-600 to-orange-500 text-white shadow-2xl ${cardHover}`}>
          <CardContent className="relative p-6 text-center sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_35%)]" />
            <div className="relative">
              <Badge className="rounded-full bg-white/15 px-4 py-2 text-white hover:bg-white/15">
                Ücretsiz ön görüşme
              </Badge>

              <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-black tracking-tight sm:text-4xl">
                Seviyeye uygun hızlı okuma programı için bilgi alın.
              </h2>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-red-700 transition hover:bg-red-50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp&apos;tan Yazın
                </a>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-red-700"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Telefonla Bilgi Al
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-red-100 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-red-100">
              <Image
                src="/images/icons/idil-logo.png"
                alt="İdil Hızlı Okuma Logosu"
                width={40}
                height={40}
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div>
              <p className="font-black text-red-950">İdil Hızlı Okuma</p>
              <p className="mt-1">Hızlı oku, doğru anla, başarılı ol.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <a href={PANEL_URL} className="font-bold text-red-700">
              Öğrenci Girişi
            </a>
            <a href={whatsappUrl} className="font-bold text-red-700">
              WhatsApp ile iletişim
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-700" />
              Online ve yüz yüze hızlı okuma eğitimi
            </p>
          </div>
        </div>
      </footer>

      {isWhatsAppChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-24 right-5 z-50 w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.5rem] border border-green-100 bg-white shadow-2xl"
        >
          <div className="flex items-start justify-between gap-4 bg-gradient-to-br from-green-500 to-emerald-600 p-5 text-white">
            <div>
              <p className="font-black">İdil Hızlı Okuma</p>
              <p className="mt-1 text-sm text-white/85">
                Genellikle kısa sürede dönüş yapıyoruz.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsWhatsAppChatOpen(false)}
              className="rounded-full bg-white/15 p-2 text-white transition hover:bg-white/25"
              aria-label="WhatsApp sohbet kutusunu kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 p-5">
            <div className="max-w-[250px] rounded-2xl rounded-tl-sm bg-green-50 p-4 text-sm leading-6 text-slate-700">
              Merhaba 👋 Hızlı okuma eğitimi hakkında bilgi almak ister misiniz?
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-xl"
            >
              WhatsApp&apos;ta Sohbeti Başlat
              <Send className="ml-2 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}

      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
        <motion.a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-13 w-13 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 text-white shadow-2xl transition sm:h-14 sm:w-14"
          aria-label="Instagram hesabımızı aç"
        >
          <Camera className="h-6 w-6" />
        </motion.a>

        <motion.button
          type="button"
          onClick={() => setIsWhatsAppChatOpen((open) => !open)}
          animate={{ scale: [1, 1.04, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-colors hover:bg-green-600"
          aria-label="WhatsApp sohbet kutusunu aç"
        >
          <MessageCircle className="h-7 w-7" />
        </motion.button>
      </div>
    </main>
  );
}
