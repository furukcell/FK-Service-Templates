import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings, type ManagedSiteSettings } from "@fk-templates/firebase";
import type { ServiceItem, TemplateKey } from "@fk-templates/shared";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate"];

export default function AdminCampaignsPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("salon");
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState<ServiceItem>({ title: "", description: "", price: "" });
  const [status, setStatus] = useState("Kampanyalar panelden yönetilebilir.");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!guard.isAllowed) return;
    async function loadCampaigns() {
      try {
        const siteSettings = await getSiteSettings(businessId);
        setSettings(siteSettings);
        const selectedTemplate = siteSettings?.template || "salon";
        setTemplate(selectedTemplate);
        setItems(siteSettings?.campaignItems?.length ? siteSettings.campaignItems : templateConfigs[selectedTemplate].campaignItems || []);
        setStatus(siteSettings?.campaignItems?.length ? "Canlı kampanyalar yüklendi." : "Kampanya kaydı yok, demo kampanyalar gösteriliyor.");
      } catch (error) {
        setStatus("Firebase bağlı değil, demo kampanyalar gösteriliyor.");
        setItems(templateConfigs.salon.campaignItems || []);
      }
    }
    loadCampaigns();
  }, [businessId, guard.isAllowed]);

  function addCampaign() {
    if (!form.title || !form.description) {
      setStatus("Kampanya başlığı ve açıklaması zorunludur.");
      return;
    }
    setItems((current) => [...current, form]);
    setForm({ title: "", description: "", price: "" });
    setStatus("Kampanya listeye eklendi. Canlıya yansıtmak için kaydet.");
  }

  function removeCampaign(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveCampaigns() {
    setIsSaving(true);
    try {
      await saveSiteSettings(businessId, { ...(settings || {}), template, campaignItems: items });
      setStatus("Kampanyalar kaydedildi. Site bu kampanyaları canlı okuyacak.");
    } catch (error) {
      setStatus("Kampanyalar kaydedilemedi. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
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
        <a className="adminLogo" href="/admin"><span>FK</span><strong>Kampanyalar</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/services">Hizmetler</a>
          <a className="active" href="/admin/campaigns">Kampanyalar</a>
          <a href="/admin/gallery">Galeri</a>
          <a href="/admin/properties/new">Yeni İlan</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Müşteri Site Yönetimi</span>
            <h1>Kampanya yönetimi</h1>
            <p>Müşteri indirim, paket ve dönemsel kampanyalarını panelden ekleyebilir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <button className="pillButton" type="button" disabled={isSaving} onClick={saveCampaigns}>{isSaving ? "Kaydediliyor..." : "Kampanyaları Kaydet"}</button>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            <label className="field"><span>Aktif sektör</span><select value={template} onChange={(event) => setTemplate(event.currentTarget.value as TemplateKey)}>{templateKeys.map((item) => <option value={item} key={item}>{templateConfigs[item].sector}</option>)}</select></label>
            <label className="field"><span>Kampanya başlığı</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder="Hafta içi bakım paketi" /></label>
            <label className="field"><span>Fiyat / etiket</span><input value={form.price || ""} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder="₺1.250 / Teklif al" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Kampanya açıklaması" /></label>
            <button className="ghostButton" type="button" onClick={addCampaign}>Listeye Ekle</button>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut kampanyalar</h2><p>Bu liste kaydedilince sitedeki kampanya alanında görünür.</p></div></div>
          <div className="adminPropertyGrid">
            {items.map((item, index) => (
              <article className="adminProperty" key={`${item.title}-${index}`}>
                <span>Kampanya</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.price ? <strong>{item.price}</strong> : null}
                <button className="ghostButton" type="button" onClick={() => removeCampaign(index)}>Kaldır</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
