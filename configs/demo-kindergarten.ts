import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoKindergartenConfig: BusinessTemplateConfig = {
  template: "kindergarten",
  sector: "Kreş / Anaokulu",
  brandName: "Minik Adımlar Kreşi",
  eyebrow: "Güvenli, sevgi dolu ve düzenli kreş ortamı",
  heroTitle: "Çocuğunuz için sıcak, güvenli ve gelişimi destekleyen bir başlangıç.",
  heroDescription: "Kreş, anaokulu ve gündüz bakım evleri için sınıflar, günlük akış, yemek bilgisi, galeri ve ön görüşme formu olan modern web sitesi.",
  primaryCta: "Ön Görüşme Talep Et",
  secondaryCta: "Sınıfları İncele",
  topBarText: "Güvenli ortam • Yaş grupları • Günlük akış • Ön görüşme formu",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#4F46E5",
    secondary: "#38BDF8",
    accent: "#FBBF24",
    soft: "#EEF2FF",
    dark: "#312E81"
  },
  navItems: ["Sınıflar", "Günlük Akış", "Galeri", "Kayıt"],
  stats: [
    { value: "2-6", label: "yaş grubu" },
    { value: "Günlük", label: "program akışı" },
    { value: "1 dk", label: "ön görüşme talebi" },
    { value: "Güvenli", label: "kurumsal iletişim" }
  ],
  services: [
    { title: "2 Yaş Oyun Grubu", description: "Oyun temelli öğrenme, öz bakım becerileri ve güvenli sosyal gelişim ortamı.", price: "Kontenjan sor" },
    { title: "3-4 Yaş Sınıfları", description: "Sanat, müzik, oyun, dil gelişimi ve motor becerileri destekleyen sınıf programı.", price: "Bilgi al" },
    { title: "5 Yaş Okula Hazırlık", description: "Okula geçiş sürecini destekleyen sosyal, bilişsel ve temel akademik hazırlık çalışmaları.", price: "Ön görüşme" }
  ],
  campaignItems: [
    { title: "Yeni dönem kayıtları", description: "Kayıt ve kontenjan bilgisi için ön görüşme talebi bırakabilirsiniz.", price: "Bilgi al" },
    { title: "Günlük akış", description: "Karşılama, kahvaltı, etkinlik, oyun, yemek, dinlenme ve veli teslim düzeni.", price: "Düzenli program" },
    { title: "Yemek ve bakım düzeni", description: "Çocukların günlük rutinini destekleyen yemek, dinlenme ve etkinlik planlaması.", price: "Detay sor" }
  ],
  galleryItems: [
    { title: "Sınıf ortamı", description: "Çocuk yüzü göstermeden sınıf, oyun ve etkinlik alanı görselleri." },
    { title: "Bahçe ve oyun alanı", description: "Güvenli açık alan, oyuncak ve hareket etkinlikleri için galeri alanı." },
    { title: "Etkinlik masası", description: "Sanat, müzik, boyama ve keşif çalışmalarını gösteren görsel alan." }
  ],
  staff: [
    { name: "Sınıf Öğretmeni", role: "Yaş Grubu Sorumlusu", description: "Çocukların günlük akışını, etkinliklerini ve sınıf düzenini takip eder." },
    { name: "Kurum Ekibi", role: "Bakım ve İletişim", description: "Güvenli ortam, veli iletişimi ve günlük düzenin sürdürülebilirliğini sağlar." }
  ],
  form: {
    title: "Kayıt / ön görüşme talebi bırak",
    description: "Çocuğunuzun yaşı, kayıt dönemi veya kontenjan bilgisi için formu doldurun; kurum size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Veli adı soyadı", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "childAge", label: "Çocuğun yaşı", type: "select", options: ["2 yaş", "3 yaş", "4 yaş", "5 yaş", "6 yaş", "Bilgi almak istiyorum"] },
      { key: "service", label: "Talep tipi", type: "select", options: ["Kayıt bilgisi almak istiyorum", "Ön görüşme talep ediyorum", "Kontenjan sormak istiyorum", "Fiyat bilgisi almak istiyorum", "Yemek ve günlük program hakkında bilgi almak istiyorum"] },
      { key: "date", label: "Tercih edilen görüşme tarihi", type: "date" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Çocuğun yaşı, kayıt dönemi veya merak ettiğiniz konuyu yazın" }
    ]
  }
};
