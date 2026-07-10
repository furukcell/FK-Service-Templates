import type { ContentPageKey, FaqItem, ManagedContentPage, ManagedSiteSettings } from "@fk-templates/firebase";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

export const contentPageLabels: Record<ContentPageKey, string> = {
  about: "Hakkımızda",
  contact: "İletişim",
  privacy: "Gizlilik Politikası",
  kvkk: "KVKK Aydınlatma Metni",
  cookies: "Çerez Politikası",
  terms: "Kullanım Koşulları"
};

export const contentPageRoutes: Record<ContentPageKey, string> = {
  about: "/hakkimizda",
  contact: "/iletisim",
  privacy: "/gizlilik-politikasi",
  kvkk: "/kvkk-aydinlatma-metni",
  cookies: "/cerez-politikasi",
  terms: "/kullanim-kosullari"
};

export const contentPageOrder: ContentPageKey[] = ["about", "contact", "privacy", "kvkk", "cookies", "terms"];

function businessName(config: BusinessTemplateConfig, settings?: ManagedSiteSettings | null) {
  return settings?.brandName || config.brandName;
}

export function defaultContentPages(config: BusinessTemplateConfig, settings?: ManagedSiteSettings | null): Record<ContentPageKey, ManagedContentPage> {
  const name = businessName(config, settings);
  const phone = settings?.phone || config.phone;
  const address = settings?.address || config.address;
  const email = settings?.contactEmail || "info@ornekfirma.com";
  const hours = settings?.workingHours || "Pazartesi - Cumartesi 09:00 - 18:00";

  return {
    about: {
      title: "Hakkımızda",
      description: `${name} hakkında kısa işletme tanıtımı.`,
      body: `${name}, ${address} bölgesinde hizmet veren yerel bir işletmedir. Amacımız müşterilerimize hızlı, güvenilir ve profesyonel hizmet sunmaktır. Bu sayfa admin panelden düzenlenebilir; işletmenin geçmişi, uzmanlık alanları, ekip yapısı ve hizmet anlayışı burada anlatılabilir.`
    },
    contact: {
      title: "İletişim",
      description: `${name} iletişim bilgileri ve çalışma saatleri.`,
      body: `Telefon: ${phone}\nE-posta: ${email}\nAdres: ${address}\nÇalışma saatleri: ${hours}\n\nRandevu, bilgi talebi veya teklif için web sitemizdeki formu kullanabilir ya da WhatsApp üzerinden bize ulaşabilirsiniz.`
    },
    privacy: {
      title: "Gizlilik Politikası",
      description: "Web sitesi üzerinden paylaşılan kişisel verilerin gizliliği hakkında bilgilendirme.",
      body: `${name} olarak web sitemiz üzerinden iletilen ad, soyad, telefon, randevu/talep notu ve benzeri bilgileri yalnızca talebinize dönüş yapmak ve hizmet sürecini yürütmek amacıyla işleriz. Bilgileriniz üçüncü kişilerle ticari amaçla paylaşılmaz. Teknik altyapı kapsamında hosting, Firebase, e-posta veya benzeri hizmet sağlayıcıları kullanılabilir. Detaylı ve kesin metin müşteri işletmenin avukatı veya danışmanı tarafından gözden geçirilmelidir.`
    },
    kvkk: {
      title: "KVKK Aydınlatma Metni",
      description: "6698 sayılı KVKK kapsamında kişisel veri işleme süreçleri hakkında bilgilendirme.",
      body: `${name} tarafından; kimlik ve iletişim bilgileriniz, randevu/talep formları üzerinden bize ulaşmanız, hizmet talebinizin değerlendirilmesi ve size dönüş yapılması amacıyla işlenebilir. Kişisel verileriniz hukuka uygun şekilde saklanır ve yalnızca gerekli süre boyunca muhafaza edilir. Kanuni haklarınız kapsamında veri sorumlusu ile ${email} üzerinden iletişime geçebilirsiniz. Bu metin genel şablondur; kesin kullanım için hukuki kontrol önerilir.`
    },
    cookies: {
      title: "Çerez Politikası",
      description: "Web sitesinde kullanılan çerezler ve benzeri teknolojiler hakkında bilgilendirme.",
      body: `${name} web sitesinde kullanıcı deneyimini iyileştirmek, site performansını ölçmek ve gerekli durumlarda harita, sosyal medya veya analiz servislerini çalıştırmak için çerezler kullanılabilir. Zorunlu çerezler sitenin çalışması için gereklidir. Analitik veya pazarlama çerezleri kullanılacaksa ziyaretçiden ayrıca onay alınması önerilir.`
    },
    terms: {
      title: "Kullanım Koşulları",
      description: "Web sitesi kullanım şartları ve sorumluluk sınırları.",
      body: `${name} web sitesi üzerinden gönderilen randevu, talep veya bilgi formları kesin rezervasyon/onay anlamına gelmez. Talep, işletme tarafından telefon veya WhatsApp üzerinden dönüş yapıldıktan sonra kesinleşir. Sitedeki fiyat, kampanya, ilan veya hizmet bilgileri güncellenebilir. Yanlış yazım, stok/uygunluk veya güncel olmayan bilgilerden kaynaklanan durumlarda işletme nihai bilgilendirme hakkını saklı tutar.`
    }
  };
}

