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
- Admin login iskeleti
- Admin panel
- Site ayarları yönetimi
- Hizmet/fiyat yönetimi
- Kampanya yönetimi
- Galeri/görsel yönetimi
- Emlak ilan ekleme ve fotoğraf yükleme
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

## Müşteri Admin Paneli

Müşteri siteyi aldıktan sonra şu linklerden giriş yapar:

```text
/login
/admin
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
| Site Ayarları | `/admin/settings` | Firma adı, telefon, WhatsApp, adres, harita, Instagram, ana başlık, açıklama ve seçili arayüzü değiştirir |
| Hizmetler | `/admin/services` | Hizmet adı, açıklama ve fiyatları yönetir |
| Kampanyalar | `/admin/campaigns` | Kampanya başlığı, açıklaması ve fiyat/etiket bilgisini yönetir |
| Galeri | `/admin/gallery` | Görsel yükler, başlık/açıklama ekler, site galerisini yönetir |
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
/login                     -> admin login sayfası
/admin                     -> admin ana panel / talepler
/admin/settings            -> site ayarları
/admin/services            -> hizmet/fiyat yönetimi
/admin/campaigns           -> kampanya yönetimi
/admin/gallery             -> galeri yönetimi
/admin/properties/new      -> emlak ilan ekleme ekranı
```

## Repo Yapısı

```text
FK-Service-Templates/
  apps/web/
    pages/
      index.tsx
      appointment.tsx
      salon.tsx
      real-estate.tsx
      properties/index.tsx
      properties/[id].tsx
      login.tsx
      admin.tsx
      admin/settings.tsx
      admin/services.tsx
      admin/campaigns.tsx
      admin/gallery.tsx
      admin/properties/new.tsx
    src/
      components/TemplateLanding.tsx
      styles/
      templateConfigs.ts
      useManagedTemplateConfig.ts
      useLayoutVariantFromQuery.ts
      useOptionalAdminGuard.ts
  packages/shared/
  packages/firebase/
    src/client.ts
    src/auth.ts
    src/requests.ts
    src/properties.ts
    src/services.ts
    src/settings.ts
    src/storage.ts
    src/collections.ts
  configs/
    demo-veterinary.ts
    demo-salon.ts
    demo-real-estate.ts
  docs/
  firestore.rules
  storage.rules
  firebase.json
  netlify.toml
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
  address
  mapsUrl
  instagramUrl
  campaignItems: ServiceItem[]
  galleryItems: VisualItem[]
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

> Size sıfırdan özel yazılım yapmıyoruz. Hazır sektör şablonumuzu işletmenize uyarlıyoruz. Mobil uyumlu site, WhatsApp bağlantısı, talep/randevu formu ve kendi kendinize güncelleyebileceğiniz admin paneliyle tek seferlik kurulum ücretiyle yayına alıyoruz.

## Teslimat Süreci

```text
1. Müşteri sektör şablonunu seçer.
2. Müşteri 3 arayüz seçeneğinden birini seçer.
3. Logo, renk, firma adı, telefon, adres ve sosyal medya bilgileri alınır.
4. Domain/hosting/Firebase hesabı belirlenir.
5. Config ve Firestore settings müşteri bilgilerine göre düzenlenir.
6. Demo link paylaşılır.
7. Küçük revizyonlar yapılır.
8. Firebase/hosting canlıya alınır.
9. Admin kullanıcı oluşturulur.
10. Admin panel kullanımı anlatılır.
11. Teslim tamamlanır.
```

## Sonraki Net Kontroller

```text
1. pnpm install
2. pnpm --filter @fk-templates/web build
3. GitHub Actions build sonucu kontrol
4. Canlı Firebase Auth / Firestore / Storage test
5. Admin panelden ayar, hizmet, kampanya, galeri ve ilan testi
6. Mobil görsel kontrol
7. İlk müşteri demosu için marka/logo/içerik uyarlama
```
