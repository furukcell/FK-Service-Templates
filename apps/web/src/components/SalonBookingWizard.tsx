import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
const STEP_LABELS = ["Hizmet", "Uzman", "Tarih", "Saat", "Bilgiler"];
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
  if (!value) return "Seçilmedi";
  return new Intl.DateTimeFormat("tr-TR", { weekday: "long", day: "numeric", month: "long" }).format(dateFromKey(value));
}

function fallbackDuration(title: string) {
  const lower = title.toLocaleLowerCase("tr-TR");
  if (lower.includes("nail") || lower.includes("tırnak")) return 90;
  if (lower.includes("cilt") || lower.includes("lazer")) return 60;
  return 45;
}

function fallbackServices(config: BusinessTemplateConfig): BusinessService[] {
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

function fallbackStaff(config: BusinessTemplateConfig): SalonStaff[] {
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

function demoSlots(month: string, staff: SalonStaff[]): BookingSlot[] {
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

function overlapsBreak(start: number, end: number, member: SalonStaff) {
  if (!member.breakStart || !member.breakEnd) return false;
  return start < timeToMinutes(member.breakEnd) && end > timeToMinutes(member.breakStart);
}

function worksOnDate(member: SalonStaff, date: string) {
  return member.workDays.includes(dateFromKey(date).getDay());
}

type TimeOption = { time: string; staff?: SalonStaff; available: boolean };

export function SalonBookingWizard({ config }: { config: BusinessTemplateConfig }) {
  const businessId = DEFAULT_BUSINESS_ID;
  const demoServices = useMemo(() => fallbackServices(config), [config]);
  const demoStaff = useMemo(() => fallbackStaff(config), [config]);
  const [services, setServices] = useState<BusinessService[]>(demoServices);
  const [staff, setStaff] = useState<SalonStaff[]>(demoStaff);
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState(demoServices[0]?.id || "");
  const [selectedStaffId, setSelectedStaffId] = useState("any");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [resolvedStaffId, setResolvedStaffId] = useState("");
  const [activeStep, setActiveStep] = useState(0);
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
      .catch(() => { if (mounted) setBookingSlots(isDemoMode() ? demoSlots(monthKey, staff) : []); });
    return () => { mounted = false; };
  }, [businessId, monthKey, staff]);

  const selectedService = services.find((item) => item.id === selectedServiceId) || services[0];
  const durationMinutes = selectedService?.durationMinutes || fallbackDuration(selectedService?.title || "");

  const serviceStaff = useMemo(() => staff.filter((member) => {
    if (!selectedService || member.isActive === false) return false;
    const serviceAllows = !selectedService.staffIds?.length || selectedService.staffIds.includes(member.id);
    const staffAllows = !member.serviceIds?.length || member.serviceIds.includes(selectedService.id);
    return serviceAllows && staffAllows;
  }), [selectedService, staff]);

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
    if (!worksOnDate(member, date)) return [];
    const slotMinutes = member.slotMinutes || 30;
    const open = timeToMinutes(member.startTime || "09:00");
    const close = timeToMinutes(member.endTime || "18:00");
    const occupied = occupiedTimes(member.id, date);
    const starts: string[] = [];
    const now = new Date();

    for (let cursor = open; cursor + durationMinutes <= close; cursor += slotMinutes) {
      const end = cursor + durationMinutes;
      if (overlapsBreak(cursor, end, member)) continue;
      const required: string[] = [];
      for (let slotCursor = cursor; slotCursor < end; slotCursor += slotMinutes) required.push(minutesToTime(slotCursor));
      if (required.some((time) => occupied.has(time))) continue;
      if (date === todayKey()) {
        const dateTime = dateFromKey(date);
        dateTime.setHours(Math.floor(cursor / 60), cursor % 60, 0, 0);
        if (dateTime.getTime() <= now.getTime() + 30 * 60 * 1000) continue;
      }
      starts.push(minutesToTime(cursor));
    }
    return starts;
  }

  function candidateStaff() {
    return selectedStaffId === "any" ? serviceStaff : serviceStaff.filter((member) => member.id === selectedStaffId);
  }

  function timeOptions(date: string): TimeOption[] {
    if (!date) return [];
    const candidates = candidateStaff();
    const allTimes = new Set<string>();
    candidates.forEach((member) => {
      if (!worksOnDate(member, date)) return;
      const slotMinutes = member.slotMinutes || 30;
      const open = timeToMinutes(member.startTime || "09:00");
      const close = timeToMinutes(member.endTime || "18:00");
      for (let cursor = open; cursor + durationMinutes <= close; cursor += slotMinutes) allTimes.add(minutesToTime(cursor));
    });
    return Array.from(allTimes).sort().map((time) => {
      const availableMember = candidates.find((member) => availableStarts(member, date).includes(time));
      return { time, staff: availableMember, available: Boolean(availableMember) };
    });
  }

  const selectedDateOptions = useMemo(() => timeOptions(selectedDate), [selectedDate, selectedStaffId, selectedServiceId, serviceStaff, bookingSlots]);
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    return [...Array.from({ length: offset }, () => null), ...Array.from({ length: days }, (_, index) => formatDateKey(year, month, index + 1))];
  }, [currentMonth]);

  function dayState(date: string) {
    if (date < todayKey()) return "past";
    const options = timeOptions(date);
    if (!options.length) return "closed";
    if (!options.some((option) => option.available)) return "full";
    return "available";
  }

  function chooseDate(date: string) {
    if (dayState(date) !== "available") return;
    setSelectedDate(date);
    setSelectedTime("");
    setResolvedStaffId("");
    setStatus("");
  }

  function chooseTime(option: TimeOption) {
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

  const chosenStaff = staff.find((member) => member.id === (resolvedStaffId || selectedStaffId));
  const canContinue = activeStep === 0
    ? Boolean(selectedService)
    : activeStep === 1
      ? serviceStaff.length > 0
      : activeStep === 2
        ? Boolean(selectedDate)
        : activeStep === 3
          ? Boolean(selectedTime)
          : true;

  function nextStep() {
    if (!canContinue) {
      setStatus(activeStep === 2 ? "Takvimden uygun bir tarih seçin." : activeStep === 3 ? "Boş bir saat seçin." : "Bu adımı tamamlayın.");
      return;
    }
    setStatus("");
    setActiveStep((current) => Math.min(STEP_LABELS.length - 1, current + 1));
  }

  async function submitAppointment() {
    if (!selectedService || !chosenStaff || !selectedDate || !selectedTime) {
      setStatus("Randevu seçimlerini tamamlayın.");
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
        setBookingSlots(await listSalonBookingSlotsForMonth(businessId, monthKey));
      }
      setStatus(isDemoMode() ? "Demo randevu tamamlandı. Canlı kullanımda saat anında kapanır ve kayıt panele düşer." : "Randevunuz oluşturuldu. İşletme onay için sizinle iletişime geçecek.");
      setCustomerName("");
      setCustomerPhone("");
      setNote("");
      setAcceptedLegal(false);
    } catch (error) {
      setStatus(error instanceof Error && error.name === "slot-taken" ? error.message : "Randevu oluşturulamadı. Başka bir saat seçip tekrar deneyin.");
      try {
        setBookingSlots(await listSalonBookingSlotsForMonth(businessId, monthKey));
      } catch {
        // Mevcut takvim korunur.
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const themeStyle = {
    "--primary": config.theme.primary,
    "--secondary": config.theme.secondary,
    "--accent": config.theme.accent,
    "--soft": config.theme.soft,
    "--dark": config.theme.dark,
    "--wizard-progress": `${((activeStep + 1) / STEP_LABELS.length) * 100}%`
  } as CSSProperties;

  return (
    <section className="section salonWizardSection" id="request-form" style={themeStyle}>
      <div className="salonWizardIntro">
        <span className="eyebrow">Online Randevu</span>
        <h2>Randevunu birkaç adımda oluştur</h2>
        <p>Hizmeti seç, uygun uzman ve saati belirle. Dolu günler ile saatler otomatik olarak kapalı görünür.</p>
      </div>

      <div className="salonWizardProgress" aria-label={`Randevu adımı ${activeStep + 1} / ${STEP_LABELS.length}`}>
        <div className="salonWizardProgressBar"><span /></div>
        <div className="salonWizardStepLabels">
          {STEP_LABELS.map((label, index) => <button className={index === activeStep ? "active" : index < activeStep ? "complete" : ""} type="button" key={label} onClick={() => { if (index <= activeStep) setActiveStep(index); }}><i>{index < activeStep ? "✓" : index + 1}</i><span>{label}</span></button>)}
        </div>
      </div>

      <div className="salonWizardLayout">
        <aside className="salonWizardSummary">
          <span className="salonWizardSummaryLabel">Randevu Özeti</span>
          <h3>{selectedService?.title || "Hizmet seçilmedi"}</h3>
          <div><span>Uzman</span><strong>{chosenStaff?.name || (selectedStaffId === "any" ? "Fark etmez" : "Seçilmedi")}</strong></div>
          <div><span>Tarih</span><strong>{displayDate(selectedDate)}</strong></div>
          <div><span>Saat</span><strong>{selectedTime || "Seçilmedi"}</strong></div>
          <div><span>Süre</span><strong>{durationMinutes} dakika</strong></div>
          <div><span>Fiyat</span><strong>{selectedService?.price || "Bilgi al"}</strong></div>
          <small>Dolu bir saat, randevu kaydı oluştuğu anda başka müşterilere kapanır.</small>
        </aside>

        <div className="salonWizardStage">
          <div className="salonWizardStageHead"><span>Adım {activeStep + 1} / {STEP_LABELS.length}</span><strong>{STEP_LABELS[activeStep]}</strong></div>

          {activeStep === 0 ? <div className="salonWizardPanel"><div className="salonWizardPanelTitle"><h3>Hangi hizmeti almak istiyorsunuz?</h3><p>İşlem süresine göre takvimdeki boşluklar otomatik hesaplanır.</p></div><div className="wizardServiceGrid">{services.map((service) => <button className={`wizardChoiceCard ${selectedService?.id === service.id ? "active" : ""}`} type="button" key={service.id} onClick={() => setSelectedServiceId(service.id)}><span className="wizardChoiceIcon">✦</span><strong>{service.title}</strong><p>{service.description}</p><small>{service.price || "Fiyat bilgisi"} • {service.durationMinutes || fallbackDuration(service.title)} dk</small></button>)}</div></div> : null}

          {activeStep === 1 ? <div className="salonWizardPanel"><div className="salonWizardPanelTitle"><h3>Kimden hizmet almak istersiniz?</h3><p>Fark etmez seçeneğinde sistem seçtiğiniz saatte müsait olan uzmanı atar.</p></div><div className="wizardStaffGrid"><button className={`wizardStaffCard ${selectedStaffId === "any" ? "active" : ""}`} type="button" onClick={() => { setSelectedStaffId("any"); setSelectedDate(""); setSelectedTime(""); }}><span>∞</span><strong>Fark etmez</strong><small>İlk uygun uzman</small></button>{serviceStaff.map((member) => <button className={`wizardStaffCard ${selectedStaffId === member.id ? "active" : ""}`} type="button" key={member.id} onClick={() => { setSelectedStaffId(member.id); setSelectedDate(""); setSelectedTime(""); }}><span>{member.name.slice(0, 1).toUpperCase()}</span><strong>{member.name}</strong><small>{member.role}</small></button>)}</div></div> : null}

          {activeStep === 2 ? <div className="salonWizardPanel"><div className="wizardCalendarTop"><div className="salonWizardPanelTitle"><h3>Uygun tarihi seçin</h3><p>Yeşil günlerde boş saat bulunur. Kırmızı günler tamamen doludur.</p></div><div className="bookingMonthNav"><button type="button" onClick={() => changeMonth(-1)}>‹</button><strong>{MONTH_LABELS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</strong><button type="button" onClick={() => changeMonth(1)}>›</button></div></div><div className="bookingCalendar wizardCalendar">{DAY_LABELS.map((label) => <span className="bookingDayLabel" key={label}>{label}</span>)}{calendarDays.map((date, index) => date ? <button type="button" key={date} className={`bookingDay ${dayState(date)} ${selectedDate === date ? "selected" : ""}`} disabled={dayState(date) !== "available"} onClick={() => chooseDate(date)}><strong>{Number(date.slice(-2))}</strong><small>{dayState(date) === "full" ? "Dolu" : dayState(date) === "closed" ? "Kapalı" : dayState(date) === "past" ? "Geçti" : "Uygun"}</small></button> : <span className="bookingDay empty" key={`empty-${index}`} />)}</div><div className="bookingLegend"><span><i className="available" /> Uygun</span><span><i className="full" /> Dolu</span><span><i className="closed" /> Kapalı</span></div></div> : null}

          {activeStep === 3 ? <div className="salonWizardPanel"><div className="salonWizardPanelTitle"><h3>{selectedDate ? `${displayDate(selectedDate)} için saat seçin` : "Önce tarih seçin"}</h3><p>Dolu saatler işaretli görünür ve seçilemez.</p></div><div className="bookingTimeGrid wizardTimeGrid">{selectedDateOptions.map((option) => <button className={`bookingTime ${option.available ? "available" : "busy"} ${selectedTime === option.time ? "selected" : ""}`} type="button" disabled={!option.available} key={option.time} onClick={() => chooseTime(option)}><strong>{option.time}</strong><small>{option.available ? option.staff?.name : "Dolu"}</small></button>)}</div>{!selectedDateOptions.length ? <p className="bookingEmptyText">Bu tarih için çalışma saati bulunmuyor.</p> : null}</div> : null}

          {activeStep === 4 ? <div className="salonWizardPanel"><div className="salonWizardPanelTitle"><h3>Son olarak iletişim bilgilerinizi girin</h3><p>İşletme randevu onayı için telefon veya WhatsApp üzerinden dönüş yapar.</p></div><div className="bookingCustomerGrid"><label className="field"><span>Ad Soyad</span><input value={customerName} onChange={(event) => setCustomerName(event.currentTarget.value)} placeholder="Adınız soyadınız" /></label><label className="field"><span>Telefon</span><input value={customerPhone} onChange={(event) => setCustomerPhone(event.currentTarget.value)} placeholder="05xx xxx xx xx" type="tel" /></label><label className="field bookingNote"><span>Not</span><textarea value={note} onChange={(event) => setNote(event.currentTarget.value)} placeholder="İşlemle ilgili notunuz" /></label></div><label className="kvkkConsent"><input checked={acceptedLegal} onChange={(event) => setAcceptedLegal(event.currentTarget.checked)} type="checkbox" /><span><a href="/kvkk-aydinlatma-metni" target="_blank">KVKK Aydınlatma Metni</a> ve <a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a> kapsamında bilgilendirmeyi okudum.</span></label></div> : null}

          <div className="salonWizardActions">
            <button className="ghostButton" type="button" disabled={activeStep === 0 || isSubmitting} onClick={() => { setStatus(""); setActiveStep((current) => Math.max(0, current - 1)); }}>Geri</button>
            {activeStep < STEP_LABELS.length - 1 ? <button className="pillButton" type="button" disabled={!canContinue} onClick={nextStep}>Devam Et</button> : <button className="pillButton" type="button" disabled={isSubmitting} onClick={submitAppointment}>{isSubmitting ? "Randevu oluşturuluyor..." : "Randevuyu Oluştur"}</button>}
          </div>
          {status ? <p className="formStatus bookingStatus salonWizardStatus">{status}</p> : null}
        </div>
      </div>
    </section>
  );
}
