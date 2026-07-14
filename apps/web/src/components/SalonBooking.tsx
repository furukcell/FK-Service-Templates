import { useEffect, useMemo, useState } from "react";
import {
  createSalonAppointment,
  listBusinessServices,
  listSalonBookingSlotsForMonth,
  listSalonStaff,
  type BookingSlot,
  type BusinessService,
  type SalonStaff
} from "@fk-templates/firebase";
import type { BusinessTemplateConfig } from "@fk-templates/shared";
import { isDemoMode } from "../runtimeMode";

const DAY_LABELS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTH_LABELS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const DEFAULT_BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function minutesToTime(value: number) {
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function dateFromKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, (month || 1) - 1, day || 1);
}

function todayKey() {
  const now = new Date();
  return formatDateKey(now.getFullYear(), now.getMonth(), now.getDate());
}

function displayDate(value: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" }).format(dateFromKey(value));
}

function fallbackDuration(title: string) {
  const lower = title.toLocaleLowerCase("tr-TR");
  if (lower.includes("nail") || lower.includes("tırnak")) return 90;
  if (lower.includes("cilt") || lower.includes("lazer")) return 60;
  return 45;
}

function buildFallbackServices(config: BusinessTemplateConfig): BusinessService[] {
  return config.services.map((service, index) => ({
    id: `demo-service-${index}`,
    template: "salon",
    businessId: DEFAULT_BUSINESS_ID,
    title: service.title,
    description: service.description,
    price: service.price,
    durationMinutes: fallbackDuration(service.title),
    staffIds: [],
    isActive: true
  }));
}

function buildFallbackStaff(config: BusinessTemplateConfig): SalonStaff[] {
  return config.staff.map((member, index) => ({
    id: `demo-staff-${index}`,
    businessId: DEFAULT_BUSINESS_ID,
    name: member.name,
    role: member.role,
    description: member.description,
    serviceIds: [],
    workDays: [1, 2, 3, 4, 5, 6],
    startTime: "09:00",
    endTime: "19:00",
    breakStart: "13:00",
    breakEnd: "14:00",
    slotMinutes: 30,
    isActive: true
  }));
}

function buildDemoSlots(month: string, staff: SalonStaff[]): BookingSlot[] {
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const slots: BookingSlot[] = [];
  staff.forEach((member, staffIndex) => {
    [2, 4, 7, 11, 15, 19, 23].forEach((seed, index) => {
      const day = Math.min(daysInMonth, seed + staffIndex);
      const date = `${month}-${String(day).padStart(2, "0")}`;
      const time = index % 2 === 0 ? "10:00" : "14:30";
      slots.push({
        id: `demo-${member.id}-${date}-${time}`,
        businessId: DEFAULT_BUSINESS_ID,
        dayKey: `${DEFAULT_BUSINESS_ID}_${date}`,
        monthKey: `${DEFAULT_BUSINESS_ID}_${month}`,
        staffId: member.id,
        date,
        time,
        appointmentId: `demo-appointment-${index}`,
        active: true
      });
    });
  });
  return slots;
}

function overlapsBreak(start: number, end: number, staff: SalonStaff) {
  if (!staff.breakStart || !staff.breakEnd) return false;
  const breakStart = timeToMinutes(staff.breakStart);
  const breakEnd = timeToMinutes(staff.breakEnd);
  return start < breakEnd && end > breakStart;
}

function staffWorksOnDate(staff: SalonStaff, date: string) {
  const day = dateFromKey(date).getDay();
  return staff.workDays.includes(day);
}

type TimeOption = {
  time: string;
  staff?: SalonStaff;
  available: boolean;
};

