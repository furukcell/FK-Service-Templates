import type { CSSProperties } from "react";
import type { ContentPageKey } from "@fk-templates/firebase";
import { templateConfigs } from "../templateConfigs";
import { useSiteContent } from "../useSiteContent";
import { contentPageLabels, contentPageRoutes, getManagedContentPage, getManagedFaqItems } from "../siteContent";

const baseConfig = templateConfigs.appointment;

function paragraphs(body: string) {
  return body.split("\n").filter(Boolean);
}

function themeStyle(config: typeof baseConfig): CSSProperties {
  return {
    "--primary": config.theme.primary,
    "--secondary": config.theme.secondary,
    "--accent": config.theme.accent,
    "--soft": config.theme.soft,
    "--dark": config.theme.dark
  } as CSSProperties;
}

export function ContentPage({ pageKey }: { pageKey: ContentPageKey }) {
  const { settings } = useSiteContent();
  const config = settings?.template ? templateConfigs[settings.template] : baseConfig;
  const page = getManagedContentPage(config, settings, pageKey);

  return (
    <main className="contentShell" style={themeStyle(config)}>
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href="/"><span className="logoMark">FK</span><span>{settings?.brandName || config.brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href="/iletisim">İletişim</a><a className="pillButton navButtonLink" href="/">Siteye Dön</a></div>
      </nav>

      <section className="contentHero">
        <span className="eyebrow">{contentPageLabels[pageKey]}</span>
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </section>

      <section className="contentBody">
        {paragraphs(page.body).map((item, index) => <p key={index}>{item}</p>)}
      </section>

      {pageKey === "contact" ? (
        <section className="contentInfoGrid">
          <article><span>Telefon</span><strong>{settings?.phone || config.phone}</strong></article>
          <article><span>Adres</span><strong>{settings?.address || config.address}</strong></article>
          <article><span>Çalışma saatleri</span><strong>{settings?.workingHours || "Pazartesi - Cumartesi 09:00 - 18:00"}</strong></article>
          <article><span>E-posta</span><strong>{settings?.contactEmail || "info@ornekfirma.com"}</strong></article>
        </section>
      ) : null}

      {pageKey === "about" ? (
        <section className="contentInfoGrid">
          {config.stats.map((stat) => <article key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></article>)}
        </section>
      ) : null}

      <footer className="contentFooter">
        {Object.entries(contentPageRoutes).map(([key, href]) => <a href={href} key={key}>{contentPageLabels[key as ContentPageKey]}</a>)}
        <a href="/sss">SSS</a>
      </footer>
    </main>
  );
}

export function FaqPage() {
  const { settings } = useSiteContent();
  const config = settings?.template ? templateConfigs[settings.template] : baseConfig;
  const faqItems = getManagedFaqItems(config, settings);

  return (
    <main className="contentShell" style={themeStyle(config)}>
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href="/"><span className="logoMark">FK</span><span>{settings?.brandName || config.brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href="/iletisim">İletişim</a><a className="pillButton navButtonLink" href="/">Siteye Dön</a></div>
      </nav>
      <section className="contentHero"><span className="eyebrow">Sık Sorulan Sorular</span><h1>Merak edilen sorular</h1><p>Randevu, talep, iletişim ve hizmet süreci hakkında sık sorulan sorular.</p></section>
      <section className="contentFaqList">
        {faqItems.map((item, index) => <article key={`${item.question}-${index}`}><h3>{item.question}</h3><p>{item.answer}</p></article>)}
      </section>
      <footer className="contentFooter">
        {Object.entries(contentPageRoutes).map(([key, href]) => <a href={href} key={key}>{contentPageLabels[key as ContentPageKey]}</a>)}
      </footer>
    </main>
  );
}
