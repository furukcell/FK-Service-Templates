# FK Service Templates

FK Service Templates; küçük işletmelere hızlı satılabilecek, tek seferlik kurulum modeliyle uyarlanabilecek hazır web sitesi + talep/randevu/ilan paneli altyapısıdır.

Bu repo bir aylık abonelikli SaaS ürünü olarak değil, **hazır sektör şablonlarını müşteriye özel uyarlayıp kurulum ücretiyle satmak** için hazırlanmıştır.

## Güncel MVP Durumu

İlk MVP iskeleti tamamlandı.

Hazır olan ana parçalar:

- Modern Next.js web uygulaması
- 3 sektör şablonu
- Premium landing arayüzü
- Template switcher ana sayfa
- Sektöre özel route'lar
- Emlak ilan liste ve detay sayfaları
- Admin demo panel
- Admin login iskeleti
- Firebase Auth helper
- Firestore request helper
- Firestore property helper
- Firestore service management helper
- Firebase Storage görsel yükleme helper
- Firestore rules taslağı
- Storage rules taslağı
- Netlify deploy config
- GitHub Actions web build workflow
- Satış, kurulum, Firebase ve onboarding dokümanları

## Hedef Şablonlar

| Şablon | Hedef müşteri | Durum |
|---|---|---|
| Appointment | Veteriner, klinik, psikolog, diyetisyen, fizyoterapi | MVP hazır |
| Salon | Kuaför, güzellik salonu, berber, nail art, spa | MVP hazır |
| Real Estate | Emlak ofisi, gayrimenkul danışmanı, günlük kiralık işletme | MVP hazır |

## İş Modeli

Müşteri hazır sektör şablonunu seçer. Logo, renk, firma adı, telefon, adres, hizmetler, ilanlar ve sosyal medya bilgileri config sistemine girilir.

Domain, Firebase ve hosting mümkünse müşterinin kendi hesabında olur. FK Digital kurulumdan, uyarlamadan ve ekstra geliştirmelerden gelir elde eder.

Önerilen başlangıç fiyatları:

| Şablon | Kurulum |
|---|---:|
| Veteriner / Klinik | 5.000 TL |
| Kuaför / Güzellik | 5.000 TL |
| Emlakçı | 7.500 TL |

Ekstra işler ayrıca fiyatlandırılır:

| Ek iş | Önerilen fiyat |
|---|---:|
| Ek sayfa | 1.000 TL |
| Ek form | 1.500 TL |
| Tasarım revizyonu | 1.000 TL |
| Çok dil | 2.000 TL |
| Admin panel ek alan | 2.000 TL |
| Özel filtre/özel akış | 2.500 TL+ |

## Çalışan Route'lar

```text
/                         -> 3 şablon arasında geçişli ana demo
/appointment               -> veteriner / klinik demo sitesi
/salon                     -> kuaför / güzellik demo sitesi
/real-estate               -> emlak landing demo sitesi
/properties                -> emlak ilan listesi
/properties/[id]           -> emlak ilan detay sayfası
/admin                     -> admin demo panel
/login                     -> admin login sayfası
/admin/properties/new      -> emlak ilan ekleme ekranı
/admin/services            -> klinik/salon hizmet listesi yönetimi
```

## Repo Yapısı

