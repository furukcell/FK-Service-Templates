import { useEffect, useMemo, useState } from "react";
import {
  createSalonBlock,
  listenSalonAppointments,
  listAdminSalonStaff,
  updateSalonAppointmentStatus,
  type SalonAppointment,
  type SalonAppointmentStatus,
  type SalonStaff
} from "@fk-templates/firebase";
import { getDefaultTemplateRoute } from "../../src/defaultTemplate";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
const statusLabels: Record<SalonAppointmentStatus, string> = {
  pending: "Onay bekliyor",
  confirmed: "Onaylandı",
  cancelled: "İptal edildi",
  completed: "Tamamlandı",
  blocked: "Kapalı saat"
};

function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappUrl(appointment: SalonAppointment) {
  const phone = normalizePhone(appointment.customerPhone);
  const message = encodeURIComponent(`Merhaba ${appointment.customerName}, ${appointment.date} ${appointment.startTime} tarihli ${appointment.serviceName} randevunuz hakkında yazıyorum.`);
  return phone ? `https://wa.me/${phone}?text=${message}` : "#";
}

export default function AdminAppointmentsPage() {
  const guard = useOptionalAdminGuard();
  const [appointments, setAppointments] = useState<SalonAppointment[]>([]);
  const [staff, setStaff] = useState<SalonStaff[]>([]);
  const [selectedDate, setSelectedDate] = useState(localDateKey());
  const [statusFilter, setStatusFilter] = useState<"all" | SalonAppointmentStatus>("all");
  const [status, setStatus] = useState("Randevular yükleniyor.");
  const [isSaving, setIsSaving] = useState(false);
  const [blockForm, setBlockForm] = useState({ staffId: "", date: localDateKey(), startTime: "09:00", endTime: "10:00", note: "" });

  useEffect(() => {
    if (!guard.isAllowed) return undefined;
    listAdminSalonStaff(businessId).then((items) => {
      setStaff(items);
      setBlockForm((current) => ({ ...current, staffId: current.staffId || items[0]?.id || "" }));
    }).catch(() => setStatus("Personel listesi yüklenemedi."));

    try {
      return listenSalonAppointments((items) => {
        setAppointments(items);
        setStatus(items.length ? "Canlı randevu takibi aktif." : "Henüz randevu yok.");
      }, () => setStatus("Randevular canlı dinlenemedi."), businessId);
    } catch (error) {
      setStatus("Randevu bağlantısı kurulamadı.");
      return undefined;
    }
  }, [guard.isAllowed]);

  const filteredAppointments = useMemo(() => appointments
    .filter((item) => !selectedDate || item.date === selectedDate)
    .filter((item) => statusFilter === "all" || item.status === statusFilter)
    .sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`)), [appointments, selectedDate, statusFilter]);

  const summary = useMemo(() => ({
    pending: appointments.filter((item) => item.status === "pending").length,
    confirmed: appointments.filter((item) => item.status === "confirmed").length,
    today: appointments.filter((item) => item.date === localDateKey() && item.status !== "cancelled").length,
    total: appointments.filter((item) => item.status !== "cancelled" && item.status !== "blocked").length
  }), [appointments]);

  async function changeStatus(appointment: SalonAppointment, nextStatus: SalonAppointmentStatus) {
    setIsSaving(true);
    try {
      await updateSalonAppointmentStatus(appointment, nextStatus);
      setStatus(nextStatus === "cancelled" ? "Randevu iptal edildi ve saat tekrar açıldı." : "Randevu durumu güncellendi.");
    } catch (error) {
      setStatus("Randevu durumu güncellenemedi.");
    } finally {
      setIsSaving(false);
    }
  }

  async function createBlock() {
    const selectedStaff = staff.find((member) => member.id === blockForm.staffId);
    if (!selectedStaff || !blockForm.date || !blockForm.startTime || !blockForm.endTime) {
      setStatus("Personel, tarih ve saat aralığını seçin.");
      return;
    }
    if (blockForm.startTime >= blockForm.endTime) {
      setStatus("Bitiş saati başlangıç saatinden sonra olmalı.");
      return;
    }
    setIsSaving(true);
    try {
      await createSalonBlock({
        businessId,
        staffId: selectedStaff.id,
        staffName: selectedStaff.name,
        date: blockForm.date,
        startTime: blockForm.startTime,
        endTime: blockForm.endTime,
        note: blockForm.note,
        slotMinutes: selectedStaff.slotMinutes || 30
      });
      setStatus("Saat aralığı kapatıldı. Müşteriler bu zamanı seçemez.");
      setBlockForm((current) => ({ ...current, note: "" }));
    } catch (error) {
      setStatus(error instanceof Error && error.name === "slot-taken" ? "Bu aralıkta mevcut bir randevu veya kapalı saat var." : "Saat kapatılamadı.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  if (!guard.isAllowed) return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;

  return (
    <main className="adminShell salonAdminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>RT</span><strong>Randevular</strong></a>
        <nav>
          <a href="/admin">Genel Panel</a>
          <a className="active" href="/admin/appointments">Randevular</a>
          <a href="/admin/booking-services">Randevu Hizmetleri</a>
          <a href="/admin/staff">Personel & Saatler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href={getDefaultTemplateRoute()}>Siteye Dön</a>
        </nav>
      </aside>

      <section className="adminMain">
        <header className="adminHeader">
          <div><span className="eyebrow">Güzellik Merkezi</span><h1>Randevu takvimi</h1><p>Yeni randevuları onaylayın, tamamlayın veya iptal ederek saati yeniden açın.</p><p className="adminMode">{status}</p></div>
          <a className="pillButton navButtonLink" href={getDefaultTemplateRoute()}>Randevu Ekranını Aç</a>
        </header>

        <div className="adminStats">
          <article className="adminStat"><strong>{summary.today}</strong><span>bugünkü kayıt</span></article>
          <article className="adminStat"><strong>{summary.pending}</strong><span>onay bekliyor</span></article>
          <article className="adminStat"><strong>{summary.confirmed}</strong><span>onaylandı</span></article>
          <article className="adminStat"><strong>{summary.total}</strong><span>toplam randevu</span></article>
        </div>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Takvim filtresi</h2><p>Bir gün seçerek o tarihteki randevuları görüntüleyin.</p></div><button className="ghostButton" onClick={() => setSelectedDate("")} type="button">Tümünü Göster</button></div>
          <div className="adminTimeGrid">
            <label className="field"><span>Tarih</span><input type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.currentTarget.value)} /></label>
            <label className="field"><span>Durum</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.currentTarget.value as "all" | SalonAppointmentStatus)}><option value="all">Tüm durumlar</option>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Manuel saat kapatma</h2><p>İzin, mola, özel iş veya salon yoğunluğu için seçili personelin saatini kapatın.</p></div></div>
          <div className="adminTimeGrid">
            <label className="field"><span>Personel</span><select value={blockForm.staffId} onChange={(event) => setBlockForm((current) => ({ ...current, staffId: event.currentTarget.value }))}><option value="">Seçiniz</option>{staff.filter((member) => member.isActive).map((member) => <option value={member.id} key={member.id}>{member.name} • {member.role}</option>)}</select></label>
            <label className="field"><span>Tarih</span><input type="date" value={blockForm.date} onChange={(event) => setBlockForm((current) => ({ ...current, date: event.currentTarget.value }))} /></label>
            <label className="field"><span>Başlangıç</span><input type="time" value={blockForm.startTime} onChange={(event) => setBlockForm((current) => ({ ...current, startTime: event.currentTarget.value }))} /></label>
            <label className="field"><span>Bitiş</span><input type="time" value={blockForm.endTime} onChange={(event) => setBlockForm((current) => ({ ...current, endTime: event.currentTarget.value }))} /></label>
            <label className="field"><span>Not</span><input value={blockForm.note} onChange={(event) => setBlockForm((current) => ({ ...current, note: event.currentTarget.value }))} placeholder="İzin / öğle molası / özel iş" /></label>
          </div>
          <div className="heroActions"><button className="pillButton" disabled={isSaving} onClick={createBlock} type="button">{isSaving ? "Kaydediliyor..." : "Saat Aralığını Kapat"}</button></div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>{selectedDate ? `${selectedDate} randevuları` : "Tüm randevular"}</h2><p>{filteredAppointments.length} kayıt gösteriliyor.</p></div></div>
          <div className="adminRequestList">
            {filteredAppointments.map((appointment) => <article className={`adminRequestCard ${appointment.status === "pending" ? "newRequestCard" : ""}`} key={appointment.id}><div className="adminRequestTop"><span className="priceTag">{appointment.startTime}–{appointment.endTime}</span><mark>{statusLabels[appointment.status]}</mark></div><h3>{appointment.status === "blocked" ? "Kapalı Saat" : appointment.serviceName}</h3><p><strong>{appointment.staffName}</strong> • {appointment.date}</p>{appointment.status !== "blocked" ? <p>{appointment.customerName} • {appointment.customerPhone}</p> : null}{appointment.note ? <p>{appointment.note}</p> : null}<label className="field"><span>Durum</span><select disabled={isSaving} value={appointment.status} onChange={(event) => changeStatus(appointment, event.currentTarget.value as SalonAppointmentStatus)}>{Object.entries(statusLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>{appointment.customerPhone ? <div className="heroActions"><a className="pillButton navButtonLink" href={whatsappUrl(appointment)} target="_blank" rel="noreferrer">WhatsApp</a></div> : null}</article>)}
          </div>
          {!filteredAppointments.length ? <div className="formPanel"><h3>Bu filtrede kayıt yok</h3><p>Yeni randevular geldiğinde burada anlık görünecek.</p></div> : null}
        </section>
      </section>
    </main>
  );
}
