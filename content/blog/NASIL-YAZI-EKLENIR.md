# Blog yazısı nasıl eklenir?

Kod değiştirmeye gerek yok. Bu klasöre bir `.mdx` dosyası eklemek yeterli;
yazı otomatik olarak blog listesine, site haritasına ve ilgili yazılara girer.

## 1. Dosyayı oluştur

Dosya adı yazının adresi olur:

| Dosya adı | Adres |
| --- | --- |
| `hizli-okuma-teknikleri.mdx` | `/blog/hizli-okuma-teknikleri` |

Kurallar: yalnızca küçük harf, Türkçe karakter yok, boşluk yerine tire.
`çocuğum-neden.mdx` **değil**, `cocugum-neden.mdx` olmalı.

## 2. Dosyanın başına bilgi bloğunu yaz

Dosya `---` ile başlar ve `---` ile biter. Arası yazının künyesidir:

```mdx
---
title: "Hızlı Okuma Teknikleri: 7 Temel Yöntem"
excerpt: "Listede görünen kısa tanıtım yazısı. Bir veya iki cümle."
description: "Google'da görünen açıklama. 150-160 karakter arası ideal."
publishedAt: "2026-08-15"
author: "İdil Eğitim"
category: "Okuma Becerileri"
image: "/blog/hizli-okuma-teknikleri.jpg"
imageAlt: "Görseli göremeyen biri için görselin tarifi"
keywords:
  - "hızlı okuma teknikleri"
  - "göz egzersizleri"
---
```

### Alanlar

| Alan | Zorunlu | Açıklama |
| --- | --- | --- |
| `title` | evet | Yazının başlığı |
| `excerpt` | evet | Blog listesindeki kartta görünen tanıtım |
| `description` | evet | Arama sonuçlarında görünen açıklama |
| `publishedAt` | evet | Yayın tarihi, **YYYY-AA-GG** biçiminde |
| `category` | evet | Örn. "Okuma Becerileri", "Dikkat ve Odaklanma" |
| `image` | evet | Kapak görselinin yolu (aşağıya bakın) |
| `imageAlt` | evet | Görselin sözlü tarifi (erişilebilirlik + SEO) |
| `updatedAt` | hayır | Yazıyı sonradan güncellerseniz ekleyin |
| `author` | hayır | Yazılmazsa "İdil Eğitim" olur |
| `readingTime` | hayır | Yazılmazsa metinden otomatik hesaplanır |
| `featured` | hayır | `featured: true` yazarsanız blogda "Öne Çıkan Yazı" olur |
| `keywords` | hayır | Hedeflenen arama terimleri |

Zorunlu bir alan eksikse site açılmaz ve hangi dosyada neyin eksik olduğunu
söyleyen bir hata verir. Bu bilinçlidir: yarım künyeli bir yazının yayına
çıkmasındansa hatayı hemen görmek daha iyidir.

## 3. Kapak görselini ekle

Görseli `public/blog/` klasörüne koyun ve künyede `/blog/dosya-adi.jpg`
şeklinde yazın.

- Boyut: **1200 x 675 piksel** (16:9)
- Biçim: `.jpg`
- Dosya boyutu: 150 KB altında tutun

## 4. Yazıyı yaz

`---` bloğundan sonrası yazının kendisidir. Sade metin yazabilirsiniz:

```mdx
Buraya normal paragraf yazılır. Alt satıra geçmek için bir boş satır bırakın.

## Ara başlık

Yeni paragraf. **Kalın yazmak** için yıldız, [bağlantı](/hizli-okuma-egitimi)
için köşeli parantez kullanılır.

- Madde işaretli liste
- İkinci madde

1. Numaralı liste
2. İkinci madde

> Alıntı yapmak için satır başına büyüktür işareti konur.
```

### Vurgu kutusu

Önemli bir notu öne çıkarmak için:

```mdx
<Callout title="Küçük ve düzenli adımlar">
  Günlük 10-15 dakikalık planlar çoğu aile için uygulanabilir bir başlangıçtır.
</Callout>
```

## 5. Kontrol et

Yazı hazır olduğunda değişikliği gönderin; site otomatik yayına alınır.
Yayına çıkmadan önce görmek isterseniz geliştirme sunucusunda
`http://localhost:3000/blog` adresinden kontrol edebilirsiniz.

## İpuçları

- **Başlık ile `description` farklı olsun.** Arama sonucunda ikisi yan yana
  görünür; aynı cümleyi tekrarlamak yer kaybıdır.
- **Ara başlık kullanın.** Uzun metinde okuyucu göz gezdirir; `##` ile
  bölmek hem okumayı hem aramada bulunmayı kolaylaştırır.
- **Yazı içinden site içine bağlantı verin.** Örneğin okuma hızından
  bahsederken `[okuma hızı testi](/okuma-hizi-testi)` yazmak hem okuyucuya
  yardımcı olur hem sayfalar arası bağı güçlendirir.
- **Eski yazıyı güncellerseniz** `updatedAt` ekleyin; hem okuyucu hem Google
  içeriğin tazelendiğini görür.
