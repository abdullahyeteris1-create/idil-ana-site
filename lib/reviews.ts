/**
 * Velilerin Google üzerinden paylaştığı değerlendirmeler.
 * Ana sayfadaki şeritte ve eğitmen sayfasında kullanılır.
 */
export type Review = { name: string; text: string };

export const reviews: Review[] = [
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

/** Avatar için baş harfler. Çift boşluklu isimlerde de güvenli. */
export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase("tr-TR");
}
