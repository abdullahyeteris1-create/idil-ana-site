export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  category: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  content: BlogContentBlock[];
  featured?: boolean;
  keywords?: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cocugum-neden-yavas-okuyor",
    title: "Çocuğum Neden Yavaş Okuyor? Nedenleri ve Destekleyici Öneriler",
    excerpt:
      "Yavaş okumanın farklı nedenlerini tanıyın; çocuğunuzu baskı altında bırakmadan akıcılığı, dikkati ve anlamayı nasıl destekleyebileceğinizi öğrenin.",
    description:
      "Çocuğunuz yavaş mı okuyor? Yavaş okumanın olası nedenlerini ve okuma hızını, dikkatini ve anlama becerisini destekleyecek önerileri inceleyin.",
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-18",
    author: "İdil Eğitim",
    category: "Okuma Becerileri",
    readingTime: "8 dakika",
    image: "/blog/cocugum-neden-yavas-okuyor.jpg",
    imageAlt: "Evde annesiyle birlikte kitap okuma çalışması yapan bir öğrenci",
    featured: true,
    keywords: [
      "çocuğum yavaş okuyor",
      "yavaş okuma nedenleri",
      "okuma hızı",
      "heceleyerek okuma",
      "çocuklarda okuma",
    ],
    content: [
      {
        type: "paragraph",
        text: "Bir çocuğun arkadaşlarından daha yavaş okuduğunu fark etmek aileleri kaygılandırabilir. Ancak okuma hızı tek başına değerlendirilmesi gereken bir başarı ölçüsü değildir. Yaş, sınıf düzeyi, metnin güçlüğü, kelime bilgisi, dikkat durumu ve okuma deneyimi hızı doğrudan etkiler. Önemli olan çocuğu başka öğrencilerle yarıştırmak değil; kendi başlangıç düzeyini, zaman içindeki ilerlemesini ve okuduğunu ne kadar anladığını birlikte gözlemlemektir. Yavaşlığın hangi aşamada ortaya çıktığını fark etmek, rastgele daha çok metin okutmak yerine doğru desteği seçmeyi kolaylaştırır.",
      },
      { type: "heading", text: "Yavaş okuma her zaman bir sorun mudur?" },
      {
        type: "paragraph",
        text: "Okumayı yeni öğrenen bir öğrencinin harfleri birleştirirken duraklaması, uzun kelimelerde yavaşlaması ve zaman zaman başa dönmesi beklenebilir. Yeni bir konu, yabancı kelimeler içeren bir metin ya da küçük puntolu bir sayfa da deneyimli okuyucuyu bile yavaşlatır. Çocuk metni sakin biçimde tamamlıyor, temel düşünceyi anlatabiliyor ve düzenli pratikle ilerliyorsa yalnızca hız değerine bakarak olumsuz bir sonuç çıkarmak doğru değildir. Buna karşılık yavaşlık uzun süre değişmiyor, çocuk okumaktan kaçınıyor veya okuduklarını aktarmakta belirgin güçlük yaşıyorsa süreci daha yakından incelemek yararlı olur.",
      },
      { type: "heading", text: "Kelime tanıma hızının etkisi" },
      {
        type: "paragraph",
        text: "Akıcı okuyucular sık karşılaştıkları kelimeleri harf harf çözmek yerine bir bütün olarak tanır. Kelime tanıma henüz otomatikleşmediğinde zihinsel enerjinin büyük bölümü sesleri birleştirmeye gider; anlam kurmak için daha az kapasite kalır. Aynı yaşta iki çocuk arasındaki hız farkının nedeni bazen yalnızca karşılaştıkları metin ve kelime çeşitliliğidir. Sık kullanılan kelimeleri kısa kartlarla çalışmak, kelimeyi cümle içinde görmek ve aynı düzeye uygun metni birkaç gün arayla tekrar okumak tanımayı güçlendirebilir. Buradaki amaç ezber yarışına girmek değil, kelime ile anlam arasında daha hızlı ve güvenli bir bağ kurmaktır.",
      },
      { type: "heading", text: "Heceleyerek okuma" },
      {
        type: "paragraph",
        text: "Heceleme, okuma öğrenilirken gerekli bir basamaktır; fakat uzun süre her kelimede devam ettiğinde akıcılığı bölebilir. Çocuk kelimenin ilk hecesini okuduktan sonra önceki parçayı unutabilir ve cümlenin anlamını toparlamakta zorlanabilir. Kısa, bilinen kelimelerden başlayarak kelime gruplarını birlikte okumak yararlıdır: “küçük kedi”, “bahçeye çıktı” gibi anlamlı parçalar gözün tek tek hecelerden daha geniş bir alana yönelmesini sağlar. Yetişkinin önce doğal bir örnek okuma yapması, ardından çocuğun aynı cümleyi kendi temposunda tekrar etmesi de akıcılığa destek olur.",
      },
      { type: "heading", text: "Satır kaybetme ve geri dönüşler" },
      {
        type: "paragraph",
        text: "Bazı öğrenciler satır sonunda bir alt satıra geçerken yerini kaybeder, aynı kelimeyi yeniden okur veya anlamadığını düşünerek sık sık geriye döner. Bu durum metnin düzeni, dikkatin dağılması, gözün satır üzerindeki hareketi ya da acele etme baskısıyla ilişkili olabilir. Parmak, boş bir kart veya ince bir okuma şeridiyle satır takibi başlangıçta işe yarayabilir. Metni daha büyük puntoyla sunmak, sayfadaki görsel kalabalığı azaltmak ve kısa bölümler seçmek de çocuğun takibini kolaylaştırır. Yardımcı araçlar kalıcı bir zorunluluk hâline getirilmeden, ihtiyaç azaldıkça aşamalı biçimde bırakılmalıdır.",
      },
      { type: "heading", text: "Dikkat ve odaklanma" },
      {
        type: "paragraph",
        text: "Okuma, gözlerin metin üzerinde ilerlemesinden daha fazlasıdır; çocuk bilgiyi seçer, önceki cümleyle bağ kurar ve anlamı zihninde tutar. Gürültülü bir ortam, yaklaşan başka bir görev, yorgunluk veya uzun çalışma süresi bu süreci bölebilir. On dakikalık odaklı bir çalışma, isteksizce sürdürülen kırk dakikadan daha verimli olabilir. Okuma öncesinde hedefi açıkça söylemek, bildirimleri kapatmak ve masada yalnızca gerekli malzemeleri bulundurmak dikkati destekler. Çocuğun hangi saatlerde daha dinç olduğunu gözlemlemek de çalışma zamanını daha gerçekçi planlamaya yardımcı olur.",
      },
      { type: "heading", text: "Okuma alışkanlığının etkisi" },
      {
        type: "paragraph",
        text: "Düzenli okuma, kelime dağarcığını ve cümle yapılarına aşinalığı artırır. Fakat çocuğun düzeyinin çok üzerinde kitaplar seçmek, her sayfada ölçüm yapmak veya okumayı ceza gibi sunmak alışkanlık geliştirmez. İlgi alanına uygun çizgi romanlar, bilgi kitapları, kısa öyküler ve çocuk dergileri de değerli okuma materyalleridir. Ailece sessiz okuma zamanı oluşturmak ve yetişkinlerin de kitap okuduğunu görünür kılmak güçlü bir model sunar. Süreyi küçük tutup düzenli tekrar etmek, bir günde uzun bir çalışma yapıp ardından günlerce ara vermekten genellikle daha sürdürülebilirdir.",
      },
      { type: "heading", text: "Evde uygulanabilecek destekleyici çalışmalar" },
      {
        type: "list",
        items: [
          "Çocuğun seviyesine uygun kısa bir metni önce sessiz, sonra sesli okutun; sonunda tek bir ana fikir sorusu sorun.",
          "Bir dakikalık hız yarışları yerine, aynı metni farklı günlerde daha akıcı ve anlamlı okumaya odaklanın.",
          "Noktalama işaretlerinde durma, ses tonunu ayarlama ve kelime gruplarını birlikte görme çalışmaları yapın.",
          "Zorlanan kelimeleri ayrı bir deftere yazıp anlamı ve örnek cümlesiyle birlikte yeniden ele alın.",
          "İlerlemeyi yalnızca kelime sayısıyla değil; daha az duraklama, doğru vurgu ve daha iyi anlatımla da fark edin.",
        ],
      },
      {
        type: "callout",
        title: "Küçük ve düzenli adımlar",
        text: "Çalışmayı çocuk yorulmadan bitirmek, ertesi gün yeniden başlama isteğini korur. Günlük 10–15 dakikalık planlar çoğu aile için uygulanabilir bir başlangıçtır.",
      },
      { type: "heading", text: "Ne zaman uzman desteği düşünülmeli?" },
      {
        type: "paragraph",
        text: "Çocuk uzun süredir harf veya heceleri karıştırıyor, okuma sırasında yoğun kaygı yaşıyor, baş ya da göz ağrısından söz ediyor, metni takip etmekte sürekli zorlanıyor veya düzenli desteğe rağmen ilerleme görülmüyorsa sınıf öğretmeniyle görüşmek iyi bir ilk adımdır. Öğretmenin sınıf içi gözlemleri, sorunun yalnızca okumada mı yoksa farklı görevlerde de mi görüldüğünü anlamaya yardım eder. Gerektiğinde rehberlik servisi, çocuk gelişimi alanındaki uzmanlar veya göz ve işitme değerlendirmesi yapabilecek sağlık profesyonelleri uygun yönlendirmeyi sağlar. Amaç etiket koymak değil, çocuğun ihtiyacını zamanında anlamaktır.",
      },
      { type: "heading", text: "Sonuç" },
      {
        type: "paragraph",
        text: "Yavaş okuma; kelime tanıma, heceleme alışkanlığı, satır takibi, dikkat, metin düzeyi ve okuma deneyimi gibi birçok etkenden kaynaklanabilir. Bu nedenle tek bir egzersiz ya da yalnızca daha hızlı okuma talebi her çocuk için doğru çözüm değildir. Baskıyı azaltan, anlamayı merkeze alan ve düzenli ilerlemeyi görünür kılan çalışmalar daha sağlıklı bir yol sunar. Çocuğun güçlü olduğu alanları fark etmek, uygun metin seçmek ve gerektiğinde uzman görüşü almak; hızın yanında özgüveni ve okuma isteğini de korumaya yardımcı olur.",
      },
    ],
  },
  {
    slug: "okudugunu-anlama-nasil-gelistirilir",
    title: "Okuduğunu Anlama Nasıl Geliştirilir? Öğrenciler İçin 10 Etkili Yöntem",
    excerpt:
      "Metni yalnızca bitirmek yerine anlamlandırmayı kolaylaştıran, öğrencilerin günlük çalışmalarında uygulayabileceği 10 etkili yöntemi keşfedin.",
    description:
      "Öğrencilerin okuduğunu anlama becerisini geliştirmek için uygulanabilecek 10 etkili yöntemi ve günlük çalışma önerilerini keşfedin.",
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-19",
    author: "İdil Eğitim",
    category: "Okuduğunu Anlama",
    readingTime: "9 dakika",
    image: "/blog/okudugunu-anlama-nasil-gelistirilir.jpg",
    imageAlt: "Kitap okurken not alarak okuduğunu anlama çalışması yapan bir öğrenci",
    keywords: [
      "okuduğunu anlama",
      "okuduğunu anlama yöntemleri",
      "ana fikir bulma",
      "öğrenciler için okuma",
      "verimli çalışma",
    ],
    content: [
      {
        type: "paragraph",
        text: "Okuduğunu anlama, kelimeleri doğru seslendirmekten öte bir beceridir. Öğrenci metindeki bilgileri seçer, önceki bilgileriyle ilişkilendirir, çıkarım yapar ve okuma amacına göre önemli noktaları hatırlar. Bu süreç tek bir teknikle bir anda değişmez; farklı metin türleri üzerinde düzenli ve bilinçli pratik gerektirir. Aşağıdaki yöntemler ders kitabı, hikâye, paragraf sorusu veya bilgi metni üzerinde uygulanabilir. Hepsini aynı gün kullanmak yerine öğrencinin ihtiyacına uygun bir ya da iki yöntem seçmek, alışkanlık oluştukça yenilerini eklemek daha verimli olur.",
      },
      { type: "heading", text: "1. Okuma öncesinde metni incelemek" },
      {
        type: "paragraph",
        text: "Başlık, alt başlık, görseller, koyu yazılmış kelimeler ve paragraf uzunlukları metnin haritasını verir. Öğrenci okumaya başlamadan önce otuz saniye boyunca bu ipuçlarını incelerse hangi konuyla karşılaşacağını tahmin eder ve zihninde bir çerçeve kurar. Örneğin başlık “Suyun Yolculuğu” ise buharlaşma, bulut ve yağmur gibi kavramların geçebileceğini düşünebilir. Ön inceleme cevapları baştan bilmek değildir; yeni bilgilerin yerleşeceği boşlukları hazırlamaktır. Özellikle uzun ders metinlerinde bu kısa adım, sayfanın göz korkutucu görünmesini azaltabilir.",
      },
      { type: "heading", text: "2. Okuma amacını belirlemek" },
      {
        type: "paragraph",
        text: "Bir öyküyü keyif için okumakla, sınav öncesi neden-sonuç ilişkilerini bulmak için okumak aynı değildir. Öğrenci “Bu metinden ne öğrenmem gerekiyor?” sorusuna kısa bir cevap verdiğinde dikkatini önemli bilgilere yöneltir. Amaç; ana fikri bulmak, karakterin değişimini izlemek, bir işlemin basamaklarını öğrenmek veya belirli bir soruya cevap aramak olabilir. Yetişkinler “Dikkatli oku” gibi belirsiz bir uyarı yerine “Okurken kahramanın kararını değiştiren olayı bul” diyerek daha somut bir hedef verebilir.",
      },
      { type: "heading", text: "3. Bilinmeyen kelimeleri öğrenmek" },
      {
        type: "paragraph",
        text: "Metindeki birkaç anahtar kelimenin anlamı bilinmediğinde cümleler doğru okunsa bile bütünlük kurulamayabilir. Her bilinmeyen kelimede hemen sözlüğe gitmek akışı keser; önce cümlenin verdiği ipuçlarından anlam tahmin edilmelidir. Ardından sözlükle kontrol edilip kelime yeni bir cümlede kullanılabilir. Öğrenci kendi “yeni kelimeler” listesini tutabilir, fakat listeyi çok büyütmemek önemlidir. Bir metinden üç ya da dört işlevsel kelime seçmek ve bunları hafta içinde yeniden kullanmak, uzun bir listeyi ezberlemekten daha kalıcı olabilir.",
      },
      { type: "heading", text: "4. Ana fikri bulmak" },
      {
        type: "paragraph",
        text: "Ana fikir, metindeki bütün ayrıntıların birleştiği temel mesajdır. Öğrenciler bazen ilginç bir ayrıntıyı ana fikir sanabilir. Bunu ayırmak için “Yazar bu metni tek cümleyle neden yazdı?” ve “Hangi düşünce paragrafların çoğunu kapsıyor?” soruları kullanılabilir. Önce her paragrafın konusunu iki ya da üç kelimeyle not etmek, sonra tekrar eden yönü bulmak işi kolaylaştırır. Ana fikir metinde aynen yazılmayabilir; bu durumda başlık, giriş, sonuç ve tekrar edilen kavramlardan hareketle bir cümle kurulmalıdır.",
      },
      { type: "heading", text: "5. Paragraf özetlemek" },
      {
        type: "paragraph",
        text: "Özetleme, öğrenciyi metni kopyalamaktan çıkarıp bilgiyi yeniden düzenlemeye yönlendirir. Her paragraftan sonra “Kim veya ne hakkında?”, “En önemli olay ya da bilgi ne?” sorularına cevap veren tek bir cümle yazılabilir. Özet, ayrıntıların tamamını içermek zorunda değildir; ana düşünceyi ve onu anlamak için gerekli bir iki bilgiyi taşımalıdır. Başlangıçta öğrencinin üç cümlelik bir paragrafı tek cümleye indirmesi istenebilir. Zamanla birkaç paragrafın özetleri birleştirilerek metnin tamamına ait kısa bir anlatım oluşturulur.",
      },
      { type: "heading", text: "6. Soru sormak" },
      {
        type: "paragraph",
        text: "Anlayan okuyucu metinle sessiz bir konuşma yürütür. “Bu olay neden oldu?”, “Yazar hangi kanıtı veriyor?”, “Karakter başka ne yapabilirdi?” gibi sorular bilgiyi etkin biçimde işlemeyi sağlar. Öğrenci yalnızca yetişkinin sorularını cevapladığında pasif kalabilir; bu yüzden metinle ilgili kendi sorularını üretmesi teşvik edilmelidir. Önce kim, ne, nerede gibi bilgi soruları; ardından neden, nasıl ve sence ile başlayan yorum soruları kullanılabilir. Sorunun cevabını metinde gösterme alışkanlığı, tahmin ile kanıtı ayırmayı öğretir.",
      },
      { type: "heading", text: "7. Tahmin yürütmek" },
      {
        type: "paragraph",
        text: "Başlık ve ilk paragraftan sonra metnin nasıl devam edeceğini tahmin etmek merakı ve dikkati artırır. Önemli olan tahminin doğru çıkması değil, eldeki ipuçlarına dayanmasıdır. Öğrenci “Bence böyle olacak, çünkü…” kalıbıyla gerekçesini söyler. Okuma ilerledikçe tahminini koruyabilir veya yeni bilgiye göre değiştirebilir. Bu esneklik, anlamanın sabit bir cevap bulmak değil, bilgiyi sürekli güncellemek olduğunu gösterir. Bilgi metinlerinde de bir sonraki alt başlıkta hangi açıklamanın gelebileceği tahmin edilebilir.",
      },
      { type: "heading", text: "8. Not almak" },
      {
        type: "paragraph",
        text: "Not almak, metnin her satırını yeniden yazmak değildir. Anahtar kelimeler, kısa oklar, neden-sonuç bağlantıları ve küçük tablolar öğrencinin düşünmesini görünür hâle getirir. Kenara soru işareti koymak anlaşılmayan yeri, ünlem işareti önemli bilgiyi, yıldız ise yeniden bakılacak bölümü gösterebilir. Renk kullanımında ölçülü olmak gerekir; her cümleyi fosforlamak hiçbir bilgiyi öne çıkarmaz. Ders çalışırken bir sayfalık metni beş-altı anahtar ifadeyle temsil edebilmek, sınav öncesi tekrarı da kolaylaştırır.",
      },
      { type: "heading", text: "9. Düzenli kitap okumak" },
      {
        type: "paragraph",
        text: "Farklı türlerde düzenli okuma yapan öğrenciler daha çok kelime, anlatım biçimi ve bilgi yapısıyla karşılaşır. Bu deneyim yeni metinleri anlamak için zengin bir ön bilgi oluşturur. Kitap seçerken yalnızca yaş etiketi değil, öğrencinin ilgi alanı ve mevcut okuma düzeyi de dikkate alınmalıdır. Çocuk seçime katılırsa okuma sorumluluğunu daha kolay benimser. Günlük süre kısa olabilir; asıl önemli olan sürdürülebilirliktir. Okuma sonrasında her gün test yapmak yerine bazen sevilen bir bölümü konuşmak, bir karakteri çizmek veya ilginç bir bilgiyi paylaşmak yeterlidir.",
      },
      { type: "heading", text: "10. Hız ve anlama dengesini kurmak" },
      {
        type: "paragraph",
        text: "Çok yavaş okuma düşünce bütünlüğünü bozabilir, gereğinden hızlı okuma ise önemli ayrıntıların kaçmasına yol açabilir. Uygun hız, metnin türüne ve amaca göre değişir. Bir şiir, deney yönergesi ve macera öyküsü aynı tempoda okunmaz. Öğrenci kolay bölümlerde akışını artırmayı, yoğun bilgi içeren yerde yavaşlayıp yeniden okumayı öğrenmelidir. Hız çalışmasından sonra kısa bir özet veya birkaç anlama sorusu kullanmak dengeyi kontrol eder. Hedef yalnızca dakikadaki kelime sayısını yükseltmek değil, zamanı verimli kullanırken anlamı korumaktır.",
      },
      {
        type: "callout",
        title: "Günlük uygulama önerisi",
        text: "15 dakikalık bir çalışmada iki dakika ön inceleme, sekiz dakika okuma, üç dakika özet ve iki dakika soru-cevap kullanılabilir. Süreler öğrencinin yaşına ve metne göre esnetilmelidir.",
      },
      { type: "heading", text: "Sonuç" },
      {
        type: "paragraph",
        text: "Okuduğunu anlama; ön inceleme, amaç belirleme, kelime çalışması, ana fikir, özet, soru, tahmin ve not alma gibi birbirini tamamlayan alışkanlıklarla gelişir. Düzenli kitap okuma bu yöntemlerin çalışacağı geniş bir deneyim alanı sunarken, hız-anlama dengesi öğrencinin farklı metinlere uyum sağlamasına yardımcı olur. İlerlemeyi değerlendirirken yalnızca doğru cevap sayısına değil; öğrencinin düşüncesini açıklamasına, metinden kanıt göstermesine ve kendi sorularını üretmesine de bakılmalıdır. Küçük ama tutarlı çalışmalar, anlamayı günlük öğrenmenin doğal bir parçası hâline getirir.",
      },
    ],
  },
  {
    slug: "cocuklarda-dikkat-ve-odaklanma",
    title: "Çocuklarda Dikkat ve Odaklanma Nasıl Geliştirilir?",
    excerpt:
      "Çalışma ortamından ekran düzenine, kısa molalardan okuma egzersizlerine kadar dikkat ve odaklanmayı destekleyen uygulanabilir öneriler.",
    description:
      "Çocuklarda dikkat ve odaklanmayı desteklemek için çalışma ortamı, süre yönetimi, uyku, ekran kullanımı ve günlük egzersiz önerilerini inceleyin.",
    publishedAt: "2026-07-19",
    author: "İdil Eğitim",
    category: "Dikkat ve Odaklanma",
    readingTime: "8 dakika",
    image: "/blog/cocuklarda-dikkat-ve-odaklanma.jpg",
    imageAlt: "Düzenli çalışma masasında zamanlayıcıyla dikkat egzersizi yapan bir öğrenci",
    keywords: [
      "çocuklarda dikkat",
      "odaklanma nasıl geliştirilir",
      "dikkat egzersizleri",
      "çalışma ortamı",
      "ekran süresi",
    ],
    content: [
      {
        type: "paragraph",
        text: "Çocuğun ödev başında sık sık kalkması, küçük seslere yönelmesi veya başladığı işi tamamlamakta zorlanması ailelerin en çok konuştuğu konulardandır. Dikkat yalnızca çocuğun “istemesine” bağlı değildir; görevin güçlüğü, ortam, uyku, açlık, hareket ihtiyacı, kaygı ve yaşa uygun beklentiler performansı etkiler. Amaç çocuğu uzun süre hiç kıpırdamadan oturtmak değil, belirli bir süre boyunca uygun göreve dönmesini ve işi adım adım sürdürmesini desteklemektir. Günlük yaşamda yapılacak küçük düzenlemeler bu becerinin gelişmesi için daha öngörülebilir bir zemin oluşturabilir.",
      },
      { type: "heading", text: "Dikkat ve odaklanma arasındaki fark" },
      {
        type: "paragraph",
        text: "Dikkat, çevredeki birçok uyaran arasından gerekli olanı seçme becerisidir. Odaklanma ise seçilen görev üzerinde zihinsel çabayı bir süre devam ettirmeyi anlatır. Çocuk öğretmenin yönergesini fark ederek dikkatini doğru yere yöneltebilir; fakat zor bir soruda çabasını sürdürmekte güçlük çekebilir. Ya da uzun süre sevdiği bir oyunla ilgilenirken ödeve geçişte zorlanabilir. Bu durum “hiç dikkati yok” anlamına gelmez. Hangi görevde, günün hangi saatinde ve ne kadar süre sonra kopma yaşandığını gözlemek, genel etiketlerden daha kullanışlı bilgi verir.",
      },
      { type: "heading", text: "Uygun çalışma ortamı" },
      {
        type: "paragraph",
        text: "Çalışma alanının kusursuz veya tamamen sessiz olması gerekmez; ancak gereksiz uyaranlar azaltılmalıdır. Masada o an kullanılmayacak oyuncaklar, açık ekranlar ve çok sayıda materyal bulunmaması işe yarar. Işığın yeterli, sandalyenin rahat ve çalışma malzemelerinin ulaşılabilir olması sık bölünmeleri azaltır. Bazı çocuklar hafif ev sesleriyle çalışabilirken bazıları sessizliğe ihtiyaç duyar. Aile, tek bir doğru ortam varsaymak yerine birkaç düzeni deneyip çocuğun görev tamamlama süresini ve rahatlığını gözlemleyebilir. Çalışma köşesinin mümkün olduğunca aynı kalması, başlama sinyali oluşturur.",
      },
      { type: "heading", text: "Kısa ve düzenli çalışma süreleri" },
      {
        type: "paragraph",
        text: "Yaşa ve alışkanlığa uymayan uzun çalışma hedefleri, daha başlamadan direnç yaratabilir. Çalışmayı 10–20 dakikalık bölümlere ayırmak ve araya kısa hareket molaları koymak daha ulaşılabilir bir plan sunar. Başlangıçta zamanlayıcı kullanılabilir; fakat süre dolana kadar masada oturmak tek hedef olmamalıdır. Çocuk o bölüm için belirlenen küçük işi tamamlamayı bilmelidir: iki paragraf okumak, beş soru çözmek veya bir başlığı özetlemek gibi. Düzen oturdukça çalışma süresi birkaç dakika artırılabilir. Her gün benzer saatte başlamak karar verme yükünü de azaltır.",
      },
      { type: "heading", text: "Tek görev yaklaşımı" },
      {
        type: "paragraph",
        text: "Aynı anda ders videosu izlemek, mesajlara bakmak, müzik değiştirmek ve not çıkarmak zihnin sürekli görev değiştirmesine neden olur. Bu geçişler özellikle çocuklarda süreyi uzatabilir ve hataları artırabilir. Tek görev yaklaşımında masada yalnızca mevcut iş bulunur; diğer ödevler görünür ama ayrı bir listede bekler. Büyük görevler “metni oku, önemli kelimeleri işaretle, üç cümleyle özetle” gibi sıralı adımlara ayrılabilir. Çocuk tamamladığı adımı işaretlediğinde hem ne yapacağını bilir hem de ilerlemeyi görür. Sıradaki adım ancak önceki tamamlanınca açılır.",
      },
      { type: "heading", text: "Uyku ve günlük düzen" },
      {
        type: "paragraph",
        text: "Yetersiz veya düzensiz uyku, ertesi gün uyanıklığı, tepki hızını ve duyguları düzenlemeyi etkileyebilir. Her ailenin programı farklı olsa da benzer saatlerde yatmak ve kalkmak, uyku öncesi sakin bir rutin oluşturmak faydalıdır. Ağır bir günün sonunda çocuktan en zor ödevi yapmasını beklemek yerine daha dinç olduğu zamanları kullanmak gerekebilir. Su içme, düzenli öğünler ve okul sonrası kısa dinlenme de çalışma hazırlığının parçasıdır. Dikkat güçlüğünü yalnızca masa başında çözmeye çalışmak yerine günün bütün ritmine bakmak daha gerçekçi sonuçlar verir.",
      },
      { type: "heading", text: "Ekran kullanımının düzenlenmesi" },
      {
        type: "paragraph",
        text: "Ekranlar tek başına bütün dikkat sorunlarının nedeni değildir; fakat hızlı geçişler, bildirimler ve sınırı belirsiz kullanım ödeve başlamayı zorlaştırabilir. Ailece anlaşılmış zaman ve mekân kuralları çatışmayı azaltır. Ders için kullanılan cihazda gereksiz sekmeleri kapatmak, telefonu çalışma alanı dışında bırakmak ve mola sırasında kısa video akışına yönelmemek geçişi kolaylaştırır. Yetişkinlerin de ortak zamanlarda telefonlarını kenara koyması güçlü bir örnektir. Kurallar ceza anında değişmemeli; önceden konuşulmalı, yaşa uygun olmalı ve uyku, hareket, ders ile sosyal zamanı dengeleyecek biçimde uygulanmalıdır.",
      },
      { type: "heading", text: "Hareket ve molalar" },
      {
        type: "paragraph",
        text: "Çocukların hareket ihtiyacı bir engel gibi görülmemelidir. Kısa bir yürüyüş, esneme, su alma veya birkaç kontrollü hareketten oluşan mola bedensel gerginliği azaltabilir. Molanın süresi ve dönüş zamanı baştan belirlenmezse çalışma tamamen bitebilir; bu yüzden beş dakikalık zamanlayıcı ve net bir dönüş görevi yararlıdır. Molada yeni ve çekici bir etkinliğe başlamak yerine bedeni hareket ettiren basit seçenekler tercih edilebilir. Bazı çocuklar ayakta okuyarak, stres topu kullanarak veya sandalyede kısa pozisyon değişiklikleri yaparak daha rahat çalışır. Uygun seçenek gözlemle belirlenmelidir.",
      },
      { type: "heading", text: "Dikkat egzersizleri" },
      {
        type: "paragraph",
        text: "Dikkat çalışmaları kısa, ölçülü ve oyun niteliğinde olabilir. Benzer şekiller arasındaki farkı bulma, belirli bir harfi tarama, yönerge sırasını hatırlama, ritim tekrar etme veya bir görsele kısa süre bakıp ayrıntıları anlatma gibi etkinlikler seçici dikkati destekler. Zorluk, çocuk sürekli hata yapacak kadar yüksek olmamalıdır. Kolay düzeyde başarı sağlandıktan sonra süre, uyaran sayısı veya yönerge basamakları azar azar artırılır. Egzersizde kazanılan becerinin ödeve aktarılması için “Şimdi sayfadaki anahtar kelimeleri aynı dikkatle bulalım” gibi açık bağlantılar kurulmalıdır.",
      },
      {
        type: "list",
        items: [
          "Bir dakika boyunca odadaki belirli renkte nesneleri bulma",
          "Kısa bir yönerge dizisini aynı sırayla uygulama",
          "Karışık harfler içinde hedef harfi işaretleme",
          "Bir görsele bakıp kapattıktan sonra beş ayrıntı söyleme",
          "Okunan kısa öyküde önceden belirlenen kelimeyi duyunca işaret verme",
        ],
      },
      { type: "heading", text: "Okuma çalışmalarında odaklanma" },
      {
        type: "paragraph",
        text: "Uzun bir sayfayı tek parça hâlinde vermek yerine metni paragraflara bölmek, her bölüm için küçük bir amaç belirlemek odağı koruyabilir. Okuma öncesinde başlığa bakmak, ardından “Bu paragrafta nedenini bulacağız” demek dikkati hedefe yöneltir. Parmak veya okuma şeridi satır takibine geçici destek sağlayabilir. Her paragraf sonunda tek cümlelik özet istemek, çocuğun zihinsel olarak metinde kalıp kalmadığını gösterir. Okuma hızı artırılmak isteniyorsa anlama soruları korunmalıdır; acele ettiren süre baskısı bazı çocuklarda geri dönüşleri ve hataları artırabilir.",
      },
      { type: "heading", text: "Ailelerin kaçınması gereken yaklaşımlar" },
      {
        type: "paragraph",
        text: "“İstersen yaparsın”, “Kardeşin hemen bitirdi” veya “Yine dikkatin dağıldı” gibi ifadeler sorunu açıklamaz; çocuğun utanç ve başarısızlık hissini artırabilir. Sürekli başında beklemek de bağımsız çalışma becerisinin gelişmesini zorlaştırır. Bunun yerine davranış somut biçimde tarif edilebilir: “On dakika boyunca iki soruyu tamamladın ve bildirimlere bakmadın.” Hata olduğunda bütün çalışmayı sil baştan yaptırmak yerine hangi adımın karıştığı bulunmalıdır. Ödüller yalnızca sonuç için değil, başlama, plana dönme ve uygun mola kullanma gibi süreç davranışları için de düşünülebilir.",
      },
      {
        type: "callout",
        title: "Gözlem önemli",
        text: "Dikkat güçlüğü uzun süre devam ediyor, okul ve ev yaşamını belirgin biçimde etkiliyor ya da çocuğu yoğun biçimde zorluyorsa öğretmen ve uygun uzmanlarla görüşmek yararlıdır. Bu yazı tanı veya tedavi önerisi yerine geçmez.",
      },
      { type: "heading", text: "Sonuç" },
      {
        type: "paragraph",
        text: "Dikkat ve odaklanma, tek bir uzun çalışma ya da katı kuralla değil; çevre, süre, görev yapısı ve günlük düzenin birlikte ele alınmasıyla desteklenir. Sade bir masa, kısa hedefler, tek görev, yeterli uyku, planlı ekran kullanımı ve hareket molaları çocuğun çabasını sürdürebileceği koşulları oluşturur. Ailelerin görevi her an denetlemek değil, çocuğun kendi çalışma düzenini fark etmesine yardım etmektir. Küçük ilerlemeleri görünür kılmak ve ihtiyaç olduğunda okul ile uzman görüşünü sürece katmak, daha sakin ve sürdürülebilir bir yaklaşım sağlar.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(slug: string, limit = 2) {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
