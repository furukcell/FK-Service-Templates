# FK Service Templates

FK Service Templates; küçük işletmelere tek seferlik kurulum ücretiyle satılabilecek, yönetilebilir admin panelli hazır web sitesi altyapısıdır.

## Güncel Durum

MVP artık gerçek müşteri teslimine yaklaştırılmıştır. Public sitede demo dili temizlenmiş, teslim modu eklenmiş, spam/görsel/SEO güvenlikleri güçlendirilmiştir.

Hazır ana parçalar:

- Next.js 14 web uygulaması
- 4 sektör şablonu: Appointment, Salon, Real Estate, Cafe
- Her sektör için 3 profesyonel arayüz varyantı: `modern`, `split`, `showcase`
- Müşteri teslim modu: `NEXT_PUBLIC_DEMO_MODE=false`
- Public sitede demo yazılarını gizleme
- Canlı modda örnek/dummy ilan göstermeme
- Legal/trust sayfaları
- Çerez banner
- Formlarda KVKK/Gizlilik onayı
- Honeypot spam koruması
- E-posta bildirim API route'u
- API origin kontrolü ve basit rate limit
- Admin panel canlı talep dinleme
- Yeni talep rozeti, panel içi uyarı, sesli uyarı, tarayıcı bildirimi
- Admin login + şifremi unuttum akışı
- Admin/login/forgot-password noindex/robots koruması
- SEO meta, canonical, Open Graph, favicon, manifest, robots.txt ve sitemap.xml
- Site ayarları yönetimi
- Kurumsal metin yönetimi
- Hizmet/fiyat ekleme, düzenleme ve pasife alma
- Kampanya yönetimi
- Galeri/görsel yönetimi
- Görsel upload tipi ve 5 MB boyut kontrolü
- Storage rules tarafında görsel tipi/boyutu kontrolü
- Emlak ilan ekleme, düzenleme, yayından kaldırma ve fotoğraf yükleme
- Profesyonel 404 sayfası
- GitHub Actions: lint + typecheck + build

## Hedef Şablonlar

| Şablon | Hedef müşteri | Durum |
|---|---|---|
| Appointment | Veteriner, klinik, psikolog, diyetisyen, fizyoterapi | MVP hazır |
| Salon | Kuaför, güzellik salonu, berber, nail art, spa | MVP hazır |
| Real Estate | Emlak ofisi, gayrimenkul danışmanı, günlük kiralık işletme | MVP hazır |
| Cafe | Pastane, cafe, börekçi, fırın, tatlıcı | MVP hazır |

## Demo Linkleri

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
/cafe?layout=modern
/cafe?layout=split
/cafe?layout=showcase
```

## Public Sayfalar

```text
/
/appointment
/salon
/real-estate
/cafe
/properties
/properties/[id]
/hakkimizda
/iletisim
/gizlilik-politikasi
/kvkk-aydinlatma-metni
/cerez-politikasi
/kullanim-kosullari
/sss
/404
/robots.txt
/sitemap.xml
```

## Admin Sayfaları

```text
/login
/forgot-password
/admin
/admin/settings
/admin/content
/admin/services
/admin/campaigns
/admin/gallery
/admin/properties
/admin/properties/new
```

Admin, login, forgot-password ve API route'ları robots tarafında engellenir. Login ve şifre sıfırlama sayfalarında `noindex` meta vardır.

## Müşteri Admin Panelinde Ne Yönetir?

| Panel | Route | İşlev |
|---|---|---|
| Talepler | `/admin` | Gelen formları canlı görür, durum değiştirir, not yazar, WhatsApp'a geçer, CSV indirir |
| Site Ayarları | `/admin/settings` | Firma adı, telefon, WhatsApp, e-posta, çalışma saati, adres, harita, Instagram, başlık ve seçili arayüz |
| Kurumsal Metinler | `/admin/content` | Hakkımızda, iletişim, gizlilik, KVKK, çerez, kullanım koşulları ve SSS |
| Hizmetler | `/admin/services` | Hizmet/fiyat/menü ürünü ekler, düzenler, pasife alır veya aktif eder |
| Kampanyalar | `/admin/campaigns` | Kampanya başlığı, açıklaması ve fiyat/etiket bilgisini yönetir |
| Galeri | `/admin/gallery` | Görsel yükler, başlık/açıklama ekler |
| İlanlar | `/admin/properties` | Emlak ilanlarını listeler, düzenler, vitrin/yayın durumunu değiştirir |
| Yeni İlan | `/admin/properties/new` | Emlak ilanı ekler, fiyat/konum/açıklama/görsel girer |

## Bildirim Sistemi

Telegram ve otomatik WhatsApp bildirimi yoktur.

Kullanılan model:

```text
1. Web formu Firestore'a talep kaydeder.
2. Resend ayarı varsa işletmeye e-posta bildirimi gider.
3. Admin panel canlı Firestore dinler.
4. Yeni talep gelince panelde uyarı çıkar.
5. Panel açıksa kısa sesli uyarı çalar.
6. Kullanıcı izin verirse tarayıcı bildirimi gösterilir.
```

## Env Ayarları

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

# Demo linklerinde true/boş kalabilir.
# Gerçek müşteri tesliminde false yapılır.
NEXT_PUBLIC_DEMO_MODE=true

RESEND_API_KEY=
REQUEST_NOTIFICATION_TO=
REQUEST_NOTIFICATION_FROM=Site Bildirimi <onboarding@resend.dev>

# Gerçek müşteri tesliminde true yapılır.
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=false
```

