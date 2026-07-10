import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings, type ManagedSiteSettings } from "@fk-templates/firebase";
import type { ServiceItem, TemplateKey } from "@fk-templates/shared";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate", "cafe", "kindergarten"];

export default function AdminCampaignsPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("salon");
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState<ServiceItem>({ title: "", description: "", price: "" });
  const [status, setStatus] = useState("Kampanya, duyuru ve etkinlikler panelden yönetilebilir.");
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
        setStatus(siteSettings?.campaignItems?.length ? "Canlı kampanya/duyurular yüklendi." : "Kayıt yok, demo kampanya/duyurular gösteriliyor.");
      } catch (error) {
        setStatus("Firebase bağlı değil, demo kampanya/duyurular gösteriliyor.");
        setItems(templateConfigs.salon.campaignItems || []);
      }
    }
    loadCampaigns();
  }, [businessId, guard.isAllowed]);

  function addCampaign() {
    if (!form.title || !form.description) {
      setStatus("Başlık ve açıklama zorunludur.");
      return;
    }
    setItems((current) => [...current, form]);
    setForm({ title: "", description: "", price: "" });
    setStatus("Listeye eklendi. Canlıya yansıtmak için kaydet.");
  }

  function removeCampaign(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveCampaigns() {
    setIsSaving(true);
    try {
      await saveSiteSettings(businessId, { ...(settings || {}), template, campaignItems: items });
      setStatus("Kampanya/duyurular kaydedildi. Site bu alanı canlı okuyacak.");
    } catch (error) {
      setStatus("Kayıt yapılamadı. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
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
            <h1>Kampanya / duyuru yönetimi</h1>
            <p>Müşteri indirim, paket, dönemsel kampanya, kayıt duyurusu veya etkinlik bilgisini panelden ekleyebilir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <button className="pillButton" type="button" disabled={isSaving} onClick={saveCampaigns}>{isSaving ? "Kaydediliyor..." : "Listeyi Kaydet"}</button>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            <label className="field"><span>Aktif sektör</span><select value={template} onChange={(event) => setTemplate(event.currentTarget.value as TemplateKey)}>{templateKeys.map((item) => <option value={item} key={item}>{templateConfigs[item].sector}</option>)}</select></label>
            <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder="Yeni dönem kayıtları / Hafta içi bakım paketi" /></label>
            <label className="field"><span>Fiyat / etiket</span><input value={form.price || ""} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder="Bilgi al / Kontenjan sor / ₺1.250" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Kısa açıklama" /></label>
            <button className="ghostButton" type="button" onClick={addCampaign}>Listeye Ekle</button>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut liste</h2><p>Bu liste kaydedilince sitedeki kampanya/duyuru alanında görünür.</p></div></div>
          <div className="adminPropertyGrid">
            {items.map((item, index) => (
              <article className="adminProperty" key={`${item.title}-${index}`}>
                <span>Öne çıkan</span>
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
