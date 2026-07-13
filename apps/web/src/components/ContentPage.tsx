import type { CSSProperties } from "react";
import type { ContentPageKey } from "@fk-templates/firebase";
import type { BusinessTemplateConfig } from "@fk-templates/shared";
import { demoLotusBorekConfig } from "../../../../configs/demo-lotus-borek";
import { SeoHead } from "./SeoHead";
import { SiteSetupGuard } from "./SiteSetupGuard";
import { templateConfigs } from "../templateConfigs";
import { useSiteContent } from "../useSiteContent";
import { contentPageLabels, contentPageRoutes, getManagedContentPage, getManagedFaqItems } from "../siteContent";
import { getDefaultTemplate } from "../defaultTemplate";

function isLotusDemo() {
  return process.env.NEXT_PUBLIC_BUSINESS_ID === "lotus-borek-demo" || process.env.NEXT_PUBLIC_DEFAULT_TEMPLATE === "cafe";
}

function getFallbackConfig(): BusinessTemplateConfig {
  if (isLotusDemo()) return demoLotusBorekConfig;
  return templateConfigs[getDefaultTemplate()];
}

function getHomePath() {
  if (isLotusDemo()) return "/lotus-borek-evi";
  return "/";
}

function paragraphs(body: string) {
  return body.split("\n").filter(Boolean);
}

function themeStyle(config: BusinessTemplateConfig): CSSProperties {
  return {
    "--primary": config.theme.primary,
    "--secondary": config.theme.secondary,
    "--accent": config.theme.accent,
    "--soft": config.theme.soft,
    "--dark": config.theme.dark
  } as CSSProperties;
}

function logoText(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function ContentPage({ pageKey }: { pageKey: ContentPageKey }) {
  const { settings, requiresSetup } = useSiteContent();
  const fallbackConfig = getFallbackConfig();
  const config = settings?.template ? templateConfigs[settings.template] : fallbackConfig;
  const brandName = settings?.brandName || config.brandName;
  const page = getManagedContentPage(config, settings, pageKey);
  const homePath = getHomePath();

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <main className="contentShell" style={themeStyle(config)}>
      <SeoHead title={`${page.title} | ${brandName}`} description={page.description} canonicalPath={contentPageRoutes[pageKey]} />
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href={homePath}><span className="logoMark">{logoText(brandName)}</span><span>{brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href="/iletisim">İletişim</a><a className="pillButton navButtonLink" href={homePath}>Siteye Dön</a></div>
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
  const { settings, requiresSetup } = useSiteContent();
  const fallbackConfig = getFallbackConfig();
  const config = settings?.template ? templateConfigs[settings.template] : fallbackConfig;
  const brandName = settings?.brandName || config.brandName;
  const faqItems = getManagedFaqItems(config, settings);
  const homePath = getHomePath();

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <main className="contentShell" style={themeStyle(config)}>
      <SeoHead title={`Sık Sorulan Sorular | ${brandName}`} description="Randevu, talep, iletişim ve hizmet süreci hakkında sık sorulan sorular." canonicalPath="/sss" />
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href={homePath}><span className="logoMark">{logoText(brandName)}</span><span>{brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href="/iletisim">İletişim</a><a className="pillButton navButtonLink" href={homePath}>Siteye Dön</a></div>
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
