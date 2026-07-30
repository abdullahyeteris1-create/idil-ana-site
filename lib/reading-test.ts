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
  "Lise-Yetişkin",
];

/**
 * Sınıf düzeyine göre beklenen okuma hızı aralıkları (kelime/dakika).
 * İdil Eğitim'in ölçüm deneyimine dayanır; evrensel bir norm tablosu
 * olarak sunulmaz. Sonuç ekranında kaynağı böyle belirtilir.
 */
export const GRADE_WPM_RANGES: Record<string, { min: number; max: number }> = {
  "1. Sınıf": { min: 30, max: 60 },
  "2. Sınıf": { min: 60, max: 80 },
  "3. Sınıf": { min: 80, max: 100 },
  "4. Sınıf": { min: 100, max: 120 },
  "5. Sınıf": { min: 120, max: 150 },
  "6. Sınıf": { min: 120, max: 150 },
  "7. Sınıf": { min: 150, max: 180 },
  "8. Sınıf": { min: 150, max: 180 },
  "Lise-Yetişkin": { min: 180, max: 230 },
};

export type RangeStatus = "altinda" | "icinde" | "uzerinde";

export function getWpmStatus(wpm: number, range: { min: number; max: number }): RangeStatus {
  if (wpm < range.min) return "altinda";
  if (wpm > range.max) return "uzerinde";
  return "icinde";
}

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
    id: "kagit",
    title: "Kâğıdın Yolculuğu",
    grades: ["5. Sınıf", "6. Sınıf"],
    gradeLabel: "Ortaokul 5-6",
    paragraphs: [
      "Bugün not almak, kitap basmak ya da bir mektup yazmak için kâğıt kullanmak son derece sıradan görünür. Oysa kâğıt, insanlık tarihinin büyük bölümünde yoktu. Yazı yaklaşık beş bin yıl önce ortaya çıktığında insanlar kil tabletlere, taşa, ağaç kabuğuna ve hayvan derisine yazıyordu.",
      "Bu malzemelerin hepsinin bir sorunu vardı. Kil tabletler ağırdı ve kolayca kırılırdı. Hayvan derisinden yapılan parşömen dayanıklıydı ama çok pahalıydı; tek bir kitap için onlarca hayvan gerekebiliyordu. Bu yüzden yazılı metinler uzun süre yalnızca zengin ailelerin, sarayların ve tapınakların elinde kaldı.",
      "Kâğıdın bugünkü biçimiyle Çin'de geliştirildiği kabul edilir. Kaynaklara göre MS 105 yılında Cai Lun adlı bir saray görevlisi, ağaç kabuğu, kenevir ve eski bez parçalarını suda dövüp lif hâline getirmiş, bu lifleri ince bir elek üzerinde yayarak kurutmuştur. Ortaya çıkan malzeme hem hafif hem ucuzdu.",
      "Çin bu yöntemi uzun süre gizli tuttu. Ancak sekizinci yüzyılda kâğıt yapımı Orta Asya'ya, oradan da Bağdat'a ulaştı. Bağdat'ta kurulan kâğıt atölyeleri, kütüphanelerin hızla büyümesini sağladı. Yüzyıllar sonra bu bilgi İspanya ve İtalya üzerinden Avrupa'ya geçti.",
      "Kâğıdın yayılması yalnızca bir malzeme değişimi değildi. Ucuz kâğıt olmasaydı matbaanın icadı da beklenen etkiyi yaratamazdı; basılacak sayfa pahalı kaldığı sürece kitap yine az sayıda insana ulaşırdı. Kâğıt ve matbaa bir araya geldiğinde bilgi, ilk kez geniş kitlelere yayılabilecek kadar ucuzladı.",
      "Bugün ekranlar kâğıdın yerini almaya başladı. Yine de not defterleri, sınav kâğıtları ve kitaplar hâlâ hayatımızda. Bir malzemenin bin dokuz yüz yıldır kullanılıyor olması, ne kadar iyi tasarlandığının bir göstergesi sayılabilir.",
    ],
    questions: [
      {
        question: "Metne göre parşömenin en büyük sorunu neydi?",
        options: [
          "Çok ağır olması",
          "Çok pahalı olması",
          "Kolayca yırtılması",
          "Üzerine yazı yazılamaması",
        ],
        correctIndex: 1,
      },
      {
        question: "Cai Lun'un yöntemi hangi malzemelere dayanıyordu?",
        options: [
          "Kil ve taş",
          "Hayvan derisi ve tutkal",
          "Ağaç kabuğu, kenevir ve eski bez parçaları",
          "Kum ve su",
        ],
        correctIndex: 2,
      },
      {
        question: "Kâğıt yapımı Çin'den sonra ilk olarak nereye ulaşmıştır?",
        options: ["Doğrudan Avrupa'ya", "Orta Asya'ya", "Mısır'a", "İngiltere'ye"],
        correctIndex: 1,
      },
      {
        question: "Metne göre matbaanın etkisi neden kâğıda bağlıdır?",
        options: [
          "Matbaa kâğıttan yapıldığı için",
          "Sayfa pahalı kaldıkça kitap yine az kişiye ulaşacağı için",
          "Matbaa yalnızca kâğıda basabildiği için",
          "Kâğıt matbaadan önce icat edildiği için",
        ],
        correctIndex: 1,
      },
      {
        question: "Yazarın son paragraftaki temel düşüncesi nedir?",
        options: [
          "Kâğıt artık tamamen gereksizdir",
          "Ekranlar kâğıttan her zaman üstündür",
          "Uzun süre kullanılıyor olması kâğıdın iyi tasarlandığını gösterir",
          "Kâğıt yakında tamamen ortadan kalkacaktır",
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "uyku",
    title: "Uyku ve Hafıza",
    grades: ["7. Sınıf", "8. Sınıf"],
    gradeLabel: "Ortaokul 7-8",
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
  {
    id: "harita",
    title: "Haritaların Sessiz Tercihleri",
    grades: ["Lise-Yetişkin"],
    gradeLabel: "Lise ve yetişkin",
    paragraphs: [
      "Bir dünya haritasına baktığımızda çoğunlukla onu tarafsız bir belge sayarız. Oysa her harita, çözülmesi imkânsız bir problemin verilmiş bir cevabıdır. Dünya kürebiçimlidir; kürenin yüzeyi ise yırtılmadan, gerilmeden düz bir yüzeye serilemez. Bu nedenle her düz harita, gerçeği bir yerinden bozmak zorundadır. Soru bozulup bozulmayacağı değil, nerede bozulacağıdır.",
      "En bilinen örnek, on altıncı yüzyılda Gerardus Mercator'ın hazırladığı projeksiyondur. Mercator'ın amacı estetik ya da eğitsel değildi; denizcilere hizmet etmek istiyordu. Onun haritasında sabit bir pusula yönü, harita üzerinde düz bir çizgi olarak görünür. Bir kaptan cetvelle iki liman arasına çizgi çeker ve o açıyı koruyarak yol alır. Denizcilik açısından bu, olağanüstü pratik bir çözümdü.",
      "Ancak bu kolaylığın bir bedeli vardı. Açıları korumak için Mercator, kutuplara yaklaştıkça alanları büyütmek zorunda kaldı. Sonuç, birçoğumuzun zihnine yerleşmiş çarpık bir dünya oldu: Grönland, haritada Afrika ile neredeyse aynı büyüklükte görünür. Gerçekte Afrika, Grönland'dan yaklaşık on dört kat büyüktür. Aynı şekilde Avrupa ve Kuzey Amerika olduklarından geniş, ekvatora yakın bölgeler ise olduklarından küçük görünür.",
      "Bu çarpıklık fark edildikçe alternatif projeksiyonlar önerildi. Bazıları alanları doğru gösterir, buna karşılık kıtaların biçimini uzatır. Bazıları biçimi korur, mesafeleri bozar. Hiçbiri diğerinden mutlak anlamda daha doğru değildir; her biri farklı bir şeyi öncelemiştir. Bir harita, hangi bilginin korunacağına dair verilmiş bir karardır ve bu karar çoğu zaman haritayı kullananın amacına bağlıdır.",
      "Buradaki asıl mesele teknik bir ayrıntıdan ibaret değildir. Yıllarca aynı haritaya bakan bir kişi, kıtaların göreli büyüklüğüne dair sezgisini o haritadan edinir. Bir bölgenin zihnimizde kapladığı yer, çoğu zaman onu ne kadar önemli saydığımızı da etkiler. Bu yüzden hangi projeksiyonun okul kitaplarında kullanılacağı, zaman zaman teknik olduğu kadar siyasi bir tartışma hâline gelmiştir.",
      "Harita örneği, daha genel bir duruma işaret eder. Karmaşık bir gerçekliği anlaşılır kılmak için sadeleştirme yaparız; sadeleştirme ise kaçınılmaz olarak bir şeyleri dışarıda bırakır. Grafikler, özetler, istatistikler ve modeller de aynı kuralla çalışır. Bunları kullanırken sorulması gereken soru \"doğru mu\" değil, çoğu zaman \"neyi önceliyor ve karşılığında neyi feda ediyor\" sorusudur.",
    ],
    questions: [
      {
        question: "Metne göre düz haritalar neden gerçeği bozmak zorundadır?",
        options: [
          "Ölçüm araçları yetersiz olduğu için",
          "Kürenin yüzeyi bozulmadan düzleme serilemediği için",
          "Haritacılar acele ettiği için",
          "Dünya sürekli değiştiği için",
        ],
        correctIndex: 1,
      },
      {
        question: "Mercator projeksiyonu hangi amaçla hazırlanmıştır?",
        options: [
          "Okullarda kullanılmak için",
          "Kıtaların büyüklüğünü doğru göstermek için",
          "Denizcilerin sabit pusula yönüyle yol almasını kolaylaştırmak için",
          "Nüfus dağılımını göstermek için",
        ],
        correctIndex: 2,
      },
      {
        question: "Grönland ile Afrika örneği neyi göstermek için verilmiştir?",
        options: [
          "Kutupların keşfedilmemiş olduğunu",
          "Açıları korumanın alanları çarpıtmasını",
          "Afrika'nın haritalarda gösterilmediğini",
          "Mercator'ın hesap hatası yaptığını",
        ],
        correctIndex: 1,
      },
      {
        question: "Alternatif projeksiyonlar hakkında metinde ne söylenir?",
        options: [
          "Hepsi Mercator'dan daha doğrudur",
          "Hiçbiri kullanılmamaktadır",
          "Her biri farklı bir şeyi önceler, mutlak üstünlük yoktur",
          "Yalnızca alanları korurlar",
        ],
        correctIndex: 2,
      },
      {
        question: "Yazarın son paragraftaki temel çıkarımı nedir?",
        options: [
          "Sadeleştirmelerin neyi önceleyip neyi feda ettiği sorulmalıdır",
          "Grafik ve istatistiklerden kaçınılmalıdır",
          "Haritalar artık kullanılmamalıdır",
          "Karmaşık gerçeklik hiçbir zaman anlaşılamaz",
        ],
        correctIndex: 0,
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
