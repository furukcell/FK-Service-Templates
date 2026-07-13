import type { CSSProperties, FormEvent, ReactNode } from "react";
import { useState } from "react";
import { createBusinessRequest } from "@fk-templates/firebase";
import type { BusinessTemplateConfig, LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { layoutVariantLabels } from "@fk-templates/shared";
import { notifyNewRequest } from "../notifyRequest";
import { isDemoMode } from "../runtimeMode";
import { contentPageLabels, contentPageRoutes } from "../siteContent";
import { templateConfigs, templateOrder } from "../templateConfigs";

type TemplateLandingProps = {
  config: BusinessTemplateConfig;
  activeTemplate: TemplateKey;
  activeLayout?: LayoutVariant;
  onTemplateChange?: (template: TemplateKey) => void;
  onLayoutChange?: (layout: LayoutVariant) => void;
  showTemplateSwitch?: boolean;
  showLayoutSwitch?: boolean;
  contentBasePath?: string;
  hideShowcaseServiceStrip?: boolean;
  hidePreviewMiniGrid?: boolean;
  prominentLocationCard?: boolean;
};

const layoutOrder: LayoutVariant[] = ["modern", "split", "showcase"];

function applyTheme(config: BusinessTemplateConfig): CSSProperties {
  return {
    "--primary": config.theme.primary,
    "--secondary": config.theme.secondary,
    "--accent": config.theme.accent,
    "--soft": config.theme.soft,
    "--dark": config.theme.dark
  } as CSSProperties;
}

function contentHref(path: string, contentBasePath = "") {
  if (!contentBasePath) return path;
  return `${contentBasePath}${path}`;
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappUrl(config: BusinessTemplateConfig) {
  const normalized = normalizePhone(config.whatsapp || config.phone);
  const message = encodeURIComponent(`Merhaba ${config.brandName}, sipariş vermek ve menü/fiyat bilgisi almak istiyorum.`);
  return normalized ? `https://wa.me/${normalized}?text=${message}` : "#request-form";
}

function isWhatsappCta(label: string) {
  return label.toLocaleLowerCase("tr-TR").includes("whatsapp");
}

function PrimaryCtaButton({ config }: { config: BusinessTemplateConfig }) {
  const isWhatsapp = isWhatsappCta(config.primaryCta);
  return (
    <a
      className="pillButton navButtonLink"
      href={isWhatsapp ? whatsappUrl(config) : "#request-form"}
      target={isWhatsapp ? "_blank" : undefined}
      rel={isWhatsapp ? "noreferrer" : undefined}
    >
      {config.primaryCta}
    </a>
  );
}

function formDataToExtra(formData: FormData): Record<string, string> {
  const extra: Record<string, string> = {};
  formData.forEach((value, key) => {
    if (key !== "acceptedLegal") extra[key] = String(value);
  });
  return extra;
}

function getSubject(formData: FormData, config: BusinessTemplateConfig): string {
  return String(
    formData.get("service") ||
    formData.get("listingType") ||
    formData.get("petType") ||
    formData.get("location") ||
    config.form.title
  );
}

function galleryTitle(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Salon galerisi ve davet atmosferi";
  if (config.template === "kindergarten") return "Kreş ortamı ve güven veren alanlar";
  if (config.template === "cafe") return "Lezzet vitrini ve konum";
  if (config.template === "salon") return "Kampanya ve sosyal medya vitrini";
  if (config.template === "appointment") return "Galeri ve konum";
  return "Vitrin portföy ve bölge güveni";
}

function servicesTitle(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Salon paketleri ve organizasyonlar";
  if (config.template === "kindergarten") return "Sınıflar ve programlar";
  if (config.template === "cafe") return "Menü ve ürünler";
  if (config.template === "real-estate") return "Portföy ve danışmanlık";
  return `${config.sector} hizmetleri`;
}

function servicesDescription(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Düğün, kına, nişan, sünnet ve yemekli davet paketlerini inceleyebilir, uygun tarih talebi bırakabilirsiniz.";
  if (config.template === "kindergarten") return "Yaş grupları, günlük program ve kurum hizmetlerini inceleyebilir, ön görüşme talebi bırakabilirsiniz.";
  if (config.template === "cafe") return "Menü, ürün ve sipariş seçeneklerini inceleyebilir, form üzerinden hızlıca talep bırakabilirsiniz.";
  if (config.template === "real-estate") return "İlan, portföy ve danışmanlık seçeneklerini inceleyebilir, hızlıca bilgi talebi bırakabilirsiniz.";
  return "İhtiyacınıza uygun hizmetleri inceleyebilir, form üzerinden hızlıca talep bırakabilirsiniz.";
}

function campaignTitle(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Sezon fırsatları ve duyurular";
  if (config.template === "kindergarten") return "Duyurular ve günlük akış";
  if (config.template === "real-estate") return "Öne çıkan portföyler";
  return "Kampanyalar";
}

function campaignDescription(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Erken rezervasyon, hafta içi davet ve dönemsel organizasyon fırsatlarını buradan inceleyebilirsiniz.";
  if (config.template === "kindergarten") return "Kayıt dönemi, günlük akış, yemek ve etkinlik bilgileri için öne çıkan duyurular.";
  if (config.template === "real-estate") return "Öne çıkan ilan ve portföy bilgilerini buradan inceleyebilirsiniz.";
  return "Güncel paket ve kampanya seçeneklerini buradan inceleyebilirsiniz.";
}

function campaignBadge(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Fırsat";
  if (config.template === "kindergarten") return "Duyuru";
  if (config.template === "real-estate") return "Portföy";
  return "Kampanya";
}

function staffTitle(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Organizasyon ekibi";
  if (config.template === "kindergarten") return "Kurum ekibi";
  return "Ekibimiz";
}

function staffDescription(config: BusinessTemplateConfig) {
  if (config.template === "event-venue") return "Davet planlama, salon düzeni ve organizasyon günü operasyon yaklaşımı hakkında bilgi alın.";
  if (config.template === "kindergarten") return "Kurumun eğitim, bakım ve veli iletişimi yaklaşımı hakkında bilgi alın.";
  return "İşletmemizin uzman ekibi ve hizmet yaklaşımı hakkında bilgi alın.";
}

function LegalFooterLinks({ contentBasePath = "" }: { contentBasePath?: string }) {
  return (
    <div className="legalFooterLinks">
      {Object.entries(contentPageRoutes).map(([key, href]) => <a href={contentHref(href, contentBasePath)} key={key}>{contentPageLabels[key as keyof typeof contentPageLabels]}</a>)}
      <a href={contentHref("/sss", contentBasePath)}>SSS</a>
    </div>
  );
}

function Shell({ config, children, contentBasePath }: { config: BusinessTemplateConfig; children: ReactNode; contentBasePath?: string }) {
  return (
    <main className="pageShell" style={applyTheme(config)}>
      <div className="topBar">{config.topBarText}</div>
      {children}
      <footer className="footer">
        <span>{config.brandName}</span>
        <span>{config.address}</span>
        <LegalFooterLinks contentBasePath={contentBasePath} />
      </footer>
    </main>
  );
}

function Nav({ config }: { config: BusinessTemplateConfig }) {
  return (
    <nav className="navbar">
      <div className="logoLockup"><span className="logoMark">{config.brandName.slice(0, 2).toUpperCase()}</span><span>{config.brandName}</span></div>
      <div className="navLinks">
        {config.navItems.map((item) => <a href="#services" key={item}>{item}</a>)}
      </div>
      <div className="navActions">
        {isDemoMode() ? <a className="ghostButton navButtonLink" href="/admin">Demo Panel</a> : null}
        <a className="pillButton navButtonLink" href="#request-form">Talep Bırak</a>
      </div>
    </nav>
  );
}

function Switchers({ activeTemplate, activeLayout, onTemplateChange, onLayoutChange, showTemplateSwitch, showLayoutSwitch }: Pick<TemplateLandingProps, "activeTemplate" | "activeLayout" | "onTemplateChange" | "onLayoutChange" | "showTemplateSwitch" | "showLayoutSwitch">) {
  if (!showTemplateSwitch && !showLayoutSwitch) return null;
  return (
    <div className="variantControlDeck">
      {showTemplateSwitch ? (
        <div className="templateSwitch" aria-label="Sektör seçici">
          {templateOrder.map((template) => (
            <button className={`templateButton ${activeTemplate === template ? "active" : ""}`} key={template} onClick={() => onTemplateChange?.(template)} type="button">
              {templateConfigs[template].sector}
            </button>
          ))}
        </div>
      ) : null}
      {showLayoutSwitch ? (
        <div className="templateSwitch layoutSwitch" aria-label="Tasarım seçici">
          {layoutOrder.map((layout) => (
            <button className={`templateButton ${activeLayout === layout ? "active" : ""}`} key={layout} onClick={() => onLayoutChange?.(layout)} type="button">
              {layoutVariantLabels[layout]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function Stats({ config }: { config: BusinessTemplateConfig }) {
  return (
    <div className="statsGrid">
      {config.stats.map((stat) => (
        <div className="statCard" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function PreviewPanel({ config, hideMiniGrid = false }: { config: BusinessTemplateConfig; hideMiniGrid?: boolean }) {
  return (
    <div className={`previewPanel ${hideMiniGrid ? "previewPanelCompact" : ""}`}>
      <div className="previewHeader"><span className="previewBadge">{config.sector}</span><span>{config.brandName}</span></div>
      <div className="previewCard">
        <h3>{config.form.title}</h3>
        <p>{config.form.description}</p>
        <span className="priceTag">Hızlı talep ve dönüş</span>
      </div>
      {!hideMiniGrid ? (
        <div className="previewMiniGrid">
          {config.services.map((service) => <div key={service.title}>{service.title.split(" ")[0]}</div>)}
        </div>
      ) : null}
      <div className="previewCard previewCardSmall">
        <h3>Hızlı geri dönüş</h3>
        <p>Talebiniz işletmeye iletilir ve size en kısa sürede dönüş yapılır.</p>
      </div>
    </div>
  );
}

function ServicesSection({ config }: { config: BusinessTemplateConfig }) {
  return (
    <section className="section" id="services">
      <div className="sectionHead">
        <h2>{servicesTitle(config)}</h2>
        <p>{servicesDescription(config)}</p>
      </div>
      <div className="cardGrid">
        {config.services.map((service) => (
          <article className="serviceCard" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {service.price ? <span className="priceTag">{service.price}</span> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function CampaignSection({ config }: { config: BusinessTemplateConfig }) {
  if (!config.campaignItems?.length) return null;
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{campaignTitle(config)}</h2>
        <p>{campaignDescription(config)}</p>
      </div>
      <div className="cardGrid">
        {config.campaignItems.map((campaign) => (
          <article className="serviceCard campaignCard" key={campaign.title}>
            <span className="priceTag">{campaignBadge(config)}</span>
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            {campaign.price ? <strong>{campaign.price}</strong> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function StaffSection({ config }: { config: BusinessTemplateConfig }) {
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{staffTitle(config)}</h2>
        <p>{staffDescription(config)}</p>
      </div>
      <div className="cardGrid">
        {config.staff.map((member) => (
          <article className="staffCard" key={member.name}>
            <h3>{member.name}</h3>
            <span className="priceTag">{member.role}</span>
            <p>{member.description}</p>
          </article>
        ))}
        <article className="staffCard">
          <h3>Hızlı İletişim</h3>
          <span className="priceTag">{config.phone}</span>
          <p>Talebinizi bıraktıktan sonra işletme sizinle telefon veya WhatsApp üzerinden iletişime geçebilir.</p>
        </article>
      </div>
    </section>
  );
}

function VisualSection({ config, prominentLocationCard = false }: { config: BusinessTemplateConfig; prominentLocationCard?: boolean }) {
  if (!config.galleryItems?.length) return null;
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{galleryTitle(config)}</h2>
        <p>İşletmeye ait görseller, konum ve sosyal medya bağlantıları.</p>
      </div>
      <div className="visualGrid">
        {config.galleryItems.map((item, index) => (
          <article className="visualCard" key={item.title}>
            {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : <div className="visualPlaceholder">{String(index + 1).padStart(2, "0")}</div>}
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
        <article className={`visualCard locationCard ${prominentLocationCard ? "locationCardWide" : ""}`}>
          <div className="visualPlaceholder">MAP</div>
          <div>
            <h3>Konum ve iletişim</h3>
            <p>{config.address}</p>
            <p>{config.phone}</p>
            <div className="heroActions">
              {config.mapsUrl ? <a className="ghostButton navButtonLink" href={config.mapsUrl} target="_blank" rel="noreferrer">Haritada Aç</a> : null}
              {config.instagramUrl ? <a className="pillButton navButtonLink" href={config.instagramUrl} target="_blank" rel="noreferrer">Instagram</a> : null}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function RequestFormSection({ config, handleSubmit, isSubmitting, submitStatus, contentBasePath }: { config: BusinessTemplateConfig; handleSubmit: (event: FormEvent<HTMLFormElement>) => void; isSubmitting: boolean; submitStatus: string; contentBasePath?: string }) {
  return (
    <section className="section" id="request-form">
      <div className="sectionHead">
        <h2>{config.form.title}</h2>
        <p>{config.form.description}</p>
      </div>
      <div className="formLayout">
        <div className="formPanel">
          <h3>Talebinizi iletin</h3>
          <p>Formu doldurun; işletme sizinle telefon veya WhatsApp üzerinden iletişime geçsin.</p>
          <span className="priceTag">Hızlı dönüş</span>
        </div>
        <form className="formPanel formFields" onSubmit={handleSubmit}>
          <input aria-hidden="true" autoComplete="off" className="honeypotField" name="website" tabIndex={-1} />
          {config.form.fields.map((field) => (
            <label className="field" key={field.key}>
              <span>{field.label}</span>
              {field.type === "select" ? (
                <select name={field.key} defaultValue="">
                  <option value="" disabled>Seçiniz</option>
                  {field.options?.map((option) => <option key={option}>{option}</option>)}
                </select>
              ) : field.type === "textarea" ? (
                <textarea name={field.key} placeholder={field.placeholder} />
              ) : (
                <input name={field.key} type={field.type} placeholder={field.placeholder} />
              )}
            </label>
          ))}
          <label className="kvkkConsent"><input name="acceptedLegal" type="checkbox" required /><span><a href={contentHref("/kvkk-aydinlatma-metni", contentBasePath)} target="_blank">KVKK Aydınlatma Metni</a> ve <a href={contentHref("/gizlilik-politikasi", contentBasePath)} target="_blank">Gizlilik Politikası</a> kapsamında bilgilendirmeyi okudum.</span></label>
          <button className="pillButton" type="submit" disabled={isSubmitting}>{isSubmitting ? "Gönderiliyor..." : "Talep Gönder"}</button>
          {submitStatus ? <p className="formStatus">{submitStatus}</p> : null}
        </form>
      </div>
    </section>
  );
}

function ModernLayout({ config, switchers, form, hidePreviewMiniGrid }: { config: BusinessTemplateConfig; switchers: ReactNode; form: ReactNode; hidePreviewMiniGrid?: boolean }) {
  return (
    <>
      <Nav config={config} />
      <section className="heroWrap">
        <div className="heroText">
          <span className="eyebrow">{config.eyebrow}</span>
          <h1 className="heroTitle">{config.heroTitle}</h1>
          <p className="heroDescription">{config.heroDescription}</p>
          <div className="heroActions"><PrimaryCtaButton config={config} /><a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a></div>
          {switchers}
          <Stats config={config} />
        </div>
        <PreviewPanel config={config} hideMiniGrid={hidePreviewMiniGrid} />
      </section>
      <ServicesSection config={config} />
      <CampaignSection config={config} />
      <StaffSection config={config} />
      <VisualSection config={config} />
      {form}
    </>
  );
}

function SplitLayout({ config, switchers, form }: { config: BusinessTemplateConfig; switchers: ReactNode; form: ReactNode }) {
  return (
    <>
      <Nav config={config} />
      <section className="splitHero">
        <div className="splitHeroVisual"><span>{config.sector}</span><strong>{config.brandName}</strong></div>
        <div className="splitHeroContent">
          <span className="eyebrow">{config.eyebrow}</span>
          <h1 className="heroTitle">{config.heroTitle}</h1>
          <p className="heroDescription">{config.heroDescription}</p>
          <div className="heroActions"><PrimaryCtaButton config={config} /><a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a></div>
          {switchers}
        </div>
      </section>
      <section className="section compactStats"><Stats config={config} /></section>
      <section className="splitContentGrid"><ServicesSection config={config} /><StaffSection config={config} /></section>
      <CampaignSection config={config} />
      <VisualSection config={config} />
      {form}
    </>
  );
}

function ShowcaseLayout({ config, switchers, form, hideShowcaseServiceStrip, hidePreviewMiniGrid, prominentLocationCard }: { config: BusinessTemplateConfig; switchers: ReactNode; form: ReactNode; hideShowcaseServiceStrip?: boolean; hidePreviewMiniGrid?: boolean; prominentLocationCard?: boolean }) {
  return (
    <>
      <Nav config={config} />
      <section className={`showcaseHero ${hideShowcaseServiceStrip ? "showcaseHeroCompact" : ""}`}>
        <span className="eyebrow">{config.eyebrow}</span>
        <h1>{config.heroTitle}</h1>
        <p>{config.heroDescription}</p>
        <div className="heroActions showcaseActions"><PrimaryCtaButton config={config} /><a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a></div>
        {switchers}
        {!hideShowcaseServiceStrip ? (
          <div className="showcaseServiceStrip">
            {config.services.map((service) => <article key={service.title}><span>{service.price || "Bilgi al"}</span><strong>{service.title}</strong></article>)}
          </div>
        ) : null}
      </section>
      <section className={`showcasePanelGrid ${prominentLocationCard ? "showcasePanelGridWideMap" : ""}`}><PreviewPanel config={config} hideMiniGrid={hidePreviewMiniGrid} /><VisualSection config={config} prominentLocationCard={prominentLocationCard} /></section>
      <ServicesSection config={config} />
      <CampaignSection config={config} />
      <StaffSection config={config} />
      {form}
    </>
  );
}

export function TemplateLanding({ config, activeTemplate, activeLayout = "modern", onTemplateChange, onLayoutChange, showTemplateSwitch = true, showLayoutSwitch = true, contentBasePath, hideShowcaseServiceStrip, hidePreviewMiniGrid, prominentLocationCard }: TemplateLandingProps) {
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitStatus("");

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("name") || "").trim();
    const customerPhone = String(formData.get("phone") || "").trim();
    const acceptedLegal = formData.get("acceptedLegal") === "on";
    const honeypot = String(formData.get("website") || "");

    if (honeypot) {
      setSubmitStatus("Talebiniz alındı.");
      return;
    }

    if (!customerName || !customerPhone) {
      setSubmitStatus("Ad soyad ve telefon zorunludur.");
      return;
    }

    if (!acceptedLegal) {
      setSubmitStatus("Devam etmek için KVKK/Gizlilik bilgilendirmesini onaylamalısınız.");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestPayload = {
        template: config.template,
        businessId: process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business",
        customerName,
        customerPhone,
        subject: getSubject(formData, config),
        note: String(formData.get("note") || ""),
        source: "website" as const,
        preferredDate: String(formData.get("date") || ""),
        preferredTime: String(formData.get("time") || ""),
        extra: formDataToExtra(formData)
      };
      await createBusinessRequest(requestPayload);
      await notifyNewRequest(requestPayload);
      setSubmitStatus("Talep alındı. İşletme size telefon veya WhatsApp ile dönüş yapacak.");
      event.currentTarget.reset();
    } catch (error) {
      setSubmitStatus(isDemoMode() ? "Demo mod: Firebase bilgileri girilince bu talep panele düşecek." : "Talep şu anda gönderilemedi. Lütfen telefon veya WhatsApp üzerinden iletişime geçin.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const switchers = <Switchers activeTemplate={activeTemplate} activeLayout={activeLayout} onTemplateChange={onTemplateChange} onLayoutChange={onLayoutChange} showTemplateSwitch={showTemplateSwitch} showLayoutSwitch={showLayoutSwitch} />;
  const form = <RequestFormSection config={config} handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitStatus={submitStatus} contentBasePath={contentBasePath} />;

  return (
    <Shell config={config} contentBasePath={contentBasePath}>
      {activeLayout === "split" ? <SplitLayout config={config} switchers={switchers} form={form} /> : null}
      {activeLayout === "showcase" ? <ShowcaseLayout config={config} switchers={switchers} form={form} hideShowcaseServiceStrip={hideShowcaseServiceStrip} hidePreviewMiniGrid={hidePreviewMiniGrid} prominentLocationCard={prominentLocationCard} /> : null}
      {activeLayout === "modern" ? <ModernLayout config={config} switchers={switchers} form={form} hidePreviewMiniGrid={hidePreviewMiniGrid} /> : null}
    </Shell>
  );
}
