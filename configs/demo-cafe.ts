import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoCafeConfig: BusinessTemplateConfig = {
  template: "cafe",
  sector: "Pastane / Cafe / Börekçi",
  brandName: "Fırın & Cafe",
  eyebrow: "Günlük ürün, paket sipariş ve masa talebi alan modern işletme sitesi",
  heroTitle: "Sıcak lezzetleri dijital vitrinde siparişe ve rezervasyona dönüştür.",
  heroDescription: "Pastane, cafe ve börekçi işletmeleri için menü, kampanya, galeri, toplu sipariş ve masa/ürün talebi alan hazır web sitesi.",
  primaryCta: "Sipariş / Talep Bırak",
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
  navItems: ["Menü", "Kampanyalar", "Galeri", "Sipariş"],
  stats: [
    { value: "Günlük", label: "taze üretim" },
    { value: "10+", label: "ürün grubu" },
    { value: "1 dk", label: "talep formu" },
    { value: "IG", label: "lezzet vitrini" }
  ],
  services: [
    { title: "Kahvaltı & Cafe Ürünleri", description: "Kahve, tatlı, kahvaltı tabakları ve günlük atıştırmalıklar.", price: "Menüden seç" },
    { title: "Börek & Poğaça Çeşitleri", description: "Günlük taze börek, poğaça, açma ve tuzlu ürün çeşitleri.", price: "₺25+" },
    { title: "Pasta & Tatlı Siparişi", description: "Doğum günü, özel gün ve toplu tatlı/pasta siparişleri.", price: "Teklif al" }
  ],
  campaignItems: [
    { title: "Sabah kahvaltı paketi", description: "Börek + içecek + tatlı mini paket seçeneği.", price: "₺150+" },
    { title: "Toplu ofis siparişi", description: "Şirket, okul ve etkinlikler için toplu börek/poğaça siparişi.", price: "Teklif al" },
    { title: "Özel gün pastası", description: "Kişiye özel pasta ve tatlı siparişi için hızlı talep.", price: "Teklif al" }
  ],
  galleryItems: [
    { title: "Günlük vitrin", description: "Taze çıkan ürünler ve vitrin görselleri için galeri alanı." },
    { title: "Cafe atmosferi", description: "Mekan içi masa, sunum ve müşteri deneyimi görselleri." },
    { title: "Özel siparişler", description: "Pasta, tatlı ve toplu sipariş örnekleri için portföy alanı." }
  ],
  staff: [
    { name: "Usta Şef", role: "Üretim", description: "Günlük taze börek, pasta ve fırın ürünleri üretimi." },
    { name: "Cafe Ekibi", role: "Servis", description: "Masa, paket ve hızlı müşteri taleplerinin takibi." }
  ],
  form: {
    title: "Sipariş / masa talebi bırak",
    description: "Ürün, tarih ve notunuzu yazın; işletme size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Talep tipi", type: "select", options: ["Paket sipariş", "Masa talebi", "Toplu sipariş", "Pasta siparişi", "Menü bilgisi"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "time", label: "Tercih edilen saat", type: "time" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Ürün, adet, teslim/masa notu yazın" }
    ]
  }
};
