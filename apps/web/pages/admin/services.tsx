import { useEffect, useState } from "react";
import {
  createBusinessService,
  listAdminBusinessServices,
  restoreBusinessService,
  updateBusinessService,
  type BusinessService
} from "@fk-templates/firebase";
import type { TemplateKey } from "@fk-templates/shared";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const manageableTemplates: TemplateKey[] = ["appointment", "salon", "cafe", "kindergarten", "event-venue"];

export default function AdminServicesPage() {
  const guard = useOptionalAdminGuard();
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("appointment");
  const [services, setServices] = useState<BusinessService[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("Hizmet yönetimi Firebase'e hazırdır.");
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "" });

  async function loadServices(template = activeTemplate) {
    try {
      const items = await listAdminBusinessServices(template);
      setServices(items);
      setStatus(items.length ? "Firestore canlı hizmetleri gösteriliyor." : "Firestore boş, demo config hizmetleri gösteriliyor.");
    } catch (error) {
      setServices([]);
      setStatus("Firebase bağlı değil, demo config hizmetleri gösteriliyor.");
    }
  }

  useEffect(() => {
    if (!guard.isAllowed) return;
    loadServices(activeTemplate);
  }, [activeTemplate, guard.isAllowed]);

  function startEdit(service: BusinessService) {
    setEditingId(service.id);
    setForm({ title: service.title, description: service.description, price: service.price || "" });
    setStatus("Hizmet düzenleme modunda.");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", description: "", price: "" });
  }

  async function saveService() {
    if (!form.title || !form.description) {
      setStatus("Hizmet adı ve açıklaması zorunludur.");
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
        setStatus("Hizmet güncellendi.");
      } else {
        await createBusinessService({
          template: activeTemplate,
          title: form.title,
          description: form.description,
          price: form.price,
          isActive: true
        });
        setStatus("Hizmet kaydedildi.");
      }
      cancelEdit();
      await loadServices(activeTemplate);
    } catch (error) {
      setStatus("Hizmet kaydedilemedi. Firebase env, admin giriş veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleService(service: BusinessService) {
    setIsSaving(true);
    try {
      if (service.isActive) {
        await updateBusinessService(service.id, { isActive: false });
        setStatus("Hizmet pasife alındı.");
      } else {
        await restoreBusinessService(service.id);
        setStatus("Hizmet tekrar aktif edildi.");
      }
      await loadServices(activeTemplate);
    } catch (error) {
      setStatus("Hizmet durumu değiştirilemedi. Admin giriş veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  const demoServices = templateConfigs[activeTemplate].services.map((service, index) => ({
    id: `${activeTemplate}-demo-${index}`,
    template: activeTemplate,
    title: service.title,
    description: service.description,
    price: service.price,
    isActive: true
  }));
  const displayServices = services.length ? services : demoServices;

  if (guard.isChecking) {
    return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  }

  if (!guard.isAllowed) {
    return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>FK</span><strong>Hizmetler</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/content">Kurumsal Metinler</a>
          <a className="active" href="/admin/services">Hizmetler</a>
          <a href="/admin/campaigns">Kampanyalar</a>
          <a href="/admin/gallery">Galeri</a>
          <a href="/admin/properties">İlanlar</a>
          <a href="/">Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Hizmet / Program Yönetimi</span>
            <h1>Hizmet listesi yönetimi</h1>
            <p>Hizmet, fiyat, menü ürünü, sınıf, yaş grubu, salon özelliği veya organizasyon paketi kartları eklenir, düzenlenir, pasife alınır ve tekrar aktif edilir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <a className="pillButton navButtonLink" href="/admin">Panele Dön</a>
        </header>

        <section className="adminCard">
          <div className="templateSwitch serviceSwitch">
            {manageableTemplates.map((template) => (
              <button className={`templateButton ${activeTemplate === template ? "active" : ""}`} type="button" key={template} onClick={() => { setActiveTemplate(template); cancelEdit(); }}>{templateConfigs[template].sector}</button>
            ))}
          </div>
          <div className="formFields adminPropertyForm">
            <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder="Düğün Paketi / Kına Organizasyonu / 3 Yaş Sınıfı" /></label>
            <label className="field"><span>Etiket / fiyat</span><input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder="Tarih sor / Teklif al / Kontenjan sor / ₺500+" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Kısa açıklama" /></label>
            <div className="heroActions">
              <button className="pillButton" type="button" disabled={isSaving} onClick={saveService}>{isSaving ? "Kaydediliyor..." : editingId ? "Güncelle" : "Kaydet"}</button>
              {editingId ? <button className="ghostButton" type="button" onClick={cancelEdit}>Vazgeç</button> : null}
            </div>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut kartlar</h2><p>Aktif kartlar sitede görünür, pasif kartlar panelde kalır ama sitede görünmez.</p></div></div>
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