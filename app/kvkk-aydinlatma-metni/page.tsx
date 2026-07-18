import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";

const DATA_CONTROLLER_INFO = {
  legalName: "", // TODO: İşletmenin resmi/yasal unvanını yayın öncesinde ekleyin.
  address: "", // TODO: Veri sorumlusunun tebligata uygun açık adresini ekleyin.
  email: "", // TODO: KVKK başvuruları için kullanılacak e-posta adresini ekleyin.
};

export const metadata: Metadata = createPageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "İdil Eğitim iletişim formunda paylaşılan kişisel verilerin işlenme amaçları, hukuki sebepleri, saklama süresi ve başvuru hakları hakkında bilgi alın.",
  path: "/kvkk-aydinlatma-metni",
});

const sections = [
  {
    title: "İşlenen Kişisel Veriler",
    content:
      "İletişim formu aracılığıyla ad soyad, telefon numarası, isteğe bağlı e-posta adresi, öğrencinin sınıf bilgisi ve onay zamanı işlenebilir. Formun güvenliği için IP adresi ve tarayıcı bilgisi gibi teknik kayıtlar da sınırlı olarak alınabilir.",
  },
  {
    title: "Kişisel Verilerin İşlenme Amaçları",
    content:
      "Veriler; bilgi talebinizi yanıtlamak, sizinle iletişime geçmek, uygun eğitim seçenekleri hakkında bilgi vermek, form güvenliğini sağlamak ve onay kaydını yönetmek amaçlarıyla sınırlı olarak kullanılmak üzere toplanır.",
  },
  {
    title: "Hukuki Sebepler",
    content:
      "Kişisel verilerin işlenmesi, somut durumun niteliğine göre açık rıza ve 6698 sayılı Kişisel Verilerin Korunması Kanunu'nda yer alan diğer uygun hukuki sebeplere dayanabilir. Uygulanacak hukuki sebep, veri işleme faaliyetinin kapsamına göre değerlendirilir.",
  },
  {
    title: "Verilerin Aktarılması",
    content:
      "Veriler, iletişim talebinin karşılanması ve teknik hizmetlerin yürütülmesi için gerekli olduğu ölçüde barındırma ve e-posta hizmeti sağlayıcıları gibi hizmet alınan taraflarla paylaşılabilir. Aktarım süreçlerinde yürürlükteki mevzuatın gerektirdiği idari ve teknik tedbirlerin uygulanması hedeflenir.",
  },
  {
    title: "Saklama Süresi",
    content:
      "Kişisel veriler, iletişim talebinin sonuçlandırılması ve ilgili hukuki yükümlülüklerin yerine getirilmesi için gerekli süre boyunca saklanır; saklama amacı ortadan kalktığında uygulanabilir mevzuat ve kurum politikaları çerçevesinde silinir, yok edilir veya anonim hale getirilir.",
  },
  {
    title: "İlgili Kişinin Hakları",
    content:
      "KVKK'nın 11. maddesinde belirtilen şartlar kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme ve kanunda düzenlenen diğer haklarınıza ilişkin başvuruda bulunabilirsiniz.",
  },
];

export default function KvkkAydinlatmaMetniPage() {
  return (
    <main className="min-h-screen bg-[#f2f7fb] px-5 py-16 text-[#12142b] sm:px-8 sm:py-20">
      <article className="mx-auto max-w-3xl rounded-[28px] border border-black/10 bg-white p-7 shadow-[0_24px_70px_-32px_rgba(18,20,43,0.32)] sm:p-12">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold text-[#0e7a72] transition-colors hover:text-[#e8502a]"
        >
          ← Ana sayfaya dön
        </Link>

        <header className="mb-10 border-b border-black/10 pb-8">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#0e7a72]">
            Kişisel Verilerin Korunması
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">KVKK Aydınlatma Metni</h1>
          <p className="mt-4 leading-7 text-black/65">
            Bu metin, ana sayfadaki iletişim formu üzerinden iletilen bilgi talepleri kapsamında
            kişisel verilerin işlenmesine ilişkin genel bilgilendirme amacıyla hazırlanmıştır.
          </p>
        </header>

        <div className="space-y-9">
          <section>
            <h2 className="mb-3 text-xl font-extrabold">Veri Sorumlusu</h2>
            <p className="leading-7 text-black/65">
              İletişim formu kapsamındaki veri işleme faaliyetleri, İdil Hızlı Okuma web sitesini
              işleten kişi veya kuruluş tarafından yürütülür. Yasal unvan ve iletişim bilgileri
              kesinleştirildiğinde bu bölüm güncellenecektir.
            </p>
            {(DATA_CONTROLLER_INFO.legalName ||
              DATA_CONTROLLER_INFO.address ||
              DATA_CONTROLLER_INFO.email) && (
              <dl className="mt-4 grid gap-2 rounded-2xl bg-[#f2f7fb] p-5 text-sm">
                {DATA_CONTROLLER_INFO.legalName && (
                  <div>
                    <dt className="font-bold">Yasal unvan</dt>
                    <dd>{DATA_CONTROLLER_INFO.legalName}</dd>
                  </div>
                )}
                {DATA_CONTROLLER_INFO.address && (
                  <div>
                    <dt className="font-bold">Adres</dt>
                    <dd>{DATA_CONTROLLER_INFO.address}</dd>
                  </div>
                )}
                {DATA_CONTROLLER_INFO.email && (
                  <div>
                    <dt className="font-bold">E-posta</dt>
                    <dd>{DATA_CONTROLLER_INFO.email}</dd>
                  </div>
                )}
              </dl>
            )}
          </section>

          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xl font-extrabold">{section.title}</h2>
              <p className="leading-7 text-black/65">{section.content}</p>
            </section>
          ))}

          <section>
            <h2 className="mb-3 text-xl font-extrabold">İletişim</h2>
            <p className="leading-7 text-black/65">
              KVKK kapsamındaki talepleriniz için veri sorumlusunun yukarıda belirtilecek iletişim
              kanalını veya ana sayfadaki iletişim formunu kullanabilirsiniz. Başvurular,
              yürürlükteki mevzuatta öngörülen usul ve süreler çerçevesinde değerlendirilir.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