```text
FK-Service-Templates/
  apps/
    web/
      pages/
        index.tsx
        appointment.tsx
        salon.tsx
        real-estate.tsx
        properties/
          index.tsx
          [id].tsx
        admin.tsx
        login.tsx
        admin/
          properties/new.tsx
          services.tsx
      src/
        components/
          TemplateLanding.tsx
        styles/
          globals.css
          admin.css
          admin-actions.css
          admin-forms.css
          forms.css
          properties.css
          visual-sections.css
        templateConfigs.ts
        propertyDemoData.ts
        adminDemoData.ts
        useOptionalAdminGuard.ts
  packages/
    shared/
      src/index.ts
    firebase/
      src/
        client.ts
        auth.ts
        requests.ts
        properties.ts
        services.ts
        storage.ts
        collections.ts
  templates/
    appointment/
    salon/
    real-estate/
  configs/
    demo-veterinary.ts
    demo-salon.ts
    demo-real-estate.ts
  docs/
    sales-guide.md
    setup-guide.md
    firebase-setup.md
    deployment-guide.md
    customer-checklist.md
    demo-pitch.md
    first-customer-onboarding.md
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

veya doğrudan web app:

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

## Template Mantığı

Her sektör farklı config ile yönetilir. Tasarım altyapısı ortaktır ama renk, metin, hizmet listesi, ekip kartları, kampanyalar ve formlar config üzerinden değişir.

Örnek config alanları:

```ts
export const demoVeterinaryConfig = {
  template: "appointment",
  sector: "Veteriner Kliniği",
  brandName: "Mavi Pati Veteriner",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#0F766E",
    secondary: "#14B8A6",
    accent: "#F59E0B",
    soft: "#ECFDF5",
    dark: "#042F2E"
  },
  services: [],
  staff: [],
  galleryItems: [],
  campaignItems: [],
  form: {
    title: "Randevu talebi bırak",
    fields: []
  }
};
```

## Ortak Özellikler

Tüm şablonlarda ortak hedef özellikler:

- Mobil uyumlu modern tasarım
- Büyük hero alanı
- Kartlı hizmet sunumu
- WhatsApp hızlı iletişim
- Google Maps / lokasyon CTA
- Instagram / galeri alanı
- Talep veya randevu formu
- Firestore'a request kaydı
- Admin panelde request listesi
- Status değiştirme
- Admin notu kaydetme
- CSV export
- Firebase yoksa demo mod fallback

## Appointment Template

Hedef sektörler:

- Veteriner kliniği
- Diş kliniği
- Psikolog
- Diyetisyen
- Fizyoterapi merkezi
- Küçük sağlık kliniği

Hazır alanlar:

- Hero
- Hizmetler
- Uzman/veteriner/doktor kartları
- Randevu formu
- Pet adı / hayvan türü / not alanları
- Galeri kartları
- Google Maps CTA
- WhatsApp hızlı dönüş
- Admin panelde detaylı request extra bilgileri

## Salon Template

Hedef sektörler:

- Kadın kuaförü
- Erkek berberi
- Güzellik salonu
- Lazer epilasyon merkezi
- Nail art / protez tırnak salonu
- Masaj / spa merkezi

Hazır alanlar:

- Hero
- Hizmet/fiyat listesi
- Kampanya kartları
- Personel kartları
- Randevu formu
- Instagram/galeri alanı
- WhatsApp hızlı dönüş
- `/admin/services` hizmet yönetimi

## Real Estate Template

Hedef sektörler:

- Emlak ofisleri
- Gayrimenkul danışmanları
- Günlük kiralık ev/apart işletmeleri
- Arsa/ofis/işyeri portföyü olan danışmanlar

Hazır alanlar:

- Hero
- Vitrin portföy kartları
- `/properties` ilan listesi
- `/properties/[id]` ilan detay sayfası
- Firestore property listesi okuma
- Firestore property detay fetch
- Görsel URL galerisi render
- `/admin/properties/new` ilan ekleme
- Storage'a görsel yükleme helper
- İlan lead formu

## Admin Panel

Admin panel şu an `/admin` route'u altında çalışır.

Özellikler:

- Demo data fallback
- Firestore canlı request okuma
- Status değiştirme
- Admin notu kaydetme
- WhatsApp'a geçiş
- CSV export
- Emlak ilan linkleri
- Hizmet yönetimi linki
- Opsiyonel admin guard

Admin guard ayarı:

```env
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=false
```

Demo için `false` kalabilir. Müşteri tesliminde admin panel giriş zorunlu olsun istenirse:

```env
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=true
```

## Firebase Koleksiyonları

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

Firebase rules dosyaları:

```text
firestore.rules
storage.rules
firebase.json
```

Rules deploy:

```bash
firebase deploy --only firestore:rules,storage
```

## Deploy

Netlify config hazırdır:

```text
netlify.toml
```

Build command:

```bash
pnpm --filter @fk-templates/web build
```

Publish directory:

```text
apps/web/.next
```

Next.js Netlify plugin kullanılmalıdır.

## GitHub Actions

Workflow dosyası:

```text
.github/workflows/web-build.yml
```

Amaç:

```text
push/main veya PR geldiğinde pnpm install yapıp web build almak.
```

## Satış Cümlesi

> Size sıfırdan özel yazılım yapmıyoruz. Hazır sektör şablonumuzu işletmenize uyarlıyoruz. Bu yüzden hızlı, uygun fiyatlı ve profesyonel bir web sistemi kurabiliyoruz. Mobil uyumlu site, WhatsApp bağlantısı, talep/randevu formu ve temel panel dahil tek seferlik kurulum ücretiyle yayına alıyoruz.

## Teslimat Süreci

```text
1. Müşteri sektör şablonunu seçer.
2. Logo, renk, firma adı, telefon, adres ve sosyal medya bilgileri alınır.
3. Domain/hosting/Firebase hesabı belirlenir.
4. Config dosyası müşteri bilgilerine göre düzenlenir.
5. Demo link paylaşılır.
6. Küçük revizyonlar yapılır.
7. Firebase/hosting canlıya alınır.
8. Admin panel kullanımı anlatılır.
9. Teslim tamamlanır.
```

Hedef teslim süresi:

```text
Basit şablon: 1-2 gün
Admin panelli şablon: 2-4 gün
Emlak ilan paneli: 3-5 gün
```

## Dokümanlar

- `docs/sales-guide.md`
- `docs/setup-guide.md`
- `docs/firebase-setup.md`
- `docs/deployment-guide.md`
- `docs/customer-checklist.md`
- `docs/demo-pitch.md`
- `docs/first-customer-onboarding.md`

## Lisans ve Açık Kaynak Notu

Bu repo mümkün olduğunca FK Digital'e ait temiz kod tabanı olarak geliştirilecektir.

Açık kaynak kod kullanılacaksa lisans kontrolü yapılmalıdır.

| Lisans | Ticari kullanım yaklaşımı |
|---|---|
| MIT | Uygun, lisans bildirimi korunmalı |
| Apache 2.0 | Uygun, lisans bildirimi korunmalı |
| BSD | Uygun, lisans bildirimi korunmalı |
| GPL | Dikkatli olunmalı |
| AGPL | Uzak durulmalı |
| Lisans yok | Kod kopyalanmamalı, sadece fikir alınmalı |

## Sonraki Net Kontroller

Kod tarafındaki MVP parçaları hazırlandı. Sıradaki net kontroller:

```text
1. pnpm install
2. pnpm --filter @fk-templates/web build
3. GitHub Actions build sonucu kontrol
4. Canlı Firebase/Storage test
5. Mobil görsel kontrol
6. İlk müşteri demosu için marka/logo/içerik uyarlama
```
