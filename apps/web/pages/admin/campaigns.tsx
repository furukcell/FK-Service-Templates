import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings, type ManagedSiteSettings } from "@fk-templates/firebase";
import type { ServiceItem, TemplateKey } from "@fk-templates/shared";
import { getDefaultTemplate } from "../../src/defaultTemplate";
import { getAdminShellClassName, getAdminShellStyle, getLotusAdminConfig, getLotusAwareTemplate, isLotusAdminDemo, lotusAdminTemplateKeys } from "../../src/lotusAdmin";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate", "cafe", "kindergarten", "event-venue"];

export default function AdminCampaignsPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const isLotus = isLotusAdminDemo();
  const defaultTemplate = getLotusAwareTemplate(getDefaultTemplate());
  const visibleTemplateKeys = isLotus ? lotusAdminTemplateKeys : templateKeys;
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [template, setTemplate] = useState<TemplateKey>(defaultTemplate);
  const [items, setItems] = useState<ServiceItem[]>(getLotusAdminConfig(defaultTemplate, templateConfigs).campaignItems || []);
  const [form, setForm] = useState<ServiceItem>({ title: "", description: "", price: "" });
  const [status, setStatus] = useState(isLotus ? "Lotus duyuruları panelden yönetilebilir." : "Kampanya, duyuru ve etkinlikler panelden yönetilebilir.");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!guard.isAllowed) return;
    async function loadCampaigns() {
      try {
        const siteSettings = await getSiteSettings(businessId);
        setSettings(siteSettings);
        const selectedTemplate = isLotus ? "cafe" : siteSettings?.template || defaultTemplate;
        setTemplate(selectedTemplate);
        setItems(siteSettings?.campaignItems?.length ? siteSettings.campaignItems : getLotusAdminConfig(selectedTemplate, templateConfigs).campaignItems || []);
        setStatus(siteSettings?.campaignItems?.length ? "Canlı duyurular yüklendi." : isLotus ? "Kayıt yok, Lotus demo duyuruları gösteriliyor." : "Kayıt yok, demo kampanya/duyurular gösteriliyor.");
      } catch (error) {
        setTemplate(defaultTemplate);
        setItems(getLotusAdminConfig(defaultTemplate, templateConfigs).campaignItems || []);
        setStatus(isLotus ? "Firebase bağlı değil, Lotus demo duyuruları gösteriliyor." : "Firebase bağlı değil, demo kampanya/duyurular gösteriliyor.");
      }
    }
    loadCampaigns();
  }, [businessId, defaultTemplate, guard.isAllowed, isLotus]);

  function changeTemplate(selectedTemplate: TemplateKey) {
    setTemplate(selectedTemplate);
    setItems(getLotusAdminConfig(selectedTemplate, templateConfigs).campaignItems || []);
  }

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
      await saveSiteSettings(businessId, { ...(settings || {}), template: isLotus ? "cafe" : template, campaignItems: items });
      setStatus("Liste kaydedildi. Site bu alanı canlı okuyacak.");
    } catch (error) {
      setStatus("Kayıt yapılamadı. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) {
    return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  }

  if (!guard.isAllowed) {
    return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;
  }

  return (
    <main className={getAdminShellClassName()} style={getAdminShellStyle()}>
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>{isLotus ? "LB" : "FK"}</span><strong>{isLotus ? "Duyurular" : "Kampanyalar"}</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/services">{isLotus ? "Menü Kartları" : "Hizmetler"}</a>
          <a className="active" href="/admin/campaigns">{isLotus ? "Duyurular" : "Kampanyalar"}</a>
          <a href="/admin/gallery">Galeri</a>
          {!isLotus ? <a href="/admin/properties/new">Yeni İlan</a> : null}
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">{isLotus ? "Lotus Duyuru Yönetimi" : "Müşteri Site Yönetimi"}</span>
            <h1>{isLotus ? "Duyuru yönetimi" : "Kampanya / duyuru yönetimi"}</h1>
            <p>{isLotus ? "Günlük ürün, toplu sipariş, vitrin ve özel gün duyuruları panelden eklenebilir." : "Müşteri indirim, paket, dönemsel kampanya, kayıt duyurusu, sezon fırsatı veya etkinlik bilgisini panelden ekleyebilir."}</p>
            <p className="adminMode">{status}</p>
          </div>
          <button className="pillButton" type="button" disabled={isSaving} onClick={saveCampaigns}>{isSaving ? "Kaydediliyor..." : "Listeyi Kaydet"}</button>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            {!isLotus ? <label className="field"><span>Aktif sektör</span><select value={template} onChange={(event) => changeTemplate(event.currentTarget.value as TemplateKey)}>{visibleTemplateKeys.map((item) => <option value={item} key={item}>{getLotusAdminConfig(item, templateConfigs).sector}</option>)}</select></label> : <div className="lotusAdminBadge">Lotus Börek Evi duyuruları</div>}
            <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder={isLotus ? "Sabah sıcak lezzetler" : "Erken rezervasyon / Hafta içi davet avantajı"} /></label>
            <label className="field"><span>{isLotus ? "Etiket" : "Fiyat / etiket"}</span><input value={form.price || ""} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder={isLotus ? "Günlük / Fiyat Sor" : "Tarih sor / Teklif al / Bilgi al"} /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Kısa açıklama" /></label>
            <button className="ghostButton" type="button" onClick={addCampaign}>Listeye Ekle</button>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut liste</h2><p>Bu liste kaydedilince sitedeki kampanya/duyuru alanında görünür.</p></div></div>
          <div className="adminPropertyGrid">
            {items.map((item, index) => (
              <article className="adminProperty" key={`${item.title}-${index}`}>
                <span>{isLotus ? "Duyuru" : "Öne çıkan"}</span>
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
