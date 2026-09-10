import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const demoKindergartenConfig: BusinessTemplateConfig = {
  template: "kindergarten",
  sector: "Kreş / Anaokulu",
  brandName: "Minik Adımlar Kreşi",
  eyebrow: "Güvenli, sevgi dolu ve düzenli kreş ortamı",
  heroTitle: "Çocuklarımızın büyük yarınlara güvenle hazırlandığı yer.",
  heroDescription: "Sevgi, güven ve keşifle dolu bir okul öncesi deneyimi.",
  primaryCta: "Okulumuzu Keşfedin →",
  secondaryCta: "Sınıfları İncele",
  topBarText: "Güvenli ortam • Yaş grupları • Günlük akış • Ön görüşme formu",
  phone: "+90 5xx xxx xx xx",
  whatsapp: "+905xxxxxxxxx",
  address: "Milas / Muğla",
  mapsUrl: "https://maps.google.com/?q=Milas%20Mu%C4%9Fla",
  instagramUrl: "https://instagram.com/",
  theme: {
    primary: "#FF3F83",
    secondary: "#55BFEA",
    accent: "#FFD43B",
    soft: "#FFF0B9",
    dark: "#32216B"
  },
  navItems: ["Ana Sayfa", "Kurumsal", "Atölyelerimiz", "Galeri", "Duyurular", "İletişim"],
  stats: [
    { value: "150+", label: "Mutlu Öğrenci" },
    { value: "20+", label: "Eğitici Atölye" },
    { value: "5+", label: "Servis Güzergâhı" },
    { value: "10+", label: "Yıllık Deneyim" }
  ],
  services: [
    { title: "2 Yaş Oyun Grubu", description: "Oyun temelli öğrenme, öz bakım becerileri ve güvenli sosyal gelişim ortamı.", price: "Kontenjan sor" },
    { title: "3-4 Yaş Sınıfları", description: "Sanat, müzik, oyun, dil gelişimi ve motor becerileri destekleyen sınıf programı.", price: "Bilgi al" },
    { title: "5 Yaş Okula Hazırlık", description: "Okula geçiş sürecini destekleyen sosyal, bilişsel ve temel akademik hazırlık çalışmaları.", price: "Ön görüşme" }
  ],
  campaignItems: [
    { title: "Renkli Eller Atölyesi", description: "Miniklerle birlikte yaratıcılığımızı renklerle konuşturduk.", price: "12 Eylül 2025" },
    { title: "Doğa Günümüz", description: "Bahçemizde doğayı keşfettik, eğlendik ve öğrendik.", price: "5 Eylül 2025" },
    { title: "Yıl Sonu Gösterimiz", description: "Miniklerimizin yıl boyunca hazırladığı gösterilerimizi de bekliyoruz.", price: "1 Eylül 2025" }
  ],
  galleryItems: [
    { title: "Sınıf ortamı", description: "Çocukların oyun, öğrenme ve keşif alanları.", imageUrl: "https://picsum.photos/seed/minik-adimlar-classroom/900/650" },
    { title: "Bahçe ve oyun alanı", description: "Güvenli açık alan ve hareket etkinlikleri.", imageUrl: "https://picsum.photos/seed/minik-adimlar-garden/900/650" },
    { title: "Etkinlik masası", description: "Sanat, müzik, boyama ve keşif çalışmaları.", imageUrl: "https://picsum.photos/seed/minik-adimlar-workshop/900/650" }
  ],
  staff: [
    { name: "Sınıf Öğretmeni", role: "Yaş Grubu Sorumlusu", description: "Çocukların günlük akışını, etkinliklerini ve sınıf düzenini takip eder." },
    { name: "Kurum Ekibi", role: "Bakım ve İletişim", description: "Güvenli ortam, veli iletişimi ve günlük düzenin sürdürülebilirliğini sağlar." }
  ],
  whyUs: [
    { icon: "🛡️", title: "Güvenli Ortam", desc: "Kamerayla izlenen, uzman personelle desteklenen güvenli sınıf ve bahçe alanları." },
    { icon: "🎨", title: "Oyna ve Öğren", desc: "Yaş grubuna uygun oyun temelli öğrenme ve yaratıcı etkinlik programı." },
    { icon: "🍎", title: "Organik Beslenme", desc: "Çocukların ihtiyacına uygun hazırlanan, diyetisyen kontrollü günlük menüler." },
    { icon: "🧑‍🏫", title: "Usta Eğitmenler", desc: "Deneyimli, alanında uzman öğretmen kadrosuyla düzenli gelişim takibi." }
  ],
  branches: [
    { name: "Merkez Şube", phone: "+90 5xx xxx xx xx", whatsapp: "+905xxxxxxxxx", address: "Milas / Muğla" },
    { name: "Bodrum Şube", phone: "+90 5xx xxx xx xx", whatsapp: "+905xxxxxxxxx", address: "Bodrum / Muğla" }
  ],
  heroSlides: [
    {
      title: "Minik Adımlar\nBüyük Yarınlara",
      description: "Sevgi, güven ve keşifle dolu bir öğrenme yolculuğu...",
      imageUrl: "https://picsum.photos/seed/minik-adimlar-hero/1800/1100"
    },
    {
      title: "Oyun ve sanatla büyüyoruz.",
      description: "Deneyimli öğretmen kadromuzla çocukların merakını ve özgüvenini destekliyoruz.",
      imageUrl: "https://picsum.photos/seed/minik-adimlar-hero-2/1800/1100"
    }
  ],
  workshops: [
    { title: "Görsel Sanatlar", description: "Resim, ebru ve drama etkinlikleriyle çocukların sanatsal yönü destekleniyor.", ageRange: "3-6 Yaş", imageUrl: "https://picsum.photos/seed/kres-atolye-sanat/900/600" },
    { title: "Robotik ve Kodlama", description: "Eğlenerek öğrenme odaklı temel robotik ve kodlama atölyesi.", ageRange: "4-6 Yaş", imageUrl: "https://picsum.photos/seed/kres-atolye-robotik/900/600" },
    { title: "Satranç", description: "Dikkat, strateji ve problem çözme becerilerini geliştiren satranç dersleri.", ageRange: "4-6 Yaş", imageUrl: "https://picsum.photos/seed/kres-atolye-satranc/900/600" },
    { title: "Yüzme", description: "Kurum bünyesindeki havuzda branş öğretmenleri eşliğinde yüzme etkinlikleri.", ageRange: "3-6 Yaş", imageUrl: "https://picsum.photos/seed/kres-atolye-yuzme/900/600" }
  ],
  testimonials: [
    { name: "Elif K.", role: "Veli", quote: "Çocuğum sabah severek okula gidiyor, öğretmenlerle iletişimimiz çok düzenli." },
    { name: "Murat A.", role: "Veli", quote: "Günlük akış ve etkinlik bilgilendirmeleri sayesinde her zaman haberdarız." }
  ],
  enabledFeatures: {
    enrollment: true,
    multiBranch: true,
    testimonials: true,
    teacherCards: true,
    branchLessons: true,
    gallery: true,
    whatsapp: true,
    maps: true
  },
  form: {
    title: "Kayıt / ön görüşme talebi bırak",
    description: "Çocuğunuzun yaşı, tercih ettiğiniz şube ve kayıt dönemi bilgisi için formu doldurun; kurum size telefon veya WhatsApp üzerinden dönüş yapsın.",
    fields: [
      { key: "name", label: "Veli adı soyadı", type: "text", placeholder: "Adınız soyadınız" },
      { key: "phone", label: "Telefon", type: "tel", placeholder: "+90 5xx xxx xx xx" },
      { key: "childAge", label: "Çocuğun yaşı", type: "select", options: ["2 yaş", "3 yaş", "4 yaş", "5 yaş", "6 yaş", "Bilgi almak istiyorum"] },
      { key: "branch", label: "Tercih edilen şube", type: "select", options: ["Merkez Şube", "Bodrum Şube", "Bilgi almak istiyorum"] },
      { key: "service", label: "Talep tipi", type: "select", options: ["Kayıt bilgisi almak istiyorum", "Ön görüşme talep ediyorum", "Kontenjan sormak istiyorum", "Fiyat bilgisi almak istiyorum", "Yemek ve günlük program hakkında bilgi almak istiyorum"] },
      { key: "date", label: "Tercih edilen görüşme tarihi", type: "date" },
      { key: "note", label: "Not", type: "textarea", placeholder: "Çocuğun yaşı, kayıt dönemi veya merak ettiğiniz konuyu yazın" }
    ]
  }
};
