"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { Check, Headphones, LoaderCircle, MessageCircle, Send, ShoppingBag } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  INSTAGRAM_URL,
  LOGO_PATH,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import {
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_E164,
  STUDENT_PANEL_URL,
  WHATSAPP_URL,
  whatsappUrl,
} from "@/lib/contact";
import { trackContactFormSuccess, trackWhatsAppClick } from "@/lib/tracking";
import "./home.css";

/* =========================================================
   VERİLER
   ========================================================= */

const SHOPIER_URLS = {
  oneMonth: process.env.NEXT_PUBLIC_SHOPIER_1_MONTH_URL ?? "",
  threeMonths: process.env.NEXT_PUBLIC_SHOPIER_3_MONTH_URL ?? "",
  sixMonths: process.env.NEXT_PUBLIC_SHOPIER_6_MONTH_URL ?? "",
  oneYear: process.env.NEXT_PUBLIC_SHOPIER_1_YEAR_URL ?? "",
};

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

const packageData = [
  {
    name: "1 Aylık Paket",
    price: "399 TL",
    shopierUrl: SHOPIER_URLS.oneMonth,
    features: [
      "1 aylık platform erişimi",
      "Hızlı okuma egzersizleri",
      "Dikkat ve odaklanma çalışmaları",
      "Okuma ve anlama testleri",
      "Gelişim takibi",
    ],
    message:
      "Merhaba, 399 TL olan 1 Aylık Online Hızlı Okuma Eğitim Setini satın almak istiyorum.",
  },
  {
    name: "3 Aylık Paket",
    price: "699 TL",
    shopierUrl: SHOPIER_URLS.threeMonths,
    badge: "En Çok Tercih Edilen",
    featured: true,
    features: [
      "3 aylık platform erişimi",
      "Tüm hızlı okuma egzersizleri",
      "Dikkat ve konsantrasyon çalışmaları",
      "Okuma ve anlama testleri",
      "Düzenli gelişim takibi",
    ],
    message:
      "Merhaba, 699 TL olan 3 Aylık Online Hızlı Okuma Eğitim Setini satın almak istiyorum.",
  },
  {
    name: "6 Aylık Paket",
    price: "1.299 TL",
    shopierUrl: SHOPIER_URLS.sixMonths,
    features: [
      "6 aylık platform erişimi",
      "Tüm eğitim ve egzersiz içerikleri",
      "Seviye bazlı çalışmalar",
      "Okuma ve anlama testleri",
      "Uzun dönem gelişim takibi",
    ],
    message:
      "Merhaba, 1.299 TL olan 6 Aylık Online Hızlı Okuma Eğitim Setini satın almak istiyorum.",
  },
  {
    name: "1 Yıllık Paket",
    price: "1.999 TL",
    shopierUrl: SHOPIER_URLS.oneYear,
    badge: "En Avantajlı",
    features: [
      "12 aylık platform erişimi",
      "Tüm hızlı okuma eğitim içerikleri",
      "Dikkat, odaklanma ve hafıza çalışmaları",
      "Okuma ve anlama testleri",
      "Yıllık gelişim takibi",
      "Yeni eklenecek egzersizlere erişim",
    ],
    message:
      "Merhaba, 1.999 TL olan 1 Yıllık Online Hızlı Okuma Eğitim Setini satın almak istiyorum.",
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
  { name: "Yasemin", text: "LGS sürecine girecek kızım için Abdullah hocaya başvurduk ve kendisi süreci çok mükemmel yönetti, okuma hızımız hocamızın yaptığı testler ve veri sonuçlarıyla %100 arttı. Dakikada 125 kelimeyle başladık, kur sonunda 220'ye çıkmıştı. Biz ilgisinden ve deneyiminden çok memnun kaldık. Emekleri için hocamıza buradan da ayrıca teşekkür ederiz." },
  { name: "Begum Akhun", text: "Abdullah hocayı Google yorumlarına bakarak bulduk, aslında iyi ki de tanışma fırsatı bulduk. Oğlum adına çok şanslıyım; öğrenci dilinden anlayan ve en önemlisi de dersleri eğlenceli hale getirerek öğretmeyi çok iyi bilen bir öğretmen. Oğlum öğretmenini o kadar çok seviyor ki her derse girdiğinde severek dinliyor ve yapması gereken ödevleri aksatmadan yapıyor. Teşekkür ederiz hocam." },
  { name: "Zahit Arife Angın", text: "Sayın Abdullah Hocam, Şubat ayından bu yana çocuğumuzun hızlı okuma eğitiminde gösterdiğiniz emek, sabır ve özveri için size gönülden teşekkür ederiz. Eğitime başladığımız ilk günden bugüne kadar çocuğumuzun hem okuma hızında hem de okuduğunu anlama becerisinde gözle görülür bir gelişme yaşadık. Kitap okurken daha özgüvenli olması, dikkatini daha iyi toplaması ve okuduklarını daha doğru yorumlayabilmesi bizi çok mutlu ediyor. Bu süreçte yalnızca akademik anlamda değil, öğrenmeye olan isteğinin artmasında da katkılarınızı gördük. Eğitimimiz hâlâ devam ediyor ve her geçen gün daha güzel ilerlemeler kaydediyoruz. İlginiz, sabrınız ve değerli katkılarınız için size yürekten teşekkür eder, başarılarınızın devamını dileriz." },
  { name: "Fikret Yalçın", text: "5. sınıfa geçen oğlum yaklaşık 4 aydır hem hızlı okuma hem de direkt Türkçe dersleri alıyor. Abdullah hocanın konulara ve derse hakimiyetinden, çocuğumla kurmuş olduğu ilişki ve iletişimden çok memnunuz." },
  { name: "Gamze Yenihayat", text: "Kızım her derse severek giriyor. Hızlı okuma dersi sonrası Türkçe dersleri ile hâlâ devam ediyoruz ve kızım isteyerek derslere katılım sağlıyor. Yaz boyunca derslerimiz devam ederken bile Abdullah hocanın yaklaşımı sayesinde kızım sıkılmadan devam etti. Kızımın erkek öğretmenlere olan ön yargısı da Abdullah Hoca sayesinde kırıldı. İşini severek yapan ve çocuklara nasıl yaklaşacağını bilen harika bir öğretmen." },
  { name: "Seda Buyurgan", text: "Çok çok memnun kaldık. İlgili, nazik ve işlerinde çok iyiler. Herkese tavsiye ederim." },
  { name: "clouds_butterfly", text: "Hocamızın desteği ile okuma ve anlama oranımız etkili bir oranda arttı. Abdullah hocamıza emekleri için çok teşekkür ederiz 🙏" },
  { name: "Ayşegül Düz", text: "Güvenilir, istediğimiz zaman öğretmenlerimizle iletişim kurabildik. Kızımın okuma hızı yüzde yüz arttı, teşekkür ederiz ☺😊" },
  { name: "Şebnem Adıgüzel", text: "Abdullah hocama çok teşekkür ederiz. İyi ki sizinle tanıştık. 1 aylık eğitim sürecimizde bize çok yardımcı oldunuz. Kesinlikle çok iyi bir eğitim kurumu." },
  { name: "Betül Saban", text: "İdil Hızlı Okuma Kursu'na ve Abdullah hocamıza bize kattıkları için çooook teşekkür ederiz 💐💐 5. sınıf oğlum ve kuzeni için 1 aylık ders aldık, çok memnun kaldık. Egzersizlere hâlâ devam ediyoruz, herkese tavsiye ediyoruz." },
  { name: "Onur Erseven", text: "6. sınıf öğrencisi kızımın sınavlardaki paragraf sorularında yaşadığı olumsuzluklara çözüm bulmak için İdil Eğitim ile tanıştık. Bu süreçte Abdullah bey'e çok teşekkür ediyorum. Verdiği eğitim ve bizi yönlendirmesi çok profesyonelceydi. Kurs bittikten sonra da her konuda bize yardımcı olabileceğini ve kendisini arayabileceğimizi söylemesi bizi ayrıca sevindirdi." },
  { name: "SMMM Burcu Bülbül", text: "İdil hızlı okuma kursu programımız yeni bitti, çok memnun kaldık. Kızım dk. 145 kelime ile başladı, 4 hafta sonunda 400 kelimeye ulaştık. Çok verimli ve keyifli bir program oldu, sizi tanıdığımıza çok memnunuz, kesinlikle tavsiye ederim." },
  { name: "Canan Çelik", text: "4. sınıfa giden kızımızın okuduğunu anlama ve hızlı okuma konusundaki eksiklerinin tamamlanması ile ilgili İdil Hızlı Okuma kursuna başvurduk. Sevgili öğretmenimiz Abdullah bey ile 1 aylık kuru tamamladığımızda kızımızın hem okuma hızı hem de anlama ve sınavlardaki başarısı gözle görülür oranda arttı. Kızıma keyifli geçen her ders sonrası kazandırdığı okuma hızı ve alışkanlığı için İdil Eğitim Kursu ve öğretmenimiz Abdullah beye çok teşekkür ederiz 🙏" },
  { name: "Derya Kaplan", text: "Çok kısa zaman içinde kızımın okuma alanında ölçümleri hız kazandı. Bunda öğretmeni Abdullah Bey'in iyi iletişimi ve düzgün, doğru taktik ve tekniklerle gösterdiği çaba yadsınamaz. Memnun kaldık, emeklerinize sağlık." },
  { name: "Cansu", text: "Hızlı okuma ve okuduğunu anlama konusunda kaliteli eğitim aldığımızı düşünüyorum. Abdullah hocamızın katkılarıyla başlangıçtan eğitim sonuna kadar çok hızlı yol kat ettik. Sürekli iletişim halinde olmamız, yapılan değerlendirmelerin zamanında ve açıklayıcı paylaşılması da ayrı bir etken. Her şey için tekrar teşekkür ederiz." },
  { name: "Aylin Ay Sarı", text: "Abdullah hocamla lisede okuyan oğluma hızlı okuma eğitimiyle tanıştık. Kendisi yüksek mesleki deneyime ve iletişim becerisine sahip. Daha sonra küçük oğluma da aynı eğitimi düzeyine uygun düzenleyerek verdi. Hızlı okuma ve okuduğunu anlama düzeyini geliştirmek isteyenlere tavsiye ederim." },
  { name: "Elanur Okumuş", text: "Bayağı eğitim keyifli ve yararlı geçiyor, ayrıca işe yaradı; ilk hız ortalamam 130 ve algım 75'ti. Ama en sonki hız 251 ve algım 90 oldu, yeterince yardımcı oluyorlar." },
  { name: "Oykumasal Tarakci", text: "Kızım seneye LGS'ye girecek. Hızlı ve anlayarak okuması açısından İdil Hızlı Okuma kursu bize çok yardımcı oldu. Çok teşekkür ediyorum." },
  { name: "Nafia Zeynep Dönmez", text: "Üniversite sınavına hazırlanan bir öğrenci olarak bana testlerde ve deneme sınavlarında ek zaman yaratmamda yardımcı oldu." },
  { name: "Rengin Melek Bayram", text: "Aldığım eğitimden çok memnunum, benim okuma hızımı arttırdı; ayrıca bazı şeyleri hızlıca geçsem bile fark edebiliyorum." },
  { name: "Zubeyda Bayram", text: "Kızım çok memnun kaldı, çok çok faydasını gördük, teşekkürler." },
  { name: "Neslihan Cangüler", text: "İnternette arama yaparken tesadüf eseri denk geldim İdil Eğitim sayfasına... İyi ki denk gelmişim... Başlangıçta çok düşük seviyede okuma yapan 6. sınıf oğlum kurs bitiminde dakikada 700 kelimeleri buldu, ortalaması 590'larda. Kıymetli Abdullah Hocamıza ilgisi ve desteği için sonsuz, sınırsız teşekkür ederiz 🙏🌹" },
  { name: "Sibel Altunkılıç", text: "Oğlumun okuma yaparken yanlış okumaları ve kelimeler arasında sürekli 'ııı', 'eee' gibi takılarak okumaları vardı. 4 haftalık eğitim süreci ile hepsi geçti. Katkılarınızdan dolayı teşekkür ederim İdil Eğitim..." },
  { name: "sueda incebacak", text: "8 gün süren bu eğitim sayesinde kendi okuma hızımın kolaylıkla 2 katına çıktığını söyleyebilirim. Benim için çok keyifli ve faydalı bir eğitimdi." },
  { name: "arzum sudem", text: "İlk görüşmede 'evet doğru yerdeyiz' dediğim güven dolu, sonuçları başarıya taşıyan, asla geç kalınmaması gereken hızlı okuma anlama kursumuzu başarıyla tamamladık 👏👏 Çok çok teşekkür ediyorum Abdullah bey. Kızımın odasına girdiğimde artık daha sık kitap okurken gördüğüm anların mutluluğu paha biçilemez 🤲😍 Hızlı okuma anlama algısı kat kat arttı, artık ders çalışmak, kitap okumak, soru çözmek çok daha keyifli. Tüm detaylarıyla dolu dolu, her sorumuzun cevabını aldığımız güven kokan tecrübeli yaklaşımınızla iyi ki dediğimiz kurum 👏👏 Sonsuz teşekkürler Abdullah hocam 🤲👏" },
  { name: "Ayşe Yamaner", text: "Kesinlikle sizi tercih ettiğimiz için hiç pişman olmadık, oğluma çok büyük katkısı oldu, emekleriniz için çok teşekkür ederiz hocam." },
  { name: "simge doğaner", text: "Kursa başlamadan önce internetteki videolardan yapmaya çalışıyordum. Fakat bire bir eğitim gerçekten çok farklı; neyi nasıl yapmanız gerektiğini çok daha iyi anlıyorsunuz. Abdullah hocamızın da ilgisine ve sabrına ayrıca çok teşekkür ediyorum. İçinizde hiçbir şüphe olmadan gönül rahatlığı ile başlayabilirsiniz 👏🏻" },
  { name: "serdar nükte", text: "İdil Hızlı Okuma ve Anlama kursu ile birlikte okuma hızımı tamamıyla anlayarak arttırdım. Eşimle birlikte ders aldık. Hem eğitici hem öğretici hem de çok eğlenceli derslerdi. 8 derslik süreçte Abdullah hocanın söylediklerini sabırla ve severek yaparsanız, gerek okuma hızınızı gerekse anlama oranınızı katlayarak arttıracağınıza eminim." },
];

const faqData = [
  {
    q: "Online hızlı okuma eğitimi kimler için uygundur?",
    a: "İdil Eğitim online hızlı okuma programı, ilkokul ve ortaokul öğrencileri için hazırlanmıştır. Çalışmalar öğrencinin yaşına, sınıf seviyesine ve okuma ihtiyaçlarına göre uygulanabilir.",
  },
  {
    q: "Eğitim tamamen online mı yapılıyor?",
    a: "Evet. Eğitimler ve hızlı okuma çalışmaları tamamen online olarak gerçekleştirilir. Öğrenciler internet bağlantısı bulunan bilgisayar, tablet veya telefon üzerinden sisteme erişebilir.",
  },
  {
    q: "Eğitimlerde hangi beceriler geliştiriliyor?",
    a: "Programda hızlı okuma, okuduğunu anlama, dikkat, odaklanma, konsantrasyon, göz kaslarını geliştirme ve düzenli okuma alışkanlığına yönelik çalışmalar yer alır.",
  },
  {
    q: "Eğitim paketleri arasındaki fark nedir?",
    a: "Paketler kullanım süresine göre değişir. 1 aylık, 3 aylık, 6 aylık ve 1 yıllık seçenekler bulunur. Uzun süreli paketler öğrencinin gelişimini daha düzenli ve uzun vadeli takip etmek isteyen aileler için uygundur.",
  },
  {
    q: "Öğrenci çalışmaları telefon veya tabletten yapabilir mi?",
    a: "Evet. Platform bilgisayar, tablet ve telefonla uyumlu olacak şekilde hazırlanmıştır. En rahat kullanım için güncel bir internet tarayıcısı ve düzenli internet bağlantısı önerilir.",
  },
  {
    q: "Yapay zekâ destekli eğitim ne anlama geliyor?",
    a: "Yapay zekâ desteği, öğrencinin çalışma sonuçlarını, başarı oranlarını ve gelişim sürecini değerlendirmeye yardımcı olan kişiselleştirilmiş eğitim özelliklerini ifade eder.",
  },
  {
    q: "Öğrencinin gelişimi takip edilebilir mi?",
    a: "Evet. Öğrencinin yaptığı çalışmalar, doğru ve yanlış sayıları, başarı oranı, çalışma süresi ve gelişim sonuçları sistem üzerinden takip edilebilir.",
  },
  {
    q: "Eğitim paketi satın alındıktan sonra ne olur?",
    a: "Satın alma işlemi tamamlandıktan sonra kayıt ve erişim süreciyle ilgili bilgilendirme yapılır. Gerekli giriş bilgileri öğrenci veya veliye iletilir.",
  },
  {
    q: "Eğitim hakkında bilgi almak için nasıl iletişim kurabilirim?",
    a: "Ana sayfadaki iletişim formunu doldurabilir veya WhatsApp butonunu kullanarak doğrudan bilgi alabilirsiniz.",
  },
  {
    q: "Hızlı okuma eğitimi okuduğunu anlamayı azaltır mı?",
    a: "Doğru tekniklerle yapılan hızlı okuma çalışmaları yalnızca okuma hızına değil, okuduğunu anlama, dikkat ve odaklanma becerilerine de yöneliktir. Amaç öğrencinin hem daha verimli hem de anlayarak okumasını desteklemektir.",
  },
];

const rsvpText =
  "Daha hızlı oku daha doğru anla İdil Hızlı Okuma okuma hızını anlama becerisini dikkat ve odaklanmayı birlikte geliştirir her öğrenci kendi seviyesinden başlar";
const rsvpWords = rsvpText.split(" ");

const navLinks = [
  { href: "#gruplar", label: "Eğitim Grupları" },
  { href: "#paketler", label: "Paketler" },
  { href: "#surec", label: "Eğitim Süreci" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#sss", label: "SSS" },
];

const gradeOptions = [
  "1. Sınıf",
  "2. Sınıf",
  "3. Sınıf",
  "4. Sınıf",
  "5. Sınıf",
  "6. Sınıf",
  "7. Sınıf",
  "8. Sınıf",
  "Diğer",
];

type ContactFormValues = {
  fullName: string;
  phone: string;
  email: string;
  studentGrade: string;
  consentAccepted: boolean;
  website: string;
};

type ContactField = "fullName" | "phone" | "email" | "studentGrade" | "consentAccepted";

const emptyContactForm: ContactFormValues = {
  fullName: "",
  phone: "",
  email: "",
  studentGrade: "",
  consentAccepted: false,
  website: "",
};

const packageOffersJsonLd = packageData.map((item) => {
  const shopierUrl = item.shopierUrl.trim();

  return {
    "@type": "Offer",
    name: item.name,
    price: item.price.replace(/\D/g, ""),
    priceCurrency: "TRY",
    url: shopierUrl || absoluteUrl("/#paketler"),
    ...(shopierUrl ? { availability: "https://schema.org/InStock" } : {}),
  };
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl(LOGO_PATH),
      description: DEFAULT_DESCRIPTION,
      telephone: PHONE_NUMBER_E164,
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "tr-TR",
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#online-hizli-okuma-egitimi`,
      name: "Online Hızlı Okuma Eğitimi ve Dikkat Geliştirme",
      description:
        "Okuma hızını, anlama becerisini ve dikkati birlikte geliştiren takipli online çalışma sistemi.",
      provider: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "tr-TR",
      offers: packageOffersJsonLd,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqData.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

const serializedHomeJsonLd = JSON.stringify(homeJsonLd).replace(/</g, "\\u003c");

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
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState<ContactFormValues>(emptyContactForm);
  const [contactErrors, setContactErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken Esc ile kapanır ve arka plan kaymaz.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Masaüstü genişliğine dönüldüğünde açık kalan menüyü kapat.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1161px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const group = groupData[activeGroup];
  const panel = processData[activeTab];
  const year = new Date().getFullYear();

  const updateContactField = <Field extends keyof ContactFormValues>(
    field: Field,
    value: ContactFormValues[Field],
  ) => {
    setContactForm((current) => ({ ...current, [field]: value }));
    if (field !== "website") {
      setContactErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (contactStatus === "success" || contactStatus === "error") {
      setContactStatus("idle");
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactStatus === "submitting") return;

    const errors: Partial<Record<ContactField, string>> = {};
    const fullName = contactForm.fullName.trim();
    const phone = contactForm.phone.trim();
    const email = contactForm.email.trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (fullName.length < 2) errors.fullName = "Ad Soyad alanı zorunludur.";
    if (!/^[+\d\s().-]+$/.test(phone) || phoneDigits.length < 10 || phoneDigits.length > 12) {
      errors.phone = "Geçerli bir telefon numarası giriniz.";
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Geçerli bir e-posta adresi giriniz.";
    }
    if (!contactForm.studentGrade) errors.studentGrade = "Öğrencinin sınıfını seçiniz.";
    if (!contactForm.consentAccepted) {
      errors.consentAccepted = "Devam etmek için KVKK onayını vermelisiniz.";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      setContactStatus("idle");
      return;
    }

    setContactErrors({});
    setContactStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          studentGrade: contactForm.studentGrade,
          consentAccepted: contactForm.consentAccepted,
          website: contactForm.website,
        }),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      setContactForm(emptyContactForm);
      setContactStatus("success");
      trackContactFormSuccess();
    } catch {
      setContactStatus("error");
    }
  };

  return (
    <div className="home">
      {pathname === "/" && (
        <script
          id="home-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedHomeJsonLd }}
        />
      )}
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
          <nav className="nav-links" aria-label="Ana menü">
            {navLinks.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a
              href={INSTAGRAM_URL}
              className="header-action header-instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="İdil Eğitim Instagram hesabını aç"
            >
              <FaInstagram aria-hidden="true" />
              <span className="header-action-label">Instagram</span>
            </a>
            <a
              href={WHATSAPP_URL}
              className="header-action header-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              aria-label="WhatsApp üzerinden iletişime geç"
            >
              <FaWhatsapp aria-hidden="true" />
              <span className="header-action-label">WhatsApp</span>
            </a>
            <a
              href={STUDENT_PANEL_URL}
              className="btn btn-ghost btn-sm student-login"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="student-label-full">Öğrenci Girişi</span>
              <span className="student-label-short">Giriş</span>
            </a>
            <button
              type="button"
              className={`nav-toggle ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
              <span className="nav-toggle-bar" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Menü her zaman DOM'da; açılış/kapanış CSS geçişiyle yapılır.
            Kapalıyken visibility:hidden olduğu için sekme sırasına da girmez. */}
        <nav
          id="mobileNav"
          className={`mobile-nav ${menuOpen ? "open" : ""}`}
          aria-label="Mobil menü"
        >
          {navLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#iletisim-formu" onClick={() => setMenuOpen(false)}>
            İletişim
          </a>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>
            Blog
          </Link>
        </nav>
      </header>

      <button
        type="button"
        className={`mobile-nav-backdrop ${menuOpen ? "open" : ""}`}
        aria-label="Menüyü kapat"
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

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
                <a
                  href={WHATSAPP_URL}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                >
                  <FaWhatsapp aria-hidden="true" />
                  WhatsApp&apos;tan Bilgi Al
                </a>
                <a
                  href={INSTAGRAM_URL}
                  className="btn hero-instagram-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="İdil Eğitim Instagram hesabını aç"
                >
                  <FaInstagram aria-hidden="true" />
                  Instagram&apos;da Bizi Takip Edin
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

        {/* ---------- APPROACH ---------- */}
        <section className="approach" id="yontem">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="sec-eyebrow">Yöntemimiz</div>
              <h2 className="display">Sonuç odaklı, üç adımlı bir yaklaşım</h2>
              <p>
                Her ders, dikkat ve odaklanmadan başlayıp birebir online çalışmayla derinleşen ve
                düzenli alıştırmayla kalıcı hale gelen aynı yöntemi izler.
              </p>
            </Reveal>

            <div className="approach-grid">
              {[
                {
                  img: "/images/sections/odakli-okuma.jpg",
                  icon: "①",
                  title: "Dikkat ve Odaklanma",
                  text: "Öğrenci; göz atlamalarını azaltan, satır ve kelime grubu takibini güçlendiren tekniklerle dikkatini uzun süre koruyabilmeyi öğrenir.",
                },
                {
                  img: "/images/sections/online-egitim.jpg",
                  icon: "②",
                  title: "Birebir Online Ders",
                  text: "Öğrenci evinden, öğretmenle birebir bağlantı kurarak canlı derse katılır; kazanılan tekniği aynı seansta egzersizlere uygular.",
                },
                {
                  img: "/images/sections/cocuk.jpg",
                  icon: "③",
                  title: "Düzenli Alıştırma",
                  text: "Kısa ve düzenli alıştırmalarla kazanılan beceri kalıcı hale gelir; her oturumda hız ve anlama ölçülerek gelişim raporlanır.",
                },
              ].map((step, i) => (
                <Reveal className="approach-card" delay={i * 0.1} key={step.title}>
                  <div className="approach-media">
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      sizes="(max-width: 900px) 90vw, 31vw"
                    />
                    <span className="approach-icon">{step.icon}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </Reveal>
              ))}
            </div>
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
                  <Image
                    src={g.img}
                    alt={g.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 980px) 30vw, 212px"
                  />
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
                <Image
                  src={group.img}
                  alt={group.title}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 980px) calc(100vw - 64px), 536px"
                />
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

        {/* ---------- PACKAGES ---------- */}
        <section className="packages" id="paketler">
          <div className="wrap">
            <Reveal className="sec-head packages-head">
              <div className="sec-eyebrow">Eğitim Paketleri</div>
              <h2 className="display">Size uygun paketi seçin</h2>
              <p>
                Tüm paketler tek seferlik ödeme ile sunulur. İhtiyacınıza uygun süreyi seçerek
                WhatsApp üzerinden satın alma talebinizi iletebilirsiniz.
              </p>
            </Reveal>

            <div className="package-grid">
              {packageData.map((item, index) => (
                <Reveal
                  className={`package-card ${item.featured ? "featured" : ""}`}
                  delay={index * 0.05}
                  key={item.name}
                >
                  {item.badge && <span className="package-badge">{item.badge}</span>}
                  <div className="package-card-top">
                    <h3>{item.name}</h3>
                    <div className="package-price">{item.price}</div>
                    <div className="package-payment">Tek seferlik ödeme</div>
                  </div>
                  <ul className="package-features">
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <span className="feat-check">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="package-actions">
                    {item.shopierUrl.trim() ? (
                      <a
                        href={item.shopierUrl.trim()}
                        className="btn btn-primary package-button package-buy-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.name.replace(/ Paket$/, " Paketi")} Shopier üzerinden satın al`}
                      >
                        <ShoppingBag size={18} aria-hidden="true" />
                        Hemen Satın Al
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary package-button package-buy-button"
                        disabled
                        aria-label={`${item.name} satışı yakında`}
                      >
                        <ShoppingBag size={18} aria-hidden="true" />
                        Satış yakında
                      </button>
                    )}
                    <span className="package-payment-note">Shopier üzerinden güvenli ödeme</span>
                    <a
                      href={whatsappUrl(item.message)}
                      className="btn package-button package-whatsapp-button"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppClick}
                      aria-label={`${item.name} hakkında WhatsApp'tan bilgi al`}
                    >
                      <FaWhatsapp size={18} aria-hidden="true" />
                      Sorularınız mı Var?
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
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
                const isLong = r.text.length > 210;
                return (
                  <div className="review-card" key={i}>
                    <div className="stars">★★★★★</div>
                    <p>{r.text}</p>
                    {isLong && (
                      <a
                        href="https://www.google.com/search?q=idil+h%C4%B1zl%C4%B1+okuma+yorumlar"
                        className="review-more"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Devamını oku →
                      </a>
                    )}
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
                <a
                  href={WHATSAPP_URL}
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                >
                  WhatsApp&apos;tan Yazın
                </a>
                <a href={`tel:${PHONE_NUMBER_E164}`} className="btn btn-ghost">
                  Telefonla Bilgi Al
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- CONTACT FORM ---------- */}
        <section className="contact-section" id="iletisim-formu">
          <div className="wrap">
            <div className="contact-card">
              <div className="contact-heading">
                <span className="contact-icon" aria-hidden="true">
                  <Headphones size={24} />
                </span>
                <h2 className="display">Size Ulaşalım</h2>
                <p>
                  Hızlı okuma eğitimi hakkında bilgi almak için bilgilerinizi bırakın.
                  <br />
                  En kısa sürede sizi arayalım.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
                <div className="contact-form-grid">
                  <div className="contact-field">
                    <label htmlFor="contact-full-name">Ad Soyad</label>
                    <input
                      id="contact-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={contactForm.fullName}
                      onChange={(event) => updateContactField("fullName", event.target.value)}
                      aria-invalid={Boolean(contactErrors.fullName)}
                      aria-describedby={contactErrors.fullName ? "contact-full-name-error" : undefined}
                      required
                    />
                    {contactErrors.fullName && (
                      <span className="contact-field-error" id="contact-full-name-error">
                        {contactErrors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-phone">Telefon Numarası</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="05xx xxx xx xx"
                      value={contactForm.phone}
                      onChange={(event) => updateContactField("phone", event.target.value)}
                      aria-invalid={Boolean(contactErrors.phone)}
                      aria-describedby={contactErrors.phone ? "contact-phone-error" : undefined}
                      required
                    />
                    {contactErrors.phone && (
                      <span className="contact-field-error" id="contact-phone-error">
                        {contactErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      E-posta <span>(isteğe bağlı)</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={contactForm.email}
                      onChange={(event) => updateContactField("email", event.target.value)}
                      aria-invalid={Boolean(contactErrors.email)}
                      aria-describedby={contactErrors.email ? "contact-email-error" : undefined}
                    />
                    {contactErrors.email && (
                      <span className="contact-field-error" id="contact-email-error">
                        {contactErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-grade">Öğrencinin Sınıfı</label>
                    <select
                      id="contact-grade"
                      name="studentGrade"
                      value={contactForm.studentGrade}
                      onChange={(event) => updateContactField("studentGrade", event.target.value)}
                      aria-invalid={Boolean(contactErrors.studentGrade)}
                      aria-describedby={contactErrors.studentGrade ? "contact-grade-error" : undefined}
                      required
                    >
                      <option value="">Seçiniz</option>
                      {gradeOptions.map((grade) => (
                        <option value={grade} key={grade}>
                          {grade}
                        </option>
                      ))}
                    </select>
                    {contactErrors.studentGrade && (
                      <span className="contact-field-error" id="contact-grade-error">
                        {contactErrors.studentGrade}
                      </span>
                    )}
                  </div>
                </div>

                <div className="contact-honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Web sitesi</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={contactForm.website}
                    onChange={(event) => updateContactField("website", event.target.value)}
                  />
                </div>

                <div className="contact-consent">
                  <label>
                    <input
                      name="consentAccepted"
                      type="checkbox"
                      checked={contactForm.consentAccepted}
                      onChange={(event) => updateContactField("consentAccepted", event.target.checked)}
                      aria-invalid={Boolean(contactErrors.consentAccepted)}
                      aria-required="true"
                      required
                    />
                    <span>
                      <a
                        href="/kvkk-aydinlatma-metni"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Kişisel verilerimin
                      </a>
                      , tarafımla iletişime geçilmesi amacıyla işlenmesini kabul ediyorum.
                    </span>
                  </label>
                  {contactErrors.consentAccepted && (
                    <span className="contact-field-error">{contactErrors.consentAccepted}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary contact-submit ${
                    contactStatus === "submitting" ? "is-submitting" : ""
                  }`}
                  disabled={contactStatus === "submitting" || !contactForm.consentAccepted}
                >
                  {contactStatus === "submitting" ? (
                    <>
                      <LoaderCircle className="contact-spinner" size={18} aria-hidden="true" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send size={18} aria-hidden="true" />
                      Bilgilerimi Gönder
                    </>
                  )}
                </button>

                <div className="contact-status" aria-live="polite">
                  {contactStatus === "success" && (
                    <p className="contact-success" role="status">
                      Bilgileriniz başarıyla gönderildi.
                      <br />
                      En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                  )}
                  {contactStatus === "error" && (
                    <p className="contact-error" role="alert">
                      Gönderim sırasında bir sorun oluştu.
                      <br />
                      Lütfen tekrar deneyiniz.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="faq" id="sss">
          <div className="wrap">
            <Reveal className="sec-head">
              <div className="sec-eyebrow">SSS</div>
              <h2 className="display">Sık Sorulan Sorular</h2>
              <p>
                Online hızlı okuma eğitimi, eğitim paketleri ve çalışma sistemi hakkında merak
                edilen soruların yanıtlarını inceleyin.
              </p>
            </Reveal>
            <Reveal className="faq-list">
              {faqData.map((item, i) => {
                const isOpen = openFaq === i;
                const questionId = `faq-question-${i + 1}`;
                const answerId = `faq-answer-${i + 1}`;
                return (
                  <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                    <button
                      id={questionId}
                      type="button"
                      className="faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span>{item.q}</span>
                      <span className="faq-plus" aria-hidden="true" />
                    </button>
                    <motion.div
                      id={answerId}
                      className="faq-a"
                      role="region"
                      aria-labelledby={questionId}
                      aria-hidden={!isOpen}
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 0.84, 0.44, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  </div>
                );
              })}
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
                <Link href="/blog">Blog</Link>
              </div>
              <div className="foot-col">
                <h4>İletişim</h4>
                <a
                  href={STUDENT_PANEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Öğrenci Girişi
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppClick}
                >
                  WhatsApp
                </a>
                <a href={`tel:${PHONE_NUMBER_E164}`}>{PHONE_NUMBER_DISPLAY}</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {year} İdil Hızlı Okuma. Tüm hakları saklıdır.</span>
          </div>
        </div>
      </footer>

      {/* ---------- FLOATING WHATSAPP ---------- */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackWhatsAppClick}
        aria-label="WhatsApp ile iletişim"
        animate={{ y: [0, -8, 0] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl fixed bottom-6 right-6 z-50"
      >
        <MessageCircle className="h-7 w-7" />
      </motion.a>
    </div>
  );
}
