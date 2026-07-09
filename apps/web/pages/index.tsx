import { useMemo, useState } from "react";
import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";
import { templateConfigs, templateOrder } from "../src/templateConfigs";

function applyTheme(config: BusinessTemplateConfig) {
  return {
    "--primary": config.theme.primary,
    "--secondary": config.theme.secondary,
    "--accent": config.theme.accent,
    "--soft": config.theme.soft,
    "--dark": config.theme.dark
  } as React.CSSProperties;
}

export default function HomePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("appointment");
  const config = templateConfigs[activeTemplate];
  const style = useMemo(() => applyTheme(config), [config]);

  return (
    <main className="pageShell" style={style}>
      <div className="topBar">{config.topBarText}</div>
      <nav className="navbar">
        <div className="logoLockup"><span className="logoMark">FK</span><span>{config.brandName}</span></div>
        <div className="navLinks">
          {config.navItems.map((item) => <a href="#services" key={item}>{item}</a>)}
        </div>
        <div className="navActions">
          <button className="ghostButton">Demo Panel</button>
          <button className="pillButton">Talep Bırak</button>
        </div>
      </nav>

      <section className="heroWrap">
        <div className="heroText">
          <span className="eyebrow">{config.eyebrow}</span>
          <h1 className="heroTitle">{config.heroTitle}</h1>
          <p className="heroDescription">{config.heroDescription}</p>
          <div className="heroActions">
            <button className="pillButton">{config.primaryCta}</button>
            <button className="ghostButton">{config.secondaryCta}</button>
          </div>
          <div className="templateSwitch" aria-label="Template switcher">
            {templateOrder.map((template) => (
              <button
                className={`templateButton ${activeTemplate === template ? "active" : ""}`}
                key={template}
                onClick={() => setActiveTemplate(template)}
                type="button"
              >
                {templateConfigs[template].sector}
              </button>
            ))}
          </div>
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

      <section className="section">
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
          <form className="formPanel formFields">
            {config.form.fields.map((field) => (
              <label className="field" key={field.key}>
                <span>{field.label}</span>
                {field.type === "select" ? (
                  <select defaultValue="">
                    <option value="" disabled>Seçiniz</option>
                    {field.options?.map((option) => <option key={option}>{option}</option>)}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea placeholder={field.placeholder} />
                ) : (
                  <input type={field.type} placeholder={field.placeholder} />
                )}
              </label>
            ))}
            <button className="pillButton" type="button">Demo Talep Gönder</button>
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
