# FK Service Templates Roadmap

Bu roadmap, FK Service Templates reposunun satışa hazır 3 sektör şablonuna dönüşmesi için izlenecek fazları gösterir.

Ana hedef: **Arrivio kalitesinde modern arayüz mantığına sahip, ama farklı sektörlere hızlı uyarlanabilen hazır web + admin panel şablonları üretmek.**

---

## Faz Sayısı

Toplam plan: **8 faz**

| Faz | Ad | Durum | Amaç |
|---|---|---|---|
| Faz 1 | Monorepo ve temel mimari | Done / MVP | Next.js web, shared config ve template klasörlerini kurmak |
| Faz 2 | Ortak tema ve premium UI sistemi | Done / MVP | Arrivio benzeri modern, kartlı, ferah ve mobil uyumlu tasarım dili kurmak |
| Faz 3 | Appointment template | Done / First Draft | Veteriner/klinik/randevu şablonunu çıkarmak |
| Faz 4 | Salon template | Done / First Draft | Kuaför/güzellik salonu şablonunu çıkarmak |
| Faz 5 | Real Estate template | Done / First Draft | Emlakçı ilan ve portföy şablonunu çıkarmak |
| Faz 6 | Admin panel MVP | Done / Demo | Randevu, talep ve ilan yönetimini tek admin panelde toplamak |
| Faz 7 | Firebase entegrasyonu | Partial | Firestore kayıt, Auth ve müşteri config kurulumunu bağlamak |
| Faz 8 | Satış ve teslimat dokümantasyonu | Partial | Kurulum rehberi, satış metni ve müşteri teslim süreci hazırlamak |

---

## Faz 1 — Monorepo ve Temel Mimari

Amaç: Repo içinde çalışabilir temel yapıyı oluşturmak.

Yapılacaklar:

- [x] README yazıldı.
- [x] ROADMAP yazıldı.
- [x] `package.json` oluşturuldu.
- [x] `pnpm-workspace.yaml` oluşturuldu.
- [x] `tsconfig.base.json` oluşturuldu.
- [x] `apps/web` Next.js uygulaması oluşturuldu.
- [x] `packages/shared` ortak tip/config paketi oluşturuldu.
- [x] `packages/firebase` Firebase helper paketi için başlangıç oluşturuldu.
- [x] `templates/appointment`, `templates/salon`, `templates/real-estate` klasörleri oluşturuldu.
- [x] `configs` demo müşteri configleri oluşturuldu.

Kalan:

- [ ] Local build/dev test yapılacak.

Başarı kriteri:

```text
pnpm install
pnpm --filter @fk-templates/web dev
```

komutlarıyla demo web arayüzü çalışmalı.

---

## Faz 2 — Ortak Tema ve Premium UI Sistemi

Amaç: Arayüzler basit, hazır tema gibi değil; modern, güven veren ve satılabilir görünmelidir.

Tasarım prensibi:

```text
Büyük hero alanı
Yumuşak gradient arka plan
Kartlı servis sunumu
Mobil öncelikli layout
Net CTA butonları
WhatsApp odaklı hızlı iletişim
Admin/panel algısı veren mockup kartları
```

Yapılanlar:

- [x] Global CSS tema sistemi oluşturuldu.
- [x] CSS değişkenleri eklendi: `--primary`, `--secondary`, `--accent`, `--soft`, `--dark`.
- [x] Premium landing component yapısı kuruldu.
- [x] Template seçimine göre tema rengi değişiyor.
- [x] Hero, mockup panel, hizmet kartları, ekip kartları ve form preview eklendi.
- [x] `/`, `/appointment`, `/salon`, `/real-estate` route'ları açıldı.

Kalan:

- [ ] Gerçek müşteri görselleri için görsel alanları güçlendirilecek.
- [ ] Mobilde son görsel kontrol yapılacak.

---

## Faz 3 — Appointment Template

Hedef: Veteriner, klinik, doktor, psikolog, diyetisyen, fizyoterapi gibi randevu odaklı işletmeler.

Yapılanlar:

- [x] Demo veteriner config'i oluşturuldu.
- [x] Landing ana sayfa ilk taslak hazır.
- [x] Hizmetler bölümü hazır.
- [x] Uzman/veteriner/doktor kartları hazır.
- [x] Randevu talep formu preview hazır.
- [x] WhatsApp CTA mantığı hazır.
- [x] `/appointment` route'u açıldı.

Kalan:

- [ ] Form Firestore'a bağlanacak.
- [ ] Klinik/veteriner için galeri ve harita alanı güçlendirilecek.
- [ ] Pet özel alanları admin listede gösterilecek.

Başarı kriteri:

```text
/appointment
```

sayfası demo veteriner/klinik sitesi gibi görünecek.

---

