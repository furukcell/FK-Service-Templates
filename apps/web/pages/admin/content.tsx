import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings, type ContentPageKey, type FaqItem, type ManagedContentPage, type ManagedSiteSettings } from "@fk-templates/firebase";
import type { TemplateKey } from "@fk-templates/shared";
import { contentPageLabels, contentPageOrder, defaultContentPages, defaultFaqItems } from "../../src/siteContent";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate"];

export default function AdminContentPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("appointment");
  const [activePage, setActivePage] = useState<ContentPageKey>("about");
  const [pageForm, setPageForm] = useState<ManagedContentPage>(defaultContentPages(templateConfigs.appointment).about);
  const [faqItems, setFaqItems] = useState<FaqItem[]>(defaultFaqItems(templateConfigs.appointment));
  const [faqForm, setFaqForm] = useState<FaqItem>({ question: "", answer: "" });
  const [status, setStatus] = useState("Kurumsal metinler panelden yönetilebilir.");
  const [isSaving, setIsSaving] = useState(false);

  function pageDefaults(selectedTemplate: TemplateKey, pageKey: ContentPageKey, siteSettings?: ManagedSiteSettings | null) {
    return defaultContentPages(templateConfigs[selectedTemplate], siteSettings)[pageKey];
  }

  useEffect(() => {
    if (!guard.isAllowed) return;
    async function loadContent() {
      try {
        const siteSettings = await getSiteSettings(businessId);
        const selectedTemplate = siteSettings?.template || "appointment";
        setSettings(siteSettings);
        setTemplate(selectedTemplate);
        setPageForm(siteSettings?.contentPages?.[activePage] || pageDefaults(selectedTemplate, activePage, siteSettings));
        setFaqItems(siteSettings?.faqItems?.length ? siteSettings.faqItems : defaultFaqItems(templateConfigs[selectedTemplate]));
        setStatus(siteSettings?.contentPages ? "Canlı kurumsal metinler yüklendi." : "Metin kaydı yok, hazır şablon metinleri gösteriliyor.");
      } catch (error) {
        setStatus("Firebase bağlı değil, hazır şablon metinleri gösteriliyor.");
      }
    }
    loadContent();
  }, [activePage, businessId, guard.isAllowed]);

  function changeTemplate(selectedTemplate: TemplateKey) {
    setTemplate(selectedTemplate);
    setPageForm(pageDefaults(selectedTemplate, activePage, settings));
    setFaqItems(settings?.faqItems?.length ? settings.faqItems : defaultFaqItems(templateConfigs[selectedTemplate]));
  }

  function changeActivePage(pageKey: ContentPageKey) {
    setActivePage(pageKey);
    setPageForm(settings?.contentPages?.[pageKey] || pageDefaults(template, pageKey, settings));
  }

  function addFaq() {
    if (!faqForm.question || !faqForm.answer) {
      setStatus("SSS soru ve cevap alanları zorunludur.");
      return;
    }
    setFaqItems((current) => [...current, faqForm]);
    setFaqForm({ question: "", answer: "" });
    setStatus("SSS listeye eklendi. Canlıya yansıtmak için kaydet.");
  }

  function removeFaq(index: number) {
    setFaqItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveContent() {
    setIsSaving(true);
    try {
      await saveSiteSettings(businessId, {
        ...(settings || {}),
        template,
        contentPages: {
          ...(settings?.contentPages || {}),
          [activePage]: pageForm
        },
        faqItems
      });
      const updatedSettings = await getSiteSettings(businessId);
      setSettings(updatedSettings);
      setStatus("Kurumsal metinler kaydedildi. Public sayfalar bu içerikleri okuyacak.");
    } catch (error) {
      setStatus("Metinler kaydedilemedi. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
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
        <a className="adminLogo" href="/admin"><span>FK</span><strong>İçerik</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a className="active" href="/admin/content">Kurumsal Metinler</a>
          <a href="/admin/services">Hizmetler</a>
          <a href="/admin/campaigns">Kampanyalar</a>
          <a href="/admin/gallery">Galeri</a>
          <a href="/admin/properties/new">Yeni İlan</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Legal + Trust Pages</span>
            <h1>Kurumsal metin yönetimi</h1>
            <p>Hakkımızda, iletişim, gizlilik, KVKK, çerez, kullanım koşulları ve SSS metinleri buradan düzenlenir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <button className="pillButton" type="button" disabled={isSaving} onClick={saveContent}>{isSaving ? "Kaydediliyor..." : "Metinleri Kaydet"}</button>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            <label className="field"><span>Aktif sektör</span><select value={template} onChange={(event) => changeTemplate(event.currentTarget.value as TemplateKey)}>{templateKeys.map((item) => <option value={item} key={item}>{templateConfigs[item].sector}</option>)}</select></label>
            <label className="field"><span>Düzenlenecek sayfa</span><select value={activePage} onChange={(event) => changeActivePage(event.currentTarget.value as ContentPageKey)}>{contentPageOrder.map((item) => <option value={item} key={item}>{contentPageLabels[item]}</option>)}</select></label>
            <label className="field"><span>Sayfa başlığı</span><input value={pageForm.title} onChange={(event) => setPageForm((current) => ({ ...current, title: event.currentTarget.value }))} /></label>
            <label className="field"><span>Kısa açıklama</span><input value={pageForm.description} onChange={(event) => setPageForm((current) => ({ ...current, description: event.currentTarget.value }))} /></label>
            <label className="field"><span>Sayfa metni</span><textarea value={pageForm.body} onChange={(event) => setPageForm((current) => ({ ...current, body: event.currentTarget.value }))} /></label>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>SSS yönetimi</h2><p>Sık sorulan sorular public `/sss` sayfasında gösterilir.</p></div></div>
          <div className="adminPropertyForm formFields">
            <label className="field"><span>Soru</span><input value={faqForm.question} onChange={(event) => setFaqForm((current) => ({ ...current, question: event.currentTarget.value }))} /></label>
            <label className="field"><span>Cevap</span><textarea value={faqForm.answer} onChange={(event) => setFaqForm((current) => ({ ...current, answer: event.currentTarget.value }))} /></label>
            <button className="ghostButton" type="button" onClick={addFaq}>SSS Ekle</button>
          </div>
          <div className="adminPropertyGrid">
            {faqItems.map((item, index) => <article className="adminProperty" key={`${item.question}-${index}`}><span>SSS</span><h3>{item.question}</h3><p>{item.answer}</p><button className="ghostButton" type="button" onClick={() => removeFaq(index)}>Kaldır</button></article>)}
          </div>
        </section>
      </section>
    </main>
  );
}
