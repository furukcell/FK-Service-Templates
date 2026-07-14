import { useEffect, useState } from "react";
import {
  createSalonStaff,
  listAdminSalonStaff,
  updateSalonStaff,
  type SalonStaff
} from "@fk-templates/firebase";
import { getDefaultTemplateRoute } from "../../src/defaultTemplate";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
const DAYS = [
  { value: 1, label: "Pazartesi" },
  { value: 2, label: "Salı" },
  { value: 3, label: "Çarşamba" },
  { value: 4, label: "Perşembe" },
  { value: 5, label: "Cuma" },
  { value: 6, label: "Cumartesi" },
  { value: 0, label: "Pazar" }
];

type StaffForm = {
  name: string;
  role: string;
  description: string;
  workDays: number[];
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
  slotMinutes: number;
};

const emptyForm: StaffForm = {
  name: "",
  role: "",
  description: "",
  workDays: [1, 2, 3, 4, 5, 6],
  startTime: "09:00",
  endTime: "19:00",
  breakStart: "13:00",
  breakEnd: "14:00",
  slotMinutes: 30
};

export default function AdminStaffPage() {
  const guard = useOptionalAdminGuard();
  const [staff, setStaff] = useState<SalonStaff[]>([]);
  const [form, setForm] = useState<StaffForm>(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("Personel bilgileri yükleniyor.");
  const [isSaving, setIsSaving] = useState(false);

  async function loadStaff() {
    try {
      const items = await listAdminSalonStaff(businessId);
      setStaff(items);
      setStatus(items.length ? "Personel ve çalışma saatleri hazır." : "Henüz personel eklenmedi.");
    } catch (error) {
      setStatus("Personel bilgileri yüklenemedi. Firebase bağlantısını kontrol edin.");
    }
  }

  useEffect(() => {
    if (guard.isAllowed) loadStaff();
  }, [guard.isAllowed]);

  function resetForm() {
    setEditingId("");
    setForm(emptyForm);
  }

  function startEdit(member: SalonStaff) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      description: member.description || "",
      workDays: member.workDays || [],
      startTime: member.startTime || "09:00",
      endTime: member.endTime || "18:00",
      breakStart: member.breakStart || "",
      breakEnd: member.breakEnd || "",
      slotMinutes: member.slotMinutes || 30
    });
    setStatus("Personel düzenleme modunda.");
  }

  function toggleDay(day: number) {
    setForm((current) => ({
      ...current,
      workDays: current.workDays.includes(day)
        ? current.workDays.filter((value) => value !== day)
        : [...current.workDays, day]
    }));
  }

  async function saveStaff() {
    if (!form.name.trim() || !form.role.trim()) {
      setStatus("Personel adı ve uzmanlık alanı zorunludur.");
      return;
    }
    if (!form.workDays.length) {
      setStatus("En az bir çalışma günü seçin.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        businessId,
        name: form.name.trim(),
        role: form.role.trim(),
        description: form.description.trim(),
        serviceIds: editingId ? staff.find((item) => item.id === editingId)?.serviceIds || [] : [],
        workDays: form.workDays.sort((a, b) => a - b),
        startTime: form.startTime,
        endTime: form.endTime,
        breakStart: form.breakStart,
        breakEnd: form.breakEnd,
        slotMinutes: Math.max(15, Number(form.slotMinutes) || 30),
        isActive: editingId ? staff.find((item) => item.id === editingId)?.isActive !== false : true
      };
      if (editingId) await updateSalonStaff(editingId, payload);
      else await createSalonStaff(payload);
      setStatus(editingId ? "Personel güncellendi." : "Personel eklendi.");
      resetForm();
      await loadStaff();
    } catch (error) {
      setStatus("Personel kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleActive(member: SalonStaff) {
    setIsSaving(true);
    try {
      await updateSalonStaff(member.id, { isActive: !member.isActive });
      setStatus(member.isActive ? "Personel pasife alındı." : "Personel aktif edildi.");
      await loadStaff();
    } catch (error) {
      setStatus("Personel durumu değiştirilemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  if (!guard.isAllowed) return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;

  return (
    <main className="adminShell salonAdminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>PS</span><strong>Personel & Saatler</strong></a>
        <nav>
          <a href="/admin">Genel Panel</a>
          <a href="/admin/appointments">Randevular</a>
          <a href="/admin/booking-services">Randevu Hizmetleri</a>
          <a className="active" href="/admin/staff">Personel & Saatler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href={getDefaultTemplateRoute()}>Siteye Dön</a>
        </nav>
      </aside>

      <section className="adminMain">
        <header className="adminHeader">
          <div><span className="eyebrow">Güzellik Merkezi</span><h1>Personel ve çalışma saatleri</h1><p>Her personelin çalışma günleri, saatleri ve molası ayrı belirlenir. Takvim sadece gerçekten boş saatleri gösterir.</p><p className="adminMode">{status}</p></div>
          <a className="pillButton navButtonLink" href="/admin/appointments">Randevulara Git</a>
        </header>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>{editingId ? "Personeli düzenle" : "Yeni personel ekle"}</h2><p>Çalışmadığı günler takvimde otomatik kapalı görünür.</p></div></div>
          <div className="formFields adminPropertyForm">
            <label className="field"><span>Ad Soyad</span><input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.currentTarget.value }))} placeholder="Elif Yılmaz" /></label>
            <label className="field"><span>Uzmanlık</span><input value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.currentTarget.value }))} placeholder="Cilt Bakım Uzmanı" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Kısa personel açıklaması" /></label>
            <div className="adminCheckboxGroup"><strong>Çalışma günleri</strong><div className="adminDayGrid">{DAYS.map((day) => <label key={day.value}><input checked={form.workDays.includes(day.value)} onChange={() => toggleDay(day.value)} type="checkbox" /><span>{day.label}</span></label>)}</div></div>
            <div className="adminTimeGrid">
              <label className="field"><span>Başlangıç</span><input type="time" value={form.startTime} onChange={(event) => setForm((current) => ({ ...current, startTime: event.currentTarget.value }))} /></label>
              <label className="field"><span>Bitiş</span><input type="time" value={form.endTime} onChange={(event) => setForm((current) => ({ ...current, endTime: event.currentTarget.value }))} /></label>
              <label className="field"><span>Mola başlangıcı</span><input type="time" value={form.breakStart} onChange={(event) => setForm((current) => ({ ...current, breakStart: event.currentTarget.value }))} /></label>
              <label className="field"><span>Mola bitişi</span><input type="time" value={form.breakEnd} onChange={(event) => setForm((current) => ({ ...current, breakEnd: event.currentTarget.value }))} /></label>
              <label className="field"><span>Saat aralığı (dk)</span><input min="15" step="15" type="number" value={form.slotMinutes} onChange={(event) => setForm((current) => ({ ...current, slotMinutes: Number(event.currentTarget.value) }))} /></label>
            </div>
            <div className="heroActions"><button className="pillButton" disabled={isSaving} onClick={saveStaff} type="button">{isSaving ? "Kaydediliyor..." : editingId ? "Güncelle" : "Personeli Ekle"}</button>{editingId ? <button className="ghostButton" onClick={resetForm} type="button">Vazgeç</button> : null}</div>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Personel listesi</h2><p>Pasif personel müşterinin randevu ekranında görünmez.</p></div></div>
          <div className="adminPropertyGrid">
            {staff.map((member) => <article className="adminProperty" key={member.id}><span>{member.isActive ? "Aktif" : "Pasif"}</span><h3>{member.name}</h3><strong>{member.role}</strong><p>{member.description}</p><p>{member.startTime}–{member.endTime}{member.breakStart && member.breakEnd ? ` • Mola ${member.breakStart}–${member.breakEnd}` : ""}</p><p>{DAYS.filter((day) => member.workDays.includes(day.value)).map((day) => day.label.slice(0, 3)).join(", ")}</p><div className="heroActions"><button className="ghostButton" onClick={() => startEdit(member)} type="button">Düzenle</button><button className="ghostButton" disabled={isSaving} onClick={() => toggleActive(member)} type="button">{member.isActive ? "Pasife Al" : "Aktif Et"}</button></div></article>)}
          </div>
          {!staff.length ? <div className="formPanel"><h3>Henüz personel yok</h3><p>Randevu takviminin çalışması için en az bir personel ekleyin.</p></div> : null}
        </section>
      </section>
    </main>
  );
}
