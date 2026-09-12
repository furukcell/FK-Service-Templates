import { useEffect, useState } from "react";

type FormState = {
  subject: string;
  parentName: string;
  childName: string;
  birthDate: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  note: string;
};

const initialForm: FormState = {
  subject: "child-registration",
  parentName: "",
  childName: "",
  birthDate: "",
  phone: "",
  email: "",
  appointmentDate: "",
  appointmentTime: "",
  note: "",
};

const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

export function KindergartenAppointmentModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const appointmentLink = target?.closest<HTMLAnchorElement>(".bcNavLink[href='#contact']");
      if (!appointmentLink || appointmentLink.textContent?.trim() !== "Randevu Al") return;
      event.preventDefault();
      setSubmitted(false);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));

  if (!open) return null;

  return (
    <div className="bcAppointmentOverlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <style>{`
        .bcAppointmentOverlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,31,58,.58);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);animation:bcApFade .2s ease-out}
        .bcAppointmentModal{width:min(760px,100%);max-height:min(900px,calc(100vh - 40px));overflow:auto;background:linear-gradient(145deg,#fff 0%,#f8fcff 100%);border:1px solid rgba(25,118,210,.13);border-radius:24px;box-shadow:0 28px 80px rgba(3,37,76,.30);animation:bcApIn .25s cubic-bezier(.2,.8,.2,1);font-family:'Nunito',system-ui,sans-serif;color:#17243a}
        .bcAppointmentHead{position:relative;padding:26px 30px 18px;border-bottom:1px solid #e8f0f8;background:linear-gradient(135deg,#f4faff,#fff)}
        .bcAppointmentIcon{width:48px;height:48px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;font-size:24px;box-shadow:0 10px 22px rgba(25,118,210,.22);margin-bottom:12px}
        .bcAppointmentHead h2{margin:0;color:#0d47a1;font:900 27px/1.1 'Baloo 2',sans-serif}.bcAppointmentHead p{margin:7px 42px 0 0;color:#6b7d91;font-size:12px;line-height:1.55}
        .bcAppointmentClose{position:absolute;right:20px;top:20px;width:38px;height:38px;border:0;border-radius:50%;background:#edf6ff;color:#376184;font-size:24px;line-height:1;cursor:pointer;transition:.18s}.bcAppointmentClose:hover{background:#dceeff;color:#1976d2;transform:rotate(5deg)}
        .bcAppointmentForm{padding:24px 30px 26px}.bcAppointmentGrid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.bcAppointmentField{display:flex;flex-direction:column;gap:7px}.bcAppointmentField.full{grid-column:1/-1}.bcAppointmentField label{font-size:11px;font-weight:900;color:#334e68}.bcAppointmentField label span{color:#1976d2}
        .bcAppointmentField input,.bcAppointmentField select,.bcAppointmentField textarea{width:100%;box-sizing:border-box;border:1px solid #d9e7f3;border-radius:12px;background:#fff;color:#20354d;padding:12px 13px;outline:0;font:700 12px 'Nunito',sans-serif;transition:border-color .18s,box-shadow .18s,background .18s}.bcAppointmentField input::placeholder,.bcAppointmentField textarea::placeholder{color:#9aaabd}.bcAppointmentField textarea{min-height:86px;resize:vertical}.bcAppointmentField input:focus,.bcAppointmentField select:focus,.bcAppointmentField textarea:focus{border-color:#42a5f5;box-shadow:0 0 0 4px rgba(66,165,245,.12);background:#fbfdff}
        .bcAppointmentSubject{grid-column:1/-1}.bcAppointmentSubject select{font-weight:900;color:#0d58ad;background:#f4faff}
        .bcAppointmentActions{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:21px}.bcAppointmentTrust{color:#7a8b9d;font-size:9px;line-height:1.45;max-width:310px}.bcAppointmentTrust b{color:#1976d2}.bcAppointmentSubmit{border:0;border-radius:14px;padding:14px 22px;background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;font:900 12px 'Nunito',sans-serif;cursor:pointer;box-shadow:0 10px 24px rgba(25,118,210,.24);transition:.18s;white-space:nowrap}.bcAppointmentSubmit:hover{transform:translateY(-1px);box-shadow:0 13px 28px rgba(25,118,210,.30)}
        .bcAppointmentSuccess{padding:48px 30px 54px;text-align:center}.bcAppointmentSuccessIcon{width:72px;height:72px;margin:0 auto 17px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;font-size:35px;box-shadow:0 14px 30px rgba(25,118,210,.25)}.bcAppointmentSuccess h3{margin:0;color:#0d47a1;font:900 27px/1.1 'Baloo 2',sans-serif}.bcAppointmentSuccess p{margin:10px auto 24px;max-width:450px;color:#687b90;font-size:12px;line-height:1.6}.bcAppointmentSuccess button{border:0;border-radius:13px;padding:12px 23px;background:#edf6ff;color:#1976d2;font:900 11px 'Nunito',sans-serif;cursor:pointer}
        @keyframes bcApFade{from{opacity:0}to{opacity:1}}@keyframes bcApIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @media(max-width:620px){.bcAppointmentOverlay{padding:10px}.bcAppointmentModal{max-height:calc(100vh - 20px);border-radius:20px}.bcAppointmentHead{padding:21px 20px 16px}.bcAppointmentHead h2{font-size:24px}.bcAppointmentHead p{font-size:11px}.bcAppointmentForm{padding:19px 20px 22px}.bcAppointmentGrid{grid-template-columns:1fr;gap:13px}.bcAppointmentField.full,.bcAppointmentSubject{grid-column:auto}.bcAppointmentActions{align-items:stretch;flex-direction:column}.bcAppointmentSubmit{width:100%}.bcAppointmentTrust{max-width:none;order:2}.bcAppointmentSuccess{padding:40px 20px 46px}.bcAppointmentSuccess h3{font-size:24px}}
        @media(prefers-reduced-motion:reduce){.bcAppointmentOverlay,.bcAppointmentModal{animation:none!important}}
      `}</style>
      <section className="bcAppointmentModal" role="dialog" aria-modal="true" aria-labelledby="bcAppointmentTitle">
        <div className="bcAppointmentHead">
          <div className="bcAppointmentIcon" aria-hidden="true">📅</div>
          <h2 id="bcAppointmentTitle">Randevu Al</h2>
          <p>Çocuğunuz için okul ön kayıt ve tanışma görüşmesi randevunuzu kolayca oluşturun.</p>
          <button className="bcAppointmentClose" type="button" aria-label="Kapat" onClick={close}>×</button>
        </div>
        {submitted ? (
          <div className="bcAppointmentSuccess">
            <div className="bcAppointmentSuccessIcon" aria-hidden="true">✓</div>
            <h3>🎉 Randevu Talebiniz Alındı!</h3>
            <p>Bilgileriniz okulumuza iletildi. En kısa sürede sizinle iletişime geçeceğiz.</p>
            <button type="button" onClick={close}>Formu Kapat</button>
          </div>
        ) : (
          <form className="bcAppointmentForm" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <div className="bcAppointmentGrid">
              <div className="bcAppointmentField bcAppointmentSubject">
                <label htmlFor="bc-subject">Konu <span>*</span></label>
                <select id="bc-subject" value={form.subject} onChange={(event) => update("subject", event.target.value)}>
                  <option value="child-registration">👶 Çocuk Kayıt / Ön Kayıt</option>
                </select>
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-parent">Veli Ad Soyad <span>*</span></label>
                <input id="bc-parent" required value={form.parentName} onChange={(event) => update("parentName", event.target.value)} placeholder="Adınız ve soyadınız" />
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-child">Çocuğun Adı Soyadı <span>*</span></label>
                <input id="bc-child" required value={form.childName} onChange={(event) => update("childName", event.target.value)} placeholder="Çocuğun adı ve soyadı" />
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-birth">Çocuğun Doğum Tarihi <span>*</span></label>
                <input id="bc-birth" type="date" required value={form.birthDate} onChange={(event) => update("birthDate", event.target.value)} />
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-phone">Telefon <span>*</span></label>
                <input id="bc-phone" type="tel" required value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="05xx xxx xx xx" />
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-email">E-posta</label>
                <input id="bc-email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="ornek@email.com" />
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-date">Randevu Tarihi <span>*</span></label>
                <input id="bc-date" type="date" required min={new Date().toISOString().slice(0, 10)} value={form.appointmentDate} onChange={(event) => update("appointmentDate", event.target.value)} />
              </div>
              <div className="bcAppointmentField">
                <label htmlFor="bc-time">Randevu Saati <span>*</span></label>
                <select id="bc-time" required value={form.appointmentTime} onChange={(event) => update("appointmentTime", event.target.value)}>
                  <option value="">Saat seçin</option>
                  {times.map((time) => <option key={time} value={time}>{time}</option>)}
                </select>
              </div>
              <div className="bcAppointmentField full">
                <label htmlFor="bc-note">Notunuz</label>
                <textarea id="bc-note" value={form.note} onChange={(event) => update("note", event.target.value)} placeholder="Okul görüşmesiyle ilgili eklemek istediğiniz bir not varsa yazabilirsiniz..." />
              </div>
            </div>
            <div className="bcAppointmentActions">
              <div className="bcAppointmentTrust">🔒 Bilgileriniz yalnızca <b>Bilim Çocuk Anaokulu</b> ile iletişim amacıyla kullanılacaktır.</div>
              <button className="bcAppointmentSubmit" type="submit">Randevu Talep Et <span aria-hidden="true">→</span></button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
