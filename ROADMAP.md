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
| Faz 3 | Appointment template | Done / Firebase-ready Draft | Veteriner/klinik/randevu şablonunu çıkarmak |
| Faz 4 | Salon template | Done / Firebase-ready Draft | Kuaför/güzellik salonu şablonunu çıkarmak |
| Faz 5 | Real Estate template | Done / Firestore-ready MVP | Emlakçı ilan ve portföy şablonunu çıkarmak |
| Faz 6 | Admin panel MVP | Done / Firestore-ready MVP | Randevu, talep ve ilan yönetimini tek admin panelde toplamak |
| Faz 7 | Firebase entegrasyonu | Done / MVP | Firestore kayıt, Auth ve müşteri config kurulumunu bağlamak |
| Faz 8 | Satış ve teslimat dokümantasyonu | Done / First Draft | Kurulum rehberi, satış metni ve müşteri teslim süreci hazırlamak |

---

## Faz 1 — Monorepo ve Temel Mimari

Amaç: Repo içinde çalışabilir temel yapıyı oluşturmak.

Yapılanlar:

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
- [x] GitHub Actions web build workflow eklendi.

Kalan:

- [ ] Local build/dev test yapılacak.
- [ ] GitHub Actions build sonucu kontrol edilecek.

---

## Faz 2 — Ortak Tema ve Premium UI Sistemi

Yapılanlar:

- [x] Global CSS tema sistemi oluşturuldu.
- [x] CSS değişkenleri eklendi: `--primary`, `--secondary`, `--accent`, `--soft`, `--dark`.
- [x] Premium landing component yapısı kuruldu.
- [x] Template seçimine göre tema rengi değişiyor.
- [x] Hero, mockup panel, hizmet kartları, ekip kartları ve form preview eklendi.
- [x] `/`, `/appointment`, `/salon`, `/real-estate` route'ları açıldı.
- [x] `/properties` ve `/properties/[id]` emlak ilan sayfaları eklendi.

Kalan:

- [ ] Gerçek müşteri görselleri için görsel alanları güçlendirilecek.
- [ ] Mobilde son görsel kontrol yapılacak.

---

## Faz 3 — Appointment Template

Yapılanlar:

- [x] Demo veteriner config'i oluşturuldu.
- [x] Landing ana sayfa ilk taslak hazır.
- [x] Hizmetler bölümü hazır.
- [x] Uzman/veteriner/doktor kartları hazır.
- [x] Randevu talep formu hazır.
- [x] Form `createBusinessRequest()` servisine bağlandı.
- [x] Firebase yoksa demo mode mesajı gösteriyor.
- [x] WhatsApp CTA mantığı hazır.
- [x] `/appointment` route'u açıldı.

Kalan:

- [ ] Klinik/veteriner için galeri ve harita alanı güçlendirilecek.
- [ ] Pet özel alanları admin listede detaylı gösterilecek.

---

## Faz 4 — Salon Template

Yapılanlar:

- [x] Demo salon config'i oluşturuldu.
- [x] Landing ana sayfa ilk taslak hazır.
- [x] Hizmet/fiyat listesi hazır.
- [x] Personel kartları hazır.
- [x] Randevu formu hazır.
- [x] Form `createBusinessRequest()` servisine bağlandı.
- [x] Firebase yoksa demo mode mesajı gösteriyor.
- [x] `/salon` route'u açıldı.

Kalan:

- [ ] Kampanya kartları güçlendirilecek.
- [ ] Instagram/galeri alanı eklenecek.

---

## Faz 5 — Real Estate Template

Yapılanlar:

