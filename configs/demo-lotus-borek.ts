import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoLotusBorekConfig: BusinessTemplateConfig = {
  template: "cafe",
  sector: "Pastane / Cafe / Börekçi",
  brandName: "Lotus Börek Evi",
  eyebrow: "Milas’ta günlük taze börek, hamur işi ve tatlı çeşitleri",
  heroTitle: "Lotus Börek Evi: börekten baklavaya günlük taze lezzetler.",
  heroDescription: "Kol böreği, Arnavut böreği, su böreği, gül böreği, kalem böreği, kahvaltılıklar, kurabiye, tatlı ve cevizli baklava çeşitleri için hızlı WhatsApp siparişi ve menü bilgisi.",
  primaryCta: "WhatsApp’tan Sipariş Ver",
  secondaryCta: "Menüyü İncele",
  topBarText: "Günlük taze börek • Hamur işleri • Kahvaltılıklar • Tatlı & baklava • WhatsApp sipariş",
  phone: "+90 537 058 44 20",
  whatsapp: "+905370584420",
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
  navItems: ["Menü", "Börekler", "Tatlılar", "Sipariş"],
  stats: [
    { value: "Günlük", label: "taze üretim" },
    { value: "10+", label: "ürün çeşidi" },
    { value: "Gel-al", label: "sipariş kolaylığı" },
    { value: "Toplu", label: "sipariş desteği" }
  ],
  services: [
    { title: "Kol Böreği", description: "Günlük taze hazırlanan, kahvaltı ve gel-al siparişler için pratik börek seçeneği.", price: "Sipariş ver" },
    { title: "Arnavut Böreği", description: "Özel lezzet arayanlar için doyurucu ve geleneksel Arnavut böreği seçeneği.", price: "Fiyat sor" },
    { title: "Su Böreği", description: "Porsiyon, kilo veya tepsi olarak sipariş alınabilir; toplu siparişlere uygundur.", price: "Bilgi al" },
    { title: "Gül Böreği", description: "Kahvaltı, ikram ve günlük tüketim için lezzetli gül böreği çeşitleri.", price: "Sipariş ver" },
    { title: "Kalem Böreği", description: "Çay saatleri, davetler ve hızlı ikramlar için çıtır kalem böreği.", price: "Menü bilgisi" },
    { title: "Hamur İşleri", description: "Simit, poğaça ve günlük çıkan diğer hamur işi çeşitleri.", price: "Günlük" },
    { title: "Kahvaltılıklar", description: "Sabah servisleri, kahvaltı ürünleri ve sıcak fırın lezzetleri.", price: "Menüden seç" },
    { title: "Cevizli Baklava", description: "Tatlı severler için cevizli baklava ve özel gün ikram seçenekleri.", price: "Fiyat sor" },
    { title: "Kurabiye & Tatlılar", description: "Kurabiye, tatlı ve günlük tatlı çeşitleri için hızlı bilgi alınabilir.", price: "Bilgi al" },
    { title: "Toplu Sipariş", description: "İş yeri, okul, toplantı, mevlüt ve özel günler için toplu sipariş desteği.", price: "Teklif al" }
  ],
  campaignItems: [
    { title: "Sabah Sıcak Lezzetler", description: "Simit, poğaça, börek ve kahvaltılık ürünlerle güne taze başlangıç.", price: "Günlük" },
    { title: "Tepsi ve Toplu Sipariş", description: "Özel gün, toplantı, okul ve iş yerleri için tepsi börek ve toplu sipariş hazırlığı.", price: "Teklif al" },
    { title: "Tatlı & Baklava İkramı", description: "Cevizli baklava, kurabiye ve tatlı çeşitleri için WhatsApp üzerinden hızlı bilgi.", price: "Fiyat sor" }
  ],
  galleryItems: [
    {
      title: "Taze börek vitrini",
      description: "Demo görsel: kol böreği, su böreği, gül böreği ve günlük çıkan börek çeşitleri.",
      imageUrl: "/demo/lotus-borek/borek-vitrini.svg"
    },
    {
      title: "Hamur işleri",
      description: "Demo görsel: simit, poğaça ve günlük sıcak hamur işi çeşitleri.",
      imageUrl: "/demo/lotus-borek/hamur-isleri.svg"
    },
    {
      title: "Tatlı ve baklava",
      description: "Demo görsel: cevizli baklava, kurabiye ve günlük tatlı çeşitleri.",
      imageUrl: "/demo/lotus-borek/tatlilar-baklava.svg"
    },
    {
      title: "Kahvaltılıklar",
      description: "Demo görsel: sabah kahvaltılıkları, sıcak ürünler ve gel-al sipariş vitrini.",
      imageUrl: "/demo/lotus-borek/kahvaltiliklar.svg"
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
