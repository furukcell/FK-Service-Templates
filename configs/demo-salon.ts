import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoSalonConfig: BusinessTemplateConfig = {
  template: "salon",
  sector: "Kuaför & Güzellik Salonu",
  brandName: "Luna Beauty Studio",
  eyebrow: "Randevu alan modern güzellik salonu sitesi",
  heroTitle: "Güzellik hizmetlerini tek dokunuşla randevuya dönüştür.",
  heroDescription: "Hizmet listesi, kampanyalar, personel seçimi ve WhatsApp destekli randevu talebiyle salonun dijital vitrini hazır.",
  primaryCta: "Randevu Oluştur",
  secondaryCta: "Fiyatları Gör",
  topBarText: "Salon randevu şablonu • Hizmet listesi • Kampanya • WhatsApp destek",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Bodrum / Muğla",
  theme: {
    primary: "#BE185D",
    secondary: "#EC4899",
    accent: "#FBBF24",
    soft: "#FDF2F8",
    dark: "#500724"
  },
  navItems: ["Hizmetler", "Kampanyalar", "Randevu", "Galeri"],
  stats: [
    { value: "25+", label: "hizmet" },
    { value: "4", label: "uzman" },
    { value: "1 dk", label: "randevu talebi" },
    { value: "IG", label: "galeri bağlantısı" }
  ],
  services: [
    { title: "Saç Kesim & Fön", description: "Kadın/erkek saç kesimi, fön ve bakım hizmetleri.", price: "₺450+" },
    { title: "Nail Art", description: "Protez tırnak, kalıcı oje ve tasarım uygulamaları.", price: "₺600+" },
    { title: "Cilt Bakımı", description: "Temizleme, yenileme ve bakım paketleri.", price: "₺900+" }
  ],
  staff: [
    { name: "Elif", role: "Saç Tasarım", description: "Kesim, renklendirme ve özel gün hazırlığı." },
    { name: "Mina", role: "Nail Artist", description: "Kalıcı oje, protez tırnak ve nail art." }
  ],
  form: {
    title: "Salon randevusu bırak",
    description: "Hizmeti ve tercih ettiğiniz zamanı seçin, salon size dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "service", label: "Hizmet", type: "select", options: ["Saç Kesim", "Fön", "Nail Art", "Cilt Bakımı", "Lazer"] },
      { key: "staff", label: "Personel tercihi", type: "select", options: ["Farketmez", "Elif", "Mina"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "note", label: "Not", type: "textarea", placeholder: "İstediğiniz modeli veya notu yazın" }
    ]
  }
};