export function defaultFaqItems(config: BusinessTemplateConfig): FaqItem[] {
  if (config.template === "real-estate") {
    return [
      { question: "İlan bilgileri güncel mi?", answer: "İlan bilgileri düzenli olarak güncellenir; son durum için danışmanla iletişime geçmeniz önerilir." },
      { question: "İlanı görmek için nasıl randevu alırım?", answer: "İlan detayındaki formu doldurabilir veya WhatsApp üzerinden danışmana ulaşabilirsiniz." },
      { question: "Evimi satmak/kiralamak istiyorum, ne yapmalıyım?", answer: "İletişim formundan mülk bilgilerinizi gönderdiğinizde danışman size dönüş yapar." }
    ];
  }

  if (config.template === "salon") {
    return [
      { question: "Randevu talebi kesin randevu mudur?", answer: "Hayır. Talebiniz alındıktan sonra işletme size dönüş yapar ve uygun saat netleştirilir." },
      { question: "Kampanyalar her zaman geçerli mi?", answer: "Kampanyalar dönemsel olabilir. Güncel bilgi için işletme ile iletişime geçiniz." },
      { question: "Personel seçimi yapabilir miyim?", answer: "Formda personel tercihi alanı varsa seçebilirsiniz; uygunluk işletme tarafından onaylanır." }
    ];
  }

  if (config.template === "cafe") {
    return [
      { question: "Formdan verilen sipariş kesinleşir mi?", answer: "Hayır. İşletme size telefon veya WhatsApp üzerinden dönüş yaptıktan sonra sipariş ya da masa talebi kesinleşir." },
      { question: "Toplu sipariş verebilir miyim?", answer: "Evet. Formda adet, tarih ve ürün notunuzu yazabilirsiniz; işletme size uygunluk ve fiyat bilgisiyle dönüş yapar." },
      { question: "Günlük ürünler değişiyor mu?", answer: "Günlük üretim ve stok durumuna göre ürünler değişebilir. En güncel bilgi için işletmeden dönüş bekleyiniz." }
    ];
  }

  if (config.template === "kindergarten") {
    return [
      { question: "Ön görüşme talebi kesin kayıt anlamına gelir mi?", answer: "Hayır. Form üzerinden iletilen talep kurumun size dönüş yapması içindir. Kayıt süreci kurum görüşmesi ve kontenjan durumuna göre netleşir." },
      { question: "Kontenjan ve fiyat bilgisini nasıl öğrenebilirim?", answer: "Formu doldurarak ya da WhatsApp üzerinden kuruma ulaşarak yaş grubu, kontenjan ve fiyat bilgisi alabilirsiniz." },
      { question: "Çocuk fotoğrafları sitede paylaşılır mı?", answer: "Kurum tercihine ve veli izinlerine göre hareket edilmelidir. Çocuk yüzü göstermeden sınıf, etkinlik ve oyun alanı görselleriyle de güven veren bir site hazırlanabilir." }
    ];
  }

  if (config.template === "event-venue") {
    return [
      { question: "Formdan tarih sormak kesin rezervasyon mudur?", answer: "Hayır. Form üzerinden iletilen talep ön bilgi ve uygunluk kontrolü içindir. Kesin rezervasyon salon ekibinin dönüşü ve ödeme/kapora süreciyle netleşir." },
      { question: "Yemekli organizasyon yapılabiliyor mu?", answer: "Salonun güncel hizmet kapsamına göre yemekli veya yemeksiz paket seçenekleri sunulabilir. Detay için formdan davetli sayısı ve tarih bilgisi bırakabilirsiniz." },
      { question: "Kına, nişan ve sünnet organizasyonu da yapılıyor mu?", answer: "Evet. Düğün dışında kına, nişan, söz, sünnet ve özel davetler için de uygun paket ve tarih bilgisi alınabilir." }
    ];
  }

  return [
    { question: "Randevu talebi kesin randevu mudur?", answer: "Hayır. Talebiniz alındıktan sonra işletme size telefon veya WhatsApp üzerinden dönüş yapar." },
    { question: "Acil durumda ne yapmalıyım?", answer: "Acil durumlarda doğrudan telefon veya WhatsApp üzerinden işletmeye ulaşmanız önerilir." },
    { question: "Formdaki bilgilerim ne için kullanılır?", answer: "Bilgileriniz yalnızca talebinize dönüş yapmak ve hizmet sürecini yürütmek için kullanılır." }
  ];
}

export function getManagedContentPage(config: BusinessTemplateConfig, settings: ManagedSiteSettings | null, pageKey: ContentPageKey) {
  return settings?.contentPages?.[pageKey] || defaultContentPages(config, settings)[pageKey];
}

export function getManagedFaqItems(config: BusinessTemplateConfig, settings: ManagedSiteSettings | null) {
  return settings?.faqItems?.length ? settings.faqItems : defaultFaqItems(config);
}