import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoLotusBorekConfig: BusinessTemplateConfig = {
  template: "cafe",
  sector: "Börek • Hamur İşi • Tatlı",
  brandName: "LOTUS BÖREK EVİ",
  eyebrow: "Milas’ta günlük taze lezzetler",
  heroTitle: "Günlük taze börek, hamur işi ve tatlı çeşitleri",
  heroDescription: "Kol böreği, Arnavut böreği, su böreği, sıcak simit, poğaça ve tatlı çeşitleri için WhatsApp’tan hızlı bilgi alın.",
  primaryCta: "WhatsApp’tan Sipariş Ver",
  secondaryCta: "Menüyü İncele",
  topBarText: "Günlük taze börek • Sıcak simit • Hamur işleri • Tatlı & baklava • WhatsApp sipariş",
  phone: "+90 537 058 44 20",
  whatsapp: "+905370584420",
  address: "Cumhuriyet Mahallesi, Halil Bey Bulvarı No: 75/A, Milas / Muğla",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cumhuriyet%20Mahallesi%20Halil%20Bey%20Bulvar%C4%B1%20No%3A%2075%2FA%20Milas%2FMu%C4%9Fla",
  instagramUrl: "https://www.instagram.com/lotus_borek_evi_48/",
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
      description: "Kol, Arnavut, su, gül ve kalem böreği çeşitleri için günlük ürün bilgisi ve sipariş detaylarını WhatsApp’tan alabilirsiniz.",
      price: "Fiyat Sor"
    },
    {
      title: "Hamur İşleri",
      description: "Simit, poğaça ve günlük çıkan sıcak hamur işi çeşitleri sabah saatlerinden itibaren taze hazırlanır.",
      price: "Fiyat Sor"
    },
    {
      title: "Kahvaltılıklar",
      description: "Sıcak fırın ürünleri, kahvaltılık seçenekler ve gel-al siparişleri için hızlı bilgi alabilirsiniz.",
      price: "Fiyat Sor"
    },
    {
      title: "Tatlı & Baklava",
      description: "Cevizli baklava, kurabiye ve günlük tatlı çeşitleri için güncel ürün bilgisini WhatsApp’tan sorabilirsiniz.",
      price: "Fiyat Sor"
    },
    {
      title: "Toplu Sipariş",
      description: "İş yeri, okul, toplantı ve özel günler için tepsi börek, tatlı ve kahvaltılık toplu sipariş desteği verilir.",
      price: "Fiyat Sor"
    }
  ],
  campaignItems: [
    { title: "Günün Sıcak Lezzetleri", description: "Simit, poğaça, börek ve kahvaltılık ürünler günlük olarak hazırlanır.", price: "Günlük" },
    { title: "Tepsi Börek & Toplu Sipariş", description: "Toplantı, okul, iş yeri ve özel günler için tepsi börek ve toplu sipariş hazırlığı yapılır.", price: "Bilgi al" },
    { title: "Tatlı & İkram Seçenekleri", description: "Baklava, kurabiye ve tatlı çeşitleri için güncel ürün bilgisini WhatsApp üzerinden alabilirsiniz.", price: "Fiyat sor" }
  ],
  galleryItems: [
    {
      title: "Günlük börek vitrini",
      description: "Günlük çıkan börekler ve sıcak ürün vitrini.",
      imageUrl: "/demo/lotus-borek/taze-borek.jpg"
    },
    {
      title: "Sıcak simit",
      description: "Sabah saatlerinde taze ve sıcak simit.",
      imageUrl: "/demo/lotus-borek/sicak-simit.jpg"
    },
    {
      title: "Kahvaltılık ürünler",
      description: "Simit, poğaça ve sabah ürünleri.",
      imageUrl: "/demo/lotus-borek/sicak-simit.jpg"
    },
    {
      title: "Tatlı & baklava",
      description: "Baklava, kurabiye ve günlük tatlı seçenekleri.",
      imageUrl: "/demo/lotus-borek/baklava.jpg"
    }
  ],
  staff: [
    { name: "Günlük hazırlık", role: "Taze üretim", description: "Börek, hamur işi, kahvaltılık ve tatlı çeşitleri günlük olarak hazırlanır." },
    { name: "Sipariş desteği", role: "WhatsApp iletişim", description: "Menü, fiyat ve toplu sipariş bilgileri için telefon veya WhatsApp üzerinden dönüş yapılır." }
  ],
  form: {
    title: "Sipariş ve fiyat bilgisi alın",
    description: "İstediğiniz ürün, adet ve teslim saati bilgisini yazın. LOTUS BÖREK EVİ size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Ürün / talep", type: "select", options: ["Kol böreği", "Arnavut böreği", "Su böreği", "Gül böreği", "Kalem böreği", "Hamur işleri", "Kahvaltılıklar", "Cevizli baklava", "Kurabiye & tatlılar", "Toplu sipariş", "Menü ve fiyat bilgisi"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "time", label: "Tercih edilen saat", type: "time" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Ürün, adet, teslim saati veya özel notunuzu yazın" }
    ]
  }
};
