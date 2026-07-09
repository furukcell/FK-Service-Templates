# FK Service Templates

FK Service Templates; küçük işletmelere hızlı satılabilecek, tek seferlik kurulum modeliyle uyarlanabilecek hazır web sitesi + admin panel altyapısıdır.

Bu repo aylık abonelikli SaaS olarak değil, **hazır sektör şablonlarını müşteriye özel uyarlayıp kurulum ücretiyle satmak** için hazırlanmıştır.

## Güncel Durum

MVP artık sadece statik site değildir. Müşteri admin panelden site içeriğinin önemli bölümlerini yönetebilir.

Hazır olan ana parçalar:

- Next.js 14 web uygulaması
- 3 sektör şablonu
- Her sektör için 3 profesyonel arayüz varyantı
- Template + layout seçicili ana demo
- Sektöre özel route'lar
- Legal/trust sayfaları
- Çerez banner
- Formlarda KVKK/Gizlilik onayı
- SEO meta, canonical, Open Graph, robots.txt ve sitemap.xml
- Admin login + şifremi unuttum akışı
- Admin panel
- Site ayarları yönetimi
- Kurumsal metin yönetimi
- Hizmet/fiyat ekleme, düzenleme ve pasife alma
- Kampanya yönetimi
- Galeri/görsel yönetimi
- Emlak ilan ekleme, düzenleme, yayından kaldırma ve fotoğraf yükleme
- Firestore request, property, service ve settings helper'ları
- Firebase Auth helper
- Firebase Storage upload helper
- Firestore rules
- Storage rules
- Netlify / Vercel deploy uyumu
- GitHub Actions web build workflow

## Hedef Şablonlar

| Şablon | Hedef müşteri | Durum |
|---|---|---|
| Appointment | Veteriner, klinik, psikolog, diyetisyen, fizyoterapi | MVP hazır |
| Salon | Kuaför, güzellik salonu, berber, nail art, spa | MVP hazır |
| Real Estate | Emlak ofisi, gayrimenkul danışmanı, günlük kiralık işletme | MVP hazır |

## Profesyonel Arayüz Varyantları

İçerik aynı kalır; sadece site kabuğu değişir. Böylece müşteri aynı işletme bilgileriyle 3 farklı site görünümü arasından seçim yapabilir.

| Varyant | Kullanım hissi | Amaç |
|---|---|---|
| `modern` | Modern kartlı premium yapı | Dengeli hero + kartlar + panel görünümü |
| `split` | İki parçalı büyük görsel / içerik yapısı | Daha kurumsal, daha büyük vitrin hissi |
| `showcase` | Tam genişlik sahne/vitrin yapısı | Daha çarpıcı, kampanya/portföy/galeri odaklı görünüm |

Demo linkleri:

```text
/
/appointment?layout=modern
/appointment?layout=split
/appointment?layout=showcase
/salon?layout=modern
/salon?layout=split
/salon?layout=showcase
/real-estate?layout=modern
/real-estate?layout=split
/real-estate?layout=showcase
```

Bu modelde 3 sektör x 3 layout = **9 farklı demo görünümü** elde edilir.

## Legal / Trust Sayfaları

Public siteye eklenen kurumsal/güven sayfaları:

```text
/hakkimizda
/iletisim
/gizlilik-politikasi
/kvkk-aydinlatma-metni
/cerez-politikasi
/kullanim-kosullari
/sss
```

Bu sayfalarda hazır şablon metinleri vardır. Müşteri isterse admin panelden bu metinleri kendi işletmesine göre düzenleyebilir.

Not: KVKK/gizlilik metinleri MVP için hazır şablondur. Gerçek müşteri tesliminde hukuki kontrol önerilir.

## Müşteri Admin Paneli

Müşteri siteyi aldıktan sonra şu linklerden giriş yapar:

```text
/login
/admin
```

Şifre unutulursa:

```text
/forgot-password
```

