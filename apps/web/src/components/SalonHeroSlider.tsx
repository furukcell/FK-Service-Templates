import { useEffect, useMemo, useState } from "react";
import type { FocusEvent } from "react";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

const AUTO_PLAY_MS = 10000;

type SlideAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external?: boolean;
};

type SalonHeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  actions: SlideAction[];
};

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappUrl(config: BusinessTemplateConfig) {
  const phone = normalizePhone(config.whatsapp || config.phone);
  const message = encodeURIComponent(`Merhaba ${config.brandName}, hizmetleriniz ve randevu seçenekleriniz hakkında bilgi almak istiyorum.`);
  return phone.length >= 10
    ? `https://wa.me/${phone}?text=${message}`
    : `https://api.whatsapp.com/send?text=${message}`;
}

function buildSlides(config: BusinessTemplateConfig): SalonHeroSlide[] {
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

export function SalonHeroSlider({ config }: { config: BusinessTemplateConfig }) {
  const slides = useMemo(() => buildSlides(config), [config]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  function showSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
  }

  return (
    <section
      className={`salonHeroSlider salonHeroSlideTone${activeIndex + 1}`}
      aria-label="Salon tanıtım slaytları"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="salonHeroViewport">
        {slides.map((slide, index) => (
          <article
            aria-hidden={activeIndex !== index}
            className={`salonHeroSlide ${activeIndex === index ? "active" : ""}`}
            key={slide.title}
          >
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
                  tabIndex={activeIndex === index ? 0 : -1}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="salonHeroControls">
        <div className="salonHeroArrows">
          <button aria-label="Önceki tanıtım" onClick={() => showSlide(activeIndex - 1)} type="button">‹</button>
          <button aria-label="Sonraki tanıtım" onClick={() => showSlide(activeIndex + 1)} type="button">›</button>
        </div>
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
