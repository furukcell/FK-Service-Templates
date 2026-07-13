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

type StaticContentProps = {
  staticConfig?: BusinessTemplateConfig;
  homePath?: string;
  contentBasePath?: string;
};

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

function contentHref(path: string, contentBasePath = "") {
  if (!contentBasePath) return path;
  return `${contentBasePath}${path}`;
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappHref(config: BusinessTemplateConfig, brandName: string, whatsapp?: string, phone?: string) {
  const normalized = normalizePhone(whatsapp || phone || config.whatsapp || config.phone);
  const message = encodeURIComponent(`Merhaba ${brandName}, sipariş vermek ve menü/fiyat bilgisi almak istiyorum.`);
  return normalized.length >= 10 ? `https://wa.me/${normalized}?text=${message}` : "";
}

function FloatingWhatsappButton({ config, brandName, whatsapp, phone }: { config: BusinessTemplateConfig; brandName: string; whatsapp?: string; phone?: string }) {
  const href = whatsappHref(config, brandName, whatsapp, phone);
  if (!href) return null;

  return (
    <a className="floatingWhatsappButton" href={href} target="_blank" rel="noreferrer" aria-label={`${brandName} WhatsApp iletişim`}>
      <span className="floatingWhatsappMark" aria-hidden="true">WA</span>
      <span className="floatingWhatsappText"><strong>WhatsApp</strong><small>Hızlı sipariş</small></span>
    </a>
  );
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

export function ContentPage({ pageKey, staticConfig, homePath, contentBasePath = "" }: { pageKey: ContentPageKey } & StaticContentProps) {
  const { settings, requiresSetup } = useSiteContent();
  const fallbackConfig = staticConfig || getFallbackConfig();
  const config = staticConfig || (settings?.template ? templateConfigs[settings.template] : fallbackConfig);
  const activeSettings = staticConfig ? null : settings;
  const brandName = activeSettings?.brandName || config.brandName;
  const page = getManagedContentPage(config, activeSettings, pageKey);
  const activeHomePath = homePath || getHomePath();
  const contactHref = contentHref(contentPageRoutes.contact, contentBasePath);

  if (!staticConfig && requiresSetup) return <SiteSetupGuard />;

  return (
    <main className="contentShell" style={themeStyle(config)}>
      <SeoHead title={`${page.title} | ${brandName}`} description={page.description} canonicalPath={contentHref(contentPageRoutes[pageKey], contentBasePath)} />
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href={activeHomePath}><span className="logoMark">{logoText(brandName)}</span><span>{brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href={contactHref}>İletişim</a><a className="pillButton navButtonLink" href={activeHomePath}>Siteye Dön</a></div>
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
          <article><span>Telefon</span><strong>{activeSettings?.phone || config.phone}</strong></article>
          <article><span>Adres</span><strong>{activeSettings?.address || config.address}</strong></article>
          <article><span>Çalışma saatleri</span><strong>{activeSettings?.workingHours || "Her gün 07:00 - 20:00"}</strong></article>
          <article><span>E-posta</span><strong>{activeSettings?.contactEmail || "info@ornekfirma.com"}</strong></article>
        </section>
      ) : null}

      {pageKey === "about" ? (
        <section className="contentInfoGrid">
          {config.stats.map((stat) => <article key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></article>)}
        </section>
      ) : null}

      <footer className="contentFooter">
        {Object.entries(contentPageRoutes).map(([key, href]) => <a href={contentHref(href, contentBasePath)} key={key}>{contentPageLabels[key as ContentPageKey]}</a>)}
        <a href={contentHref("/sss", contentBasePath)}>SSS</a>
      </footer>
      <FloatingWhatsappButton config={config} brandName={brandName} whatsapp={activeSettings?.whatsapp || undefined} phone={activeSettings?.phone || undefined} />
    </main>
  );
}

export function FaqPage({ staticConfig, homePath, contentBasePath = "" }: StaticContentProps = {}) {
  const { settings, requiresSetup } = useSiteContent();
  const fallbackConfig = staticConfig || getFallbackConfig();
  const config = staticConfig || (settings?.template ? templateConfigs[settings.template] : fallbackConfig);
  const activeSettings = staticConfig ? null : settings;
  const brandName = activeSettings?.brandName || config.brandName;
  const faqItems = getManagedFaqItems(config, activeSettings);
  const activeHomePath = homePath || getHomePath();
  const contactHref = contentHref(contentPageRoutes.contact, contentBasePath);

  if (!staticConfig && requiresSetup) return <SiteSetupGuard />;

  return (
    <main className="contentShell" style={themeStyle(config)}>
      <SeoHead title={`Sık Sorulan Sorular | ${brandName}`} description="Randevu, talep, iletişim ve hizmet süreci hakkında sık sorulan sorular." canonicalPath={contentHref("/sss", contentBasePath)} />
      <nav className="navbar contentNav">
        <a className="logoLockup navButtonLink" href={activeHomePath}><span className="logoMark">{logoText(brandName)}</span><span>{brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href={contactHref}>İletişim</a><a className="pillButton navButtonLink" href={activeHomePath}>Siteye Dön</a></div>
      </nav>
      <section className="contentHero"><span className="eyebrow">Sık Sorulan Sorular</span><h1>Merak edilen sorular</h1><p>Randevu, talep, iletişim ve hizmet süreci hakkında sık sorulan sorular.</p></section>
      <section className="contentFaqList">
        {faqItems.map((item, index) => <article key={`${item.question}-${index}`}><h3>{item.question}</h3><p>{item.answer}</p></article>)}
      </section>
      <footer className="contentFooter">
        {Object.entries(contentPageRoutes).map(([key, href]) => <a href={contentHref(href, contentBasePath)} key={key}>{contentPageLabels[key as ContentPageKey]}</a>)}
      </footer>
      <FloatingWhatsappButton config={config} brandName={brandName} whatsapp={activeSettings?.whatsapp || undefined} phone={activeSettings?.phone || undefined} />
    </main>
  );
}