Teslimde Firebase Auth üzerinden müşteri için admin kullanıcı oluşturulur.

Örnek:

```text
Admin panel: www.musterisitesi.com/login
E-posta: info@musterisitesi.com
Şifre: müşteri için oluşturulan şifre
```

Demo ortamında admin koruması kapalı tutulabilir:

```env
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=false
```

Müşteri tesliminde admin koruması açılır:

```env
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=true
```

## Admin Panelde Müşteri Ne Değiştirebilir?

| Panel | Route | Ne işe yarar? |
|---|---|---|
| Talepler | `/admin` | Gelen form/randevu/ilan taleplerini görür, durum değiştirir, not yazar, WhatsApp'a geçer, CSV indirir |
| Site Ayarları | `/admin/settings` | Firma adı, telefon, WhatsApp, e-posta, çalışma saati, adres, harita, Instagram, ana başlık, açıklama ve seçili arayüzü değiştirir |
| Kurumsal Metinler | `/admin/content` | Hakkımızda, iletişim, gizlilik, KVKK, çerez, kullanım koşulları ve SSS metinlerini yönetir |
| Hizmetler | `/admin/services` | Hizmet adı, açıklama ve fiyatları ekler, düzenler, pasife alır veya tekrar aktif eder |
| Kampanyalar | `/admin/campaigns` | Kampanya başlığı, açıklaması ve fiyat/etiket bilgisini yönetir |
| Galeri | `/admin/gallery` | Görsel yükler, başlık/açıklama ekler, site galerisini yönetir |
| İlanlar | `/admin/properties` | Emlak ilanlarını listeler, düzenler, vitrin/yayın durumunu değiştirir |
| Yeni İlan | `/admin/properties/new` | Emlak ilanı ekler, fiyat/konum/açıklama/görsel girer |

Bu sayede müşteri sürekli FK Digital'e yazmadan siteyi uzun süre kullanabilir.

## Çalışan Route'lar

```text
/                         -> 3 şablon + 3 arayüz seçicili ana demo
/appointment               -> veteriner / klinik demo sitesi
/salon                     -> kuaför / güzellik demo sitesi
/real-estate               -> emlak landing demo sitesi
/properties                -> emlak ilan listesi
/properties/[id]           -> emlak ilan detay sayfası
/hakkimizda                -> hakkımızda sayfası
/iletisim                  -> iletişim sayfası
/gizlilik-politikasi       -> gizlilik politikası
/kvkk-aydinlatma-metni     -> KVKK aydınlatma metni
/cerez-politikasi          -> çerez politikası
/kullanim-kosullari        -> kullanım koşulları
/sss                       -> sık sorulan sorular
/robots.txt                -> arama motoru robots çıktısı
/sitemap.xml               -> sitemap çıktısı
/login                     -> admin login sayfası
/forgot-password           -> admin şifre sıfırlama sayfası
/admin                     -> admin ana panel / talepler
/admin/settings            -> site ayarları
/admin/content             -> kurumsal metin yönetimi
/admin/services            -> hizmet/fiyat yönetimi
/admin/campaigns           -> kampanya yönetimi
/admin/gallery             -> galeri yönetimi
/admin/properties          -> emlak ilan yönetimi
/admin/properties/new      -> emlak ilan ekleme ekranı
```

## Kurulum

```bash
pnpm install
pnpm dev
```

Doğrudan web app:

```bash
pnpm --filter @fk-templates/web dev
```

Build:

```bash
pnpm --filter @fk-templates/web build
```

## Teknik Yapı

- Next.js 14
- React 18
- TypeScript
- pnpm workspace
- Firebase Auth
- Firestore
- Firebase Storage
- Netlify / Vercel uyumlu deploy
- CSS variables ile sektör bazlı tema sistemi
- Layout varyantları: `modern`, `split`, `showcase`
- Public site için managed config hook: `useManagedTemplateConfig`
- Legal/trust içerikler için managed content sistemi
- SEO component: `SeoHead`
- Dynamic `robots.txt` ve `sitemap.xml`

