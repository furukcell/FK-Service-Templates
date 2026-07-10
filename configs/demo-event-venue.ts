import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoEventVenueConfig: BusinessTemplateConfig = {
  template: "event-venue",
  sector: "Düğün Salonu / Organizasyon",
  brandName: "Zarif Davet Salonu",
  eyebrow: "Düğün, nişan, kına ve özel davetler için premium salon vitrini",
  heroTitle: "Hayalinizdeki davet için şık, güven veren ve unutulmaz bir salon.",
  heroDescription: "Düğün salonu, kır düğünü, kına, nişan ve özel organizasyon mekanları için galeri, paketler, konum ve uygun tarih talebi alan modern web sitesi.",
  primaryCta: "Tarih Sor",
  secondaryCta: "Salonları İncele",
  topBarText: "Düğün • Kına • Nişan • Sünnet • Yemekli davet • Ön rezervasyon talebi",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#1E1B4B",
    secondary: "#C9A227",
    accent: "#F4D35E",
    soft: "#FFFBEB",
    dark: "#111827"
  },
  navItems: ["Salon", "Paketler", "Galeri", "Tarih Sor"],
  stats: [
    { value: "500+", label: "kişilik davet alanı" },
    { value: "4+", label: "organizasyon tipi" },
    { value: "1 dk", label: "tarih talebi" },
    { value: "Premium", label: "davet vitrini" }
  ],
  services: [
    { title: "Düğün Paketi", description: "Salon kullanımı, masa düzeni, ses-ışık sistemi ve organizasyon desteğiyle özel gününüz için hazır paket.", price: "Tarih sor" },
    { title: "Kına ve Nişan Organizasyonu", description: "Kına gecesi, söz ve nişan davetleri için konsept düzen, sahne ve davet alanı çözümleri.", price: "Teklif al" },
    { title: "Yemekli Davet Paketi", description: "Davetli sayısına göre yemekli organizasyon, servis düzeni ve masa yerleşimi planlaması.", price: "Bilgi al" }
  ],
  campaignItems: [
    { title: "2026 sezon rezervasyonları", description: "Düğün, kına ve nişan tarihleriniz için erken ön rezervasyon talebi bırakabilirsiniz.", price: "Tarih sor" },
    { title: "Hafta içi davet avantajı", description: "Hafta içi organizasyonlar için uygun tarih ve paket seçenekleri sunulabilir.", price: "Teklif al" },
    { title: "Kına + düğün paketi", description: "Kına ve düğünü aynı mekanda planlamak isteyen çiftler için paket bilgi talebi.", price: "Detay sor" }
  ],
  galleryItems: [
    { title: "Salon genel görünüm", description: "Masa düzeni, sahne, pist ve salon kapasitesini gösteren geniş açı görseller." },
    { title: "Gelin yolu ve sahne", description: "Giriş konsepti, ışık sistemi, sahne ve özel çekim alanları için galeri vitrini." },
    { title: "Masa ve konsept düzeni", description: "Yemekli davet, kına, nişan ve düğün konseptlerinden örnek görseller." }
  ],
  staff: [
    { name: "Organizasyon Ekibi", role: "Davet Planlama", description: "Düğün, nişan, kına ve özel davetlerin hazırlık sürecini planlar." },
    { name: "Salon Sorumlusu", role: "Operasyon", description: "Davet günü salon düzeni, masa yerleşimi ve ekip koordinasyonunu takip eder." }
  ],
  form: {
    title: "Uygun tarih ve paket bilgisi alın",
    description: "Organizasyon türünü, tahmini davetli sayısını ve düşündüğünüz tarihi yazın; salon ekibi size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Organizasyon türü", type: "select", options: ["Düğün", "Kına Gecesi", "Nişan / Söz", "Sünnet Düğünü", "Yemekli Davet", "Salon Kiralama", "Diğer"] },
      { key: "guestCount", label: "Tahmini davetli sayısı", type: "select", options: ["100-200 kişi", "200-400 kişi", "400-600 kişi", "600+ kişi", "Henüz net değil"] },
      { key: "date", label: "Düşünülen tarih", type: "date" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Tarih, davetli sayısı, yemekli/yemeksiz tercih veya özel isteklerinizi yazın" }
    ]
  }
};