## Faz 4 — Salon Template

Hedef: Kuaför, berber, güzellik salonu, lazer epilasyon, nail art, spa.

Yapılanlar:

- [x] Demo salon config'i oluşturuldu.
- [x] Landing ana sayfa ilk taslak hazır.
- [x] Hizmet/fiyat listesi hazır.
- [x] Personel kartları hazır.
- [x] Randevu formu preview hazır.
- [x] `/salon` route'u açıldı.

Kalan:

- [ ] Kampanya kartları güçlendirilecek.
- [ ] Instagram/galeri alanı eklenecek.
- [ ] Salon formu Firestore'a bağlanacak.

Başarı kriteri:

```text
/salon
```

sayfası modern güzellik/kuaför sitesi gibi görünecek.

---

## Faz 5 — Real Estate Template

Hedef: Emlak ofisi, gayrimenkul danışmanı, günlük kiralık işletmeler.

Yapılanlar:

- [x] Demo real estate config'i oluşturuldu.
- [x] Landing ana sayfa ilk taslak hazır.
- [x] Vitrin portföy/hizmet kartları ilk taslak hazır.
- [x] Danışman kartları hazır.
- [x] İlan talep formu preview hazır.
- [x] `/real-estate` route'u açıldı.

Kalan:

- [ ] Gerçek ilan grid'i yapılacak.
- [ ] İlan detay sayfası yapılacak.
- [ ] Admin ilan ekleme formu yapılacak.

Başarı kriteri:

```text
/real-estate
```

sayfası portföy/ilan odaklı emlak sitesi gibi görünecek.

---

## Faz 6 — Admin Panel MVP

Amaç: Her template için tek admin panel mantığı kurmak.

Yapılanlar:

- [x] `/admin` demo panel route'u açıldı.
- [x] Talep/randevu listesi demo data ile gösteriliyor.
- [x] Emlak ilan demo listesi gösteriliyor.
- [x] Şablon durumu kartları gösteriliyor.
- [x] Premium admin panel CSS eklendi.

Kalan:

- [ ] Admin login sayfası yapılacak.
- [ ] Status güncelleme gerçek işlem olacak.
- [ ] WhatsApp'a geçiş butonu eklenecek.
- [ ] Not ekleme yapılacak.
- [ ] Emlak için ilan ekleme/düzenleme formu yapılacak.
- [ ] Salon/klinik için hizmet listesi yönetimi yapılacak.

Başarı kriteri:

```text
/admin
```

sayfası müşteri işletmenin taleplerini yönetebileceği kadar yeterli olmalı.

---

## Faz 7 — Firebase Entegrasyonu

Amaç: Şablonların gerçek müşteri kurulumunda kullanılacak veri altyapısını bağlamak.

Yapılanlar:

- [x] Firebase package scaffold eklendi.
- [x] Firebase client helper eklendi.
- [x] Firestore collection constants eklendi.
- [x] Request servisleri eklendi.
- [x] Property servisleri eklendi.
- [x] `.env.example` hazırlandı.
- [x] Firestore rules taslağı yazıldı.
- [x] Firebase kurulum dokümanı yazıldı.

Kalan:

- [ ] Web formları Firebase request servislerine bağlanacak.
- [ ] Admin panel Firestore listelerine bağlanacak.
- [ ] Admin Auth eklenecek.
- [ ] Storage opsiyonel görsel yükleme için hazırlanacak.

Başarı kriteri:

```text
Form gönder → Firestore kaydı oluşur → Admin panelde görünür.
```

---

## Faz 8 — Satış ve Teslimat Dokümantasyonu

Amaç: Bu repo sadece kod değil, satılabilir ürün paketi olacak.

Yapılanlar:

- [x] `docs/sales-guide.md`
- [x] `docs/setup-guide.md`
- [x] `docs/firebase-setup.md`
- [x] `docs/deployment-guide.md`
- [x] Fiyat listesi ve ekstra iş tablosu README/sales-guide içinde var.

Kalan:

- [ ] Müşteriden alınacak bilgiler checklisti ayrı dosya yapılacak.
- [ ] Demo sunum metni yazılacak.
- [ ] İlk müşteri onboarding checklist'i hazırlanacak.

Başarı kriteri:

Bir müşteri geldiğinde şu akış net olmalı:

```text
Şablon seç → Bilgileri al → Config düzenle → Deploy et → Paneli anlat → Teslim et.
```

---

## Sıradaki Net İş

```text
1. Local build/dev hataları kontrol edilecek.
2. Form submit state'i eklenecek.
3. Web formları createBusinessRequest() ile Firestore'a bağlanacak.
4. Admin panel listBusinessRequests() ile gerçek veriyi gösterecek.
5. Emlak ilan grid'i ve ilan detay sayfası yapılacak.
```