## Firestore Koleksiyonları

### requests

```text
requests/{requestId}
  template: appointment | salon | real-estate
  businessId: string
  customerName: string
  customerPhone: string
  subject: string
  note?: string
  adminNote?: string
  status: new | contacted | confirmed | cancelled | completed
  source?: website | qr | instagram | whatsapp
  preferredDate?: string
  preferredTime?: string
  extra?: object
  createdAt
  updatedAt
```

### settings

```text
settings/{businessId}
  businessId
  template: appointment | salon | real-estate
  layoutVariant: modern | split | showcase
  brandName
  eyebrow
  heroTitle
  heroDescription
  primaryCta
  secondaryCta
  topBarText
  phone
  whatsapp
  contactEmail
  workingHours
  address
  mapsUrl
  instagramUrl
  campaignItems: ServiceItem[]
  galleryItems: VisualItem[]
  contentPages: Record<ContentPageKey, ManagedContentPage>
  faqItems: FaqItem[]
  createdAt
  updatedAt
```

### services

```text
services/{serviceId}
  template: appointment | salon
  title
  description
  price
  isActive
  createdAt
  updatedAt
```

### properties

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

## Firebase / Env

`.env.example` içinde gerekli alanlar vardır.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_DEFAULT_TEMPLATE=appointment
NEXT_PUBLIC_BUSINESS_ID=demo-business
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=false
```

Rules deploy:

```bash
firebase deploy --only firestore:rules,storage
```

## Satış Modeli

Başlangıç fiyatları:

| Şablon | Kurulum |
|---|---:|
| Veteriner / Klinik | 5.000 TL |
| Kuaför / Güzellik | 5.000 TL |
| Emlakçı | 7.500 TL |

Yönetilebilir panel sayesinde üst paket fiyatı artırılabilir:

| Paket | Önerilen fiyat |
|---|---:|
| Basit site + talep paneli | 5.000 TL |
| Yönetilebilir site paneli | 7.500 - 10.000 TL |
| Emlak ilan yönetimli panel | 10.000 - 15.000 TL |

## Satış Cümlesi

> Size sıfırdan özel yazılım yapmıyoruz. Hazır sektör şablonumuzu işletmenize uyarlıyoruz. Mobil uyumlu site, WhatsApp bağlantısı, talep/randevu formu, KVKK/gizlilik sayfaları, SEO altyapısı ve kendi kendinize güncelleyebileceğiniz admin paneliyle tek seferlik kurulum ücretiyle yayına alıyoruz.

## Teslimat Süreci

```text
1. Müşteri sektör şablonunu seçer.
2. Müşteri 3 arayüz seçeneğinden birini seçer.
3. Logo, renk, firma adı, telefon, adres ve sosyal medya bilgileri alınır.
4. Domain/hosting/Firebase hesabı belirlenir.
5. Config ve Firestore settings müşteri bilgilerine göre düzenlenir.
6. Hakkımızda/KVKK/gizlilik/SSS metinleri müşteri bilgilerine göre düzenlenir.
7. Demo link paylaşılır.
8. Küçük revizyonlar yapılır.
9. Firebase/hosting canlıya alınır.
10. Admin kullanıcı oluşturulur.
11. Admin panel kullanımı anlatılır.
12. Teslim tamamlanır.
```

## Sonraki Net Kontroller

```text
1. pnpm install
2. pnpm --filter @fk-templates/web build
3. GitHub Actions build sonucu kontrol
4. Canlı Firebase Auth / Firestore / Storage test
5. Admin panelden ayar, içerik, hizmet, kampanya, galeri ve ilan testi
6. Formlarda KVKK onayı ve talep kayıt testi
7. robots.txt / sitemap.xml / SEO meta kontrolü
8. Mobil görsel kontrol
9. İlk müşteri demosu için marka/logo/içerik uyarlama
```
