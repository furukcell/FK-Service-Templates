import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, TransitionEvent } from "react";
import { createPortal } from "react-dom";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

const AUTO_PLAY_MS = 10000;
const SWIPE_THRESHOLD = 48;

type PremiumSlide = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  imageUrl: string;
};

type IconName = "blocks" | "calendar" | "gallery" | "school" | "phone" | "shield" | "teacher" | "heart" | "chat";

type DetachedNode = {
  node: HTMLElement;
  marker: Comment;
};

type PointerStart = {
  id: number;
  x: number;
  y: number;
};

const NAV_ITEMS: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Sınıflar", href: "#services", icon: "blocks" },
  { label: "Günlük Akış", href: "#campaigns", icon: "calendar" },
  { label: "Ön Görüşme", href: "#request-form", icon: "school" },
  { label: "Galeri", href: "#gallery", icon: "gallery" },
  { label: "Hakkımızda", href: "#about", icon: "teacher" },
  { label: "İletişim", href: "#contact", icon: "phone" }
];

const BENEFITS: Array<{ title: string; subtitle: string; icon: IconName }> = [
  { title: "Güvenli", subtitle: "ortam", icon: "shield" },
  { title: "Uzman", subtitle: "öğretmen", icon: "teacher" },
  { title: "Günlük", subtitle: "takip", icon: "calendar" },
  { title: "Veli", subtitle: "iletişimi", icon: "chat" }
];

function Icon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8
  };

  if (name === "blocks") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3.5" y="12.5" width="7" height="7" rx="1.4"/><rect {...common} x="13.5" y="12.5" width="7" height="7" rx="1.4"/><rect {...common} x="8.5" y="3.5" width="7" height="7" rx="1.4"/></svg>;
  if (name === "calendar") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3.5" y="5" width="17" height="15" rx="2.5"/><path {...common} d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17M8 14l2.1 2.1 5.3-5.1"/></svg>;
  if (name === "gallery") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3.5" y="4" width="17" height="16" rx="2.5"/><circle {...common} cx="8.5" cy="9" r="1.5"/><path {...common} d="m5.5 17 4-4 3 3 2.2-2.2L18.5 17"/></svg>;
  if (name === "school") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m3.5 9 8.5-5 8.5 5M5.5 9v10h13V9M9.5 19v-5h5v5M8 11h.01M16 11h.01"/></svg>;
  if (name === "phone") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7.2 3.8 10 7.2 8.2 10c1.4 3 3.8 5.4 6.8 6.8l2.8-1.8 3.4 2.8c.3.3.4.7.2 1.1-.8 1.6-2.5 2.2-4.2 1.8C9.6 19 5 14.4 3.3 6.8c-.4-1.7.2-3.4 1.8-4.2.4-.2.8-.1 1.1.2Z"/></svg>;
  if (name === "shield") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3.5 19 6v5.2c0 4.3-2.8 7.4-7 9.3-4.2-1.9-7-5-7-9.3V6l7-2.5Z"/><path {...common} d="m8.5 12 2.2 2.2 4.8-4.8"/></svg>;
  if (name === "teacher") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="7.5" r="3"/><path {...common} d="M6.5 20c.5-4 2.3-6 5.5-6s5 2 5.5 6M4 8.5h3M17 8.5h3M5.5 5.5v6M18.5 5.5v6"/></svg>;
  if (name === "heart") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 20s-7.5-4.4-7.5-10.1A4.4 4.4 0 0 1 12 6.8a4.4 4.4 0 0 1 7.5 3.1C19.5 15.6 12 20 12 20Z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 5.5h16v11H9l-5 3v-14Z"/><path {...common} d="M8 10h8M8 13h5"/></svg>;
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappUrl(config: BusinessTemplateConfig) {
  const phone = normalizePhone(config.whatsapp || config.phone);
  const text = encodeURIComponent(`Merhaba ${config.brandName}, kayıt, kontenjan ve ön görüşme seçenekleri hakkında bilgi almak istiyorum.`);
  return phone.length >= 10 ? `https://wa.me/${phone}?text=${text}` : "#contact";
}

