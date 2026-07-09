import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoVeterinaryConfig: BusinessTemplateConfig = {
  template: "appointment",
  sector: "Veteriner Kliniği",
  brandName: "Mavi Pati Veteriner",
  eyebrow: "Milas için modern veteriner randevu sistemi",
  heroTitle: "Dostunuz için hızlı randevu, güvenli takip.",
  heroDescription: "Acil durum, rutin kontrol, aşı ve bakım taleplerini tek ekranda toplayan modern veteriner web şablonu.",
  primaryCta: "Randevu Talep Et",
  secondaryCta: "Hizmetleri Gör",
  topBarText: "Veteriner randevu sistemi • WhatsApp destekli hızlı talep",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  theme: {
    primary: "#0F766E",
    secondary: "#14B8A6",
    accent: "#F59E0B",
    soft: "#ECFDF5",
    dark: "#042F2E"
  },
  navItems: ["Hizmetler", "Randevu", "Ekip", "İletişim"],
  stats: [
    { value: "7/24", label: "acil iletişim" },
    { value: "12+", label: "hizmet tipi" },
    { value: "1 dk", label: "talep bırakma" },
    { value: "WhatsApp", label: "hızlı dönüş" }
  ],
  services: [
    { title: "Acil Muayene", description: "Acil durumlarda hızlı iletişim ve öncelikli yönlendirme." },
    { title: "Aşı Takibi", description: "Kedi ve köpekler için aşı randevusu ve takip akışı." },
    { title: "Genel Kontrol", description: "Rutin muayene, bakım ve danışmanlık talepleri." }
  ],
  staff: [
    { name: "Vet. Hekim Ayşe", role: "Kedi & Köpek", description: "Rutin kontrol, aşı ve acil ilk değerlendirme." },
    { name: "Vet. Hekim Deniz", role: "Cerrahi Danışmanlık", description: "Operasyon öncesi bilgilendirme ve takip." }
  ],
  form: {
    title: "Randevu talebi bırak",
    description: "Bilgilerinizi gönderin, klinik size WhatsApp veya telefonla dönüş yapsın.",
    fields: [
      { key: "name", label: "Ad Soyad", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "petName", label: "Evcil hayvan adı", type: "text", placeholder: "Pamuk" },
      { key: "petType", label: "Hayvan türü", type: "select", options: ["Kedi", "Köpek", "Kuş", "Diğer"] },
      { key: "date", label: "Tercih edilen tarih", type: "date" },
      { key: "note", label: "Şikayet / not", type: "textarea", placeholder: "Kısaca talebinizi yazın" }
    ]
  }
};