- [x] Demo real estate config'i oluşturuldu.
- [x] Landing ana sayfa ilk taslak hazır.
- [x] Vitrin portföy/hizmet kartları ilk taslak hazır.
- [x] Danışman kartları hazır.
- [x] İlan talep formu hazır.
- [x] Form `createBusinessRequest()` servisine bağlandı.
- [x] `/real-estate` route'u açıldı.
- [x] `/properties` ilan grid sayfası eklendi.
- [x] `/properties` canlı Firestore property listesini okumaya hazırlandı.
- [x] `/properties/[id]` ilan detay sayfası eklendi.
- [x] İlan detay lead formu `createBusinessRequest()` servisine bağlandı.
- [x] `/admin/properties/new` ilan ekleme formu eklendi.
- [x] İlan ekleme formu `createProperty()` servisine bağlandı.
- [x] Görsel yükleme helper'ı forma bağlandı.

Kalan:

- [ ] Firestore canlı property için detay sayfası dinamik fetch yapılacak.
- [ ] Fotoğraf galerisi görsel URL'leriyle gerçek görsel render edecek.

---

## Faz 6 — Admin Panel MVP

Yapılanlar:

- [x] `/admin` demo panel route'u açıldı.
- [x] Talep/randevu listesi demo data ile gösteriliyor.
- [x] Admin panel `listBusinessRequests()` ile Firestore canlı kayıtlarını okumaya çalışıyor.
- [x] Firebase bağlı değilse demo data'ya düşüyor.
- [x] Admin panel route guard opsiyonel eklendi.
- [x] Status güncelleme `updateBusinessRequestStatus()` servisine bağlandı.
- [x] Admin notu `updateBusinessRequestAdminNote()` servisine bağlandı.
- [x] WhatsApp'a geçiş butonu eklendi.
- [x] Emlak ilan demo listesi gösteriliyor.
- [x] Şablon durumu kartları gösteriliyor.
- [x] Premium admin panel CSS eklendi.
- [x] `/login` admin giriş sayfası eklendi.
- [x] `/admin/properties/new` yeni ilan formu eklendi.

Kalan:

- [ ] Salon/klinik için hizmet listesi yönetimi yapılacak.
- [ ] Admin CSV export gerçek işlem yapılacak.

---

## Faz 7 — Firebase Entegrasyonu

Yapılanlar:

- [x] Firebase package scaffold eklendi.
- [x] Firebase client helper eklendi.
- [x] Firebase Auth helper eklendi.
- [x] Firestore collection constants eklendi.
- [x] Request servisleri eklendi.
- [x] Admin note request servisi eklendi.
- [x] Property servisleri eklendi.
- [x] Storage upload helper eklendi.
- [x] Web landing formları request servisine bağlandı.
- [x] Emlak ilan detay formu request servisine bağlandı.
- [x] Admin panel request servisinden canlı kayıt okumaya hazırlandı.
- [x] Admin status ve note update servislerine bağlandı.
- [x] Emlak property listesi Firestore'dan okumaya hazırlandı.
- [x] Emlak property create formu Firestore'a bağlandı.
- [x] `.env.example` hazırlandı.
- [x] Firestore rules taslağı yazıldı.
- [x] Storage rules taslağı yazıldı.
- [x] `firebase.json` eklendi.
- [x] Firebase kurulum dokümanı güncellendi.

Kalan:

- [ ] Firestore/Storage canlı test yapılacak.
- [ ] Admin Auth gerçek müşteri hesabıyla test edilecek.

---

## Faz 8 — Satış ve Teslimat Dokümantasyonu

Yapılanlar:

- [x] `docs/sales-guide.md`
- [x] `docs/setup-guide.md`
- [x] `docs/firebase-setup.md`
- [x] `docs/deployment-guide.md`
- [x] `docs/customer-checklist.md`
- [x] `docs/demo-pitch.md`
- [x] `docs/first-customer-onboarding.md`
- [x] Fiyat listesi ve ekstra iş tablosu README/sales-guide içinde var.

Kalan:

- [ ] Demo video/sunum metni genişletilecek.

---

## Sıradaki Net İş

```text
1. Build/dev hataları kontrol edilecek.
2. GitHub Actions workflow sonucu kontrol edilecek.
3. Canlı Firebase test yapılacak.
4. Fotoğraf URL'leri gerçek görsel galeri olarak render edilecek.
5. Salon/klinik hizmet yönetim ekranı yapılacak.
```
