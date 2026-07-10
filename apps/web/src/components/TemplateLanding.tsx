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
  if (config.template === "kindergarten") return "Kreş ortamı ve güven veren alanlar";
  if (config.template === "cafe") return "Lezzet vitrini ve konum";
  if (config.template === "salon") return "Kampanya ve sosyal medya vitrini";
  if (config.template === "appointment") return "Galeri ve konum";
  return "Vitrin portföy ve bölge güveni";
}

function servicesTitle(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Sınıflar ve programlar";
  if (config.template === "cafe") return "Menü ve ürünler";
  if (config.template === "real-estate") return "Portföy ve danışmanlık";
  return `${config.sector} hizmetleri`;
}

function servicesDescription(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Yaş grupları, günlük program ve kurum hizmetlerini inceleyebilir, ön görüşme talebi bırakabilirsiniz.";
  if (config.template === "cafe") return "Menü, ürün ve sipariş seçeneklerini inceleyebilir, form üzerinden hızlıca talep bırakabilirsiniz.";
  if (config.template === "real-estate") return "İlan, portföy ve danışmanlık seçeneklerini inceleyebilir, hızlıca bilgi talebi bırakabilirsiniz.";
  return "İhtiyacınıza uygun hizmetleri inceleyebilir, form üzerinden hızlıca talep bırakabilirsiniz.";
}

function campaignTitle(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Duyurular ve günlük akış";
  if (config.template === "real-estate") return "Öne çıkan portföyler";
  return "Kampanyalar";
}

function campaignDescription(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Kayıt dönemi, günlük akış, yemek ve etkinlik bilgileri için öne çıkan duyurular.";
  if (config.template === "real-estate") return "Öne çıkan ilan ve portföy bilgilerini buradan inceleyebilirsiniz.";
  return "Güncel paket ve kampanya seçeneklerini buradan inceleyebilirsiniz.";
}

function campaignBadge(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Duyuru";
  if (config.template === "real-estate") return "Portföy";
  return "Kampanya";
}

function staffTitle(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Kurum ekibi";
  return "Ekibimiz";
}

function staffDescription(config: BusinessTemplateConfig) {
  if (config.template === "kindergarten") return "Kurumun eğitim, bakım ve veli iletişimi yaklaşımı hakkında bilgi alın.";
  return "İşletmemizin uzman ekibi ve hizmet yaklaşımı hakkında bilgi alın.";
}

function LegalFooterLinks() {
  return (
    <div className="legalFooterLinks">
      {Object.entries(contentPageRoutes).map(([key, href]) => <a href={href} key={key}>{contentPageLabels[key as keyof typeof contentPageLabels]}</a>)}
      <a href="/sss">SSS</a>
    </div>
  );
}

function Shell({ config, children }: { config: BusinessTemplateConfig; children: ReactNode }) {
  return (
    <main className="pageShell" style={applyTheme(config)}>
      <div className="topBar">{config.topBarText}</div>
      {children}
      <footer className="footer">
        <span>{config.brandName}</span>
        <span>{config.address}</span>
        <LegalFooterLinks />
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

function PreviewPanel({ config }: { config: BusinessTemplateConfig }) {
  return (
    <div className="previewPanel">
      <div className="previewHeader"><span className="previewBadge">{config.sector}</span><span>{config.brandName}</span></div>
      <div className="previewCard">
        <h3>{config.form.title}</h3>
        <p>{config.form.description}</p>
        <span className="priceTag">Hızlı talep ve dönüş</span>
      </div>
      <div className="previewMiniGrid">
        {config.services.map((service) => <div key={service.title}>{service.title.split(" ")[0]}</div>)}
      </div>
      <div className="previewCard">
        <h3>Güvenli başvuru</h3>
        <p>Talep bilgileriniz işletmeye iletilir ve en kısa sürede sizinle iletişime geçilir.</p>
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

function VisualSection({ config }: { config: BusinessTemplateConfig }) {
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
        <article className="visualCard locationCard">
          <div className="visualPlaceholder">MAP</div>
          <div>
            <h3>Konum ve sosyal medya</h3>
            <p>{config.address}</p>
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

function RequestFormSection({ config, handleSubmit, isSubmitting, submitStatus }: { config: BusinessTemplateConfig; handleSubmit: (event: FormEvent<HTMLFormElement>) => void; isSubmitting: boolean; submitStatus: string }) {
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
          <label className="kvkkConsent"><input name="acceptedLegal" type="checkbox" required /><span><a href="/kvkk-aydinlatma-metni" target="_blank">KVKK Aydınlatma Metni</a> ve <a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a> kapsamında bilgilendirmeyi okudum.</span></label>
          <button className="pillButton" type="submit" disabled={isSubmitting}>{isSubmitting ? "Gönderiliyor..." : "Talep Gönder"}</button>
          {submitStatus ? <p className="formStatus">{submitStatus}</p> : null}
        </form>
      </div>
    </section>
  );
}

function ModernLayout({ config, switchers, form }: { config: BusinessTemplateConfig; switchers: ReactNode; form: ReactNode }) {
  return (
    <>
      <Nav config={config} />
      <section className="heroWrap">
        <div className="heroText">
          <span className="eyebrow">{config.eyebrow}</span>
          <h1 className="heroTitle">{config.heroTitle}</h1>
          <p className="heroDescription">{config.heroDescription}</p>
          <div className="heroActions"><a className="pillButton navButtonLink" href="#request-form">{config.primaryCta}</a><a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a></div>
          {switchers}
          <Stats config={config} />
        </div>
        <PreviewPanel config={config} />
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
          <div className="heroActions"><a className="pillButton navButtonLink" href="#request-form">{config.primaryCta}</a><a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a></div>
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

function ShowcaseLayout({ config, switchers, form }: { config: BusinessTemplateConfig; switchers: ReactNode; form: ReactNode }) {
  return (
    <>
      <Nav config={config} />
      <section className="showcaseHero">
        <span className="eyebrow">{config.eyebrow}</span>
        <h1>{config.heroTitle}</h1>
        <p>{config.heroDescription}</p>
        <div className="heroActions showcaseActions"><a className="pillButton navButtonLink" href="#request-form">{config.primaryCta}</a><a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a></div>
        {switchers}
        <div className="showcaseServiceStrip">
          {config.services.map((service) => <article key={service.title}><span>{service.price || "Bilgi al"}</span><strong>{service.title}</strong></article>)}
        </div>
      </section>
      <section className="showcasePanelGrid"><PreviewPanel config={config} /><VisualSection config={config} /></section>
      <ServicesSection config={config} />
      <CampaignSection config={config} />
      <StaffSection config={config} />
      {form}
    </>
  );
}

export function TemplateLanding({ config, activeTemplate, activeLayout = "modern", onTemplateChange, onLayoutChange, showTemplateSwitch = true, showLayoutSwitch = true }: TemplateLandingProps) {
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
  const form = <RequestFormSection config={config} handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitStatus={submitStatus} />;

  return (
    <Shell config={config}>
      {activeLayout === "split" ? <SplitLayout config={config} switchers={switchers} form={form} /> : null}
      {activeLayout === "showcase" ? <ShowcaseLayout config={config} switchers={switchers} form={form} /> : null}
      {activeLayout === "modern" ? <ModernLayout config={config} switchers={switchers} form={form} /> : null}
    </Shell>
  );
}
