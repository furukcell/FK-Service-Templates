import { useEffect, useState } from "react";
import {
  createBusinessService,
  listBusinessServices,
  type BusinessService
} from "@fk-templates/firebase";
import type { TemplateKey } from "@fk-templates/shared";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const manageableTemplates: TemplateKey[] = ["appointment", "salon"];

export default function AdminServicesPage() {
  const guard = useOptionalAdminGuard();
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("appointment");
  const [services, setServices] = useState<BusinessService[]>([]);
  const [status, setStatus] = useState("Hizmet yönetimi Firebase'e hazırdır.");
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", price: "" });

  async function loadServices(template = activeTemplate) {
    try {
      const items = await listBusinessServices(template);
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

  async function saveService() {
    if (!form.title || !form.description) {
      setStatus("Hizmet adı ve açıklaması zorunludur.");
      return;
    }
    setIsSaving(true);
    try {
      await createBusinessService({
        template: activeTemplate,
        title: form.title,
        description: form.description,
        price: form.price,
        isActive: true
      });
      setForm({ title: "", description: "", price: "" });
      setStatus("Hizmet kaydedildi.");
      await loadServices(activeTemplate);
    } catch (error) {
      setStatus("Hizmet kaydedilemedi. Firebase env, admin giriş veya Firestore rules kontrol edilmeli.");
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
          <a className="active" href="/admin/services">Hizmetler</a>
          <a href="/admin/properties/new">Yeni ilan</a>
          <a href="/">Site</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Salon / Klinik Yönetimi</span>
            <h1>Hizmet listesi yönetimi</h1>
            <p>Kuaför/güzellik ve klinik/veteriner müşterileri için hizmet/fiyat listesini panelden yönetme ekranıdır.</p>
            <p className="adminMode">{status}</p>
          </div>
          <a className="pillButton navButtonLink" href="/admin">Panele Dön</a>
        </header>

        <section className="adminCard">
          <div className="templateSwitch serviceSwitch">
            {manageableTemplates.map((template) => (
              <button className={`templateButton ${activeTemplate === template ? "active" : ""}`} type="button" key={template} onClick={() => setActiveTemplate(template)}>{templateConfigs[template].sector}</button>
            ))}
          </div>
          <div className="formFields adminPropertyForm">
            <label className="field"><span>Hizmet adı</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder="Aşı takibi / Saç kesim" /></label>
            <label className="field"><span>Fiyat</span><input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder="₺500+" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Kısa hizmet açıklaması" /></label>
            <button className="pillButton" type="button" disabled={isSaving} onClick={saveService}>{isSaving ? "Kaydediliyor..." : "Hizmeti Kaydet"}</button>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut hizmetler</h2><p>Firestore'da kayıt varsa canlı hizmetler, yoksa demo config hizmetleri gösterilir.</p></div></div>
          <div className="adminPropertyGrid">
            {displayServices.map((service) => (
              <article className="adminProperty" key={service.id}>
                <span>{templateConfigs[activeTemplate].sector}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.price ? <strong>{service.price}</strong> : null}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
