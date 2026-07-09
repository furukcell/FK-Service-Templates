# Deployment Rehberi

İlk MVP için önerilen deploy yolu Netlify veya Vercel'dir.

## Web build

```bash
pnpm install
pnpm build
```

## Netlify önerisi

Root directory:

```text
/
```

Build command:

```text
pnpm --filter @fk-templates/web build
```

Publish directory:

```text
apps/web/.next
```

Next.js plugin aktif olmalıdır.

## Vercel önerisi

Framework preset: Next.js

Root directory:

```text
apps/web
```

Install command:

```text
pnpm install
```

Build command:

```text
pnpm build
```

## Müşteri domain bağlantısı

Müşteri domain panelinden Netlify/Vercel DNS kayıtları girilir.

Teslimden önce kontrol listesi:

- Site mobilde açılıyor mu?
- WhatsApp linki doğru mu?
- Telefon/adres doğru mu?
- Form çalışıyor mu?
- Google Maps linki doğru mu?
- Logo ve renkler doğru mu?