export function SalonBooking({ config }: { config: BusinessTemplateConfig }) {
  const businessId = DEFAULT_BUSINESS_ID;
  const fallbackServices = useMemo(() => buildFallbackServices(config), [config]);
  const fallbackStaff = useMemo(() => buildFallbackStaff(config), [config]);
  const [services, setServices] = useState<BusinessService[]>(fallbackServices);
  const [staff, setStaff] = useState<SalonStaff[]>(fallbackStaff);
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState(fallbackServices[0]?.id || "");
  const [selectedStaffId, setSelectedStaffId] = useState("any");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [resolvedStaffId, setResolvedStaffId] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [note, setNote] = useState("");
  const [acceptedLegal, setAcceptedLegal] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    Promise.all([listBusinessServices("salon"), listSalonStaff(businessId)])
      .then(([liveServices, liveStaff]) => {
        if (!mounted) return;
        if (liveServices.length) {
          setServices(liveServices);
          setSelectedServiceId((current) => liveServices.some((item) => item.id === current) ? current : liveServices[0].id);
        }
        if (liveStaff.length) setStaff(liveStaff);
      })
      .catch(() => undefined);
    return () => { mounted = false; };
  }, [businessId]);

  const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  useEffect(() => {
    let mounted = true;
    listSalonBookingSlotsForMonth(businessId, monthKey)
      .then((items) => { if (mounted) setBookingSlots(items); })
      .catch(() => { if (mounted) setBookingSlots(isDemoMode() ? buildDemoSlots(monthKey, staff) : []); });
    return () => { mounted = false; };
  }, [businessId, monthKey, staff]);

  const selectedService = services.find((item) => item.id === selectedServiceId) || services[0];
  const durationMinutes = selectedService?.durationMinutes || fallbackDuration(selectedService?.title || "");

  const serviceStaff = useMemo(() => {
    if (!selectedService) return [];
    return staff.filter((member) => {
      if (member.isActive === false) return false;
      const serviceAllows = !selectedService.staffIds?.length || selectedService.staffIds.includes(member.id);
      const staffAllows = !member.serviceIds?.length || member.serviceIds.includes(selectedService.id);
      return serviceAllows && staffAllows;
    });
  }, [selectedService, staff]);

  useEffect(() => {
    if (selectedStaffId !== "any" && !serviceStaff.some((member) => member.id === selectedStaffId)) setSelectedStaffId("any");
    setSelectedDate("");
    setSelectedTime("");
    setResolvedStaffId("");
  }, [selectedServiceId]);

  function occupiedTimes(memberId: string, date: string) {
    return new Set(bookingSlots.filter((slot) => slot.staffId === memberId && slot.date === date && slot.active !== false).map((slot) => slot.time));
  }

  function availableStarts(member: SalonStaff, date: string) {
    if (!staffWorksOnDate(member, date)) return [];
    const slotMinutes = member.slotMinutes || 30;
    const open = timeToMinutes(member.startTime || "09:00");
    const close = timeToMinutes(member.endTime || "18:00");
    const occupied = occupiedTimes(member.id, date);
    const starts: string[] = [];
    const now = new Date();

    for (let cursor = open; cursor + durationMinutes <= close; cursor += slotMinutes) {
      const end = cursor + durationMinutes;
      if (overlapsBreak(cursor, end, member)) continue;
      const requiredSlots: string[] = [];
      for (let slotCursor = cursor; slotCursor < end; slotCursor += slotMinutes) requiredSlots.push(minutesToTime(slotCursor));
      if (requiredSlots.some((time) => occupied.has(time))) continue;
      const time = minutesToTime(cursor);
      if (date === todayKey()) {
        const selectedDateTime = dateFromKey(date);
        selectedDateTime.setHours(Math.floor(cursor / 60), cursor % 60, 0, 0);
        if (selectedDateTime.getTime() <= now.getTime() + 30 * 60 * 1000) continue;
      }
      starts.push(time);
    }
    return starts;
  }

  function candidateStaff() {
    if (selectedStaffId === "any") return serviceStaff;
    return serviceStaff.filter((member) => member.id === selectedStaffId);
  }

  function timeOptionsForDate(date: string): TimeOption[] {
    if (!date) return [];
    const candidates = candidateStaff();
    const allScheduleTimes = new Set<string>();
    candidates.forEach((member) => {
      if (!staffWorksOnDate(member, date)) return;
      const slotMinutes = member.slotMinutes || 30;
      const open = timeToMinutes(member.startTime || "09:00");
      const close = timeToMinutes(member.endTime || "18:00");
      for (let cursor = open; cursor + durationMinutes <= close; cursor += slotMinutes) allScheduleTimes.add(minutesToTime(cursor));
    });

    return Array.from(allScheduleTimes).sort().map((time) => {
      const availableMember = candidates.find((member) => availableStarts(member, date).includes(time));
      return { time, staff: availableMember, available: Boolean(availableMember) };
    });
  }

  const selectedDateOptions = useMemo(() => timeOptionsForDate(selectedDate), [selectedDate, selectedStaffId, selectedServiceId, serviceStaff, bookingSlots]);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const mondayOffset = firstDay === 0 ? 6 : firstDay - 1;
    return [
      ...Array.from({ length: mondayOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => formatDateKey(year, month, index + 1))
    ];
  }, [currentMonth]);

  function dayState(date: string) {
    if (date < todayKey()) return "past";
    const options = timeOptionsForDate(date);
    if (!options.length) return "closed";
    if (!options.some((option) => option.available)) return "full";
    return "available";
  }

  function selectDate(date: string) {
    const state = dayState(date);
    if (state !== "available") return;
    setSelectedDate(date);
    setSelectedTime("");
    setResolvedStaffId("");
    setStatus("");
  }

  function selectTime(option: TimeOption) {
    if (!option.available || !option.staff) return;
    setSelectedTime(option.time);
    setResolvedStaffId(option.staff.id);
    setStatus("");
  }

  function changeMonth(direction: number) {
    setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1));
    setSelectedDate("");
    setSelectedTime("");
  }

  async function submitAppointment() {
    const chosenStaff = staff.find((member) => member.id === (resolvedStaffId || selectedStaffId));
    if (!selectedService || !chosenStaff || !selectedDate || !selectedTime) {
      setStatus("Hizmet, personel, tarih ve saat seçimini tamamlayın.");
      return;
    }
    if (!customerName.trim() || !customerPhone.trim()) {
      setStatus("Ad soyad ve telefon zorunludur.");
      return;
    }
    if (!acceptedLegal) {
      setStatus("Devam etmek için KVKK ve gizlilik bilgilendirmesini onaylayın.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    try {
      if (!isDemoMode()) {
        await createSalonAppointment({
          businessId,
          serviceId: selectedService.id,
          serviceName: selectedService.title,
          staffId: chosenStaff.id,
          staffName: chosenStaff.name,
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          date: selectedDate,
          startTime: selectedTime,
          durationMinutes,
          note: note.trim(),
          slotMinutes: chosenStaff.slotMinutes || 30
        });
        const updatedSlots = await listSalonBookingSlotsForMonth(businessId, monthKey);
        setBookingSlots(updatedSlots);
      }
      setStatus(isDemoMode() ? "Demo randevu oluşturuldu. Canlı teslimde bu kayıt yönetim paneline düşer ve saat otomatik kapanır." : "Randevunuz oluşturuldu. İşletme onay için sizinle iletişime geçecek.");
      setSelectedTime("");
      setResolvedStaffId("");
      setCustomerName("");
      setCustomerPhone("");
      setNote("");
      setAcceptedLegal(false);
    } catch (error) {
      setStatus(error instanceof Error && error.name === "slot-taken" ? error.message : "Randevu oluşturulamadı. Lütfen başka bir saat seçip tekrar deneyin.");
      try {
        setBookingSlots(await listSalonBookingSlotsForMonth(businessId, monthKey));
      } catch (refreshError) {
        // Bağlantı yoksa mevcut takvim korunur.
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section salonBookingSection" id="request-form" style={{ "--primary": config.theme.primary, "--secondary": config.theme.secondary, "--soft": config.theme.soft, "--dark": config.theme.dark } as React.CSSProperties}>
      <div className="sectionHead salonBookingHead">
        <span className="eyebrow">Online Randevu</span>
        <h2>Hizmetini, uzmanını ve boş saatini seç</h2>
        <p>Dolu gün ve saatler otomatik kapanır. Seçtiğiniz zaman randevu gönderildiği anda başka müşterilere kapatılır.</p>
      </div>

      <div className="salonBookingLayout">
        <div className="salonBookingSteps">
          <article className="salonBookingCard">
            <span className="bookingStepNumber">1</span>
            <div><h3>Hizmet seçin</h3><p>İşlem süresine göre uygun saatler otomatik hesaplanır.</p></div>
            <div className="bookingChoiceGrid">
              {services.map((service) => (
                <button className={`bookingChoice ${selectedService?.id === service.id ? "active" : ""}`} type="button" key={service.id} onClick={() => setSelectedServiceId(service.id)}>
                  <strong>{service.title}</strong>
                  <span>{service.price || "Fiyat bilgisi"} • {service.durationMinutes || fallbackDuration(service.title)} dk</span>
                </button>
              ))}
            </div>
          </article>

          <article className="salonBookingCard">
            <span className="bookingStepNumber">2</span>
            <div><h3>Uzman seçin</h3><p>“Fark etmez” seçeneğinde sistem o saatte boş olan uzmanı atar.</p></div>
            <div className="bookingChoiceGrid bookingStaffGrid">
              <button className={`bookingChoice ${selectedStaffId === "any" ? "active" : ""}`} type="button" onClick={() => { setSelectedStaffId("any"); setSelectedDate(""); setSelectedTime(""); }}><strong>Fark etmez</strong><span>En erken uygun uzman</span></button>
              {serviceStaff.map((member) => (
                <button className={`bookingChoice ${selectedStaffId === member.id ? "active" : ""}`} type="button" key={member.id} onClick={() => { setSelectedStaffId(member.id); setSelectedDate(""); setSelectedTime(""); }}>
                  <strong>{member.name}</strong><span>{member.role}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="salonBookingCard">
            <span className="bookingStepNumber">3</span>
            <div className="bookingCalendarHeader">
              <div><h3>Tarih seçin</h3><p>Yeşil günlerde boş saat var, kırmızı günler dolu.</p></div>
              <div className="bookingMonthNav"><button type="button" onClick={() => changeMonth(-1)} aria-label="Önceki ay">‹</button><strong>{MONTH_LABELS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</strong><button type="button" onClick={() => changeMonth(1)} aria-label="Sonraki ay">›</button></div>
            </div>
            <div className="bookingCalendar">
              {DAY_LABELS.map((label) => <span className="bookingDayLabel" key={label}>{label}</span>)}
              {calendarDays.map((date, index) => date ? (
                <button type="button" key={date} className={`bookingDay ${dayState(date)} ${selectedDate === date ? "selected" : ""}`} disabled={dayState(date) !== "available"} onClick={() => selectDate(date)}>
                  <strong>{Number(date.slice(-2))}</strong><small>{dayState(date) === "full" ? "Dolu" : dayState(date) === "closed" ? "Kapalı" : dayState(date) === "past" ? "Geçti" : "Uygun"}</small>
                </button>
              ) : <span className="bookingDay empty" key={`empty-${index}`} />)}
            </div>
            <div className="bookingLegend"><span><i className="available" /> Uygun</span><span><i className="full" /> Dolu</span><span><i className="closed" /> Kapalı</span></div>
          </article>

          <article className="salonBookingCard">
            <span className="bookingStepNumber">4</span>
            <div><h3>Saat seçin</h3><p>{selectedDate ? displayDate(selectedDate) : "Önce takvimden uygun bir gün seçin."}</p></div>
            {selectedDate ? <div className="bookingTimeGrid">{selectedDateOptions.length ? selectedDateOptions.map((option) => (
              <button className={`bookingTime ${option.available ? "available" : "busy"} ${selectedTime === option.time ? "selected" : ""}`} type="button" disabled={!option.available} key={option.time} onClick={() => selectTime(option)}>
                <strong>{option.time}</strong><small>{option.available ? option.staff?.name : "Dolu"}</small>
              </button>
            )) : <p className="bookingEmptyText">Bu gün için çalışma saati bulunmuyor.</p>}</div> : null}
          </article>

          <article className="salonBookingCard">
            <span className="bookingStepNumber">5</span>
            <div><h3>Bilgilerinizi girin</h3><p>Salon onay için telefon veya WhatsApp üzerinden dönüş yapar.</p></div>
            <div className="bookingCustomerGrid">
              <label className="field"><span>Ad Soyad</span><input value={customerName} onChange={(event) => setCustomerName(event.currentTarget.value)} placeholder="Adınız soyadınız" /></label>
              <label className="field"><span>Telefon</span><input value={customerPhone} onChange={(event) => setCustomerPhone(event.currentTarget.value)} placeholder="05xx xxx xx xx" type="tel" /></label>
              <label className="field bookingNote"><span>Not</span><textarea value={note} onChange={(event) => setNote(event.currentTarget.value)} placeholder="İşlemle ilgili notunuz" /></label>
            </div>
            <label className="kvkkConsent"><input checked={acceptedLegal} onChange={(event) => setAcceptedLegal(event.currentTarget.checked)} type="checkbox" /><span><a href="/kvkk-aydinlatma-metni" target="_blank">KVKK Aydınlatma Metni</a> ve <a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a> kapsamında bilgilendirmeyi okudum.</span></label>
            <div className="bookingSummary">
              <div><span>Hizmet</span><strong>{selectedService?.title || "-"}</strong></div>
              <div><span>Uzman</span><strong>{staff.find((member) => member.id === (resolvedStaffId || selectedStaffId))?.name || (selectedStaffId === "any" ? "Fark etmez" : "-")}</strong></div>
              <div><span>Tarih / Saat</span><strong>{selectedDate && selectedTime ? `${displayDate(selectedDate)} • ${selectedTime}` : "-"}</strong></div>
            </div>
            <button className="pillButton bookingSubmit" disabled={isSubmitting} onClick={submitAppointment} type="button">{isSubmitting ? "Randevu oluşturuluyor..." : "Randevuyu Oluştur"}</button>
            {status ? <p className="formStatus bookingStatus">{status}</p> : null}
          </article>
        </div>
      </div>
    </section>
  );
}
