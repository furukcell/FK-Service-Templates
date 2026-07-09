# FK Service Templates

Hazır sektör web sitesi, talep/randevu formu ve admin panel şablonları.

İlk hedef şablonlar:

1. Veteriner / Klinik / Randevu
2. Kuaför / Güzellik Salonu
3. Emlakçı / İlan Paneli

Bu repo aylık abonelikli SaaS değil; tek seferlik kurulum ücretiyle hızlı satılabilir müşteri şablonları üretmek için kullanılacaktır.

## İş modeli

Müşteri hazır sektör şablonunu seçer. Logo, renk, firma adı, telefon, adres ve sosyal medya bilgileri girilir. Domain, Firebase ve hosting müşterinin kendi hesabında olur. FK Digital kurulumdan ve ekstra geliştirmelerden gelir elde eder.

Önerilen başlangıç fiyatları:

| Şablon | Kurulum |
|---|---:|
| Veteriner / Klinik | 5.000 TL |
| Kuaför / Güzellik | 5.000 TL |
| Emlakçı | 7.500 TL |

Ekstra işler ayrıca fiyatlandırılır: ek sayfa, ek form, tasarım revizyonu, çok dil, admin panel ek alanı, ilan/randevu filtresi ve kurulum desteği.

## Planlanan repo yapısı

```text
FK-Service-Templates/
  apps/
    web/                  -> Müşteri web sitesi / landing / formlar
    admin/                -> Talep, randevu, ilan yönetim paneli
  packages/
    shared/               -> Ortak tipler, sektör configleri, helperlar
    firebase/             -> Firebase client ve Firestore servisleri
    ui/                   -> Ortak UI bileşenleri
  templates/
    appointment/          -> Veteriner / klinik / randevu şablonu
    salon/                -> Kuaför / güzellik salonu şablonu
    real-estate/          -> Emlakçı ilan şablonu
  configs/
    demo-veterinary.ts
    demo-clinic.ts
    demo-salon.ts
    demo-real-estate.ts
  docs/
    sales-guide.md
    setup-guide.md
    firebase-setup.md
    deployment-guide.md
```

## Template 1 — Veteriner / Klinik / Randevu

Hedef sektörler:

- Veteriner kliniği
- Diş kliniği
- Psikolog
- Diyetisyen
- Fizyoterapi merkezi
- Özel muayenehane
- Küçük sağlık kliniği

Sayfa bölümleri:

- Hero alanı
- Hizmetler
- Uzman/doktor/veteriner kartları
- Randevu talep formu
- Acil WhatsApp butonu
- Galeri
- Hakkımızda
- Google Maps
- İletişim
- Sık sorulan sorular

Form alanları:

```text
Ad Soyad
Telefon
Hizmet tipi
Tercih edilen tarih
Tercih edilen saat
Açıklama / not
KVKK onayı
```

Veteriner için ek alanlar:

```text
Evcil hayvan adı
Hayvan türü
Şikayet / talep notu
Acil durum mu?
```

Admin panel:

- Gelen randevu talepleri
- Status değiştirme: yeni / arandı / onaylandı / iptal / tamamlandı
- Not ekleme
- WhatsApp'a geçiş
- Hizmet listesi yönetimi
- Uzman/veteriner kartı yönetimi

## Template 2 — Kuaför / Güzellik Salonu

Hedef sektörler:

- Kadın kuaförü
- Erkek berberi
- Güzellik salonu
- Lazer epilasyon merkezi
- Nail art / protez tırnak salonu
- Masaj / spa merkezi

Sayfa bölümleri:

- Hero alanı
- Hizmet ve fiyat listesi
- Kampanya alanı
- Personel/uzman seçimi
- Randevu talep formu
- Instagram galeri alanı
- Öncesi/sonrası galeri
- WhatsApp butonu
- Google Maps
- İletişim

Form alanları:

```text
Ad Soyad
Telefon
Hizmet seçimi
Personel tercihi
Tercih edilen tarih
Tercih edilen saat
Not
```

Admin panel:

- Randevu talepleri
- Hizmet/fiyat listesi yönetimi
- Kampanya yönetimi
- Personel listesi
- Galeri yönetimi
- WhatsApp'a geçiş

## Template 3 — Emlakçı / İlan Paneli

Hedef sektörler:

- Emlak ofisleri
- Gayrimenkul danışmanları
- Günlük kiralık ev/apart işletmeleri
- Arsa/ofis/işyeri satışı yapan danışmanlar

Sayfa bölümleri:

- Hero alanı
- Vitrin ilanları
- Satılık / kiralık filtreleri
- İlan kartları
- İlan detay sayfası
- Fotoğraf galerisi
- Konum/bölge bilgisi
- Danışman kartları
- İlan sor formu
- Evimi satmak istiyorum formu
- WhatsApp butonu
- Google Maps

İlan alanları:

```text
Başlık
Kategori: satılık / kiralık
Tip: daire / villa / arsa / işyeri / apart
Fiyat
Konum / mahalle
Metrekare
Oda sayısı
Banyo sayısı
Açıklama
Fotoğraflar
Vitrin ilan mı?
Danışman adı
Danışman telefonu
```

Admin panel:

- İlan ekleme
- İlan düzenleme
- İlan silme/pasif yapma
- Vitrin ilan seçme
- Fotoğraf yönetimi
- Gelen müşteri talepleri
- WhatsApp'a geçiş

## Ortak özellikler

Tüm şablonlarda ortak olacak özellikler:

