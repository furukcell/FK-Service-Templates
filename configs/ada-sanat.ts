import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const adaSanatConfig: BusinessTemplateConfig = {
  template: "salon",
  sector: "Müzik & Dans Okulu",
  brandName: "Ada Müzik & Dans Okulu",
  eyebrow: "Ritim, hareket ve sahne özgüveni kazandıran sanat okulu",
  heroTitle: "Müzik ve dansla çocukların enerjisini özgüvene dönüştüren modern eğitim alanı.",
  heroDescription: "Ada Müzik & Dans Okulu; dans, ritim, müzik ve sahne çalışmalarıyla çocukların beden farkındalığını, sosyal iletişimini ve özgüvenini destekler.",
  primaryCta: "Ders Bilgisi Al",
  secondaryCta: "Programları İncele",
  topBarText: "Ada Müzik & Dans Okulu • Dans • Müzik • Ritim • Sahne özgüveni",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#BE185D",
    secondary: "#7C3AED",
    accent: "#F59E0B",
    soft: "#FDF2F8",
    dark: "#4A044E"
  },
  navItems: ["Programlar", "Dersler", "Galeri", "Kayıt"],
  stats: [
    { value: "Dans", label: "hareket ve ritim" },
    { value: "Müzik", label: "yaratıcı gelişim" },
    { value: "Grup", label: "sosyal özgüven" },
    { value: "1 dk", label: "bilgi talebi" }
  ],
  services: [
    { title: "Çocuk Dans Programı", description: "Ritim, koordinasyon, beden farkındalığı ve grup uyumunu destekleyen eğlenceli dans dersleri.", price: "Bilgi al" },
    { title: "Müzik ve Ritim", description: "Çocukların müziği keşfetmesini, ritim duygusunu ve yaratıcı ifadesini güçlendiren çalışmalar.", price: "Program sor" },
    { title: "Gösteri Hazırlık", description: "Sahne duruşu, özgüven ve grup performansı için dönemsel etkinlik ve gösteri hazırlıkları.", price: "Ön görüşme" }
  ],
  campaignItems: [
    { title: "Yeni dönem kayıtları", description: "Dans, müzik ve ritim dersleri için kayıt ve kontenjan bilgisi alabilirsiniz.", price: "Kayıt" },
    { title: "Deneme dersi", description: "Çocuğunuzun programa uyumunu görmek için deneme dersi bilgisi isteyebilirsiniz.", price: "Bilgi al" },
    { title: "Kreş + sanat avantajı", description: "Ada çatısı altında kreş ve sanat eğitimlerini birlikte değerlendirmek isteyen veliler için bilgi verilir.", price: "Paket sor" }
  ],
  galleryItems: [
    { title: "Dans stüdyosu", description: "Hareket, ritim ve grup çalışmaları için hazırlanmış ferah ders alanı.", category: "Salon", featured: true },
    { title: "Ritim çalışmaları", description: "Müzik ve ritim duygusunu geliştiren çocuk grup etkinlikleri.", category: "Diğer" },
    { title: "Gösteri hazırlığı", description: "Sahne özgüveni ve performans deneyimi kazandıran dönemsel çalışmalar.", category: "Diğer" }
  ],
  staff: [
    { name: "Sanat Eğitmeni", role: "Dans & Ritim", description: "Çocukların yaş grubuna uygun hareket, ritim ve sahne çalışmalarını yönetir." },
    { name: "Kurum Ekibi", role: "Kayıt ve Program", description: "Ders programı, kontenjan ve veli bilgilendirme süreçlerinde destek olur." }
  ],
  form: {
    title: "Ders / kayıt bilgi talebi",
    description: "Dans, müzik, ritim veya deneme dersi hakkında bilgi almak için formu doldurun; kurum size dönüş yapsın.",
    fields: [
      { key: "name", label: "Veli adı soyadı", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "childAge", label: "Çocuğun yaşı", type: "select", options: ["3-4 yaş", "5-6 yaş", "7-9 yaş", "10+ yaş", "Bilgi almak istiyorum"] },
      { key: "service", label: "İlgilenilen program", type: "select", options: ["Çocuk dans", "Müzik ve ritim", "Deneme dersi", "Gösteri hazırlık", "Kreş + sanat bilgisi"] },
      { key: "date", label: "Tercih edilen görüşme tarihi", type: "date" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Ders türü, yaş grubu veya merak ettiğiniz konuyu yazın" }
    ]
  }
};
