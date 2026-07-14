import { useEffect, useState } from "react";
import {
  createBusinessService,
  listAdminBusinessServices,
  listAdminSalonStaff,
  updateBusinessService,
  type BusinessService,
  type SalonStaff
} from "@fk-templates/firebase";
import { getDefaultTemplateRoute } from "../../src/defaultTemplate";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";

type ServiceForm = {
  title: string;
  description: string;
  price: string;
  durationMinutes: number;
  staffIds: string[];
};

const emptyForm: ServiceForm = {
  title: "",
  description: "",
  price: "",
  durationMinutes: 60,
  staffIds: []
};

export default function AdminBookingServicesPage() {
  const guard = useOptionalAdminGuard();
  const [services, setServices] = useState<BusinessService[]>([]);
  const [staff, setStaff] = useState<SalonStaff[]>([]);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("Randevu hizmetleri yükleniyor.");
  const [isSaving, setIsSaving] = useState(false);

  async function loadData() {
    try {
      const [serviceItems, staffItems] = await Promise.all([
        listAdminBusinessServices("salon"),
        listAdminSalonStaff(businessId)
      ]);
      setServices(serviceItems);
      setStaff(staffItems);
      setStatus(serviceItems.length ? "Salon hizmetleri hazır." : "Henüz canlı salon hizmeti yok. İlk hizmeti ekleyin.");
    } catch (error) {
      setStatus("Veriler yüklenemedi. Firebase ayarlarını ve admin girişini kontrol edin.");
    }
  }

  useEffect(() => {
    if (guard.isAllowed) loadData();
  }, [guard.isAllowed]);

  function resetForm() {
    setEditingId("");
    setForm(emptyForm);
  }

  function startEdit(service: BusinessService) {
    setEditingId(service.id);
    setForm({
      title: service.title,
      description: service.description,
      price: service.price || "",
      durationMinutes: service.durationMinutes || 60,
      staffIds: service.staffIds || []
    });
    setStatus("Hizmet düzenleme modunda.");
  }

  function toggleStaff(staffId: string) {
    setForm((current) => ({
      ...current,
      staffIds: current.staffIds.includes(staffId)
        ? current.staffIds.filter((id) => id !== staffId)
        : [...current.staffIds, staffId]
    }));
  }

  async function saveService() {
    if (!form.title.trim() || !form.description.trim()) {
      setStatus("Hizmet adı ve açıklaması zorunludur.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        template: "salon" as const,
        businessId,
        title: form.title.trim(),
        description: form.description.trim(),
        price: form.price.trim(),
        durationMinutes: Math.max(15, Number(form.durationMinutes) || 60),
        staffIds: form.staffIds,
        isActive: true
      };
      if (editingId) await updateBusinessService(editingId, payload);
      else await createBusinessService(payload);
      setStatus(editingId ? "Hizmet güncellendi." : "Hizmet eklendi.");
      resetForm();
      await loadData();
    } catch (error) {
      setStatus("Hizmet kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleActive(service: BusinessService) {
    setIsSaving(true);
    try {
      await updateBusinessService(service.id, { isActive: !service.isActive });
      setStatus(service.isActive ? "Hizmet pasife alındı." : "Hizmet aktif edildi.");
      await loadData();
    } catch (error) {
      setStatus("Hizmet durumu değiştirilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  if (!guard.isAllowed) return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;

  return (
    <main className="adminShell salonAdminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>RS</span><strong>Randevu Sistemi</strong></a>
        <nav>
          <a href="/admin">Genel Panel</a>
          <a href="/admin/appointments">Randevular</a>
          <a className="active" href="/admin/booking-services">Randevu Hizmetleri</a>
          <a href="/admin/staff">Personel & Saatler</a>
          <a href="/admin/services">Site Hizmet Kartları</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href={getDefaultTemplateRoute()}>Siteye Dön</a>
        </nav>
      </aside>

      <section className="adminMain">
        <header className="adminHeader">
          <div><span className="eyebrow">Güzellik Merkezi</span><h1>Randevu hizmetleri</h1><p>Hizmet süresi ve hizmeti yapabilen personel burada belirlenir. Takvim boş saatleri bu bilgilere göre hesaplar.</p><p className="adminMode">{status}</p></div>
          <a className="pillButton navButtonLink" href="/admin/appointments">Randevulara Git</a>
        </header>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>{editingId ? "Hizmeti düzenle" : "Yeni hizmet ekle"}</h2><p>Süreyi gerçek işlem süresine göre girin.</p></div></div>
          <div className="formFields adminPropertyForm">
            <label className="field"><span>Hizmet adı</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder="Cilt Bakımı" /></label>
            <label className="field"><span>Fiyat / etiket</span><input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder="₺900 / Fiyat Sor" /></label>
            <label className="field"><span>Süre (dakika)</span><input min="15" step="15" type="number" value={form.durationMinutes} onChange={(event) => setForm((current) => ({ ...current, durationMinutes: Number(event.currentTarget.value) }))} /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Hizmetin kısa açıklaması" /></label>
            <div className="adminCheckboxGroup"><strong>Bu hizmeti yapabilen personel</strong><p>Hiç kimse seçilmezse tüm aktif personel uygun kabul edilir.</p><div className="adminDayGrid">{staff.map((member) => <label key={member.id}><input type="checkbox" checked={form.staffIds.includes(member.id)} onChange={() => toggleStaff(member.id)} /><span>{member.name} • {member.role}</span></label>)}</div></div>
            <div className="heroActions"><button className="pillButton" disabled={isSaving} onClick={saveService} type="button">{isSaving ? "Kaydediliyor..." : editingId ? "Güncelle" : "Hizmeti Ekle"}</button>{editingId ? <button className="ghostButton" onClick={resetForm} type="button">Vazgeç</button> : null}</div>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut randevu hizmetleri</h2><p>Pasif hizmetler sitede randevu seçeneği olarak görünmez.</p></div></div>
          <div className="adminPropertyGrid">
            {services.map((service) => <article className="adminProperty" key={service.id}><span>{service.isActive ? "Aktif" : "Pasif"}</span><h3>{service.title}</h3><p>{service.description}</p><strong>{service.price || "Fiyat bilgisi"} • {service.durationMinutes || 60} dk</strong><p>{service.staffIds?.length ? `${service.staffIds.length} personel bağlı` : "Tüm personel"}</p><div className="heroActions"><button className="ghostButton" onClick={() => startEdit(service)} type="button">Düzenle</button><button className="ghostButton" disabled={isSaving} onClick={() => toggleActive(service)} type="button">{service.isActive ? "Pasife Al" : "Aktif Et"}</button></div></article>)}
          </div>
          {!services.length ? <div className="formPanel"><h3>Henüz hizmet eklenmedi</h3><p>Yukarıdaki formdan ilk randevu hizmetini oluşturun.</p></div> : null}
        </section>
      </section>
    </main>
  );
}
