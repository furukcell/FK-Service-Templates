import type { CSSProperties, FormEvent, ReactNode } from "react";
import { useState } from "react";
import { createBusinessRequest } from "@fk-templates/firebase";
import type { BusinessTemplateConfig, LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { layoutVariantLabels } from "@fk-templates/shared";
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
    extra[key] = String(value);
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
  if (config.template === "salon") return "Kampanya ve Instagram vitrini";
  if (config.template === "appointment") return "Klinik galeri ve konum alanı";
  return "Vitrin portföy ve bölge güveni";
}

function Shell({ config, children }: { config: BusinessTemplateConfig; children: ReactNode }) {
  return (
    <main className="pageShell" style={applyTheme(config)}>
      <div className="topBar">{config.topBarText}</div>
      {children}
      <footer className="footer">
        <span>FK Service Templates • Hazır sektör web sitesi altyapısı</span>
        <span>{config.address}</span>
      </footer>
    </main>
  );
}

function Nav({ config }: { config: BusinessTemplateConfig }) {
  return (
    <nav className="navbar">
      <div className="logoLockup"><span className="logoMark">FK</span><span>{config.brandName}</span></div>
      <div className="navLinks">
        {config.navItems.map((item) => <a href="#services" key={item}>{item}</a>)}
      </div>
      <div className="navActions">
        <a className="ghostButton navButtonLink" href="/admin">Demo Panel</a>
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
      <div className="previewHeader"><span className="previewBadge">{config.template}</span><span>FK Demo Desk</span></div>
      <div className="previewCard">
        <h3>{config.form.title}</h3>
        <p>{config.form.description}</p>
        <span className="priceTag">WhatsApp destekli hızlı talep</span>
      </div>
      <div className="previewMiniGrid">
        {config.services.map((service) => <div key={service.title}>{service.title.split(" ")[0]}</div>)}
      </div>
      <div className="previewCard">
        <h3>Admin Panel</h3>
        <p>Gelen talep, randevu veya ilan başvuruları tek ekranda listelenir. Status ve WhatsApp geçişi hazır altyapı olarak planlandı.</p>
      </div>
    </div>
  );
}

function ServicesSection({ config }: { config: BusinessTemplateConfig }) {
  return (
    <section className="section" id="services">
      <div className="sectionHead">
        <h2>{config.sector} için hazır vitrin</h2>
        <p>Bu şablon müşteriye hızlı kurulum, profesyonel görünüm ve talep toplama altyapısı vermek için hazırlanıyor.</p>
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
        <h2>Kampanya kartları</h2>
        <p>Salon müşterileri için kampanya ve paketleri öne çıkaran satış odaklı alan.</p>
      </div>
      <div className="cardGrid">
        {config.campaignItems.map((campaign) => (
          <article className="serviceCard campaignCard" key={campaign.title}>
            <span className="priceTag">Kampanya</span>
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
        <h2>Güven veren ekip kartları</h2>
        <p>Şablon, işletmenin uzmanlarını veya danışmanlarını öne çıkaracak kart sistemiyle gelir.</p>
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
          <h3>WhatsApp Hızlı Dönüş</h3>
          <span className="priceTag">{config.phone}</span>
          <p>Müşteri randevu veya talep bırakınca işletme WhatsApp üzerinden hızlı dönüş yapabilir.</p>
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
        <p>Gerçek müşteri görselleri geldiğinde bu alanlar fotoğraf/galeri vitrini olarak kullanılacak.</p>
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
          <h3>Kurulumda müşteriden alınacak bilgiler</h3>
          <p>Firma adı, logo, renk, telefon, WhatsApp, adres, harita linki, hizmet listesi ve görseller config sistemine işlenecek.</p>
          <span className="priceTag">Tek seferlik kurulum modeli</span>
        </div>
        <form className="formPanel formFields" onSubmit={handleSubmit}>
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
          <button className="pillButton" type="submit" disabled={isSubmitting}>{isSubmitting ? "Gönderiliyor..." : "Demo Talep Gönder"}</button>
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
          {config.services.map((service) => <article key={service.title}><span>{service.price || "Hazır"}</span><strong>{service.title}</strong></article>)}
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

    if (!customerName || !customerPhone) {
      setSubmitStatus("Ad soyad ve telefon zorunludur.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBusinessRequest({
        template: config.template,
        businessId: process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business",
        customerName,
        customerPhone,
        subject: getSubject(formData, config),
        note: String(formData.get("note") || ""),
        source: "website",
        preferredDate: String(formData.get("date") || ""),
        preferredTime: String(formData.get("time") || ""),
        extra: formDataToExtra(formData)
      });
      setSubmitStatus("Talep alındı. İşletme size WhatsApp veya telefonla dönüş yapacak.");
      event.currentTarget.reset();
    } catch (error) {
      setSubmitStatus("Demo mod: Form hazır. Firebase bilgileri girilince bu talep panele düşecek.");
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
