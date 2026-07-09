# Firebase Kurulum Rehberi

Bu rehber her müşteri için ayrı Firebase projesi açılacağı varsayımıyla hazırlanmıştır.

## 1. Firebase project oluştur

Firebase Console içinde yeni proje açılır.

Önerilen proje adı:

```text
fk-template-musteri-adi
```

## 2. Web app oluştur

Project settings → General → Your apps → Web app oluştur.

Aşağıdaki değerler `.env` içine yazılır:

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 3. Firestore aç

Firestore Database oluşturulur.

İlk koleksiyonlar:

```text
requests
appointments
properties
services
staff
settings
```

## 4. Authentication aç

Authentication → Sign-in method → Email/Password aktif edilir.

Admin kullanıcı müşterinin e-postasıyla oluşturulur.

## 5. Rules deploy

Bu repodaki `firestore.rules` dosyası ilk MVP rules taslağıdır.

Geliştirme sürecinde müşteri ihtiyacına göre sıkılaştırılmalıdır.

## 6. Teslim öncesi kontrol

- Form kaydı Firestore'a düşüyor mu?
- Admin kullanıcı login olabiliyor mu?
- İlanlar public okunuyor mu?
- Sadece admin yazabiliyor mu?
- WhatsApp linkleri doğru mu?
