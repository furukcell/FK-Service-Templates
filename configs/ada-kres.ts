import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const adaKresConfig: BusinessTemplateConfig = {
  template: "kindergarten",
  sector: "Kreş / Anaokulu",
  brandName: "Ada Kreş",
  eyebrow: "Sevgi dolu, güvenli ve sanatla desteklenen kreş ortamı",
  heroTitle: "Güvenle büyüyen, sanatla gelişen çocuklar.",
  heroDescription: "Ada Kreş; çocukların kendini güvende hissettiği, günlük rutini düzenli, oyun ve sanatla desteklenen sıcak bir okul öncesi eğitim ortamı sunar.",
  primaryCta: "Ön Kayıt Oluştur",
  secondaryCta: "WhatsApp’tan Bilgi Al",
  topBarText: "Ada Kreş • Güvenli ortam • Günlük akış • Sanatla desteklenen okul öncesi eğitim",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#6559EC",
    secondary: "#31C7B7",
    accent: "#F6B84B",
    soft: "#FFF8E8",
    dark: "#2F2A72"
  },
  navItems: ["Eğitim Yaklaşımı", "Yaş Grupları", "Günlük Akış", "Galeri", "Ön Kayıt", "İletişim"],
  stats: [
    { value: "2-6", label: "yaş grubu" },
    { value: "30", label: "öğrenci kapasitesi" },
    { value: "Günlük", label: "veli bilgilendirme" },
    { value: "Sanat", label: "müzik & etkinlik desteği" }
  ],
  services: [
    { title: "Oyun Grubu", description: "Sosyal gelişim, öz bakım, güvenli oyun ve sınıfa uyum odaklı küçük yaş grubu programı.", price: "Bilgi al" },
    { title: "Anaokulu Programı", description: "Dil gelişimi, motor beceriler, sanat etkinlikleri ve düzenli günlük akışla desteklenen program.", price: "Kontenjan sor" },
    { title: "Okula Hazırlık", description: "5-6 yaş grubu için dikkat, sorumluluk, sosyal uyum ve temel akademik hazırlık çalışmaları.", price: "Ön görüşme" }
  ],
  campaignItems: [
    { title: "Yeni dönem kayıtları", description: "Kayıt, kontenjan ve görüşme bilgisi için hızlı ön başvuru bırakabilirsiniz.", price: "Ön kayıt" },
    { title: "Sanatla desteklenen gelişim", description: "Müzik, ritim, dans ve yaratıcı etkinliklerle çocukların kendini ifade etmesi desteklenir.", price: "Etkinlik" },
    { title: "Düzenli veli iletişimi", description: "Günlük akış, duyurular ve etkinlik bilgilendirmeleri düzenli şekilde paylaşılır.", price: "Veli iletişimi" }
  ],
  galleryItems: [
    { title: "Sıcak sınıf ortamı", description: "Çocukların güvenle vakit geçireceği sade, düzenli ve yaş grubuna uygun sınıf alanları." },
    { title: "Oyun ve sanat etkinlikleri", description: "Oyun temelli öğrenme, sanat, müzik ve keşif etkinlikleri için hazırlanmış alanlar." },
    { title: "Hareket ve bahçe zamanı", description: "Hareket, oyun ve sosyal gelişimi destekleyen açık alan ve grup etkinlikleri." }
  ],
  staff: [
    { name: "Eğitim Ekibi", role: "Sınıf ve Gelişim Takibi", description: "Çocukların günlük rutinini, etkinlik katılımını ve sınıf içi gelişimini takip eder." },
    { name: "Kurum Yönetimi", role: "Veli İletişimi", description: "Kayıt, ön görüşme, duyuru ve veli bilgilendirme süreçlerini düzenli yönetir." }
  ],
  form: {
    title: "Kreş ön kayıt / bilgi talebi",
    description: "Çocuğunuzun yaşı, kayıt dönemi ve kontenjan bilgisi için formu doldurun; kurum size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Veli adı soyadı", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "childAge", label: "Çocuğun yaşı", type: "select", options: ["2 yaş", "3 yaş", "4 yaş", "5 yaş", "6 yaş", "Bilgi almak istiyorum"] },
      { key: "service", label: "Talep tipi", type: "select", options: ["Kayıt bilgisi almak istiyorum", "Ön görüşme talep ediyorum", "Kontenjan sormak istiyorum", "Fiyat bilgisi almak istiyorum", "Günlük program hakkında bilgi almak istiyorum"] },
      { key: "date", label: "Tercih edilen görüşme tarihi", type: "date" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Çocuğun yaşı, kayıt dönemi veya merak ettiğiniz konuyu yazın" }
    ]
  }
};
