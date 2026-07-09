# Kurulum Rehberi

Bu rehber FK Service Templates ile yeni bir müşteri sitesi kurulurken izlenecek adımları gösterir.

## 1. Müşteri bilgilerini al

- Firma adı
- Logo
- Ana renk
- Telefon
- WhatsApp numarası
- Adres
- Google Maps linki
- Instagram linki
- Hizmet listesi
- Personel/uzman listesi
- Görseller
- Domain bilgisi

## 2. Template seç

```text
appointment -> veteriner / klinik / randevu
salon -> kuaför / güzellik
real-estate -> emlak / ilan
```

## 3. Config oluştur

`configs/` klasörü içinde müşteriye özel config dosyası oluşturulur.

Örnek:

```text
configs/mavi-veteriner.ts
configs/luna-beauty.ts
configs/mavi-emlak.ts
```

## 4. Web arayüzünü test et

```bash
pnpm install
pnpm dev
```

## 5. Deploy et

İlk öneri Netlify veya Vercel kullanmaktır.

## 6. Teslim et

- Canlı link paylaşılır.
- Admin panel kullanım videosu/ekran görüntüsü gönderilir.
- Domain bağlantısı tamamlanır.
- Müşteriye yedek bilgiler verilir.
