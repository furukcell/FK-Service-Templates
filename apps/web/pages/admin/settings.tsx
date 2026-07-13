import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings } from "@fk-templates/firebase";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { layoutVariantLabels } from "@fk-templates/shared";
import { getDefaultTemplate } from "../../src/defaultTemplate";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate", "cafe", "kindergarten", "event-venue"];
const layoutKeys: LayoutVariant[] = ["modern", "split", "showcase"];

function formOptionsText(template: TemplateKey) {
  const field = templateConfigs[template].form.fields.find((item) => item.type === "select" && ["service", "requestType", "listingType"].includes(item.key));
  return field?.options?.join("\n") || "";
}

function splitOptions(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function defaultsFor(template: TemplateKey) {
  const config = templateConfigs[template];
  return {
    template,
    layoutVariant: "modern" as LayoutVariant,
    brandName: config.brandName,
    eyebrow: config.eyebrow,
    heroTitle: config.heroTitle,
    heroDescription: config.heroDescription,
    primaryCta: config.primaryCta,
    secondaryCta: config.secondaryCta,
    topBarText: config.topBarText,
    phone: config.phone,
    whatsapp: config.whatsapp,
    address: config.address,
    mapsUrl: config.mapsUrl || "",
    instagramUrl: config.instagramUrl || "",
    contactEmail: "info@ornekfirma.com",
    workingHours: "Pazartesi - Cuma 08:30 - 17:30",
    requestFormTitle: config.form.title,
    requestFormDescription: config.form.description,
    requestTypeOptionsText: formOptionsText(template),
    themePrimary: config.theme.primary,
    themeSecondary: config.theme.secondary,
    themeAccent: config.theme.accent,
    themeSoft: config.theme.soft,
    themeDark: config.theme.dark
  };
}

export default function AdminSettingsPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const defaultTemplate = getDefaultTemplate();
  const [form, setForm] = useState(defaultsFor(defaultTemplate));
  const [status, setStatus] = useState("Site ayarları panelden yönetilebilir.");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!guard.isAllowed) return;
    async function loadSettings() {
      try {
        const settings = await getSiteSettings(businessId);
        if (settings) {
          const selectedTemplate = settings.template || defaultTemplate;
          const defaults = defaultsFor(selectedTemplate);
          setForm({
            template: selectedTemplate,
            layoutVariant: settings.layoutVariant || defaults.layoutVariant,
            brandName: settings.brandName || defaults.brandName,
            eyebrow: settings.eyebrow || defaults.eyebrow,
            heroTitle: settings.heroTitle || defaults.heroTitle,
            heroDescription: settings.heroDescription || defaults.heroDescription,
            primaryCta: settings.primaryCta || defaults.primaryCta,
            secondaryCta: settings.secondaryCta || defaults.secondaryCta,
            topBarText: settings.topBarText || defaults.topBarText,
            phone: settings.phone || defaults.phone,
            whatsapp: settings.whatsapp || defaults.whatsapp,
            address: settings.address || defaults.address,
            mapsUrl: settings.mapsUrl || defaults.mapsUrl,
            instagramUrl: settings.instagramUrl || defaults.instagramUrl,
            contactEmail: settings.contactEmail || defaults.contactEmail,
            workingHours: settings.workingHours || defaults.workingHours,
            requestFormTitle: settings.requestFormTitle || defaults.requestFormTitle,
            requestFormDescription: settings.requestFormDescription || defaults.requestFormDescription,
            requestTypeOptionsText: settings.requestTypeOptions?.length ? settings.requestTypeOptions.join("\n") : defaults.requestTypeOptionsText,
            themePrimary: settings.theme?.primary || defaults.themePrimary,
            themeSecondary: settings.theme?.secondary || defaults.themeSecondary,
            themeAccent: settings.theme?.accent || defaults.themeAccent,
            themeSoft: settings.theme?.soft || defaults.themeSoft,
            themeDark: settings.theme?.dark || defaults.themeDark
          });
          setStatus("Canlı site ayarları yüklendi.");
        } else {
          setForm(defaultsFor(defaultTemplate));
          setStatus("Ayar kaydı yok, demo varsayılanları gösteriliyor.");
        }
      } catch (error) {
        setForm(defaultsFor(defaultTemplate));
        setStatus("Firebase bağlı değil, demo varsayılanları gösteriliyor.");
      }
    }
    loadSettings();
  }, [businessId, defaultTemplate, guard.isAllowed]);

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function changeTemplate(template: TemplateKey) {
    const defaults = defaultsFor(template);
    setForm((current) => ({ ...defaults, template, layoutVariant: current.layoutVariant }));
  }

  async function saveSettings() {
    setIsSaving(true);
    setStatus("");
    try {
      const { requestTypeOptionsText, themePrimary, themeSecondary, themeAccent, themeSoft, themeDark, ...sitePayload } = form;
      await saveSiteSettings(businessId, {
        ...sitePayload,
        requestTypeOptions: splitOptions(requestTypeOptionsText),
        theme: {
          primary: themePrimary,
          secondary: themeSecondary,
          accent: themeAccent,
          soft: themeSoft,
          dark: themeDark
        }
      });
      setStatus("Site ayarları kaydedildi. Site bu bilgileri canlı okuyacak.");
    } catch (error) {
      setStatus("Ayarlar kaydedilemedi. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) {
    return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  }

  if (!guard.isAllowed) {
    return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>FK</span><strong>Site Yönetimi</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a className="active" href="/admin/settings">Site Ayarları</a>
          <a href="/admin/content">Kurumsal Metinler</a>
          <a href="/admin/services">Hizmetler</a>
          <a href="/admin/campaigns">Kampanyalar</a>
          <a href="/admin/gallery">Galeri</a>
          <a href="/admin/properties/new">Yeni İlan</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Müşteri Site Yönetimi</span>
            <h1>Site ayarları</h1>
            <p>Firma bilgisi, ana sayfa metinleri, renkler, iletişim linkleri, form seçenekleri ve seçili arayüz buradan düzenlenir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <a className="pillButton navButtonLink" href={`/${form.template === "real-estate" ? "real-estate" : form.template}`}>Siteyi Aç</a>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            <label className="field"><span>Aktif sektör</span><select value={form.template} onChange={(event) => changeTemplate(event.currentTarget.value as TemplateKey)}>{templateKeys.map((template) => <option value={template} key={template}>{templateConfigs[template].sector}</option>)}</select></label>
            <label className="field"><span>Seçili arayüz</span><select value={form.layoutVariant} onChange={(event) => updateField("layoutVariant", event.currentTarget.value as LayoutVariant)}>{layoutKeys.map((layout) => <option value={layout} key={layout}>{layoutVariantLabels[layout]}</option>)}</select></label>
            <label className="field"><span>Firma adı</span><input value={form.brandName} onChange={(event) => updateField("brandName", event.currentTarget.value)} /></label>
            <label className="field"><span>Üst bar yazısı</span><input value={form.topBarText} onChange={(event) => updateField("topBarText", event.currentTarget.value)} /></label>
            <label className="field"><span>Küçük başlık</span><input value={form.eyebrow} onChange={(event) => updateField("eyebrow", event.currentTarget.value)} /></label>
            <label className="field"><span>Ana başlık</span><textarea value={form.heroTitle} onChange={(event) => updateField("heroTitle", event.currentTarget.value)} /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.heroDescription} onChange={(event) => updateField("heroDescription", event.currentTarget.value)} /></label>
            <label className="field"><span>Birinci buton</span><input value={form.primaryCta} onChange={(event) => updateField("primaryCta", event.currentTarget.value)} /></label>
            <label className="field"><span>İkinci buton</span><input value={form.secondaryCta} onChange={(event) => updateField("secondaryCta", event.currentTarget.value)} /></label>
            <label className="field"><span>Ana renk</span><input value={form.themePrimary} onChange={(event) => updateField("themePrimary", event.currentTarget.value)} placeholder="#4F46E5" /></label>
            <label className="field"><span>İkinci renk</span><input value={form.themeSecondary} onChange={(event) => updateField("themeSecondary", event.currentTarget.value)} placeholder="#38BDF8" /></label>
            <label className="field"><span>Vurgu rengi</span><input value={form.themeAccent} onChange={(event) => updateField("themeAccent", event.currentTarget.value)} placeholder="#FBBF24" /></label>
            <label className="field"><span>Açık arka plan</span><input value={form.themeSoft} onChange={(event) => updateField("themeSoft", event.currentTarget.value)} placeholder="#EEF2FF" /></label>
            <label className="field"><span>Koyu renk</span><input value={form.themeDark} onChange={(event) => updateField("themeDark", event.currentTarget.value)} placeholder="#312E81" /></label>
            <label className="field"><span>Form başlığı</span><input value={form.requestFormTitle} onChange={(event) => updateField("requestFormTitle", event.currentTarget.value)} /></label>
            <label className="field"><span>Form açıklaması</span><textarea value={form.requestFormDescription} onChange={(event) => updateField("requestFormDescription", event.currentTarget.value)} /></label>
            <label className="field"><span>Talep seçenekleri</span><textarea value={form.requestTypeOptionsText} onChange={(event) => updateField("requestTypeOptionsText", event.currentTarget.value)} placeholder="Her satıra bir seçenek yazın" /></label>
            <label className="field"><span>Telefon</span><input value={form.phone} onChange={(event) => updateField("phone", event.currentTarget.value)} /></label>
            <label className="field"><span>WhatsApp</span><input value={form.whatsapp} onChange={(event) => updateField("whatsapp", event.currentTarget.value)} /></label>
            <label className="field"><span>E-posta</span><input value={form.contactEmail} onChange={(event) => updateField("contactEmail", event.currentTarget.value)} /></label>
            <label className="field"><span>Çalışma saatleri</span><input value={form.workingHours} onChange={(event) => updateField("workingHours", event.currentTarget.value)} /></label>
            <label className="field"><span>Adres</span><input value={form.address} onChange={(event) => updateField("address", event.currentTarget.value)} /></label>
            <label className="field"><span>Google Maps linki</span><input value={form.mapsUrl} onChange={(event) => updateField("mapsUrl", event.currentTarget.value)} /></label>
            <label className="field"><span>Instagram linki</span><input value={form.instagramUrl} onChange={(event) => updateField("instagramUrl", event.currentTarget.value)} /></label>
            <button className="pillButton" type="button" disabled={isSaving} onClick={saveSettings}>{isSaving ? "Kaydediliyor..." : "Ayarları Kaydet"}</button>
          </div>
        </section>
      </section>
    </main>
  );
}
