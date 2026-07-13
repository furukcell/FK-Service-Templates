import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoLotusBorekConfig: BusinessTemplateConfig = {
  template: "cafe",
  sector: "Pastane / Cafe / Börekçi",
  brandName: "Lotus Börek Evi",
  eyebrow: "Milas’ta günlük taze börek ve tepsi sipariş",
  heroTitle: "Günlük taze börek ve tepsi sipariş için Lotus Börek Evi.",
  heroDescription: "Lotus Börek Evi’nde günlük taze hazırlanan börek çeşitleri, gel-al siparişler ve toplu tepsi siparişleri için hızlı iletişim.",
  primaryCta: "WhatsApp’tan Sipariş Ver",
  secondaryCta: "Menüyü İncele",
  topBarText: "Günlük taze börek • Tepsi sipariş • Gel-al sipariş • Toplu sipariş",
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
  navItems: ["Menü", "Tepsi Sipariş", "Kampanyalar", "Galeri"],
  stats: [
    { value: "Günlük", label: "taze üretim" },
    { value: "Tepsi", label: "sipariş imkanı" },
    { value: "Gel-al", label: "hızlı sipariş" },
    { value: "Toplu", label: "sipariş desteği" }
  ],
  services: [
    { title: "Su Böreği", description: "Günlük taze hazırlanır. Porsiyon, kilo veya tepsi olarak sipariş alınabilir.", price: "Fiyat sor" },
    { title: "Kıymalı Börek", description: "Sıcak servis ve gel-al sipariş için taze kıymalı börek seçeneği.", price: "Sipariş ver" },
    { title: "Peynirli Börek", description: "Kahvaltı, iş yeri ve toplu siparişler için klasik peynirli börek.", price: "Bilgi al" },
    { title: "Patatesli Börek", description: "Günlük tüketim ve tepsi siparişlerinde pratik, lezzetli seçenek.", price: "Fiyat sor" },
    { title: "Tepsi Börek Siparişi", description: "Özel gün, toplantı, okul ve iş yeri siparişleri için tepsi börek hazırlığı.", price: "Teklif al" },
    { title: "Kilo ile Börek", description: "İhtiyaca göre kilo ile börek siparişi ve gel-al kolaylığı.", price: "Bilgi al" }
  ],
  campaignItems: [
    { title: "Toplu Sipariş Avantajı", description: "İş yeri, okul, toplantı ve özel günler için tepsi börek siparişlerinde hızlı hazırlık.", price: "Teklif al" },
    { title: "Sabah Sıcak Börek", description: "Güne taze ve sıcak börekle başlamak isteyenler için günlük servis.", price: "Günlük" },
    { title: "Gel-Al Sipariş Kolaylığı", description: "Telefon veya WhatsApp üzerinden sipariş verin, hazır olunca gelin alın.", price: "Hızlı dönüş" }
  ],
  galleryItems: [
    { title: "Günlük taze börek", description: "Lotus Börek Evi’nde taze çıkan ürünler için galeri alanı." },
    { title: "Tepsi siparişleri", description: "Toplu sipariş ve özel gün tepsi börek örnekleri." },
    { title: "Dükkan vitrini", description: "Vitrin, tezgah ve ürün sunum görselleri için alan." }
  ],
  staff: [
    { name: "Lotus Börek Ekibi", role: "Günlük üretim", description: "Taze börek çeşitleri ve gel-al sipariş hazırlığı." },
    { name: "Sipariş Ekibi", role: "Talep takibi", description: "WhatsApp, telefon ve form taleplerine hızlı dönüş." }
  ],
  form: {
    title: "Sipariş ve bilgi talebi",
    description: "Tepsi börek, kilo ile börek, toplu sipariş veya menü bilgisi için formu doldurun. Lotus Börek Evi size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Talep tipi", type: "select", options: ["Tepsi börek siparişi", "Kilo ile börek", "Toplu sipariş", "Gel-al sipariş", "Menü ve fiyat bilgisi"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "time", label: "Tercih edilen saat", type: "time" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Ürün, adet, teslim saati veya özel notunuzu yazın" }
    ]
  }
};
