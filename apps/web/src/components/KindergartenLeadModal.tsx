import { useEffect, useState } from "react";

type Mode = "registration" | "appointment";
type FormState = { subject:string; parentName:string; childName:string; birthDate:string; phone:string; email:string; date:string; time:string; note:string };

const blank:FormState={subject:"child-registration",parentName:"",childName:"",birthDate:"",phone:"",email:"",date:"",time:"",note:""};
const times=["09:00","09:30","10:00","10:30","11:00","11:30","13:30","14:00","14:30","15:00","15:30","16:00"];
const appointmentSubjects=[
  ["school-visit","🏫 Okul Ziyareti"],
  ["information","💬 Okul Hakkında Bilgi"],
  ["meeting","🤝 Tanışma / Görüşme"],
  ["child-registration","👶 Çocuk Kayıt / Ön Kayıt"],
  ["other","✦ Diğer"]
] as const;

export function KindergartenLeadModal(){
  const [mode,setMode]=useState<Mode>("registration");
  const [open,setOpen]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [form,setForm]=useState<FormState>(blank);

  useEffect(()=>{
    const onClick=(event:MouseEvent)=>{
      const target=event.target as HTMLElement|null;
      const appointment=target?.closest<HTMLAnchorElement>(".bcNavLink[href='#contact']");
      const registration=target?.closest<HTMLAnchorElement>(".bcCta[href='#contact']");
      if(!appointment&&!registration)return;
      event.preventDefault();
      const nextMode:Mode=registration?"registration":"appointment";
      setMode(nextMode);
      setForm({...blank,subject:nextMode==="registration"?"child-registration":"school-visit"});
      setSubmitted(false);setOpen(true);
    };
    document.addEventListener("click",onClick);return()=>document.removeEventListener("click",onClick);
  },[]);

  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    const esc=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};
    document.addEventListener("keydown",esc);return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",esc)};
  },[open]);

  const update=(key:keyof FormState,value:string)=>setForm(v=>({...v,[key]:value}));
  const registration=mode==="registration";
  const needsChild=registration||form.subject==="child-registration";
  const title=registration?"Ön Kayıt":"Randevu Al";
  const description=registration?"Çocuğunuzun ön kayıt talebini oluşturun. Bilgilerinizi bırakın, okul ekibimiz sizinle iletişime geçsin.":"Size uygun görüşme konusunu seçin ve randevu talebinizi kolayca oluşturun.";
  const submitText=registration?"Ön Kayıt Talebi Gönder":"Randevu Talep Et";
  const successTitle=registration?"🎉 Ön Kayıt Talebiniz Alındı!":"🎉 Randevu Talebiniz Alındı!";
  const successText=registration?"Bilgileriniz okulumuza ulaştı. En kısa sürede sizinle iletişime geçerek kayıt süreci hakkında bilgi vereceğiz.":"Randevu talebiniz okulumuza ulaştı. En kısa sürede sizinle iletişime geçerek uygun zamanı netleştireceğiz.";
  if(!open)return null;

  return <div className="bcLeadOverlay" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
    <style>{`
      .bcLeadOverlay{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(8,31,58,.60);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:bcLeadFade .2s ease-out}
      .bcLeadModal{width:min(760px,100%);max-height:calc(100vh - 40px);overflow:auto;background:linear-gradient(145deg,#fff,#f7fbff);border:1px solid rgba(25,118,210,.14);border-radius:25px;box-shadow:0 30px 90px rgba(3,37,76,.32);font-family:'Nunito',system-ui,sans-serif;color:#17243a;animation:bcLeadIn .25s cubic-bezier(.2,.8,.2,1)}
      .bcLeadHead{position:relative;padding:27px 30px 20px;border-bottom:1px solid #e7eff7;background:linear-gradient(135deg,#f2f9ff,#fff)}
      .bcLeadIcon{width:50px;height:50px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;font-size:24px;box-shadow:0 10px 24px rgba(25,118,210,.22);margin-bottom:12px}
      .bcLeadHead h2{margin:0;color:#0d47a1;font:900 29px/1.05 'Baloo 2',sans-serif}.bcLeadHead p{margin:8px 44px 0 0;color:#6c7f92;font-size:12px;line-height:1.55}
      .bcLeadClose{position:absolute;right:19px;top:19px;width:38px;height:38px;border:0;border-radius:50%;background:#eaf5ff;color:#3a6284;font-size:24px;cursor:pointer}.bcLeadClose:hover{background:#dceeff;color:#1976d2}
      .bcLeadForm{padding:24px 30px 28px}.bcLeadGrid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.bcLeadField{display:flex;flex-direction:column;gap:7px}.bcLeadFull{grid-column:1/-1}.bcLeadField label{font-size:11px;font-weight:900;color:#334e68}.bcLeadField label span{color:#1976d2}
      .bcLeadField input,.bcLeadField select,.bcLeadField textarea{width:100%;box-sizing:border-box;border:1px solid #d8e6f2;border-radius:12px;background:#fff;color:#20354d;padding:12px 13px;outline:0;font:700 12px 'Nunito',sans-serif;transition:.18s}.bcLeadField textarea{min-height:84px;resize:vertical}.bcLeadField input::placeholder,.bcLeadField textarea::placeholder{color:#9aaabd}.bcLeadField input:focus,.bcLeadField select:focus,.bcLeadField textarea:focus{border-color:#42a5f5;box-shadow:0 0 0 4px rgba(66,165,245,.12)}
      .bcLeadSubject{grid-column:1/-1}.bcLeadSubject select{font-weight:900;color:#0d58ad;background:#f3f9ff}
      .bcLeadActions{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-top:21px}.bcLeadTrust{max-width:320px;color:#7b8c9d;font-size:9px;line-height:1.5}.bcLeadTrust b{color:#1976d2}.bcLeadSubmit{border:0;border-radius:14px;padding:14px 21px;background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;font:900 12px 'Nunito',sans-serif;cursor:pointer;box-shadow:0 10px 24px rgba(25,118,210,.23);white-space:nowrap;transition:.18s}.bcLeadSubmit:hover{transform:translateY(-1px);box-shadow:0 13px 28px rgba(25,118,210,.30)}
      .bcLeadSuccess{text-align:center;padding:52px 30px 58px}.bcLeadSuccessIcon{width:74px;height:74px;margin:0 auto 17px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;font-size:35px;box-shadow:0 14px 30px rgba(25,118,210,.25)}.bcLeadSuccess h3{margin:0;color:#0d47a1;font:900 27px/1.1 'Baloo 2',sans-serif}.bcLeadSuccess p{max-width:470px;margin:10px auto 24px;color:#687b90;font-size:12px;line-height:1.6}.bcLeadSuccess button{border:0;border-radius:13px;padding:12px 23px;background:#edf6ff;color:#1976d2;font:900 11px 'Nunito',sans-serif;cursor:pointer}
      @keyframes bcLeadFade{from{opacity:0}to{opacity:1}}@keyframes bcLeadIn{from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
      @media(max-width:620px){.bcLeadOverlay{padding:10px}.bcLeadModal{max-height:calc(100vh - 20px);border-radius:20px}.bcLeadHead{padding:21px 20px 17px}.bcLeadHead h2{font-size:25px}.bcLeadHead p{font-size:11px}.bcLeadForm{padding:19px 20px 23px}.bcLeadGrid{grid-template-columns:1fr;gap:13px}.bcLeadFull,.bcLeadSubject{grid-column:auto}.bcLeadActions{flex-direction:column;align-items:stretch}.bcLeadSubmit{width:100%}.bcLeadTrust{max-width:none;order:2}.bcLeadSuccess{padding:42px 20px 48px}.bcLeadSuccess h3{font-size:24px}}
      @media(prefers-reduced-motion:reduce){.bcLeadOverlay,.bcLeadModal{animation:none!important}}
    `}</style>
    <section className="bcLeadModal" role="dialog" aria-modal="true" aria-labelledby="bcLeadTitle">
      <div className="bcLeadHead"><div className="bcLeadIcon" aria-hidden="true">{registration?"📝":"📅"}</div><h2 id="bcLeadTitle">{title}</h2><p>{description}</p><button className="bcLeadClose" type="button" aria-label="Kapat" onClick={()=>setOpen(false)}>×</button></div>
      {submitted?<div className="bcLeadSuccess"><div className="bcLeadSuccessIcon">✓</div><h3>{successTitle}</h3><p>{successText}</p><button type="button" onClick={()=>setOpen(false)}>Formu Kapat</button></div>:<form className="bcLeadForm" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>
        <div className="bcLeadGrid">
          <div className="bcLeadField bcLeadSubject"><label htmlFor="bc-lead-subject">Konu <span>*</span></label><select id="bc-lead-subject" value={form.subject} onChange={e=>update("subject",e.target.value)}>{registration?<option value="child-registration">👶 Çocuk Kayıt / Ön Kayıt</option>:appointmentSubjects.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></div>
          <div className="bcLeadField"><label htmlFor="bc-lead-parent">Veli Ad Soyad <span>*</span></label><input id="bc-lead-parent" required value={form.parentName} onChange={e=>update("parentName",e.target.value)} placeholder="Adınız ve soyadınız" /></div>
          {needsChild&&<><div className="bcLeadField"><label htmlFor="bc-lead-child">Çocuğun Adı Soyadı <span>*</span></label><input id="bc-lead-child" required value={form.childName} onChange={e=>update("childName",e.target.value)} placeholder="Çocuğun adı ve soyadı" /></div><div className="bcLeadField"><label htmlFor="bc-lead-birth">Çocuğun Doğum Tarihi <span>*</span></label><input id="bc-lead-birth" type="date" required value={form.birthDate} onChange={e=>update("birthDate",e.target.value)} /></div></>}
          <div className="bcLeadField"><label htmlFor="bc-lead-phone">Telefon <span>*</span></label><input id="bc-lead-phone" type="tel" required value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="05xx xxx xx xx" /></div>
          <div className="bcLeadField"><label htmlFor="bc-lead-email">E-posta</label><input id="bc-lead-email" type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="ornek@email.com" /></div>
          <div className="bcLeadField"><label htmlFor="bc-lead-date">{registration?"Görüşme Tercih Tarihi":"Randevu Tarihi"} <span>*</span></label><input id="bc-lead-date" type="date" required min={new Date().toISOString().slice(0,10)} value={form.date} onChange={e=>update("date",e.target.value)} /></div>
          <div className="bcLeadField"><label htmlFor="bc-lead-time">Saat <span>*</span></label><select id="bc-lead-time" required value={form.time} onChange={e=>update("time",e.target.value)}><option value="">Saat seçin</option>{times.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
          <div className="bcLeadField bcLeadFull"><label htmlFor="bc-lead-note">Notunuz</label><textarea id="bc-lead-note" value={form.note} onChange={e=>update("note",e.target.value)} placeholder="Eklemek istediğiniz bir not varsa yazabilirsiniz..." /></div>
        </div>
        <div className="bcLeadActions"><div className="bcLeadTrust">🔒 Bilgileriniz yalnızca <b>Bilim Çocuk Anaokulu</b> ile iletişim amacıyla kullanılacaktır.</div><button className="bcLeadSubmit" type="submit">{submitText} <span>→</span></button></div>
      </form>}
    </section>
  </div>;
}