function buildSlides(config: BusinessTemplateConfig): PremiumSlide[] {
  return [
    {
      eyebrow: "Mutlu bir başlangıç",
      title: "Güvenle büyüyen minik adımlar.",
      description: "Sevgi dolu sınıflar, güvenli alanlar ve çocuğunuzun gelişimini destekleyen özenli bir eğitim ortamı.",
      primaryLabel: "Ön Görüşme Oluştur",
      primaryHref: "#request-form",
      secondaryLabel: "Kurumu Tanıyın",
      secondaryHref: "#about",
      imageUrl: "/kindergarten/slide-1.svg"
    },
    {
      eyebrow: "Gelişimi birlikte izleyin",
      title: "Her gününü değerli kılan bir program.",
      description: "Yaş grubuna uygun oyun, sanat, müzik ve gelişim etkinlikleriyle düzenli ve dengeli bir günlük akış.",
      primaryLabel: "Sınıfları İncele",
      primaryHref: "#services",
      secondaryLabel: "Günlük Akışı Gör",
      secondaryHref: "#campaigns",
      imageUrl: "/kindergarten/slide-2.svg"
    },
    {
      eyebrow: "Öğrenirken eğlenirler",
      title: "Merak eder, keşfeder, özgürce üretir.",
      description: "Boyama, müzik, hareket ve oyun temelli etkinliklerle çocukların sosyal ve yaratıcı yönlerini destekliyoruz.",
      primaryLabel: "Etkinlikleri İncele",
      primaryHref: "#campaigns",
      secondaryLabel: "Galeriyi Aç",
      secondaryHref: "#gallery",
      imageUrl: "/kindergarten/slide-3.svg"
    },
    {
      eyebrow: "Kolay kayıt ve iletişim",
      title: "Ön görüşmenizi birkaç adımda planlayın.",
      description: "Çocuğunuzun yaşını ve tercih ettiğiniz tarihi paylaşın; kurum ekibimiz kontenjan bilgisiyle size dönüş yapsın.",
      primaryLabel: "Kayıt Talebi Bırak",
      primaryHref: "#request-form",
      secondaryLabel: "WhatsApp’tan Sor",
      secondaryHref: whatsappUrl(config),
      imageUrl: "/kindergarten/slide-4.svg"
    }
  ];
}

