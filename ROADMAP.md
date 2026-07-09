# FK Service Templates Roadmap

Bu roadmap, FK Service Templates reposunun satışa hazır 3 sektör şablonuna dönüşmesi için izlenecek fazları gösterir.

Ana hedef: **Arrivio kalitesinde modern arayüz mantığına sahip, ama farklı sektörlere hızlı uyarlanabilen hazır web + admin panel şablonları üretmek.**

---

## Faz Sayısı

Toplam plan: **8 faz**

| Faz | Ad | Durum | Amaç |
|---|---|---|---|
| Faz 1 | Monorepo ve temel mimari | Current | Next.js web, shared config ve template klasörlerini kurmak |
| Faz 2 | Ortak tema ve premium UI sistemi | Next | Arrivio benzeri modern, kartlı, ferah ve mobil uyumlu tasarım dili kurmak |
| Faz 3 | Appointment template | Next | Veteriner/klinik/randevu şablonunu çıkarmak |
| Faz 4 | Salon template | Next | Kuaför/güzellik salonu şablonunu çıkarmak |
| Faz 5 | Real Estate template | Next | Emlakçı ilan ve portföy şablonunu çıkarmak |
| Faz 6 | Admin panel MVP | Planned | Randevu, talep ve ilan yönetimini tek admin panelde toplamak |
| Faz 7 | Firebase entegrasyonu | Planned | Firestore kayıt, Auth ve müşteri config kurulumunu bağlamak |
| Faz 8 | Satış ve teslimat dokümantasyonu | Planned | Kurulum rehberi, satış metni ve müşteri teslim süreci hazırlamak |

---

## Faz 1 — Monorepo ve Temel Mimari

Amaç: Repo içinde çalışabilir temel yapıyı oluşturmak.

Yapılacaklar:

- [x] README yazıldı.
- [x] ROADMAP yazıldı.
- [ ] `package.json` oluşturulacak.
- [ ] `pnpm-workspace.yaml` oluşturulacak.
- [ ] `tsconfig.base.json` oluşturulacak.
- [ ] `apps/web` Next.js uygulaması oluşturulacak.
- [ ] `packages/shared` ortak tip/config paketi oluşturulacak.
- [ ] `packages/firebase` Firebase helper paketi için başlangıç oluşturulacak.
- [ ] `templates/appointment`, `templates/salon`, `templates/real-estate` klasörleri oluşturulacak.
- [ ] `configs` demo müşteri configleri oluşturulacak.

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

Arrivio referansı:

- Büyük logo/nav alanı
- Üst bilgi bandı
- Büyük hero başlık
- Sağda mockup/panel kartı
- Alt kısımda istatistik/servis kartları
- Sekmeli talep paneli mantığı

FK Templates farkı:

- Her sektöre göre renk ve metin değişecek.
- Tasarım aynı kalite çizgisinde kalacak.
- Her şablon farklı hissedecek ama aynı altyapıyı kullanacak.

Yapılacaklar:

- [ ] Global CSS tema sistemi oluşturulacak.
- [ ] CSS değişkenleri: `--primary`, `--secondary`, `--accent`, `--surface`, `--text`.
- [ ] Ortak componentler: Nav, Hero, FeatureGrid, RequestForm, TrustCards, Footer.
- [ ] Template seçimine göre tema rengi değişecek.

---

## Faz 3 — Appointment Template

Hedef: Veteriner, klinik, doktor, psikolog, diyetisyen, fizyoterapi gibi randevu odaklı işletmeler.

Sayfalar:

- [ ] Landing ana sayfa
- [ ] Hizmetler bölümü
- [ ] Uzman/veteriner/doktor kartları
- [ ] Randevu talep formu
- [ ] Acil WhatsApp CTA
- [ ] Galeri/Hakkımızda alanı
- [ ] Google Maps/iletişim alanı

Form alanları:

- [ ] Ad soyad
- [ ] Telefon
- [ ] Hizmet tipi
- [ ] Tercih edilen tarih
- [ ] Tercih edilen saat
- [ ] Not
- [ ] Veteriner için pet adı/türü opsiyonu

Başarı kriteri:

```text
/templates/appointment veya /?template=appointment
```

sayfası demo veteriner/klinik sitesi gibi görünecek.

---

## Faz 4 — Salon Template

Hedef: Kuaför, berber, güzellik salonu, lazer epilasyon, nail art, spa.

Sayfalar:

- [ ] Landing ana sayfa
- [ ] Hizmet/fiyat listesi
- [ ] Kampanya kartları
- [ ] Personel seçimi
- [ ] Randevu formu
- [ ] Galeri/Instagram alanı
- [ ] WhatsApp CTA

Başarı kriteri:

```text
/templates/salon veya /?template=salon
```

sayfası modern güzellik/kuaför sitesi gibi görünecek.

---

## Faz 5 — Real Estate Template

Hedef: Emlak ofisi, gayrimenkul danışmanı, günlük kiralık işletmeler.

Sayfalar:

- [ ] Landing ana sayfa
- [ ] Vitrin ilan kartları
- [ ] Satılık/kiralık filtreleri
- [ ] İlan detay görünümü
- [ ] Danışman kartları
- [ ] İlan sor formu
- [ ] Evimi satmak istiyorum formu

Başarı kriteri:

```text
/templates/real-estate veya /?template=real-estate
```

sayfası portföy/ilan odaklı emlak sitesi gibi görünecek.

---

## Faz 6 — Admin Panel MVP

Amaç: Her template için tek admin panel mantığı kurmak.

Yapılacaklar:

- [ ] Admin login sayfası
- [ ] Talep/randevu listesi
- [ ] Status güncelleme
- [ ] WhatsApp'a geçiş
- [ ] Not ekleme
- [ ] Emlak için ilan ekleme/düzenleme
- [ ] Salon/klinik için hizmet listesi yönetimi

Başarı kriteri:

```text
/admin
```

sayfası müşteri işletmenin taleplerini yönetebileceği kadar yeterli olmalı.

---

## Faz 7 — Firebase Entegrasyonu

Amaç: Şablonların gerçek müşteri kurulumunda kullanılacak veri altyapısını bağlamak.

Yapılacaklar:

- [ ] Firebase client oluşturulacak.
- [ ] Firestore request servisleri eklenecek.
- [ ] Admin Auth eklenecek.
- [ ] `.env.example` hazırlanacak.
- [ ] Firestore rules taslağı yazılacak.
- [ ] Storage opsiyonel görsel yükleme için hazırlanacak.

Başarı kriteri:

```text
Form gönder → Firestore kaydı oluşur → Admin panelde görünür.
```

---

## Faz 8 — Satış ve Teslimat Dokümantasyonu

Amaç: Bu repo sadece kod değil, satılabilir ürün paketi olacak.

Yapılacaklar:

- [ ] `docs/sales-guide.md`
- [ ] `docs/setup-guide.md`
- [ ] `docs/firebase-setup.md`
- [ ] `docs/deployment-guide.md`
- [ ] Müşteriden alınacak bilgiler checklisti
- [ ] Fiyat listesi ve ekstra iş tablosu
- [ ] Demo sunum metni

Başarı kriteri:

Bir müşteri geldiğinde şu akış net olmalı:

```text
Şablon seç → Bilgileri al → Config düzenle → Deploy et → Paneli anlat → Teslim et.
```

---

## Sıradaki Net İş

```text
Faz 1 dosya iskeletini oluştur.
Ardından Faz 2 premium UI mantığıyla apps/web içinde ilk demo landing ekranını çıkar.
İlk çalışan demo 3 template kartı + template switch + modern hero + form preview içermeli.
```
