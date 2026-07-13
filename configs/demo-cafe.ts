import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoCafeConfig: BusinessTemplateConfig = {
  template: "cafe",
  sector: "Cafe / Pastane / Fırın / Restoran",
  brandName: "Fırın & Cafe",
  eyebrow: "Günlük taze ürün, paket sipariş ve lezzet vitrini",
  heroTitle: "Günlük taze lezzetleri dijital vitrinde siparişe dönüştür.",
  heroDescription: "Cafe, pastane, fırın ve restoran işletmeleri için menü, görsel vitrin, WhatsApp sipariş, konum ve hızlı talep alan modern web sitesi.",
  primaryCta: "WhatsApp’tan Sipariş Ver",
  secondaryCta: "Menüyü İncele",
  topBarText: "Günlük taze ürünler • Paket sipariş • Toplu sipariş • WhatsApp destek",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#7C2D12",
    secondary: "#F97316",
    accent: "#FACC15",
    soft: "#FFF7ED",
    dark: "#431407"
  },
  navItems: ["Menü", "Vitrin", "Konum", "Sipariş"],
  stats: [
    { value: "Günlük", label: "taze ürün" },
    { value: "Menü", label: "kategori düzeni" },
    { value: "WA", label: "hızlı sipariş" },
    { value: "Konum", label: "yol tarifi" }
  ],
  services: [
    { title: "Ana Lezzetler", description: "İşletmenin öne çıkan ürünleri, günlük çıkan ana menü seçenekleri ve vitrin ürünleri.", price: "Fiyat Sor" },
    { title: "Kahvaltı & Atıştırmalık", description: "Sabah ürünleri, hızlı servis seçenekleri, kahvaltılık ve gün içi atıştırmalıklar.", price: "Fiyat Sor" },
    { title: "Tatlı & İçecek", description: "Tatlı, pasta, kurabiye, kahve, sıcak-soğuk içecek ve günlük ikram seçenekleri.", price: "Fiyat Sor" },
    { title: "Paket & Gel-Al", description: "Telefon veya WhatsApp üzerinden hızlı sipariş, gel-al ve paket servis yönlendirmesi.", price: "Fiyat Sor" },
    { title: "Toplu Sipariş", description: "İş yeri, okul, toplantı, özel gün ve etkinlikler için toplu sipariş desteği.", price: "Fiyat Sor" }
  ],
  campaignItems: [
    { title: "Günlük Taze Vitrin", description: "Günün öne çıkan ürünleri, sıcak çıkan lezzetler ve vitrin duyuruları.", price: "Günlük" },
    { title: "Paket ve Gel-Al Kolaylığı", description: "Müşteri WhatsApp üzerinden sipariş bırakır, işletme uygunluk ve fiyat bilgisiyle dönüş yapar.", price: "Hızlı dönüş" },
    { title: "Toplu Sipariş Desteği", description: "Şirket, okul, toplantı ve özel günler için ürün ve adet bilgisi alınır.", price: "Fiyat Sor" }
  ],
  galleryItems: [
    { title: "Ürün vitrini", description: "Taze çıkan ürünler ve vitrin görselleri için galeri alanı." },
    { title: "Mekan atmosferi", description: "Mekan içi, masa düzeni, sunum ve müşteri deneyimi görselleri." },
    { title: "Paket ve özel sipariş", description: "Paket servis, özel gün ve toplu sipariş örnekleri." }
  ],
  staff: [
    { name: "Üretim Ekibi", role: "Günlük hazırlık", description: "Günlük ürün, menü ve vitrin hazırlıklarının takibi." },
    { name: "Sipariş Ekibi", role: "Müşteri dönüşü", description: "WhatsApp, telefon ve form taleplerine hızlı dönüş." }
  ],
  form: {
    title: "Sipariş ve menü bilgi talebi",
    description: "Menü, paket sipariş, toplu sipariş veya güncel fiyat bilgisi için formu doldurun. İşletme size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Talep tipi", type: "select", options: ["Menü ve fiyat bilgisi", "Paket sipariş", "Gel-al sipariş", "Toplu sipariş", "Rezervasyon / masa bilgisi"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "time", label: "Tercih edilen saat", type: "time" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Ürün, adet, teslim/masa notu yazın" }
    ]
  }
};