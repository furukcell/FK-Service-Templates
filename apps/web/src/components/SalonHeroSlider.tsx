import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FocusEvent, TouchEvent } from "react";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

const AUTO_PLAY_MS = 10000;
const SWIPE_THRESHOLD = 55;

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
  const loopedSlides = useMemo(() => [slides[slides.length - 1], ...slides, slides[0]], [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const moveBy = useCallback((direction: -1 | 1) => {
    if (isAnimating) return;
    setTransitionEnabled(true);
    setIsAnimating(true);
    setTrackIndex((current) => current + direction);
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    if (isPaused || typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setInterval(() => moveBy(1), AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, moveBy]);

  function showSlide(index: number) {
    if (isAnimating || index === activeIndex) return;
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

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    setIsPaused(true);
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    setIsPaused(false);
    if (start === null || end === undefined) return;
    const distance = end - start;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    moveBy(distance > 0 ? -1 : 1);
  }

  return (
    <section
      className={`salonHeroSlider salonHeroSlideTone${activeIndex + 1}`}
      aria-label="Salon tanıtım slaytları"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="salonHeroViewport">
        <div
          className="salonHeroTrack"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(-${trackIndex * 100}%, 0, 0)`,
            transition: transitionEnabled ? undefined : "none"
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
        disabled={isAnimating}
        onClick={() => moveBy(-1)}
        type="button"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        aria-label="Sonraki tanıtım"
        className="salonHeroEdgeArrow salonHeroEdgeArrowRight"
        disabled={isAnimating}
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
