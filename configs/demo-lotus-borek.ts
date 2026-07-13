import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoLotusBorekConfig: BusinessTemplateConfig = {
  template: "cafe",
  sector: "Börek • Hamur İşi • Tatlı",
  brandName: "Lotus Börek Evi",
  eyebrow: "Milas’ta günlük taze lezzetler",
  heroTitle: "Günlük taze börek, hamur işi ve tatlı çeşitleri",
  heroDescription: "Kol böreği, Arnavut böreği, su böreği, kahvaltılıklar, kurabiye ve cevizli baklava için hızlı sipariş ve menü bilgisi.",
  primaryCta: "WhatsApp’tan Sipariş Ver",
  secondaryCta: "Menüyü İncele",
  topBarText: "Günlük taze börek • Hamur işleri • Kahvaltılıklar • Tatlı & baklava • WhatsApp sipariş",
  phone: "+90 537 058 44 20",
  whatsapp: "+905370584420",
  address: "Cumhuriyet Mahallesi, Halil Bey Bulvarı No: 75/A, Milas / Muğla",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cumhuriyet%20Mahallesi%20Halil%20Bey%20Bulvar%C4%B1%20No%3A%2075%2FA%20Milas%2FMu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#7C2D12",
    secondary: "#F97316",
    accent: "#FACC15",
    soft: "#FFF7ED",
    dark: "#431407"
  },
  navItems: ["Menü", "Börekler", "Tatlılar", "Sipariş"],
  stats: [
    { value: "Günlük", label: "taze üretim" },
    { value: "10+", label: "ürün çeşidi" },
    { value: "Gel-al", label: "sipariş kolaylığı" },
    { value: "Toplu", label: "sipariş desteği" }
  ],
  services: [
    {
      title: "Börek Çeşitleri",
      description: "Kol böreği, Arnavut böreği, su böreği, gül böreği ve kalem böreği günlük olarak hazırlanır.",
      price: "Fiyat Sor"
    },
    {
      title: "Hamur İşleri",
      description: "Simit, poğaça ve günlük çıkan sıcak hamur işi çeşitleriyle gün boyu taze servis.",
      price: "Fiyat Sor"
    },
    {
      title: "Kahvaltılıklar",
      description: "Sabah servisleri için kahvaltılık ürünler, sıcak fırın lezzetleri ve gel-al seçenekleri.",
      price: "Fiyat Sor"
    },
    {
      title: "Tatlı & Baklava",
      description: "Cevizli baklava, kurabiye ve günlük tatlı çeşitleri özel sipariş ve günlük alım için hazırlanır.",
      price: "Fiyat Sor"
    },
    {
      title: "Toplu Sipariş",
      description: "İş yeri, okul, toplantı ve özel günler için toplu börek, tatlı ve kahvaltılık siparişleri alınır.",
      price: "Fiyat Sor"
    }
  ],
  campaignItems: [
    { title: "Sabah Sıcak Lezzetler", description: "Simit, poğaça, börek ve kahvaltılık ürünlerle güne taze başlangıç.", price: "Günlük" },
    { title: "Tepsi ve Toplu Sipariş", description: "Özel gün, toplantı, okul ve iş yerleri için tepsi börek ve toplu sipariş hazırlığı.", price: "Teklif al" },
    { title: "Tatlı & Baklava İkramı", description: "Cevizli baklava, kurabiye ve tatlı çeşitleri için WhatsApp üzerinden hızlı bilgi.", price: "Fiyat sor" }
  ],
  galleryItems: [
    {
      title: "Taze börek vitrini",
      description: "Günlük çıkan börekler ve sıcak ürün vitrini.",
      imageUrl: "/demo/lotus-borek/real-taze-borek-vitrini.svg"
    },
    {
      title: "Çıtır börek çeşitleri",
      description: "El açması ve çıtır börek çeşitleri.",
      imageUrl: "/demo/lotus-borek/real-citir-borek.svg"
    },
    {
      title: "Sıcak simit",
      description: "Sabah saatlerinde taze ve sıcak simit.",
      imageUrl: "/demo/lotus-borek/real-sicak-simit.svg"
    },
    {
      title: "Kahvaltılıklar",
      description: "Simit, poğaça ve sabah ürünleri.",
      imageUrl: "/demo/lotus-borek/real-kahvaltiliklar.svg"
    },
    {
      title: "Tatlı ve baklava",
      description: "Baklava, kurabiye ve günlük tatlı seçenekleri.",
      imageUrl: "/demo/lotus-borek/real-tatli-baklava.svg"
    },
    {
      title: "El açması börek",
      description: "Günlük hazırlanan börek ve hamur işi çeşitleri.",
      imageUrl: "/demo/lotus-borek/real-el-acmasi-borek.svg"
    }
  ],
  staff: [
    { name: "Lotus Börek Ekibi", role: "Günlük üretim", description: "Börek, hamur işi, kahvaltılık ve tatlı çeşitlerinin günlük hazırlanması." },
    { name: "Sipariş Ekibi", role: "WhatsApp destek", description: "WhatsApp, telefon ve form taleplerine hızlı dönüş." }
  ],
  form: {
    title: "Sipariş ve menü bilgi talebi",
    description: "Börek, hamur işi, kahvaltılık, baklava, kurabiye, tatlı veya toplu sipariş için formu doldurun. Lotus Börek Evi size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Talep tipi", type: "select", options: ["Kol böreği", "Arnavut böreği", "Su böreği", "Gül böreği", "Kalem böreği", "Hamur işleri", "Kahvaltılıklar", "Cevizli baklava", "Kurabiye & tatlılar", "Toplu sipariş", "Menü ve fiyat bilgisi"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "time", label: "Tercih edilen saat", type: "time" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Ürün, adet, teslim saati veya özel notunuzu yazın" }
    ]
  }
};