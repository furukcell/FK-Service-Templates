import type { BusinessTemplateConfig } from "@fk-templates/shared";

type Props = { config: BusinessTemplateConfig; onLayoutChange?: (layout: "corporate" | "kindergarten-reference") => void };

function slugifyForEmail(name: string) {
  return name
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function Logo() { return <span className="kr-logoMark" aria-hidden="true"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="25" fill="#eaf6ff"/><path d="M16 32c-7-8 1-19 10-12 4-8 17-3 15 7-1 8-12 11-25 5Z" fill="#f83d7c"/><circle cx="21" cy="22" r="4" fill="#ff8fb3"/><circle cx="35" cy="20" r="4" fill="#ffd447"/><path d="M18 34c4 7 17 9 22 0" fill="none" stroke="#402078" strokeWidth="2.5" strokeLinecap="round"/></svg></span> }
function Cloud({className=""}:{className?:string}) { return <div className={`kr-cloud ${className}`} aria-hidden="true"><i/><i/><i/></div> }
function Photo({src,title,className=""}:{src?:string;title:string;className?:string}) { return <div className={`kr-photo ${className}`}>{src?<img src={src} alt={title}/>:<div className="kr-photoPlaceholder"><span>FOTOĞRAF</span><small>{title}</small></div>}</div> }
function SectionWave({children,id,className=""}:{children:React.ReactNode;id?:string;className?:string}) { return <section id={id} className={`kr-waveSection ${className}`}>{children}</section> }

const navItems: { label: string; href: string }[] = [
  { label: "Ana Sayfa", href: "#top" },
  { label: "Kurumsal", href: "#about" },
  { label: "Atölyelerimiz", href: "#workshops" },
  { label: "Galeri", href: "#gallery" },
  { label: "Duyurular", href: "#news" },
  { label: "İletişim", href: "#contact" }
];

export function KindergartenReferenceLayout({config,onLayoutChange}:Props) {
 const schoolName=config.brandName;
 const tagline=config.eyebrow||"Sevgi, güven ve keşifle dolu bir öğrenme yolculuğu";
 const contactEmail=`info@${slugifyForEmail(config.brandName)}.com`;
 const hero=config.heroSlides?.[0]?.imageUrl||`https://picsum.photos/seed/${slugifyForEmail(config.brandName)}-hero/1800/1050`;
 const gallery=config.galleryItems||[];
 const news=config.campaignItems?.length?config.campaignItems.slice(0,3):[
  {title:"Renkli Eller Atölyesi",description:"Miniklerimizle yaratıcılığımızı renklerle konuşturduk."},
  {title:"Doğa Günümüz",description:"Bahçemizde doğayı keşfettik, eğlendik ve öğrendik."},
  {title:"Yıl Sonu Gösterimiz",description:"Miniklerimizin hazırladığı gösteriye sizleri de bekliyoruz."}
 ];
 const stats=[
  {icon:"🎓",value:"150+",label:"Mutlu Öğrenci"},
  {icon:"📚",value:"20+",label:"Eğitici Atölye"},
  {icon:"🚌",value:"5+",label:"Servis Güzergahı"},
  {icon:"😊",value:"10+",label:"Yıllık Deneyim"}
 ];
 const workshops=["Bilim Atölyesi","Sanat & Tasarım Atölyesi","Müzik ve Ritim Atölyesi","Doğa ve Bahçe Atölyesi","Drama Atölyesi","Kodlama ve Robotik Atölyesi"];
 const staff=["Sınıf Öğretmenlerimiz","Çocuk Gelişimi Uzmanımız","Rehberlik Uzmanımız","Yardımcı Öğretmenlerimiz"];
 return <main className="kr-site">
  <nav className="kr-nav"><a className="kr-brand" href="#top" aria-label={schoolName}><Logo/><span><b>{schoolName}</b><small>{tagline}</small></span></a><div className="kr-navLinks">{navItems.map((item,i)=><a key={item.label} className={i===0?'active':''} href={item.href}>{item.label}</a>)}</div><div className="kr-navRight"><div className="kr-layoutPicker"><button className="isActive" type="button">Referans Tasarım</button>{onLayoutChange&&<button type="button" onClick={()=>onLayoutChange('corporate')}>Kurumsal</button>}</div><button type="button" className="kr-search" aria-label="Ara">🔍</button><a className="kr-navCta" href="#contact">Kayıt &amp; Bilgi Al</a></div></nav>

  <header id="top" className="kr-hero"><div className="kr-heroImage" style={{backgroundImage:`url(${hero})`}}/><div className="kr-heroOverlay"/><Cloud className="heroCloud"/><div className="kr-heroCopy"><span className="kr-scribble">SEVGİ • BİLİM • KEŞİF</span><h1><span>{schoolName}</span><strong>Büyük Yarınlara</strong></h1><p>{tagline}</p><a className="kr-pinkBtn" href="#about">Okulumuzu Keşfedin <b>→</b></a></div><div className="kr-sign"><b>Oyunla</b><b>Keşfet</b><b>Öğren</b><b>Büyü</b></div><div className="kr-scroll">↓</div><div className="kr-sun" aria-hidden="true"/><div className="kr-rocket" aria-hidden="true">🚀</div><div className="kr-teddy" aria-hidden="true"><span className="kr-ear l"/><span className="kr-ear r"/><span className="kr-teddyFace"/><span className="kr-tummy">❤</span></div></header>

  <section id="about" className="kr-aboutWave kr-story kr-reveal"><div className="kr-waveInner kr-storyInner"><div className="kr-storyPhotos"><Photo src={gallery[0]?.imageUrl} title="Çocuklarımız" className="photoA"/><Photo src={gallery[1]?.imageUrl} title="Gelişim etkinliği" className="photoB"/><div className="kr-dashedCircle"/><span className="kr-ball" aria-hidden="true">⚽</span><span className="kr-heartBubble" aria-hidden="true">💬</span><span className="kr-bird" aria-hidden="true">🐤</span></div><div className="kr-storyCopy"><span className="kr-kicker">BİZİM İÇİN EN DEĞERLİSİ</span><h2>Odağımız <strong>Çocuklarımızın İyiliği</strong></h2><p>{schoolName} olarak, her çocuğun kendine özgü bir keşif yolculuğuna sahip olduğuna inanıyoruz. Sevgi dolu, güvenli ve destekleyici bir ortamda çocuklarımızın potansiyellerini en iyi şekilde ortaya çıkarmaları için çalışıyoruz.</p><div className="kr-facts"><article><span>♥</span><div><b>Güvenli Ortam</b><small>Çocuklarımızın fiziksel, duygusal ve sosyal olarak güvende hissettiği bir ortam.</small></div></article><article><span>✦</span><div><b>Uzman Kadro</b><small>Alanında deneyimli, çocuk gelişimi konusunda uzman öğretmenler.</small></div></article></div><a className="kr-pinkBtn small" href="#contact">Bizi Daha Yakından Tanıyın <b>→</b></a></div></div></section>

  <section className="kr-stats kr-reveal"><div className="statsHill" aria-hidden="true"/><div className="kr-statsInner">{stats.map((s)=><div className="kr-stat" key={s.label}><span className="kr-statIcon" aria-hidden="true">{s.icon}</span><strong>{s.value}</strong><span>{s.label}</span></div>)}</div><div className="kr-signpost"><b>DAHA MUTLU</b><b>DAHA ÖZGÜVENLİ</b><b>DAHA YARATICI</b></div><span className="kr-bee" aria-hidden="true">🐝</span></section>

  <SectionWave id="workshops" className="kr-workshopsWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">KEŞFET • ÜRET • EĞLEN</span><h2>Sınıflarımız &amp; <strong>Atölyelerimiz</strong></h2><p>Çocukların merakını canlı tutan, yaparak ve yaşayarak öğrenmeyi destekleyen özel çalışmalar.</p></div><div className="kr-workshopGrid">{workshops.map((x,i)=><article key={x}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{x}</h3><p>Çocukların yaratıcılığını ve merakını destekleyen uygulamalı çalışmalar.</p></div><b>→</b></article>)}</div></div></SectionWave>

  <section id="news" className="kr-news kr-reveal"><div className="kr-sectionHead"><span className="kr-kicker">{schoolName.toUpperCase()}'DAN HABERLER</span><h2>Duyurular &amp; Etkinlikler</h2><a href="#contact">Tüm Duyurular →</a></div><div className="kr-newsGrid">{news.map((item,i)=><article className="kr-newsCard" key={`${item.title}-${i}`}><div className="kr-newsImage"><Photo src={gallery[i]?.imageUrl} title={item.title}/><span>{i===0?'12 EYLÜL':i===1?'05 EYLÜL':'01 EYLÜL'}</span></div><div className="kr-newsBody"><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">Detayları Gör →</a></div></article>)}</div><span className="kr-elephant" aria-hidden="true">🐘</span></section>

  <SectionWave id="gallery" className="kr-galleryWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">ÇOCUKLARIMIZDAN KARELER</span><h2>Galerimiz</h2></div><div className="kr-galleryGrid">{[0,1,2,3,4,5].map((n)=><Photo key={n} src={gallery[n]?.imageUrl} title={`Galeri ${n+1}`} className={`galleryPhoto g${n+1}`}/>)}</div></div></SectionWave>

  <SectionWave className="kr-staffWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">AİLEMİZ</span><h2>Kurum Personelimiz</h2><p>Çocuklarımızın gelişimine sevgi, deneyim ve uzmanlıkla eşlik eden ekibimiz.</p></div><div className="kr-staffGrid">{staff.map((x,i)=><article key={x}><Photo src={gallery[i+6]?.imageUrl} title={x}/><div><b>{x}</b><span>{schoolName}</span></div></article>)}</div></div></SectionWave>

  <section className="kr-join kr-reveal"><div><span>Gelin, {schoolName} Ailemize Katılın</span><small>Çocuğunuzun mutlu ve başarılı bir geleceğe adım atması için bizimle iletişime geçin.</small></div><a href="#contact">Randevu Al →</a><div className="kr-bunny" aria-hidden="true"><span className="kr-bunnyEar l"/><span className="kr-bunnyEar r"/><span className="kr-bunnyFace">•ᴥ•</span></div></section>

  <section id="contact" className="kr-footer"><div className="kr-footerTop"><a className="kr-brand footerBrand" href="#top"><Logo/><span><b>{schoolName}</b><small>{tagline}</small></span></a><div><b>Hızlı Erişim</b><a href="#about">Kurumsal</a><a href="#workshops">Atölyelerimiz</a><a href="#gallery">Galeri</a><a href="#news">Duyurular</a></div><div><b>İletişim</b><span>☎ {config.phone||'0 (252) 000 00 00'}</span><span>✉ {contactEmail}</span><span>⌖ {config.address||'Muğla / Türkiye'}</span></div><div className="kr-social"><a href={config.instagramUrl||'#'}>◎</a><a href="#contact">f</a><a href="#contact">▶</a></div></div><div className="kr-footerBottom">© 2026 {schoolName}. Tüm Hakları Saklıdır.<span>FK Digital</span></div></section>
 </main>
}
