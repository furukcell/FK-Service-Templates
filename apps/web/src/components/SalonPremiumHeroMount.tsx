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

type IconName = "leaf" | "tag" | "calendar" | "gallery" | "user" | "phone" | "diamond" | "team" | "whatsapp";

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
  { label: "Hizmetler", href: "#services", icon: "leaf" },
  { label: "Kampanyalar", href: "#campaigns", icon: "tag" },
  { label: "Randevu", href: "#request-form", icon: "calendar" },
  { label: "Galeri", href: "#gallery", icon: "gallery" },
  { label: "Hakkımızda", href: "#about", icon: "user" },
  { label: "İletişim", href: "#contact", icon: "phone" }
];

const BENEFITS: Array<{ title: string; subtitle: string; icon: IconName }> = [
  { title: "Premium", subtitle: "bakım", icon: "diamond" },
  { title: "Kişiye", subtitle: "özel", icon: "user" },
  { title: "Uzman", subtitle: "ekip", icon: "team" },
  { title: "WhatsApp", subtitle: "destek", icon: "whatsapp" }
];

function Icon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8
  };

  if (name === "leaf") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M19.5 4.5C13 4.7 7.5 7.6 5.3 13.3c-1.2 3.1.7 5.5 3.8 4.9 5.8-1.1 8.8-6.4 10.4-13.7Z"/><path {...common} d="M4.5 19.5c2.7-4.8 6.6-8.1 11.7-10.1"/></svg>;
  if (name === "tag") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 5.5V11l8.5 8.5 7-7L11 4H5.5A1.5 1.5 0 0 0 4 5.5Z"/><circle {...common} cx="8" cy="8" r="1.2"/></svg>;
  if (name === "calendar") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3.5" y="5" width="17" height="15" rx="2.5"/><path {...common} d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17"/><path {...common} d="m8 14 2.2 2.2L16 11.8"/></svg>;
  if (name === "gallery") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3.5" y="4" width="17" height="16" rx="2.5"/><circle {...common} cx="8.5" cy="9" r="1.5"/><path {...common} d="m5.5 17 4-4 3 3 2.2-2.2L18.5 17"/></svg>;
  if (name === "user") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="8" r="3.5"/><path {...common} d="M5.5 20c.6-4 3-6 6.5-6s5.9 2 6.5 6"/></svg>;
  if (name === "phone") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7.2 3.8 10 7.2 8.2 10c1.4 3 3.8 5.4 6.8 6.8l2.8-1.8 3.4 2.8c.3.3.4.7.2 1.1-.8 1.6-2.5 2.2-4.2 1.8C9.6 19 5 14.4 3.3 6.8c-.4-1.7.2-3.4 1.8-4.2.4-.2.8-.1 1.1.2Z"/></svg>;
  if (name === "diamond") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m3.5 8 4-4h9l4 4-8.5 12L3.5 8Z"/><path {...common} d="M3.5 8h17M8 4l-1 4 5 12 5-12-1-4"/></svg>;
  if (name === "team") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="8" r="3"/><circle {...common} cx="5.5" cy="10" r="2"/><circle {...common} cx="18.5" cy="10" r="2"/><path {...common} d="M7 20c.4-3.7 2-5.7 5-5.7s4.6 2 5 5.7M2.5 19c.2-2.7 1.3-4.2 3.5-4.2 1 0 1.8.3 2.4.8M21.5 19c-.2-2.7-1.3-4.2-3.5-4.2-1 0-1.8.3-2.4.8"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z"/><path {...common} d="M8.3 8.5c.7 3.4 2.6 5.3 6 6l1.3-1.3"/></svg>;
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappUrl(config: BusinessTemplateConfig) {
  const phone = normalizePhone(config.whatsapp || config.phone);
  const text = encodeURIComponent(`Merhaba ${config.brandName}, hizmetleriniz ve randevu seçenekleriniz hakkında bilgi almak istiyorum.`);
  return phone.length >= 10 ? `https://wa.me/${phone}?text=${text}` : "#contact";
}

