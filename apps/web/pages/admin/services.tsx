import { useEffect, useState } from "react";
import {
  createBusinessService,
  listAdminBusinessServices,
  restoreBusinessService,
  updateBusinessService,
  type BusinessService
} from "@fk-templates/firebase";
import type { TemplateKey } from "@fk-templates/shared";
import { getDefaultTemplate, getDefaultTemplateRoute } from "../../src/defaultTemplate";
import { getAdminShellClassName, getAdminShellStyle, getLotusAdminConfig, getLotusAwareTemplate, isLotusAdminDemo, lotusAdminTemplateKeys } from "../../src/lotusAdmin";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const manageableTemplates: TemplateKey[] = ["appointment", "salon", "cafe", "kindergarten", "event-venue"];

function getDefaultManageableTemplate() {
  const defaultTemplate = getLotusAwareTemplate(getDefaultTemplate());
  return manageableTemplates.includes(defaultTemplate) ? defaultTemplate : "appointment";
}

export default function AdminServicesPage() {
  const guard = useOptionalAdminGuard();
  const isLotus = isLotusAdminDemo();
  const visibleTemplates = isLotus ? lotusAdminTemplateKeys : manageableTemplates;
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>(getDefaultManageableTemplate());
  const [services, setServices] = useState<BusinessService[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState(isLotus ? "Lotus menü kartları yönetilebilir." : "Hizmet yönetimi Firebase'e hazırdır.");
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "" });

  async function loadServices(template = activeTemplate) {
    try {
      const items = await listAdminBusinessServices(template);
      setServices(items);
      setStatus(items.length ? "Firestore canlı kartları gösteriliyor." : isLotus ? "Kayıt yok, Lotus demo menü kartları gösteriliyor." : "Firestore boş, demo config hizmetleri gösteriliyor.");
    } catch (error) {
      setServices([]);
      setStatus(isLotus ? "Firebase bağlı değil, Lotus demo menü kartları gösteriliyor." : "Firebase bağlı değil, demo config hizmetleri gösteriliyor.");
    }
  }

  useEffect(() => {
    if (!guard.isAllowed) return;
    loadServices(activeTemplate);
  }, [activeTemplate, guard.isAllowed]);

  function startEdit(service: BusinessService) {
    setEditingId(service.id);
    setForm({ title: service.title, description: service.description, price: service.price || "" });
    setStatus("Kart düzenleme modunda.");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", description: "", price: "" });
  }

  async function saveService() {
    if (!form.title || !form.description) {
      setStatus("Başlık ve açıklama zorunludur.");
      return;
    }
    setIsSaving(true);
    try {
      if (editingId) {
        await updateBusinessService(editingId, {
          template: activeTemplate,
          title: form.title,
          description: form.description,
          price: form.price,
          isActive: true
        });
        setStatus("Kart güncellendi.");
      } else {
        await createBusinessService({
          template: activeTemplate,
          title: form.title,
          description: form.description,
          price: form.price,
          isActive: true
        });
        setStatus("Kart kaydedildi.");
      }
      cancelEdit();
      await loadServices(activeTemplate);
    } catch (error) {
      setStatus("Kart kaydedilemedi. Firebase env, admin giriş veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleService(service: BusinessService) {
    setIsSaving(true);
    try {
      if (service.isActive) {
        await updateBusinessService(service.id, { isActive: false });
        setStatus("Kart pasife alındı.");
      } else {
        await restoreBusinessService(service.id);
        setStatus("Kart tekrar aktif edildi.");
      }
      await loadServices(activeTemplate);
    } catch (error) {
      setStatus("Kart durumu değiştirilemedi. Admin giriş veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  const demoServices = getLotusAdminConfig(activeTemplate, templateConfigs).services.map((service, index) => ({
    id: `${activeTemplate}-demo-${index}`,
    template: activeTemplate,
    title: service.title,
    description: service.description,
    price: service.price,
    isActive: true
  }));
  const displayServices = services.length ? services : demoServices;

  if (guard.isChecking) {
    return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  }

  if (!guard.isAllowed) {
    return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;
  }

  return (
    <main className={getAdminShellClassName()} style={getAdminShellStyle()}>
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>{isLotus ? "LB" : "FK"}</span><strong>{isLotus ? "Menü Kartları" : "Hizmetler"}</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/content">Kurumsal Metinler</a>
          <a className="active" href="/admin/services">{isLotus ? "Menü Kartları" : "Hizmetler"}</a>
          <a href="/admin/campaigns">{isLotus ? "Duyurular" : "Kampanyalar"}</a>
          <a href="/admin/gallery">Galeri</a>
          {!isLotus ? <a href="/admin/properties">İlanlar</a> : null}
          <a href={getDefaultTemplateRoute()}>Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">{isLotus ? "Lotus Menü Yönetimi" : "Hizmet / Program Yönetimi"}</span>
            <h1>{isLotus ? "Menü kartları yönetimi" : "Hizmet listesi yönetimi"}</h1>
            <p>{isLotus ? "Börek, hamur işi, kahvaltılık, tatlı ve toplu sipariş kartları buradan eklenir, düzenlenir ve pasife alınır." : "Hizmet, fiyat, menü ürünü, sınıf, yaş grubu, salon özelliği veya organizasyon paketi kartları eklenir, düzenlenir, pasife alınır ve tekrar aktif edilir."}</p>
            <p className="adminMode">{status}</p>
          </div>
          <a className="pillButton navButtonLink" href="/admin">Panele Dön</a>
        </header>

        <section className="adminCard">
          {isLotus ? <div className="lotusAdminBadge">Lotus Börek Evi menü kartları</div> : (
            <div className="templateSwitch serviceSwitch">
              {visibleTemplates.map((template) => (
                <button className={`templateButton ${activeTemplate === template ? "active" : ""}`} type="button" key={template} onClick={() => { setActiveTemplate(template); cancelEdit(); }}>{getLotusAdminConfig(template, templateConfigs).sector}</button>
              ))}
            </div>
          )}
          <div className="formFields adminPropertyForm">
            <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder={isLotus ? "Börek Çeşitleri / Tatlı & Baklava / Toplu Sipariş" : "Düğün Paketi / Kına Organizasyonu / 3 Yaş Sınıfı"} /></label>
            <label className="field"><span>{isLotus ? "Etiket" : "Etiket / fiyat"}</span><input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder={isLotus ? "Fiyat Sor" : "Tarih sor / Teklif al / Kontenjan sor / ₺500+"} /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder={isLotus ? "Ürün grubu için kısa ve anlaşılır açıklama" : "Kısa açıklama"} /></label>
            <div className="heroActions">
              <button className="pillButton" type="button" disabled={isSaving} onClick={saveService}>{isSaving ? "Kaydediliyor..." : editingId ? "Güncelle" : "Kaydet"}</button>
              {editingId ? <button className="ghostButton" type="button" onClick={cancelEdit}>Vazgeç</button> : null}
            </div>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut kartlar</h2><p>{isLotus ? "Aktif menü kartları sitedeki Menü ve ürünler alanında görünür." : "Aktif kartlar sitede görünür, pasif kartlar panelde kalır ama sitede görünmez."}</p></div></div>
          <div className="adminPropertyGrid">
            {displayServices.map((service) => (
              <article className="adminProperty" key={service.id}>
                <span>{service.isActive ? "Aktif" : "Pasif"}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.price ? <strong>{service.price}</strong> : null}
                <div className="heroActions">
                  {services.length ? <button className="ghostButton" type="button" onClick={() => startEdit(service)}>Düzenle</button> : null}
                  {services.length ? <button className="ghostButton" type="button" disabled={isSaving} onClick={() => toggleService(service)}>{service.isActive ? "Pasife Al" : "Aktif Et"}</button> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
