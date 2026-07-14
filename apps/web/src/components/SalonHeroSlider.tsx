import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";

const AUTO_PLAY_MS = 10000;
const SWIPE_THRESHOLD = 48;

type SlideAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
};

type FlowHeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  actions: SlideAction[];
};

type PointerStart = {
  id: number;
  x: number;
  y: number;
};

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappMessage(template: TemplateKey, brandName: string) {
  const messages: Record<TemplateKey, string> = {
    appointment: `Merhaba ${brandName}, evcil hayvanım için randevu ve hizmet bilgisi almak istiyorum.`,
    salon: `Merhaba ${brandName}, hizmetleriniz ve randevu seçenekleriniz hakkında bilgi almak istiyorum.`,
    "real-estate": `Merhaba ${brandName}, portföyleriniz ve danışmanlık hizmetiniz hakkında bilgi almak istiyorum.`,
    cafe: `Merhaba ${brandName}, menü, sipariş ve rezervasyon bilgisi almak istiyorum.`,
    kindergarten: `Merhaba ${brandName}, kayıt, kontenjan ve ön görüşme bilgisi almak istiyorum.`,
    "event-venue": `Merhaba ${brandName}, uygun tarih ve organizasyon paketleri hakkında bilgi almak istiyorum.`
  };
  return messages[template];
}

function whatsappUrl(config: BusinessTemplateConfig) {
  const phone = normalizePhone(config.whatsapp || config.phone);
  const message = encodeURIComponent(whatsappMessage(config.template, config.brandName));
  return phone.length >= 10
    ? `https://wa.me/${phone}?text=${message}`
    : `https://api.whatsapp.com/send?text=${message}`;
}

function salonSlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  return [
    {
      eyebrow: config.brandName,
      title: "Güzelliğinize değer katan profesyonel dokunuşlar",
      description: "Saç, tırnak ve cilt bakımında kişiye özel uygulamalarla kendinizi daha iyi hissetmenizi sağlıyoruz.",
      actions: [
        { label: "Randevu Al", href: "#request-form", variant: "primary" },
        { label: "Hizmetleri İncele", href: "#services", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Biz Kimiz?",
      title: `${config.brandName} olarak sizi anlayan bir güzellik deneyimi sunuyoruz`,
      description: "Alanında uzman ekibimizle hijyenik, sıcak ve güvenilir bir ortamda kişiye özel güzellik hizmetleri sunuyoruz. Her misafirimizi ihtiyaçlarını dinleyerek ve doğru uygulamaya yönlendirerek ağırlıyoruz.",
      actions: [
        { label: "Ekibimizi Tanıyın", href: "#about", variant: "primary" },
        { label: "İletişime Geç", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Neler Yapıyoruz?",
      title: "İhtiyacınız olan tüm bakım hizmetleri bir arada",
      description: "Saç tasarımı, kalıcı oje, protez tırnak, nail art, cilt bakımı ve özel gün hazırlıklarında profesyonel çözümler sunuyoruz.",
      highlights: ["Saç Tasarımı", "Nail Art", "Cilt Bakımı", "Özel Gün"],
      actions: [
        { label: "Hizmetleri ve Fiyatları Gör", href: "#services", variant: "primary" },
        { label: "Kampanyaları Gör", href: "#campaigns", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Neden Bizi Seçmelisiniz?",
      title: "Kendinizi güvenle emanet edebileceğiniz bir salon",
      description: "Hijyen standartları, kaliteli ürünler, deneyimli uzmanlar ve size ayrılan özel randevu süresiyle konforlu bir bakım deneyimi yaşayın.",
      highlights: ["Uzman Ekip", "Hijyenik Uygulama", "Kaliteli Ürünler", "Kişiye Özel Hizmet"],
      actions: [
        { label: "Randevu Oluştur", href: "#request-form", variant: "primary" },
        { label: "Çalışmalarımızı Gör", href: "#gallery", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Online Randevu",
      title: "Randevunuzu birkaç adımda oluşturun",
      description: "Hizmetinizi, uzmanınızı, uygun günü ve boş saati seçin. Randevunuz oluşturulduğunda seçtiğiniz saat sizin için ayrılsın.",
      actions: [
        { label: "Hemen Randevu Al", href: "#request-form", variant: "primary" },
        { label: "WhatsApp’tan Sor", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    }
  ];
}

function veterinarySlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  return [
    {
      eyebrow: config.brandName,
      title: "Dostunuz için hızlı randevu, güvenli veteriner desteği",
      description: "Acil muayene, rutin kontrol, aşı ve bakım taleplerinizi tek ekrandan iletin; kliniğimiz en kısa sürede size ulaşsın.",
      actions: [
        { label: "Randevu Talep Et", href: "#request-form", variant: "primary" },
        { label: "Hizmetleri Gör", href: "#services", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Kliniğimiz",
      title: "Her patiğe sakin, dikkatli ve güven veren bir yaklaşım",
      description: "Deneyimli veteriner ekibimiz, temiz klinik ortamımız ve düzenli bilgilendirme sürecimizle dostunuzun sağlığını birlikte takip ediyoruz.",
      actions: [
        { label: "Ekibimizi Tanıyın", href: "#about", variant: "primary" },
        { label: "İletişime Geç", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Hizmetlerimiz",
      title: "Muayeneden aşı takibine temel ihtiyaçlar bir arada",
      description: "Acil ilk değerlendirme, genel kontrol, aşı planlaması ve bakım danışmanlığı için düzenli ve kolay bir iletişim akışı sunuyoruz.",
      highlights: ["Acil Muayene", "Aşı Takibi", "Genel Kontrol", "Bakım Danışmanlığı"],
      actions: [
        { label: "Tüm Hizmetleri İncele", href: "#services", variant: "primary" },
        { label: "Kliniği Gör", href: "#gallery", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Neden Bizi Seçmelisiniz?",
      title: "Hızlı iletişim, şeffaf bilgilendirme ve güvenli takip",
      description: "Muayene öncesi doğru yönlendirme, işlem sonrası takip ve gerektiğinde WhatsApp üzerinden hızlı iletişimle süreci anlaşılır hale getiriyoruz.",
      highlights: ["Uzman Hekimler", "Temiz Klinik", "Hızlı Dönüş", "Düzenli Takip"],
      actions: [
        { label: "Randevu Oluştur", href: "#request-form", variant: "primary" },
        { label: "Konum ve İletişim", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Randevu ve Acil İletişim",
      title: "Talebinizi birkaç adımda kliniğimize iletin",
      description: "Evcil hayvanınızın türünü, tercih ettiğiniz tarihi ve kısa notunuzu paylaşın. Kliniğimiz uygunluk ve yönlendirme için size dönüş yapsın.",
      actions: [
        { label: "Randevu Talebi Bırak", href: "#request-form", variant: "primary" },
        { label: "WhatsApp’tan Yaz", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    }
  ];
}

function realEstateSlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  return [
    {
      eyebrow: config.brandName,
      title: "Aradığınız mülkü güvenle keşfedin",
      description: "Satılık, kiralık ve yatırım amaçlı portföyleri düzenli bir vitrinde inceleyin; ilgilendiğiniz mülk için danışmana hızla ulaşın.",
      actions: [
        { label: "Portföyleri İncele", href: "#services", variant: "primary" },
        { label: "Talep Bırak", href: "#request-form", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Bölge Uzmanlığı",
      title: "Doğru lokasyon, doğru fiyat ve güvenilir danışmanlık",
      description: "Bölgeyi bilen danışmanlarımızla mülk arama, satış ve kiralama sürecinde ihtiyaçlarınıza uygun seçenekleri birlikte değerlendiriyoruz.",
      actions: [
        { label: "Danışmanları Tanıyın", href: "#about", variant: "primary" },
        { label: "İletişime Geç", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Portföyler",
      title: "Satılık, kiralık ve yatırım fırsatları tek vitrinde",
      description: "Daire, villa, arsa ve zeytinlik seçeneklerini fiyat, konum ve kullanım amacına göre karşılaştırın.",
      highlights: ["Satılık Daire", "Kiralık Villa", "Arsa & Zeytinlik", "Bölge Uzmanlığı"],
      actions: [
        { label: "İlanları Gör", href: "#services", variant: "primary" },
        { label: "Vitrini İncele", href: "#gallery", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Mülkünüzü Değerlendirin",
      title: "Mülkünüzü doğru sunum ve doğru alıcıyla buluşturun",
      description: "Satmak veya kiraya vermek istediğiniz mülk için temel bilgileri paylaşın; danışmanımız fiyatlandırma ve pazarlama süreci için size ulaşsın.",
      highlights: ["Profesyonel Sunum", "Bölgesel Analiz", "Doğru Alıcı", "Hızlı İletişim"],
      actions: [
        { label: "Evimi Değerlendirin", href: "#request-form", variant: "primary" },
        { label: "WhatsApp’tan Sor", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    },
    {
      eyebrow: "Hızlı Talep",
      title: "Bütçenizi ve aradığınız bölgeyi birkaç adımda iletin",
      description: "Satın alma, kiralama veya mülkünüzü değerlendirme talebinizi yazın. Danışmanımız uygun portföylerle size dönüş yapsın.",
      actions: [
        { label: "Portföy Talebi Bırak", href: "#request-form", variant: "primary" },
        { label: "Danışmana Yaz", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    }
  ];
}

function cafeSlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  return [
    {
      eyebrow: config.brandName,
      title: "Günlük taze lezzetleri tek dokunuşla siparişe dönüştürün",
      description: "Menümüzü inceleyin, günün ürünlerini keşfedin ve sipariş veya masa bilgisi için işletmemize hızla ulaşın.",
      actions: [
        { label: "Menüyü İncele", href: "#services", variant: "primary" },
        { label: "WhatsApp’tan Sipariş", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    },
    {
      eyebrow: "Biz Kimiz?",
      title: "Mutfağımızdan vitrininize her gün taze üretim",
      description: "Günlük hazırlanan ürünler, sıcak servis ve özenli sunumla lezzeti samimi bir mekan deneyimiyle buluşturuyoruz.",
      actions: [
        { label: "Lezzet Vitrinini Gör", href: "#gallery", variant: "primary" },
        { label: "Konuma Git", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Menümüzde Neler Var?",
      title: "Kahvaltıdan tatlıya tüm lezzetler bir arada",
      description: "Ana lezzetler, kahvaltı ürünleri, atıştırmalıklar, tatlılar, içecekler ve paket seçenekleri günün her saatine eşlik ediyor.",
      highlights: ["Ana Lezzetler", "Kahvaltı", "Tatlı & İçecek", "Paket & Gel-Al"],
      actions: [
        { label: "Menü ve Fiyatları Gör", href: "#services", variant: "primary" },
        { label: "Günün Fırsatları", href: "#campaigns", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Sipariş Kolaylığı",
      title: "Paket, gel-al ve toplu siparişleri kolayca planlayın",
      description: "Ürün, adet ve teslim bilgilerinizi iletin; işletmemiz uygunluk ve fiyat bilgisiyle size hızlıca dönüş yapsın.",
      highlights: ["Paket Servis", "Gel-Al", "Toplu Sipariş", "Masa Bilgisi"],
      actions: [
        { label: "Sipariş Talebi Bırak", href: "#request-form", variant: "primary" },
        { label: "WhatsApp’tan Yaz", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    },
    {
      eyebrow: "Sipariş ve Rezervasyon",
      title: "Masanızı veya siparişinizi birkaç adımda planlayın",
      description: "Tercih ettiğiniz ürünleri, tarihi ve saati paylaşın. İşletmemiz sipariş veya rezervasyon uygunluğu için size ulaşsın.",
      actions: [
        { label: "Hemen Talep Bırak", href: "#request-form", variant: "primary" },
        { label: "Konum ve İletişim", href: "#contact", variant: "secondary" }
      ]
    }
  ];
}

function kindergartenSlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  return [
    {
      eyebrow: config.brandName,
      title: "Çocuğunuz için güvenli, sevgi dolu ve gelişimi destekleyen bir başlangıç",
      description: "Yaşa uygun sınıflar, düzenli günlük akış ve güçlü veli iletişimiyle çocukların kendilerini güvende hissettiği bir ortam sunuyoruz.",
      actions: [
        { label: "Ön Görüşme Talep Et", href: "#request-form", variant: "primary" },
        { label: "Sınıfları İncele", href: "#services", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Biz Kimiz?",
      title: "Her çocuğu kendi ritminde destekleyen eğitim ekibi",
      description: "Çocukların sosyal, duygusal, bilişsel ve motor gelişimini oyun temelli etkinliklerle desteklerken ailelerle düzenli iletişim kuruyoruz.",
      actions: [
        { label: "Ekibimizi Tanıyın", href: "#about", variant: "primary" },
        { label: "İletişime Geç", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Sınıflar ve Program",
      title: "Yaşa uygun sınıflar ve düzenli günlük akış",
      description: "Oyun, sanat, müzik, hareket, yemek ve dinlenme zamanlarını çocukların yaş grubuna uygun dengeli bir programda buluşturuyoruz.",
      highlights: ["2 Yaş Oyun Grubu", "3-4 Yaş", "5 Yaş Hazırlık", "Günlük Program"],
      actions: [
        { label: "Sınıfları Gör", href: "#services", variant: "primary" },
        { label: "Günlük Akışı İncele", href: "#campaigns", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Neden Bizi Seçmelisiniz?",
      title: "Güvenli ortam, dengeli rutin ve güçlü veli iletişimi",
      description: "Çocukların kendilerini ait hissettiği sıcak bir ortam, düzenli bakım akışı ve ailelerin süreci takip edebileceği açık iletişim sunuyoruz.",
      highlights: ["Güvenli Ortam", "Yaşa Uygun Eğitim", "Düzenli Rutin", "Veli İletişimi"],
      actions: [
        { label: "Galeriyi İncele", href: "#gallery", variant: "primary" },
        { label: "Ön Görüşme Al", href: "#request-form", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Kayıt ve Kontenjan",
      title: "Kayıt ve kontenjan bilgisini birkaç adımda alın",
      description: "Çocuğunuzun yaşını, düşündüğünüz kayıt dönemini ve görüşme tarihinizi paylaşın. Kurumumuz size detaylı bilgiyle dönüş yapsın.",
      actions: [
        { label: "Kayıt Görüşmesi Talep Et", href: "#request-form", variant: "primary" },
        { label: "WhatsApp’tan Sor", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    }
  ];
}

function eventVenueSlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  return [
    {
      eyebrow: config.brandName,
      title: "Hayalinizdeki daveti unutulmaz bir geceye dönüştürün",
      description: "Düğün, nişan, kına ve özel davetler için salon, konsept ve organizasyon seçeneklerini tek vitrinde keşfedin.",
      actions: [
        { label: "Uygun Tarih Sor", href: "#request-form", variant: "primary" },
        { label: "Paketleri İncele", href: "#services", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Organizasyon Ekibimiz",
      title: "Her detayı planlayan deneyimli bir davet ekibi",
      description: "Masa düzeninden sahneye, ışık sisteminden davet akışına kadar tüm detayları organizasyon türünüze göre birlikte planlıyoruz.",
      actions: [
        { label: "Ekibimizi Tanıyın", href: "#about", variant: "primary" },
        { label: "İletişime Geç", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Paketlerimiz",
      title: "Düğün, kına, nişan ve yemekli davet paketleri",
      description: "Davetli sayısı, konsept ve servis tercihlerinize göre salon kullanımı ve organizasyon hizmetlerini tek pakette planlayın.",
      highlights: ["Düğün", "Kına Gecesi", "Nişan", "Yemekli Davet"],
      actions: [
        { label: "Paketleri Gör", href: "#services", variant: "primary" },
        { label: "Fırsatları İncele", href: "#campaigns", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Salon ve Konsept",
      title: "Salon atmosferini ve davet konseptlerini keşfedin",
      description: "Masa düzeni, sahne, pist, gelin yolu ve farklı organizasyon konseptlerini galerimizde inceleyin.",
      highlights: ["Geniş Davet Alanı", "Sahne & Pist", "Konsept Masa", "Işık Sistemi"],
      actions: [
        { label: "Galeriyi Aç", href: "#gallery", variant: "primary" },
        { label: "Konuma Git", href: "#contact", variant: "secondary" }
      ]
    },
    {
      eyebrow: "Ön Rezervasyon",
      title: "Tarihinizi ve davet planınızı birkaç adımda iletin",
      description: "Organizasyon türünü, tahmini davetli sayısını ve düşündüğünüz tarihi paylaşın. Salon ekibimiz uygunluk ve paket seçenekleriyle size dönüş yapsın.",
      actions: [
        { label: "Tarih Talebi Bırak", href: "#request-form", variant: "primary" },
        { label: "WhatsApp’tan Sor", href: whatsappUrl(config), variant: "secondary", external: true }
      ]
    }
  ];
}

function buildSlides(config: BusinessTemplateConfig): FlowHeroSlide[] {
  switch (config.template) {
    case "appointment": return veterinarySlides(config);
    case "salon": return salonSlides(config);
    case "real-estate": return realEstateSlides(config);
    case "cafe": return cafeSlides(config);
    case "kindergarten": return kindergartenSlides(config);
    case "event-venue": return eventVenueSlides(config);
    default: return salonSlides(config);
  }
}

export function SalonHeroSlider({ config }: { config: BusinessTemplateConfig }) {
  const slides = useMemo(() => buildSlides(config), [config]);
  const loopedSlides = useMemo(() => [slides[slides.length - 1], ...slides, slides[0]], [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const pointerStart = useRef<PointerStart | null>(null);

  const moveBy = useCallback((direction: -1 | 1) => {
    if (isAnimating) return;
    setTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((current) => current + direction);
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    if (typeof window === "undefined" || isAnimating || isDragging) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setTimeout(() => moveBy(1), AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isAnimating, isDragging, moveBy]);

  useEffect(() => {
    setActiveIndex(0);
    setTrackIndex(1);
    setIsAnimating(false);
    setTransitionEnabled(true);
    setDragOffset(0);
  }, [config.template]);

  function showSlide(index: number) {
    if (isAnimating || isDragging || index === activeIndex) return;
    setTransitionEnabled(true);
    setIsAnimating(true);
    setActiveIndex(index);
    setTrackIndex(index + 1);
  }

  function handleTransitionEnd() {
    if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(slides.length);
    } else if (trackIndex === slides.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);
    }
    setIsAnimating(false);
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (isAnimating || (event.pointerType === "mouse" && event.button !== 0)) return;
    if ((event.target as HTMLElement).closest("a, button")) return;

    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setTransitionEnabled(false);
    setIsDragging(true);
    setDragOffset(0);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > 12) return;

    const limit = event.currentTarget.clientWidth * 0.72;
    setDragOffset(Math.max(-limit, Math.min(limit, distanceX)));
  }

  function finishPointerGesture(event: PointerEvent<HTMLElement>, cancelled = false) {
    const start = pointerStart.current;
    if (!start || start.id !== event.pointerId) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    pointerStart.current = null;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    }

    setIsDragging(false);
    setTransitionEnabled(true);
    setDragOffset(0);

    const isHorizontalSwipe = Math.abs(distanceX) >= SWIPE_THRESHOLD && Math.abs(distanceX) > Math.abs(distanceY) * 1.1;
    if (!cancelled && isHorizontalSwipe) moveBy(distanceX > 0 ? -1 : 1);
  }

  return (
    <section
      className={`salonHeroSlider salonHeroSlideTone${activeIndex + 1} flowHeroTemplate-${config.template} ${isDragging ? "isDragging" : ""}`}
      aria-label={`${config.sector} tanıtım slaytları`}
      onPointerCancel={(event) => finishPointerGesture(event, true)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishPointerGesture(event)}
    >
      <div className="salonHeroViewport">
        <div
          className="salonHeroTrack"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(calc(-${trackIndex * 100}% + ${dragOffset}px), 0, 0)`,
            transition: transitionEnabled && !isDragging ? undefined : "none"
          }}
        >
          {loopedSlides.map((slide, position) => {
            const isCurrent = position === trackIndex;
            return (
              <article
                aria-hidden={!isCurrent}
                className={`salonHeroSlide ${isCurrent ? "active" : ""}`}
                key={`${position}-${slide.title}`}
              >
                <div className="salonHeroContent">
                  <span className="salonHeroEyebrow">{slide.eyebrow}</span>
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  {slide.highlights?.length ? (
                    <div className="salonHeroHighlights" aria-label="Öne çıkan özellikler">
                      {slide.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
                    </div>
                  ) : null}
                  <div className="salonHeroActions">
                    {slide.actions.map((action) => (
                      <a
                        className={action.variant === "primary" ? "pillButton navButtonLink" : "ghostButton navButtonLink"}
                        href={action.href}
                        key={action.label}
                        rel={action.external ? "noreferrer" : undefined}
                        target={action.external ? "_blank" : undefined}
                        tabIndex={isCurrent ? 0 : -1}
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <button
        aria-label="Önceki tanıtım"
        className="salonHeroEdgeArrow salonHeroEdgeArrowLeft"
        disabled={isAnimating || isDragging}
        onClick={() => moveBy(-1)}
        type="button"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        aria-label="Sonraki tanıtım"
        className="salonHeroEdgeArrow salonHeroEdgeArrowRight"
        disabled={isAnimating || isDragging}
        onClick={() => moveBy(1)}
        type="button"
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className="salonHeroControls">
        <div className="salonHeroDots" aria-label="Tanıtım seçimi">
          {slides.map((slide, index) => (
            <button
              aria-label={`${index + 1}. tanıtımı göster`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={activeIndex === index ? "active" : ""}
              key={slide.title}
              onClick={() => showSlide(index)}
              type="button"
            >
              <span />
            </button>
          ))}
        </div>
        <span className="salonHeroCounter">{String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