function buildSlides(config: BusinessTemplateConfig): PremiumSlide[] {
  return [
    {
      eyebrow: "Güzellik sizde başlar",
      title: "Işıltınızı ortaya çıkarın.",
      description: "Uzman ekibimizle size özel bakım ve uygulamalarla, kendinizi her zaman en iyi hissedin.",
      primaryLabel: "Randevu Oluştur",
      primaryHref: "#request-form",
      secondaryLabel: "İletişime Geç",
      secondaryHref: "#contact",
      imageUrl: "/salon/slide-1.png"
    },
    {
      eyebrow: "Size özel bakım",
      title: "Bakımınızı size göre planlayın.",
      description: "Saç, cilt ve tırnak bakımında doğru hizmeti, doğru uzmanla ve size uygun zamanda buluşturuyoruz.",
      primaryLabel: "Hizmetleri İncele",
      primaryHref: "#services",
      secondaryLabel: "Kampanyaları Gör",
      secondaryHref: "#campaigns",
      imageUrl: "/salon/slide-2.png"
    },
    {
      eyebrow: "Uzman dokunuş",
      title: "Güzelliğinize değer katıyoruz.",
      description: "Hijyenik salon ortamı, kaliteli ürünler ve deneyimli uzmanlarla güven veren bir bakım deneyimi yaşayın.",
      primaryLabel: "Ekibimizi Tanıyın",
      primaryHref: "#about",
      secondaryLabel: "Galeriyi Aç",
      secondaryHref: "#gallery",
      imageUrl: "/salon/slide-3.png"
    },
    {
      eyebrow: "Kolay randevu",
      title: "Randevunuzu birkaç dokunuşla oluşturun.",
      description: "Hizmetinizi ve tercih ettiğiniz zamanı seçin; salon ekibimiz uygunluk bilgisiyle size hızla dönüş yapsın.",
      primaryLabel: "Hemen Randevu Al",
      primaryHref: "#request-form",
      secondaryLabel: "WhatsApp’tan Sor",
      secondaryHref: whatsappUrl(config),
      imageUrl: "/salon/slide-4.png"
    }
  ];
}

function SalonPremiumHero({ config }: { config: BusinessTemplateConfig }) {
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
    <div className="salonPremiumShell">
      <header className="salonPremiumHeader">
        <a className="salonPremiumBrand" href="#salon-premium-top" aria-label={`${config.brandName} ana sayfa`}>
          <span className="salonPremiumLogo">{config.brandName.slice(0, 2).toUpperCase()}</span>
          <span className="salonPremiumBrandName">{config.brandName}</span>
          <span className="salonPremiumBrandOrnament" aria-hidden="true"><i />✦<i /></span>
        </a>

        <nav className="salonPremiumNav" aria-label="Salon sayfa menüsü">
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
        className={`salonPremiumStage ${isDragging ? "isDragging" : ""}`}
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
                  className={`salonPremiumSlide ${isCurrent ? "isActive" : ""}`}
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
                    <span className="salonPremiumBackCard salonPremiumBackCardOne" />
                    <span className="salonPremiumBackCard salonPremiumBackCardTwo" />
                    <div className="salonPremiumPortrait" style={{ backgroundImage: `url(${slide.imageUrl})` }} />
                    <span className="salonPremiumPetal salonPremiumPetalOne" />
                    <span className="salonPremiumPetal salonPremiumPetalTwo" />
                    <span className="salonPremiumPetal salonPremiumPetalThree" />
                  </div>

                  <div className="salonPremiumBenefits" aria-label="Salonun öne çıkan özellikleri">
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

      <div className="salonPremiumControls" aria-label="Tanıtım slaytları">
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

export function SalonPremiumHeroMount({
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
      shell?.classList.remove("salonPremiumReplaceMode");
      restoreDetachedNodes();
      shell = null;
    }

    function detachNode(node: HTMLElement | null, label: string) {
      if (!node?.parentNode) return;
      const marker = document.createComment(`salon-premium-${label}`);
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
      shell.classList.add("salonPremiumReplaceMode");

      detachNode(shell.querySelector<HTMLElement>(":scope > .topBar"), "topbar");
      detachNode(shell.querySelector<HTMLElement>(":scope > .navbar"), "navbar");
      detachNode(shell.querySelector<HTMLElement>(":scope > .heroWrap"), "hero");

      mount = document.createElement("section");
      mount.className = "salonPremiumHeroMount";
      mount.id = "salon-premium-top";
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

  return target ? createPortal(<SalonPremiumHero config={config} />, target) : null;
}
