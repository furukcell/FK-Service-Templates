import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoRealEstateConfig: BusinessTemplateConfig = {
  template: "real-estate",
  sector: "Emlak Ofisi",
  brandName: "Mavi Emlak Portföy",
  eyebrow: "Portföyünü modern ilan sitesine dönüştür",
  heroTitle: "Satılık ve kiralık portföylerin profesyonel vitrini hazır.",
  heroDescription: "İlan kartları, vitrin portföyleri, danışman bilgileri ve WhatsApp talep formuyla emlak ofisinize hızlı dijital vitrin.",
  primaryCta: "İlanları İncele",
  secondaryCta: "Evimi Satmak İstiyorum",
  topBarText: "Emlak ilan şablonu • Vitrin portföy • WhatsApp talep • Admin ilan paneli",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  theme: {
    primary: "#1D4ED8",
    secondary: "#38BDF8",
    accent: "#F97316",
    soft: "#EFF6FF",
    dark: "#0F172A"
  },
  navItems: ["İlanlar", "Vitrin", "Danışmanlar", "İletişim"],
  stats: [
    { value: "48", label: "aktif portföy" },
    { value: "12", label: "vitrin ilan" },
    { value: "3", label: "danışman" },
    { value: "WhatsApp", label: "ilan sor" }
  ],
  services: [
    { title: "Satılık Daire", description: "Merkezi lokasyonlarda güncel satılık daire portföyleri.", price: "₺2.850.000+" },
    { title: "Kiralık Villa", description: "Bodrum ve çevresinde sezonluk/günlük villa seçenekleri.", price: "₺35.000+" },
    { title: "Arsa & Zeytinlik", description: "Milas çevresinde yatırım ve tarımsal portföyler.", price: "₺1.500.000+" }
  ],
  staff: [
    { name: "Faruk Danışman", role: "Bölge Uzmanı", description: "Milas, Bodrum ve çevre portföy yönetimi." },
    { name: "Meltem Danışman", role: "Kiralama Uzmanı", description: "Kiralık daire, villa ve günlük konaklama portföyü." }
  ],
  form: {
    title: "İlan talebi bırak",
    description: "İlgilendiğiniz portföyü veya satmak istediğiniz mülkü yazın, danışman size ulaşsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "listingType", label: "Talep tipi", type: "select", options: ["Satın almak istiyorum", "Kiralamak istiyorum", "Evimi satmak istiyorum", "Evimi kiraya vermek istiyorum"] },
      { key: "location", label: "Bölge", type: "text", placeholder: "Milas, Bodrum, Yalıkavak..." },
      { key: "budget", label: "Bütçe", type: "text", placeholder: "Örn: 3.000.000 TL" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Kısaca aradığınız mülkü yazın" }
    ]
  }
};