function KindergartenPremiumHero({ config }: { config: BusinessTemplateConfig }) {
  const slides = useMemo(() => buildSlides(config), [config]);
  const loopedSlides = useMemo(() => [slides[slides.length - 1], ...slides, slides[0]], [slides]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [activeNav, setActiveNav] = useState("#request-form");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
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
    setIsDragging(false);
    setTransitionEnabled(true);
    setDragOffset(0);
    pointerStart.current = null;
  }, [config.brandName]);

  function showSlide(index: number) {
    if (isAnimating || isDragging || index === activeIndex) return;
    setTransitionEnabled(true);
    setIsAnimating(true);
    setActiveIndex(index);
    setTrackIndex(index + 1);
  }

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
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
    const limit = event.currentTarget.clientWidth * 0.78;
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
    <div className="salonPremiumShell kindergartenPremiumShell">
      <header className="salonPremiumHeader kindergartenPremiumHeader">
        <a className="salonPremiumBrand" href="#kindergarten-premium-top" aria-label={`${config.brandName} ana sayfa`}>
          <span className="salonPremiumLogo kindergartenPremiumLogo">{config.brandName.slice(0, 2).toUpperCase()}</span>
          <span className="salonPremiumBrandName">{config.brandName}</span>
          <span className="salonPremiumBrandOrnament" aria-hidden="true"><i />✦<i /></span>
        </a>

        <nav className="salonPremiumNav" aria-label="Kreş sayfa menüsü">
          {NAV_ITEMS.map((item) => (
            <a
              className={activeNav === item.href ? "isActive" : ""}
              href={item.href}
              key={item.href}
              onClick={() => setActiveNav(item.href)}
            >
              <span className="salonPremiumNavIcon"><Icon name={item.icon} /></span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <div
        className={`salonPremiumStage kindergartenPremiumStage ${isDragging ? "isDragging" : ""}`}
        onPointerCancel={(event) => finishPointerGesture(event, true)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishPointerGesture(event)}
      >
        <div className="salonPremiumViewport">
          <div
            className="salonPremiumTrack"
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
                  className={`salonPremiumSlide kindergartenPremiumSlide ${isCurrent ? "isActive" : ""}`}
                  key={`${position}-${slide.title}`}
                >
                  <div className="salonPremiumCopy">
                    <span className="salonPremiumEyebrow">{slide.eyebrow}</span>
                    <h1>{slide.title}</h1>
                    <span className="salonPremiumTitleOrnament" aria-hidden="true"><i />✦</span>
                    <p>{slide.description}</p>
                    <div className="salonPremiumActions">
                      <a className="salonPremiumPrimary" href={slide.primaryHref} tabIndex={isCurrent ? 0 : -1}>{slide.primaryLabel}<span aria-hidden="true">→</span></a>
                      <a
                        className="salonPremiumSecondary"
                        href={slide.secondaryHref}
                        rel={slide.secondaryHref.startsWith("https://") ? "noreferrer" : undefined}
                        target={slide.secondaryHref.startsWith("https://") ? "_blank" : undefined}
                        tabIndex={isCurrent ? 0 : -1}
                      >
                        {slide.secondaryLabel}<span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>

                  <div className="salonPremiumPortraitStack" aria-hidden="true">
                    <div className="salonPremiumPortrait" style={{ backgroundImage: `url(${slide.imageUrl})` }} />
                  </div>

                  <div className="salonPremiumBenefits" aria-label="Kreşin öne çıkan özellikleri">
                    {BENEFITS.map((benefit) => (
                      <div key={benefit.title}>
                        <span className="salonPremiumBenefitIcon"><Icon name={benefit.icon} /></span>
                        <span><strong>{benefit.title}</strong><small>{benefit.subtitle}</small></span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="salonPremiumControls" aria-label="Kreş tanıtım slaytları">
        {slides.map((slide, index) => (
          <button
            aria-label={`${index + 1}. tanıtımı göster`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={activeIndex === index ? "isActive" : ""}
            key={slide.title}
            onClick={() => showSlide(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

export function KindergartenPremiumHeroMount({
  active,
  config
}: {
  active: boolean;
  config: BusinessTemplateConfig;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      setTarget(null);
      return undefined;
    }

    let mount: HTMLElement | null = null;
    let shell: HTMLElement | null = null;
    let detachedNodes: DetachedNode[] = [];
    let scheduled = false;

    function restoreDetachedNodes() {
      detachedNodes.forEach(({ node, marker }) => {
        marker.parentNode?.insertBefore(node, marker);
        marker.remove();
      });
      detachedNodes = [];
    }

    function cleanup() {
      setTarget(null);
      mount?.remove();
      mount = null;
      shell?.classList.remove("salonPremiumReplaceMode", "kindergartenPremiumReplaceMode");
      restoreDetachedNodes();
      shell = null;
    }

    function detachNode(node: HTMLElement | null, label: string) {
      if (!node?.parentNode) return;
      const marker = document.createComment(`kindergarten-premium-${label}`);
      node.parentNode.insertBefore(marker, node);
      node.remove();
      detachedNodes.push({ node, marker });
    }

    function attach() {
      scheduled = false;
      const nextShell = document.querySelector<HTMLElement>(".pageShell");
      if (!nextShell || (shell === nextShell && mount?.isConnected)) return;

      cleanup();
      shell = nextShell;
      shell.classList.add("salonPremiumReplaceMode", "kindergartenPremiumReplaceMode");

      detachNode(shell.querySelector<HTMLElement>(":scope > .topBar"), "topbar");
      detachNode(shell.querySelector<HTMLElement>(":scope > .navbar"), "navbar");
      detachNode(shell.querySelector<HTMLElement>(":scope > .heroWrap"), "hero");

      mount = document.createElement("section");
      mount.className = "salonPremiumHeroMount kindergartenPremiumHeroMount";
      mount.id = "kindergarten-premium-top";
      mount.setAttribute("aria-label", `${config.brandName} giriş alanı`);
      shell.insertBefore(mount, shell.firstChild);
      setTarget(mount);
    }

    function scheduleAttach() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(attach);
    }

    scheduleAttach();
    const observer = new MutationObserver(scheduleAttach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, [active, config.brandName]);

  return target ? createPortal(<KindergartenPremiumHero config={config} />, target) : null;
}
