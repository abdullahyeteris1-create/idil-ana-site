/**
 * Okuma hızı testinin içeriği.
 *
 * ÖNEMLİ: Metinler ve sorular taslaktır ve eğitmen onayından geçmelidir.
 * Kelime sayıları elle yazılmaz; okuma hızı hesabında metnin kendisinden
 * sayılır, böylece metin düzenlendiğinde ölçüm bozulmaz.
 */

export type TestQuestion = {
  question: string;
  options: string[];
  /** options dizisindeki doğru cevabın indeksi. */
  correctIndex: number;
};

export type TestPassage = {
  id: string;
  title: string;
  /** Bu metnin hangi sınıf seçimlerinde gösterileceği. */
  grades: string[];
  gradeLabel: string;
  paragraphs: string[];
  questions: TestQuestion[];
};

export const GRADE_OPTIONS = [
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

export const passages: TestPassage[] = [
  {
    id: "aricik",
    title: "Arıların Dansı",
    grades: ["1. Sınıf", "2. Sınıf"],
    gradeLabel: "İlkokul 1-2",
    paragraphs: [
      "Bir arı çiçek dolu bir bahçe bulduğunda bunu tek başına saklamaz. Hemen kovana döner ve arkadaşlarına haber verir. Ama arılar konuşamaz. Peki nasıl anlatır?",
      "Arı, kovanın içinde dans eder. Önce düz bir çizgide ilerler, sonra bir daire çizerek başladığı yere döner. Bu dansın yönü, çiçeklerin hangi tarafta olduğunu gösterir. Dansın süresi ise çiçeklerin ne kadar uzakta olduğunu anlatır.",
      "Diğer arılar bu dansı dikkatle izler. Sonra kovandan çıkıp tarif edilen yere doğru uçarlar. Böylece bütün kovan yeni bulunan çiçekleri öğrenmiş olur.",
      "Bilim insanları bu dansı uzun yıllar incelemiştir. Küçük bir böceğin bu kadar ayrıntılı bilgi verebilmesi hâlâ şaşırtıcı bulunur.",
    ],
    questions: [
      {
        question: "Arı, çiçek dolu bir bahçe bulunca ne yapar?",
        options: [
          "Yerinde kalır ve bekler",
          "Kovana dönüp arkadaşlarına haber verir",
          "Çiçekleri toplayıp saklar",
          "Başka bir bahçe aramaya gider",
        ],
        correctIndex: 1,
      },
      {
        question: "Arılar birbirlerine haberi nasıl iletir?",
        options: ["Konuşarak", "Ses çıkararak", "Dans ederek", "Resim çizerek"],
        correctIndex: 2,
      },
      {
        question: "Dansın yönü neyi gösterir?",
        options: [
          "Çiçeklerin hangi tarafta olduğunu",
          "Havanın nasıl olduğunu",
          "Kovanda kaç arı olduğunu",
          "Günün hangi saati olduğunu",
        ],
        correctIndex: 0,
      },
      {
        question: "Dansın süresi neyi anlatır?",
        options: [
          "Çiçeklerin rengini",
          "Çiçeklerin ne kadar uzakta olduğunu",
          "Arının yaşını",
          "Balın tadını",
        ],
        correctIndex: 1,
      },
      {
        question: "Metne göre bilim insanları bu dans hakkında ne düşünür?",
        options: [
          "Önemsiz bulurlar",
          "Hâlâ şaşırtıcı bulurlar",
          "Yanlış olduğunu düşünürler",
          "Hiç incelememişlerdir",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "kaplumbaga",
    title: "Deniz Kaplumbağalarının Yolculuğu",
    grades: ["3. Sınıf", "4. Sınıf"],
    gradeLabel: "İlkokul 3-4",
    paragraphs: [
      "Deniz kaplumbağaları hayatlarının büyük bölümünü suda geçirir. Ancak yumurtalarını bırakmak için karaya çıkmak zorundadırlar. Dişi kaplumbağa, yumurtalarını bırakacağı kumsalı rastgele seçmez: çoğu zaman kendi doğduğu sahile geri döner.",
      "Bu dönüş bazen binlerce kilometrelik bir yolculuk anlamına gelir. Kaplumbağanın elinde harita yoktur, pusula da kullanmaz. Bilim insanlarına göre kaplumbağalar Dünya'nın manyetik alanını algılayarak yön bulur. Doğdukları sahilin manyetik izini bir tür hafıza gibi taşırlar.",
      "Kumsala ulaşan dişi, arka ayaklarıyla derin bir çukur kazar ve yumurtalarını buraya bırakır. Sonra çukuru kumla örter ve denize geri döner. Yumurtaların üzerinde ne bir bekçi ne de bir yuva vardır.",
      "Yaklaşık iki ay sonra yavrular kabuklarını kırar. Hepsi aynı anda kumun yüzeyine çıkmaya çalışır, çünkü kalabalık hâlde hareket etmek onları avcılara karşı biraz olsun korur. Yavrular denizi genellikle ufuktaki açık ışıktan tanır ve o yöne doğru koşar.",
      "Bugün sahillerdeki yapay ışıklar bu yönelmeyi bozabiliyor. Bu yüzden birçok ülkede yuvalama mevsiminde kıyı ışıkları kısıtlanıyor. Küçük bir önlem, binlerce yavrunun denize ulaşmasını sağlıyor.",
    ],
    questions: [
      {
        question: "Dişi deniz kaplumbağası yumurtalarını nereye bırakır?",
        options: [
          "Denizin dibindeki kayalıklara",
          "Çoğu zaman kendi doğduğu sahile",
          "En yakın adaya",
          "Nehir kenarına",
        ],
        correctIndex: 1,
      },
      {
        question: "Kaplumbağalar yönlerini nasıl bulur?",
        options: [
          "Pusula kullanarak",
          "Yıldızları sayarak",
          "Dünya'nın manyetik alanını algılayarak",
          "Diğer kaplumbağaları takip ederek",
        ],
        correctIndex: 2,
      },
      {
        question: "Yumurtalar bırakıldıktan sonra ne olur?",
        options: [
          "Anne yuvanın başında bekler",
          "Anne kumla örtüp denize döner",
          "Yavrular hemen çıkar",
          "Yumurtalar başka bir yere taşınır",
        ],
        correctIndex: 1,
      },
      {
        question: "Yavrular neden aynı anda yüzeye çıkmaya çalışır?",
        options: [
          "Kum çok sıcak olduğu için",
          "Anneleri onları çağırdığı için",
          "Kalabalık hareket etmek avcılara karşı koruduğu için",
          "Yollarını daha kolay bulmak için",
        ],
        correctIndex: 2,
      },
      {
        question: "Metne göre sahillerdeki yapay ışıklar neden sorun oluşturur?",
        options: [
          "Yumurtaları ısıttığı için",
          "Yavruların denize yönelmesini bozduğu için",
          "Annelerin karaya çıkmasını engellediği için",
          "Kumsalı kararttığı için",
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "uyku",
    title: "Uyku ve Hafıza",
    grades: ["5. Sınıf", "6. Sınıf", "7. Sınıf", "8. Sınıf", "Diğer"],
    gradeLabel: "Ortaokul ve üzeri",
    paragraphs: [
      "Uzun süre uykunun yalnızca bir dinlenme hâli olduğu düşünülürdü. Bedenin yavaşladığı, zihnin ise kapandığı bir ara dönem. Son yıllarda yapılan çalışmalar bu tabloyu değiştirdi: uyku sırasında beyin sanıldığı gibi durmuyor, gün içinde toplanan bilgileri düzenliyor.",
      "Gün boyunca öğrenilenler önce geçici bir alanda tutulur. Bu alan sınırlıdır; her şeyi uzun süre saklayamaz. Uykunun derin evrelerinde beyin, bu geçici kayıtları tekrar tekrar çalıştırır ve önemli bulduklarını kalıcı bölgelere aktarır. Bir tür gece mesaisi gibi düşünülebilir: gün içinde masaya yığılan kâğıtların dosyalara yerleştirilmesi.",
      "Bu yüzden sınav öncesi bütün geceyi ayakta geçirmek çoğu zaman beklenen sonucu vermez. Öğrenci daha fazla saat çalışmış olur, ancak öğrendiklerini yerleştirecek süreyi kendinden almış olur. Aynı süreyi ikiye bölüp arada uyumanın, kesintisiz çalışmaktan daha iyi sonuç verdiği gözlenmiştir.",
      "Uykunun etkisi yalnızca ezberlenen bilgilerle sınırlı değildir. Bir problemi çözmeye çalışıp bırakan kişilerin, ertesi sabah çözüme daha kolay ulaştığı görülmüştür. Beyin, uyku sırasında birbirinden uzak görünen bilgiler arasında yeni bağlantılar kurar. Günlük dilde kullanılan \"bir gece düşüneyim\" ifadesinin arkasında ölçülebilir bir süreç vardır.",
      "Dikkat de aynı şekilde uykuya bağlıdır. Yetersiz uyuyan bir kişi okuduğu metnin satırlarını takip etmekte zorlanır, aynı cümleye birkaç kez döner ve okuduğunu anlamakta güçlük çeker. Okuma hızındaki düşüşün nedeni her zaman teknik eksikliği değildir; bazen yalnızca dinlenmemiş bir zihindir.",
      "Bu nedenle çalışma programı hazırlarken uyku, boş zaman değil programın bir parçası olarak görülmelidir. Düzenli saatlerde yatmak, yatmadan önce ekranlardan uzaklaşmak ve uyku süresini sabit tutmak, ek ders saatlerinden daha belirleyici olabilir.",
    ],
    questions: [
      {
        question: "Metne göre uyku sırasında beyin ne yapar?",
        options: [
          "Tamamen durur ve dinlenir",
          "Gün içinde toplanan bilgileri düzenler",
          "Yeni bilgiler öğrenir",
          "Yalnızca bedeni onarır",
        ],
        correctIndex: 1,
      },
      {
        question: "Geçici alanda tutulan bilgiler için ne söylenebilir?",
        options: [
          "Sınırsız süre saklanabilirler",
          "Asla kalıcı hâle gelmezler",
          "Alan sınırlıdır, her şey uzun süre saklanamaz",
          "Yalnızca uyanıkken oluşurlar",
        ],
        correctIndex: 2,
      },
      {
        question: "Sınav öncesi bütün geceyi ayakta geçirmek neden beklenen sonucu vermez?",
        options: [
          "Çalışma süresi kısaldığı için",
          "Öğrenilenleri yerleştirecek süre alındığı için",
          "Metinler zorlaştığı için",
          "Sabah sınavlar daha zor olduğu için",
        ],
        correctIndex: 1,
      },
      {
        question: "\"Bir gece düşüneyim\" ifadesi metinde neyle ilişkilendirilir?",
        options: [
          "Kararsızlıkla",
          "Beynin uykuda yeni bağlantılar kurmasıyla",
          "Zaman kazanma isteğiyle",
          "Yorgunlukla",
        ],
        correctIndex: 1,
      },
      {
        question: "Metne göre okuma hızındaki düşüşün nedeni ne olabilir?",
        options: [
          "Yalnızca teknik eksikliği",
          "Metnin uzunluğu",
          "Dinlenmemiş bir zihin",
          "Kelime dağarcığının genişliği",
        ],
        correctIndex: 2,
      },
    ],
  },
];

export function getPassageForGrade(grade: string): TestPassage {
  return passages.find((passage) => passage.grades.includes(grade)) ?? passages[passages.length - 1];
}

/** Okuma hızı hesabı metnin gerçek kelime sayısından yapılır. */
export function countWords(passage: TestPassage) {
  return passage.paragraphs.join(" ").trim().split(/\s+/).length;
}

/**
 * Ölçümün geçerli sayılacağı üst sınır. Bunun üzerindeki değerler metnin
 * okunmadığı (butona hemen basıldığı) anlamına gelir.
 */
export const MAX_PLAUSIBLE_WPM = 1200;
export const MIN_PLAUSIBLE_SECONDS = 5;
