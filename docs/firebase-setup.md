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
NEXT_PUBLIC_BUSINESS_ID=demo-business
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=false
```

`NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=false` demo için kullanılır. Müşteri tesliminde admin panelin giriş istemesi için `true` yapılır.

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

Müşteri tesliminde:

```text
NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=true
```

olarak ayarlanır. Bu durumda `/admin` ve `/admin/properties/new` ekranları login kontrolü yapar.

## 5. Storage aç

Firebase Storage etkinleştirilir.

İlk klasörler:

```text
business-images
property-images
```

Storage rules taslağı `storage.rules` dosyasındadır. Görseller public okunabilir, yazma işlemi admin girişine bağlıdır.

## 6. Rules deploy

Bu repodaki `firestore.rules` ve `storage.rules` dosyaları ilk MVP rules taslağıdır.

```bash
firebase deploy --only firestore:rules,storage
```

Geliştirme sürecinde müşteri ihtiyacına göre sıkılaştırılmalıdır.

## 7. Teslim öncesi kontrol

- Form kaydı Firestore'a düşüyor mu?
- Admin kullanıcı login olabiliyor mu?
- Admin panel canlı kayıtları okuyabiliyor mu?
- Admin status ve not güncelleyebiliyor mu?
- Emlak ilanı eklenebiliyor mu?
- İlanlar public okunuyor mu?
- Storage görsel yazma sadece admin girişinde mi?
- WhatsApp linkleri doğru mu?
