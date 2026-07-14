import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

const AUTO_PLAY_MS = 10000;
const SWIPE_THRESHOLD = 48;

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

type PointerStart = {
  id: number;
  x: number;
  y: number;
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
      className={`salonHeroSlider salonHeroSlideTone${activeIndex + 1} ${isDragging ? "isDragging" : ""}`}
      aria-label="Salon tanıtım slaytları"
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
