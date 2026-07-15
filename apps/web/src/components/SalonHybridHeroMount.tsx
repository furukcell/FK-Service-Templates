import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

type HybridSlide = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

type IconName = "leaf" | "tag" | "calendar" | "gallery" | "user" | "phone" | "diamond" | "team" | "whatsapp";

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

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=88";

function Icon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.8 };

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

function buildSlides(config: BusinessTemplateConfig): HybridSlide[] {
  return [
    {
      eyebrow: "Güzellik sizde başlar",
      title: "Işıltınızı ortaya çıkarın.",
      description: "Uzman ekibimizle size özel bakım ve uygulamalarla, kendinizi her zaman en iyi hissedin.",
      primaryLabel: "Randevu Oluştur",
      primaryHref: "#request-form",
      secondaryLabel: "İletişime Geç",
      secondaryHref: "#contact"
    },
    {
      eyebrow: "Size özel bakım",
      title: "Bakımınızı ihtiyaçlarınıza göre planlayın.",
      description: "Saç, cilt ve tırnak bakımında doğru hizmeti, doğru uzmanla ve size uygun zamanda buluşturuyoruz.",
      primaryLabel: "Hizmetleri İncele",
      primaryHref: "#services",
      secondaryLabel: "Kampanyaları Gör",
      secondaryHref: "#campaigns"
    },
    {
      eyebrow: "Uzman dokunuş",
      title: "Güzelliğinize değer katıyoruz.",
      description: "Hijyenik salon ortamı, kaliteli ürünler ve deneyimli uzmanlarla güven veren bir bakım deneyimi yaşayın.",
      primaryLabel: "Ekibimizi Tanıyın",
      primaryHref: "#about",
      secondaryLabel: "Galeriyi Aç",
      secondaryHref: "#gallery"
    },
    {
      eyebrow: "Kolay randevu",
      title: "Randevunuzu birkaç dokunuşla oluşturun.",
      description: "Hizmetinizi ve tercih ettiğiniz zamanı seçin; salon ekibimiz uygunluk bilgisiyle size hızla dönüş yapsın.",
      primaryLabel: "Hemen Randevu Al",
      primaryHref: "#request-form",
      secondaryLabel: "WhatsApp’tan Sor",
      secondaryHref: whatsappUrl(config)
    }
  ];
}

function SalonHybridHero({ config }: { config: BusinessTemplateConfig }) {
  const slides = useMemo(() => buildSlides(config), [config]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeNav, setActiveNav] = useState("#request-form");
  const activeSlide = slides[activeIndex];
  const managedImage = config.galleryItems?.find((item) => Boolean(item.imageUrl))?.imageUrl;
  const imageUrl = managedImage || FALLBACK_IMAGE;

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setTimeout(() => setActiveIndex((current) => (current + 1) % slides.length), 8500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, slides.length]);

  return (
    <div className="salonHybridShell">
      <header className="salonHybridHeader">
        <a className="salonHybridBrand" href="#top" aria-label={`${config.brandName} ana sayfa`}>
          <span className="salonHybridLogo">{config.brandName.slice(0, 2).toUpperCase()}</span>
          <span className="salonHybridBrandName">{config.brandName}</span>
          <span className="salonHybridBrandOrnament" aria-hidden="true"><i />✦<i /></span>
        </a>

        <nav className="salonHybridNav" aria-label="Salon sayfa menüsü">
          {NAV_ITEMS.map((item) => (
            <a
              className={activeNav === item.href ? "isActive" : ""}
              href={item.href}
              key={item.href}
              onClick={() => setActiveNav(item.href)}
            >
              <span className="salonHybridNavIcon"><Icon name={item.icon} /></span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <div className={`salonHybridStage salonHybridStage-${activeIndex + 1}`}>
        <div className="salonHybridCopy" key={activeSlide.title}>
          <span className="salonHybridEyebrow">{activeSlide.eyebrow}</span>
          <h1>{activeSlide.title}</h1>
          <span className="salonHybridTitleOrnament" aria-hidden="true"><i />✦</span>
          <p>{activeSlide.description}</p>
          <div className="salonHybridActions">
            <a className="salonHybridPrimary" href={activeSlide.primaryHref}>{activeSlide.primaryLabel}<span aria-hidden="true">→</span></a>
            <a
              className="salonHybridSecondary"
              href={activeSlide.secondaryHref}
              rel={activeSlide.secondaryHref.startsWith("https://") ? "noreferrer" : undefined}
              target={activeSlide.secondaryHref.startsWith("https://") ? "_blank" : undefined}
            >
              {activeSlide.secondaryLabel}<span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="salonHybridPortraitStack" aria-hidden="true">
          <span className="salonHybridBackCard salonHybridBackCardOne" />
          <span className="salonHybridBackCard salonHybridBackCardTwo" />
          <div className="salonHybridPortrait" style={{ backgroundImage: `url(${imageUrl})` }} />
          <span className="salonHybridPetal salonHybridPetalOne" />
          <span className="salonHybridPetal salonHybridPetalTwo" />
          <span className="salonHybridPetal salonHybridPetalThree" />
        </div>

        <div className="salonHybridBenefits" aria-label="Salonun öne çıkan özellikleri">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title}>
              <span className="salonHybridBenefitIcon"><Icon name={benefit.icon} /></span>
              <span><strong>{benefit.title}</strong><small>{benefit.subtitle}</small></span>
            </div>
          ))}
        </div>
      </div>

      <div className="salonHybridControls" aria-label="Tanıtım slaytları">
        {slides.map((slide, index) => (
          <button
            aria-label={`${index + 1}. tanıtımı göster`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={activeIndex === index ? "isActive" : ""}
            key={slide.title}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

export function SalonHybridHeroMount({
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
    let scheduled = false;

    function cleanup() {
      shell?.classList.remove("salonHybridMode");
      mount?.remove();
      mount = null;
      shell = null;
      setTarget(null);
    }

    function attach() {
      scheduled = false;
      const nextShell = document.querySelector<HTMLElement>(".pageShell");
      if (!nextShell || (shell === nextShell && mount?.isConnected)) return;

      cleanup();
      shell = nextShell;
      shell.classList.add("salonHybridMode");
      mount = document.createElement("section");
      mount.className = "salonHybridHeroMount";
      mount.id = "top";
      mount.setAttribute("aria-label", `${config.brandName} giriş alanı`);
      const navbar = shell.querySelector<HTMLElement>(":scope > .navbar");
      shell.insertBefore(mount, navbar || shell.firstChild);
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

  return target ? createPortal(<SalonHybridHero config={config} />, target) : null;
}
