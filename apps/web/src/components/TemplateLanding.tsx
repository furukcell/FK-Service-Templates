import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { createBusinessRequest } from "@fk-templates/firebase";
import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";
import { templateConfigs, templateOrder } from "../templateConfigs";

type TemplateLandingProps = {
  config: BusinessTemplateConfig;
  activeTemplate: TemplateKey;
  onTemplateChange?: (template: TemplateKey) => void;
  showTemplateSwitch?: boolean;
};

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

export function TemplateLanding({ config, activeTemplate, onTemplateChange, showTemplateSwitch = true }: TemplateLandingProps) {
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

  return (
    <main className="pageShell" style={applyTheme(config)}>
      <div className="topBar">{config.topBarText}</div>
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

      <section className="heroWrap">
        <div className="heroText">
          <span className="eyebrow">{config.eyebrow}</span>
          <h1 className="heroTitle">{config.heroTitle}</h1>
          <p className="heroDescription">{config.heroDescription}</p>
          <div className="heroActions">
            <a className="pillButton navButtonLink" href="#request-form">{config.primaryCta}</a>
            <a className="ghostButton navButtonLink" href="#services">{config.secondaryCta}</a>
          </div>
          {showTemplateSwitch ? (
            <div className="templateSwitch" aria-label="Template switcher">
              {templateOrder.map((template) => (
                <button
                  className={`templateButton ${activeTemplate === template ? "active" : ""}`}
                  key={template}
                  onClick={() => onTemplateChange?.(template)}
                  type="button"
                >
                  {templateConfigs[template].sector}
                </button>
              ))}
            </div>
          ) : null}
          <div className="statsGrid">
            {config.stats.map((stat) => (
              <div className="statCard" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

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
      </section>

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

      {config.campaignItems?.length ? (
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
      ) : null}

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

      {config.galleryItems?.length ? (
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
      ) : null}

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

      <footer className="footer">
        <span>FK Service Templates • Hazır sektör web sitesi altyapısı</span>
        <span>{config.address}</span>
      </footer>
    </main>
  );
}