## Müşteri Teslim Ayarları

Gerçek müşteri tesliminde önerilen env:

```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=true
NEXT_PUBLIC_SITE_URL=https://www.musteridomaini.com
NEXT_PUBLIC_BUSINESS_ID=musteri-kodu
REQUEST_NOTIFICATION_TO=info@musteridomaini.com
REQUEST_NOTIFICATION_FROM=Site Bildirimi <bildirim@musteridomaini.com>
```

Bu modda:

- Demo panel linkleri public sitede görünmez.
- Public sitede dummy/örnek ilanlar gösterilmez.
- Teknik/demo ifadeler saklanır.
- Admin panel login ister.
- Formlar KVKK onaysız gönderilemez.
- Honeypot ve API rate limit çalışır.
- Admin/login sayfaları indexlenmez.

## Kurulum

```bash
pnpm install
pnpm dev
```

Doğrudan web app:

```bash
pnpm --filter @fk-templates/web dev
```

Kontroller:

```bash
pnpm --filter @fk-templates/web lint
pnpm --filter @fk-templates/web typecheck
pnpm --filter @fk-templates/web build
```

## Firebase Rules Deploy

```bash
firebase deploy --only firestore:rules,storage
```

## Satış Modeli

Başlangıç fiyatları:

| Şablon | Kurulum |
|---|---:|
| Veteriner / Klinik | 5.000 TL |
| Kuaför / Güzellik | 5.000 TL |
| Pastane / Cafe / Börekçi | 5.000 TL |
| Emlakçı | 7.500 TL |

Yönetilebilir panel sayesinde üst paket fiyatı artırılabilir:

| Paket | Önerilen fiyat |
|---|---:|
| Basit site + talep paneli | 5.000 TL |
| Yönetilebilir site paneli | 7.500 - 10.000 TL |
| Emlak ilan yönetimli panel | 10.000 - 15.000 TL |

## Satış Cümlesi

> Size sıfırdan özel yazılım yapmıyoruz. Hazır sektör şablonumuzu işletmenize uyarlıyoruz. Mobil uyumlu site, WhatsApp bağlantısı, talep/randevu/sipariş formu, e-posta bildirimi, admin panel canlı uyarısı, KVKK/gizlilik sayfaları, SEO altyapısı ve kendi kendinize güncelleyebileceğiniz admin paneliyle tek seferlik kurulum ücretiyle yayına alıyoruz.

## Teslimat Kontrol Listesi

```text
1. Müşteri sektörü ve arayüz varyantı seçilir.
2. Firma adı, logo, renk, telefon, adres, sosyal medya bilgileri alınır.
3. Firebase projesi ve Auth admin kullanıcısı hazırlanır.
4. Firestore ve Storage rules deploy edilir.
5. Vercel/Netlify env değerleri girilir.
6. NEXT_PUBLIC_DEMO_MODE=false yapılır.
7. NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=true yapılır.
8. NEXT_PUBLIC_SITE_URL gerçek domain yapılır.
9. REQUEST_NOTIFICATION_TO müşteri e-postası yapılır.
10. Hakkımızda/KVKK/gizlilik/SSS metinleri kontrol edilir.
11. Form gönderme, e-posta bildirim, admin canlı uyarı test edilir.
12. Görsel yükleme ve ilan/hizmet/kampanya yönetimi test edilir.
13. robots.txt, sitemap.xml ve mobil görünüm kontrol edilir.
14. Admin panel kullanımı müşteriye anlatılır.
15. Teslim tamamlanır.
```

## Bilinen Sınır

Aynı Firebase projesinde çok müşterili kullanım için `ownerUid/businessId` bazlı gelişmiş rol sistemi gerekir. Mevcut güvenlik modeli müşteri başına ayrı Firebase projesi veya tek işletme kurulumu için uygundur.