- Mobil uyumlu modern tasarım
- WhatsApp hızlı iletişim
- Google Maps alanı
- SEO uyumlu temel sayfa yapısı
- Admin panel
- Firestore veri kaydı
- Talep/randevu/ilan status takibi
- Firma adı, logo, renk ve sektör config sistemi
- Basit kurulum dokümantasyonu
- Netlify veya Vercel deploy uyumu

## Config mantığı

Her müşteri için kodu baştan yazmak yerine config değiştirilecektir.

```ts
export const businessConfig = {
  brandName: "Mavi Veteriner Kliniği",
  sector: "veterinary",
  template: "appointment",
  primaryColor: "#0F766E",
  secondaryColor: "#ECFDF5",
  accentColor: "#F59E0B",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/...",
  instagramUrl: "https://instagram.com/...",
  enabledFeatures: {
    appointments: true,
    gallery: true,
    adminPanel: true,
    whatsapp: true,
    maps: true
  }
};
```

## Teknik tercihler

İlk MVP için önerilen teknik yapı:

- Next.js
- TypeScript
- Firebase Auth
- Firestore
- Firebase Storage opsiyonel
- Netlify veya Vercel
- CSS variables / Tailwind / plain CSS

Aylık abonelik alınmayacağı için her müşteri mümkünse kendi Firebase/hosting hesabını kullanmalıdır.

## Firebase koleksiyon taslağı

Ortak request modeli:

```text
requests/{requestId}
  template: appointment | salon | realEstate
  businessId: string
  customerName: string
  customerPhone: string
  status: new | contacted | confirmed | cancelled | completed
  source?: website | qr | instagram | whatsapp
  note?: string
  createdAt
  updatedAt
```

Randevu modeli:

```text
appointments/{appointmentId}
  customerName
  customerPhone
  serviceType
  preferredDate
  preferredTime
  staffId?
  petName?
  petType?
  isEmergency?
  status
  adminNote?
  createdAt
```

Emlak ilan modeli:

```text
properties/{propertyId}
  title
  listingType: sale | rent
  propertyType: apartment | villa | land | office | shop | dailyRental
  price
  location
  squareMeters
  roomCount
  bathroomCount
  description
  imageUrls: string[]
  isFeatured
  consultantName
  consultantPhone
  isActive
  createdAt
  updatedAt
```

## Satış cümlesi

Müşteriye ürün şöyle anlatılacaktır:

> Size sıfırdan özel yazılım yapmıyoruz. Hazır sektör şablonumuzu işletmenize uyarlıyoruz. Bu yüzden hızlı, uygun fiyatlı ve profesyonel bir web sistemi kurabiliyoruz. Mobil uyumlu site, WhatsApp bağlantısı, talep/randevu formu ve temel panel dahil tek seferlik kurulum ücretiyle yayına alıyoruz.

## Teslimat süreci

```text
1. Müşteri sektör şablonunu seçer.
2. Logo, renk, firma adı, telefon, adres ve sosyal medya bilgileri alınır.
3. Domain/hosting/Firebase hesabı belirlenir.
4. Config dosyası müşteri bilgilerine göre düzenlenir.
5. Demo link paylaşılır.
6. Küçük revizyonlar yapılır.
7. Canlı domain bağlanır.
8. Admin panel kullanımı anlatılır.
9. Teslim tamamlanır.
```

Hedef teslim süresi:

```text
Basit şablon: 1-2 gün
Admin panelli şablon: 2-4 gün
Emlak ilan paneli: 3-5 gün
```

## İlk geliştirme sırası

```text
1. Monorepo yapısı oluştur.
2. Ortak config tiplerini yaz.
3. Appointment template landing ekranını oluştur.
4. Salon template landing ekranını oluştur.
5. Real estate template landing ve ilan kartlarını oluştur.
6. Firebase client ve Firestore servislerini ekle.
7. Admin login ve request listesi ekle.
8. Appointment request formunu Firestore'a bağla.
9. Salon booking formunu Firestore'a bağla.
10. Real estate property modelini ve admin ilan ekleme ekranını oluştur.
11. Demo configleri hazırla.
12. Deploy rehberini yaz.
```

## Lisans ve açık kaynak kullanımı

Bu repo içinde kullanılacak açık kaynak kodlar için lisans kontrolü yapılmalıdır.

| Lisans | Ticari kullanım yaklaşımı |
|---|---|
| MIT | Uygun, lisans bildirimi korunmalı |
| Apache 2.0 | Uygun, lisans bildirimi korunmalı |
| BSD | Uygun, lisans bildirimi korunmalı |
| GPL | Dikkatli olunmalı, kapalı ticari kullanım için riskli olabilir |
| AGPL | Uzak durulmalı |
| Lisans yok | Kod kopyalanmamalı, sadece fikir alınmalı |

Bu repo mümkün olduğunca temiz, FK Digital'e ait kod tabanı olarak geliştirilecektir.

## Uzun vadeli hedef

Kısa vadede hedef:

```text
3 sektör şablonu
20 ilk müşteri
Tek seferlik kurulum geliri
Hızlı teslimat
```

Orta vadede hedef:

```text
10+ sektör şablonu
Admin panel standartlaşması
Müşteri kurulum rehberi
Hazır demo linkleri
Referans portföyü
```

Uzun vadede hedef:

```text
FK Digital altında küçük işletmelere hazır dijital sistemler satan ürünleşmiş yapı
```

## Durum

Bu repo yeni oluşturulmuştur. İlk aşama README ve ürün stratejisi dokümantasyonudur.

Sıradaki net iş:

```text
Monorepo iskeletini kur → 3 template klasörünü oluştur → ortak config sistemini yaz → ilk appointment template landing ekranını çıkar.
```
