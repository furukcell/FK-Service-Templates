import { useState } from "react";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

type Props = {
  config: BusinessTemplateConfig;
  onLayoutChange?: (layout: "corporate" | "kindergarten-reference") => void;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c").replace(/[^a-z0-9]+/g,"").trim();
}

function Logo() {
  return <span className="kr-logoMark" aria-hidden="true"><svg viewBox="0 0 54 54"><circle cx="27" cy="27" r="25" fill="#eaf6ff"/><path d="M16 32c-7-8 1-19 10-12 4-8 17-3 15 7-1 8-12 11-25 5Z" fill="#1976d2"/><circle cx="21" cy="22" r="4" fill="#62b9eb"/><circle cx="35" cy="20" r="4" fill="#ffd447"/><path d="M18 34c4 7 17 9 22 0" fill="none" stroke="#0d47a1" strokeWidth="2.5" strokeLinecap="round"/></svg></span>;
}

function Photo({ src, title, className = "" }: { src?: string; title: string; className?: string }) {
  return <div className={`kr-photo ${className}`}>{src ? <img src={src} alt={title} /> : <div className="kr-photoPlaceholder"><span>FOTOĞRAF</span><small>{title}</small></div>}</div>;
}

const navItems = [
  ["Ana Sayfa", "#top"], ["Kurumsal", "#about"], ["Sınıflarımız", "#classes"],
  ["Atölyeler", "#ateliers"], ["Galeri", "#gallery"], ["Duyurular", "#news"], ["İletişim", "#contact"]
] as const;

export function KindergartenReferenceLayout({ config, onLayoutChange }: Props) {
  const schoolName = config.brandName || "Bilim Çocuk Anaokulu";
  const email = `info@${slugify(schoolName)}.com`;
  const hero = "/images/logos/bilim-cocuk-hero.png";
  const gallery = config.galleryItems || [];
  const news = config.campaignItems?.length ? config.campaignItems : [
    { title: "Renkli Eller Atölyesi", description: "Miniklerimizle yaratıcılığımızı renklerle konuşturduk." },
    { title: "Doğa Günümüz", description: "Bahçemizde doğayı keşfettik, eğlendik ve öğrendik." },
    { title: "Yıl Sonu Gösterimiz", description: "Miniklerimizin hazırladığı gösteriye sizleri de bekliyoruz." },
    { title: "Bilim Çocuk Günü", description: "Merak ettik, deney yaptık ve yeni şeyler keşfettik." },
    { title: "Bahçe Şenliğimiz", description: "Açık havada oyunlarla dolu keyifli bir gün geçirdik." },
    { title: "Aile Katılım Etkinliği", description: "Ailelerimizle birlikte ürettik, oynadık ve öğrendik." }
  ];
  const stats = [["🎓", "150+", "Mutlu Öğrenci"], ["📚", "20+", "Eğitici Atölye"], ["🚌", "5+", "Servis Güzergahı"], ["😊", "10+", "Yıllık Deneyim"]];
  const classes = [
    { title: "(2 Yaş) Grubu", icon: "🧸", text: "Güvenli ve sevgi dolu ilk okul deneyimi. Oyun, hareket ve günlük rutinlerle çocuklarımızın keşfetme becerilerini destekliyoruz." },
    { title: "(3 - 4 Yaş) Grubu", icon: "🎨", text: "Oyun temelli etkinliklerle sosyal iletişim, dil gelişimi ve öz bakım becerilerini destekliyoruz." },
    { title: "(4 - 5 Yaş) Grubu", icon: "🚂", text: "Bilim, sanat, drama ve yaratıcı oyunlarla çocuklarımızın merak duygusunu ve problem çözme becerilerini geliştiriyoruz." },
    { title: "(5 - 6 Yaş) Grubu", icon: "🔤", text: "İlkokula hazırlık sürecini akademik çalışmaların yanında özgüven, sorumluluk ve sosyal becerilerle destekliyoruz." }
  ];
  const [openClass, setOpenClass] = useState(0);
  const staff = ["Sınıf Öğretmenlerimiz", "Çocuk Gelişimi Uzmanımız", "Rehberlik Uzmanımız", "Yardımcı Öğretmenlerimiz"];
  const storyPhotos = [
    ["/images/logos/bilim-cocuk-bahce-oyunlari.png", "Bahçe oyunları"],
    ["/images/logos/bilim-cocuk-boyama-etkinligi.png", "Boyama etkinliği"]
  ] as const;
  const whyCards = [
    { title: "Bilimle Öğreniyoruz", text: "Merak eden, araştıran ve keşfetmeyi seven çocuklar için deneyim odaklı eğitim sunuyoruz.", color: "orange", icon: "🔬", image: gallery[0]?.imageUrl || storyPhotos[0][0] },
    { title: "Sevgi ve Güven", text: "Çocuklarımızın kendini değerli, güvende ve özgür hissedeceği sıcak bir ortam sağlıyoruz.", color: "pink", icon: "♥", image: gallery[1]?.imageUrl || storyPhotos[1][0] },
    { title: "Yaratıcılığı Destekliyoruz", text: "Sanat, oyun, drama ve üretimle çocukların hayal gücünü ve özgüvenini geliştiriyoruz.", color: "green", icon: "🎨", image: gallery[2]?.imageUrl || storyPhotos[0][0] },
    { title: "Doğayla İç İçe", text: "Doğal ortamda, hareket ederek ve yaşayarak öğrenme fırsatları sunuyoruz.", color: "blue", icon: "🌱", image: gallery[3]?.imageUrl || storyPhotos[1][0] }
  ];
  const ateliers = [
    { title: "Bilim ve Keşif Atölyesi", text: "Deneyler, gözlemler ve küçük keşiflerle çocukların merak duygusunu destekliyoruz." },
    { title: "Sanat ve Yaratıcılık Atölyesi", text: "Renk, müzik, drama ve üretim çalışmalarıyla çocukların hayal gücünü geliştiriyoruz." },
    { title: "Doğa ve Yaşam Atölyesi", text: "Doğayı tanıyor, hareket ediyor ve günlük yaşam becerilerini yaşayarak öğreniyoruz." },
    { title: "Müzik ve Ritim Atölyesi", text: "Ritim, ses ve hareket çalışmalarıyla çocukların ifade becerilerini ve müzik sevgisini güçlendiriyoruz." },
    { title: "Drama ve Hikâye Atölyesi", text: "Canlandırmalar ve hikâyelerle çocukların iletişim, empati ve özgüven gelişimini destekliyoruz." },
    { title: "Minik Mucitler Atölyesi", text: "Basit tasarımlar ve eğlenceli problemlerle çocukların üretme ve çözüm bulma becerilerini keşfediyoruz." }
  ];

  return <main className="kr-site">
    <nav className="kr-nav">
      <a className="kr-brand" href="#top" aria-label={schoolName}><Logo/><span><b>{schoolName}</b><small>Bugünün minikleri, yarının büyük adımları</small></span></a>
      <div className="kr-navLinks">{navItems.map(([label, href], i) => <a key={label} className={i === 0 ? "active" : ""} href={href}>{label}</a>)}</div>
      <div className="kr-navRight">{onLayoutChange && <button className="kr-layoutMini" onClick={() => onLayoutChange("corporate")} type="button">Kurumsal</button>}<button className="kr-search" type="button" aria-label="Ara">⌕</button><a className="kr-navCta" href="#contact">Kayıt &amp; Bilgi Al</a></div>
    </nav>

    <header id="top" className="kr-hero"><div className="kr-heroImage" style={{ backgroundImage: `url(${hero})` }} /></header>

    <section id="about" className="kr-waveSection kr-aboutWave">
      <div className="kr-waveInner kr-storyInner">
        <div className="kr-storyPhotos"><Photo src={storyPhotos[0][0]} title={storyPhotos[0][1]} className="photoA"/><Photo src={storyPhotos[1][0]} title={storyPhotos[1][1]} className="photoB"/><div className="kr-dashedCircle"/><img className="kr-storySun" src="/images/logos/bilim-cocuk-sun.png" alt="" aria-hidden="true"/><img className="kr-storyCrab" src="/images/logos/bilim-cocuk-crab.png" alt="" aria-hidden="true"/></div>
        <div className="kr-storyCopy"><img className="kr-storyRocket" src="/images/logos/bilim-cocuk-rocket.png" alt="" aria-hidden="true"/><span className="kr-kicker">BİZİM İÇİN EN DEĞERLİSİ</span><h2>Çocuğunuzun <strong>merakını, hayal gücünü ve özgüvenini</strong> birlikte büyütüyoruz.</h2><p>Bilim Çocuk Anaokulu'nda her çocuğun kendine özgü bir dünyası olduğuna inanıyoruz. Güvenli ve sevgi dolu ortamımızda çocuklarımız; oyun oynayarak, keşfederek ve deneyimleyerek öğrenir.</p><p><strong>Amacımız sadece okul öncesi eğitim vermek değil;</strong> çocukların kendilerini ifade edebilen, merak eden, paylaşan ve öğrenmekten keyif alan bireyler olarak yetişmelerine eşlik etmek.</p><div className="kr-facts"><article><span>♥</span><div><b>Güvenli ve Sevgi Dolu Ortam</b><small>Çocuklarımızın kendini güvende ve değerli hissettiği sıcak bir ortam.</small></div></article><article><span>✦</span><div><b>Çocuk Odaklı Eğitim</b><small>Her çocuğun gelişimini ve merakını merkeze alan yaklaşım.</small></div></article><article><span>🎨</span><div><b>Yaratıcı Atölyeler</b><small>Sanat, bilim, müzik ve oyunla öğrenmeyi destekliyoruz.</small></div></article><article><span>🌱</span><div><b>Bireysel Gelişim</b><small>Çocukların kendi hızında gelişmesine sevgiyle eşlik ediyoruz.</small></div></article></div><a className="kr-pinkBtn small" href="#contact">Okulumuzu Daha Yakından Tanıyın <b>→</b></a></div>
      </div>
    </section>

    <section className="kr-waveSection kr-experienceWave">
      <div className="kr-waveInner"><div className="kr-sectionHead light"><span className="kr-kicker">GÜVENLE BÜYÜYEN ÇOCUKLAR</span><h2>20+ yıllık deneyim</h2></div><div className="kr-experienceGrid">{stats.map(([icon,value,label]) => <div className="kr-stat" key={label}><span className="kr-statIcon">{icon}</span><strong>{value}</strong><span>{label}</span></div>)}</div><div className="kr-tree">🌳</div><div className="kr-signpost"><b>DAHA MUTLU</b><b>DAHA ÖZGÜVENLİ</b><b>DAHA YARATICI</b></div><span className="kr-bee">🐝</span></div>
    </section>

    <section id="classes" className="kr-waveSection kr-classesWave">
      <div className="kr-waveInner kr-classAccordionInner">
        <div className="kr-sectionHead kr-classesHead"><span className="kr-kicker">SINIFLARIMIZ</span><h2>Her yaşa özel <strong>öğrenme alanları</strong></h2><p>Çocuklarımızın yaşına, gelişimine ve meraklarına uygun sıcak sınıflar.</p></div>
        <div className="kr-classShowcase">
          <div className="kr-classList" role="tablist" aria-label="Sınıflarımız">
            {classes.map((item, i) => {
              const isOpen = openClass === i;
              return <article className={`kr-classItem ${isOpen ? "is-open" : ""}`} key={item.title}>
                <button type="button" className="kr-classToggle" onClick={() => setOpenClass(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span className="kr-classIcon" aria-hidden="true">{item.icon}</span><span className="kr-classTitle">{item.title}</span><span className="kr-classPlus">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="kr-classDetails" aria-hidden={!isOpen}><div><p>{item.text}</p></div></div>
              </article>;
            })}
          </div>
          <div className="kr-classVisual" aria-live="polite">
            <div className="kr-classVisualPlaceholder"><span>SINIF FOTOĞRAFI</span><small>{openClass >= 0 ? classes[openClass].title : "Bir sınıf seçin"}</small></div>
            <div className="kr-classVisualBadge">{openClass >= 0 ? classes[openClass].title : "Sınıflarımız"}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="kr-discoveryBridge" aria-label="Merakla öğrenme alanı" style={{width:"100%",height:"230px",overflow:"hidden",background:"#fffaf1",lineHeight:0}}>
      <img src="/images/logos/bilim-cocuk-merak-ogreniyor-gecis.png" alt="Merakla öğreniyor, sevgiyle büyüyoruz" style={{display:"block",width:"100%",height:"230px",maxWidth:"none",objectFit:"fill"}} />
    </section>

    <section className="kr-whyChoose" aria-labelledby="why-choose-title">
      <div className="kr-whyInner">
        <div className="kr-sectionHead kr-whyHead"><span className="kr-kicker">BİZİ NEDEN SEÇMELİSİNİZ?</span><h2 id="why-choose-title">Çünkü her çocuk <strong>özeldir.</strong></h2><p>Çocuklarımızın mutlu, özgüvenli ve merak eden bireyler olarak gelişmesi için eğitimimizi sevgi, deneyim ve keşif üzerine kuruyoruz.</p></div>
        <div className="kr-whyGrid">
          {whyCards.map((card) => <article className={`kr-whyCard kr-why-${card.color}`} key={card.title}>
            <div className="kr-whyCardContent"><div className="kr-whyPhoto"><img src={card.image} alt=""/></div><div className="kr-whyBody"><h3>{card.title}</h3><p>{card.text}</p></div></div>
          </article>)}
        </div>
      </div>
    </section>

    <div className="kr-imageBreak" aria-hidden="true"><img src="/images/logos/bilim-cocuk-lavanta-gecis.png" alt="" /></div>

    <section id="ateliers" className="kr-waveSection kr-ateliersWave">
      <div className="kr-waveInner kr-ateliersInner">
        <div className="kr-sectionHead kr-ateliersHead"><span className="kr-kicker">BİLİM ÇOCUK ANAOKULU</span><h2>Atölyelerimiz</h2><p>Çocuklarımızın merakını, üretme isteğini ve yaratıcılığını destekleyen özel öğrenme alanları.</p></div>
        <div className="kr-atelierGrid">{ateliers.map((item, i) => <article className="kr-atelierCard" key={item.title}><div className="kr-atelierImage"><Photo title={`Atölye görseli ${i + 1}`} /></div><div className="kr-atelierBody"><h3>{item.title}</h3><p>{item.text}</p><a href="#contact">Daha Fazla →</a></div></article>)}</div>
      </div>
    </section>

    <div className="kr-imageBreak" aria-hidden="true"><img src="/images/logos/bilim-cocuk-mavi-gecis.png" alt="" /></div>

    <section id="news" className="kr-waveSection kr-newsWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">{schoolName.toUpperCase()}'DAN HABERLER</span><h2>Etkinlik ve Duyurular</h2><a href="#contact">Tüm Duyurular →</a></div><div className="kr-newsGrid">{news.map((item,i)=><article className="kr-newsCard" key={`${item.title}-${i}`}><div className="kr-newsImage"><Photo src={gallery[i]?.imageUrl} title={item.title}/><span>{i===0?"12 EYLÜL":i===1?"05 EYLÜL":i===2?"01 EYLÜL":i===3?"28 AĞUSTOS":i===4?"22 AĞUSTOS":"15 AĞUSTOS"}</span></div><div className="kr-newsBody"><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">Daha Fazla →</a></div></article>)}</div><span className="kr-elephant">🐘</span></div></section>

    <div className="kr-imageBreak" aria-hidden="true"><img src="/images/logos/bilim-cocuk-sari-gecis.png" alt="" /></div>

    <section id="gallery" className="kr-waveSection kr-galleryWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">ÇOCUKLARIMIZDAN KARELER</span><h2>Galerimiz</h2><p>Günlük yaşamdan, etkinliklerden ve güzel anılardan kareler.</p></div><div className="kr-galleryGrid">{[0,1,2,3,4,5].map(n => <Photo key={n} src={gallery[n]?.imageUrl} title={`Galeri ${n+1}`} className={`galleryPhoto g${n+1}`}/>)}</div></div></section>

    <div className="kr-imageBreak" aria-hidden="true"><img src="/images/logos/bilim-cocuk-yesil-gecis.png" alt="" /></div>

    <section className="kr-waveSection kr-staffWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">AİLEMİZ</span><h2>Çalışan Kadromuz</h2><p>Çocuklarımızın gelişimine sevgi, deneyim ve uzmanlıkla eşlik eden ekibimiz.</p></div><div className="kr-staffGrid">{staff.map((x,i)=><article key={x}><Photo src={gallery[i+6]?.imageUrl} title={x}/><div><b>{x}</b><span>{schoolName}</span></div></article>)}</div></div></section>

    <section className="kr-join"><div><span>Gelin, {schoolName} Ailemize Katılın</span><small>Çocuğunuzun mutlu ve başarılı bir geleceğe adım atması için bizimle iletişime geçin.</small></div><a href="#contact">Randevu Al →</a><div className="kr-bunny" aria-hidden="true">🐰</div></section>

    <footer id="contact" className="kr-footer"><div className="kr-footerTop"><a className="kr-brand footerBrand" href="#top"><Logo/><span><b>{schoolName}</b><small>Bugünün minikleri, yarının büyük adımları</small></span></a><div><b>Hızlı Erişim</b><a href="#about">Kurumsal</a><a href="#classes">Sınıflarımız</a><a href="#ateliers">Atölyeler</a><a href="#gallery">Galeri</a><a href="#news">Duyurular</a></div><div><b>Bize Ulaşın</b><span>☎ {config.phone || "0542 123 45 67"}</span><span>✉ {email}</span><span>⌖ {config.address || "Muğla / Türkiye"}</span></div><div className="kr-social"><a href={config.instagramUrl || "#contact"}>◎</a><a href="#contact">f</a><a href="#contact">▶</a></div></div><div className="kr-footerBottom">© 2026 {schoolName}. Tüm Hakları Saklıdır.<span>FK Digital</span></div></footer>

    <style>{`
      .kr-whyChoose{background:#fffaf1!important;color:#183c70!important;padding:86px 0 104px!important;position:relative!important;overflow:hidden!important}
      .kr-whyInner{max-width:1180px!important;margin:0 auto!important;padding:0 24px!important}
      .kr-whyHead{text-align:center!important;max-width:760px!important;margin:0 auto 46px!important}
      .kr-whyHead .kr-kicker{color:#ff4f87!important}
      .kr-whyHead h2{color:#17386d!important;font-size:43px!important;line-height:1.05!important;margin:7px auto 12px!important}
      .kr-whyHead h2 strong{color:#1976d2!important}
      .kr-whyHead p{color:#7890a8!important;max-width:700px!important;margin:0 auto!important;line-height:1.65!important}
      .kr-whyGrid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:20px!important;align-items:stretch!important;max-width:1040px!important;margin:0 auto!important}
      .kr-whyCard{border-radius:24px!important;overflow:hidden!important;min-height:420px!important;box-shadow:0 16px 34px rgba(24,78,132,.10)!important;transition:transform 4s cubic-bezier(.2,.75,.2,1),box-shadow .7s ease!important;transform-style:preserve-3d!important;perspective:1200px!important;cursor:pointer!important;will-change:transform!important}
      .kr-whyCard:hover{transform:perspective(1200px) rotateY(180deg) scale(1.03)!important;box-shadow:0 26px 48px rgba(24,78,132,.18)!important;z-index:3!important}
      .kr-whyCardContent{height:100%!important;min-height:420px!important;transform-style:preserve-3d!important;transition:transform 4s cubic-bezier(.2,.75,.2,1)!important}
      .kr-whyCard:hover .kr-whyCardContent{transform:rotateY(-180deg)!important}
      .kr-why-orange{background:#ff686b!important}.kr-why-pink{background:#ffbd16!important}.kr-why-green{background:#a9cf49!important}.kr-why-blue{background:#28afe9!important}
      .kr-whyPhoto{height:190px!important;position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;padding-top:22px!important}
      .kr-whyPhoto:before{content:""!important;position:absolute!important;width:142px!important;height:142px!important;border-radius:50%!important;border:2px dashed rgba(255,255,255,.95)!important;box-sizing:border-box!important}
      .kr-whyPhoto img{width:122px!important;height:122px!important;border-radius:50%!important;object-fit:cover!important;border:6px solid rgba(255,255,255,.95)!important;box-shadow:0 8px 18px rgba(20,60,100,.15)!important;position:relative!important;z-index:1!important}
      .kr-whyBody{padding:12px 24px 30px!important;color:#fff!important;text-align:center!important}
      .kr-whyBody h3{margin:0 0 11px!important;font:800 22px/1.1 'Baloo 2',sans-serif!important;color:#fff!important}
      .kr-whyBody p{margin:0!important;font:500 14px/1.65 'Baloo 2',sans-serif!important;color:rgba(255,255,255,.96)!important}

      /* Illustrated transition bands between the major lower-page sections. */
      .kr-imageBreak{width:100%!important;height:138px!important;overflow:hidden!important;line-height:0!important;display:block!important;background:transparent!important}
      .kr-imageBreak img{display:block!important;width:100%!important;height:100%!important;max-width:none!important;object-fit:fill!important;object-position:center!important}

      .kr-ateliersWave{background:#fff!important;padding:86px 0 96px!important}
      .kr-ateliersInner{max-width:1180px!important}
      .kr-ateliersHead{text-align:center!important;max-width:760px!important;margin:0 auto 48px!important}
      .kr-ateliersHead h2{font-size:46px!important;color:#243d72!important;margin:8px 0 12px!important}
      .kr-ateliersHead p{color:#7d8ea2!important;max-width:760px!important;margin:0 auto!important;line-height:1.7!important}

      /* Shared horizontal carousel behavior: 3 cards visible on desktop, more cards continue to the right. */
      .kr-atelierGrid,.kr-newsGrid,.kr-galleryGrid,.kr-staffGrid{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important;overflow-y:visible!important;scroll-snap-type:x mandatory!important;scroll-behavior:smooth!important;scrollbar-width:thin!important;padding:10px 4px 22px!important;margin:0 auto!important;-webkit-overflow-scrolling:touch!important}
      .kr-atelierGrid::-webkit-scrollbar,.kr-newsGrid::-webkit-scrollbar,.kr-galleryGrid::-webkit-scrollbar,.kr-staffGrid::-webkit-scrollbar{height:7px!important}
      .kr-atelierGrid::-webkit-scrollbar-thumb,.kr-newsGrid::-webkit-scrollbar-thumb,.kr-galleryGrid::-webkit-scrollbar-thumb,.kr-staffGrid::-webkit-scrollbar-thumb{background:rgba(36,61,114,.22)!important;border-radius:99px!important}
      .kr-atelierGrid > *, .kr-newsGrid > *, .kr-galleryGrid > *, .kr-staffGrid > *{flex:0 0 calc((100% - 48px)/3)!important;scroll-snap-align:start!important;min-width:0!important}
      .kr-atelierGrid{gap:24px!important;max-width:1000px!important}
      .kr-atelierCard{background:#fff!important;border-radius:24px!important;overflow:hidden!important;box-shadow:0 16px 38px rgba(24,78,132,.11)!important;border:1px solid rgba(35,90,140,.08)!important;transition:transform .45s cubic-bezier(.2,.75,.2,1),box-shadow .45s ease!important;will-change:transform!important}
      .kr-atelierCard:hover{transform:translateY(-9px) scale(1.025)!important;box-shadow:0 24px 48px rgba(24,78,132,.18)!important;z-index:2!important}
      .kr-atelierImage{height:235px!important;background:#eef7fb!important}
      .kr-atelierImage .kr-photo,.kr-atelierImage .kr-photoPlaceholder{height:100%!important;width:100%!important}
      .kr-atelierImage .kr-photoPlaceholder{border:0!important;border-radius:0!important;background:linear-gradient(135deg,#ffe7dc,#eaf7ff)!important;display:flex!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;color:#6c7d91!important}
      .kr-atelierImage .kr-photoPlaceholder span{font-weight:800!important;font-size:13px!important;letter-spacing:1.5px!important}
      .kr-atelierBody{padding:24px 26px 28px!important;text-align:center!important}
      .kr-atelierBody h3{margin:0 0 11px!important;color:#243d72!important;font-size:23px!important}
      .kr-atelierBody p{margin:0 0 18px!important;color:#7b8b9e!important;line-height:1.65!important;font-size:14px!important}
      .kr-atelierBody a{color:#ff5d8f!important;font-weight:800!important;text-decoration:none!important}

      /* The existing news/gallery/staff cards keep their visual design; only their layout becomes a carousel. */
      .kr-newsGrid > .kr-newsCard,.kr-galleryGrid > .kr-photo,.kr-staffGrid > article{transition:transform .45s cubic-bezier(.2,.75,.2,1),box-shadow .45s ease!important;will-change:transform!important}
      .kr-newsGrid > .kr-newsCard:hover,.kr-galleryGrid > .kr-photo:hover,.kr-staffGrid > article:hover{transform:translateY(-8px) scale(1.025)!important;box-shadow:0 24px 48px rgba(24,78,132,.16)!important;z-index:2!important}
      .kr-galleryGrid{gap:20px!important;max-width:1180px!important}
      .kr-galleryGrid > .kr-photo{border-radius:24px!important;overflow:hidden!important}
      .kr-newsGrid{gap:24px!important;max-width:1180px!important}
      .kr-staffGrid{gap:24px!important;max-width:1180px!important}

      @media (max-width:980px){
        .kr-whyGrid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:760px!important}
        .kr-whyCard{min-height:390px!important}.kr-whyCardContent{min-height:390px!important}
        .kr-atelierGrid > *, .kr-newsGrid > *, .kr-galleryGrid > *, .kr-staffGrid > *{flex-basis:calc((100% - 24px)/2)!important}
      }
      @media (max-width:760px){
        .kr-whyChoose{padding:60px 0 70px!important}
        .kr-whyInner{padding:0 16px!important}
        .kr-whyHead{margin-bottom:30px!important}
        .kr-whyHead h2{font-size:31px!important;max-width:350px!important}
        .kr-whyHead p{font-size:12px!important;line-height:1.55!important;max-width:340px!important}
        .kr-whyGrid{grid-template-columns:1fr 1fr!important;gap:12px!important;max-width:none!important}
        .kr-whyCard{min-height:320px!important;border-radius:18px!important}.kr-whyCardContent{min-height:320px!important}
        .kr-whyCard:hover{transform:perspective(900px) rotateY(180deg) scale(1.02)!important}
        .kr-whyPhoto{height:132px!important;padding-top:12px!important}
        .kr-whyPhoto:before{width:94px!important;height:94px!important}
        .kr-whyPhoto img{width:78px!important;height:78px!important;border-width:4px!important}
        .kr-whyBody{padding:8px 10px 18px!important}
        .kr-whyBody h3{font-size:16px!important;margin-bottom:6px!important}
        .kr-whyBody p{font-size:11px!important;line-height:1.45!important}
        .kr-imageBreak{height:90px!important}
        .kr-ateliersWave{padding:60px 0 70px!important}
        .kr-ateliersHead{margin-bottom:30px!important;padding:0 16px!important}
        .kr-ateliersHead h2{font-size:32px!important}
        .kr-ateliersHead p{font-size:12px!important;line-height:1.55!important}
        .kr-atelierGrid,.kr-newsGrid,.kr-galleryGrid,.kr-staffGrid{padding-left:16px!important;padding-right:16px!important;gap:16px!important}
        .kr-atelierGrid > *, .kr-newsGrid > *, .kr-galleryGrid > *, .kr-staffGrid > *{flex-basis:calc(86% - 8px)!important}
        .kr-atelierImage{height:200px!important}
        .kr-atelierBody{padding:20px!important}
        .kr-atelierBody h3{font-size:20px!important}
      }
      @media (max-width:390px){
        .kr-whyGrid{gap:9px!important}.kr-whyCard{min-height:300px!important}.kr-whyCardContent{min-height:300px!important}.kr-whyPhoto{height:118px!important}.kr-whyPhoto:before{width:86px!important;height:86px!important}.kr-whyPhoto img{width:70px!important;height:70px!important}.kr-whyBody h3{font-size:14px!important}.kr-whyBody p{font-size:10px!important}
      }
      @media (prefers-reduced-motion:reduce){.kr-whyCard,.kr-whyCardContent,.kr-atelierCard,.kr-newsCard,.kr-galleryGrid .kr-photo,.kr-staffGrid article{transition:none!important}.kr-whyCard:hover,.kr-whyCard:hover .kr-whyCardContent,.kr-atelierCard:hover,.kr-newsCard:hover,.kr-galleryGrid .kr-photo:hover,.kr-staffGrid article:hover{transform:none!important}}
    `}</style>
  </main>;
}
