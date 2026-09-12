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

    <header id="top" className="kr-hero"><div className="kr-heroImage" style={{ backgroundImage: `url(${hero})` }} /><div className="kr-heroOldBrandMask" aria-hidden="true"><img src={hero} alt="" /></div></header>

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
        <div className="kr-sectionHead kr-whyHead"><span className="kr-kicker">BİZİ NEDEN SEÇMELİSİNİZ?</span><h2>Çocuğunuz için <strong>doğru başlangıç</strong></h2><p>Çocuklarımızın mutlu, özgüvenli ve merak eden bireyler olarak gelişmesini destekliyoruz.</p></div>
        <div className="kr-whyGrid">{whyCards.map((card) => <article key={card.title} className={`kr-whyCard ${card.color}`}><div className="kr-whyCardInner"><div className="kr-whyFace front"><span>{card.icon}</span><h3>{card.title}</h3><p>{card.text}</p><b>Detaylı Bilgi →</b></div><div className="kr-whyFace back" style={{backgroundImage:`url(${card.image})`}}><div><strong>{card.title}</strong><small>Çocuklarımız için sevgi, güven ve keşifle dolu bir eğitim yaklaşımı.</small></div></div></div></article>)}</div>
      </div>
    </section>

    <section className="kr-roadTransition kr-roadA" aria-hidden="true"><div className="kr-roadInner"><div className="kr-roadPath"></div><div className="kr-roadTruck">🚌</div><span className="kr-roadCloud c1"></span><span className="kr-roadCloud c2"></span></div></section>

    <section id="ateliers" className="kr-workshopsWave kr-workshops">
      <div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">ATÖLYELERİMİZ</span><h2>Merak ederek <strong>öğreniyorlar.</strong></h2><p>Bilim, sanat, doğa, müzik ve üretimle çocuklarımızın hayal gücünü destekliyoruz.</p></div><div className="kr-workshopGrid kr-horizontalRail">{ateliers.map((item) => <article className="kr-workshopCard kr-railCard" key={item.title}><div className="kr-workshopVisual"><span>🧪</span></div><b>{item.title}</b><small>Keşfet • Üret • Öğren</small><p>{item.text}</p></article>)}</div><div className="kr-railHint">← Kaydırın →</div></div>
    </section>

    <section className="kr-roadTransition kr-roadB" aria-hidden="true"><div className="kr-roadInner"><div className="kr-roadPath"></div><div className="kr-roadTruck">🚌</div><span className="kr-roadCloud c1"></span><span className="kr-roadCloud c2"></span></div></section>

    <section id="news" className="kr-newsWave kr-news">
      <div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">ETKİNLİK &amp; DUYURULAR</span><h2>Okuldan <strong>haberler.</strong></h2><p>Miniklerimizin etkinlikleri, özel günleri ve dönem içi duyuruları.</p></div><div className="kr-newsGrid kr-horizontalRail">{news.map((item, i) => <article className="kr-newsCard kr-railCard" key={item.title}><div className="kr-newsImage"><Photo src={gallery[i % gallery.length]?.imageUrl || storyPhotos[i % storyPhotos.length][0]} title={item.title}/><span>Duyuru</span></div><div className="kr-newsBody"><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">Detaylı Bilgi →</a></div></article>)}</div><div className="kr-railHint">← Kaydırın →</div></div>
    </section>

    <section className="kr-roadTransition kr-roadC" aria-hidden="true"><div className="kr-roadInner"><div className="kr-roadPath"></div><div className="kr-roadTruck">🚌</div><span className="kr-roadCloud c1"></span><span className="kr-roadCloud c2"></span></div></section>

    <section id="gallery" className="kr-galleryWave kr-gallery">
      <div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">GALERİMİZ</span><h2>Anılarımızdan <strong>küçük kareler.</strong></h2><p>Gerçek okul fotoğraflarıyla galeriyi kurum panelinden kolayca güncelleyebilirsiniz.</p></div><div className="kr-galleryGrid kr-horizontalRail">{gallery.length ? gallery.slice(0,8).map((item) => <div key={item.title} className="kr-galleryCard kr-railCard"><img src={item.imageUrl} alt={item.title}/><span>{item.title}</span></div>) : storyPhotos.map(([src,title]) => <div key={title} className="kr-galleryCard kr-railCard"><img src={src} alt={title}/><span>{title}</span></div>)}</div><div className="kr-railHint">← Kaydırın →</div></div>
    </section>

    <section className="kr-roadTransition kr-roadD" aria-hidden="true"><div className="kr-roadInner"><div className="kr-roadPath"></div><div className="kr-roadTruck">🚌</div><span className="kr-roadCloud c1"></span><span className="kr-roadCloud c2"></span></div></section>

    <section className="kr-staffWave kr-staff" aria-labelledby="staff-title">
      <div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">ÇALIŞAN KADROMUZ</span><h2>Her adımda <strong>yanınızdayız.</strong></h2><p>Uzman ve güler yüzlü ekibimizle çocuklarımıza güvenli bir eğitim ortamı sunuyoruz.</p></div><div className="kr-staffGrid kr-horizontalRail">{staff.map((item, i) => <article className="kr-staffCard kr-railCard" key={item}><div className="kr-staffAvatar"><img src={gallery[(7+i)%gallery.length]?.imageUrl || storyPhotos[i%2][0]} alt={item}/></div><b>{item}</b><small>Deneyimli ekibimiz</small></article>)}</div><div className="kr-railHint">← Kaydırın →</div></div>
    </section>

    <section className="kr-roadTransition kr-roadE" aria-hidden="true"><div className="kr-roadInner"><div className="kr-roadPath"></div><div className="kr-roadTruck">🚌</div><span className="kr-roadCloud c1"></span><span className="kr-roadCloud c2"></span></div></section>

    <section className="kr-join"><div><span>Gelin Görüşelim</span><small>Çocuğunuzun mutlu ve başarılı bir geleceğe adım atması için bizimle iletişime geçin.</small></div><a href="#contact">Randevu Al →</a></section>

    <footer id="contact" className="kr-footer">
      <div className="kr-footerTop">
        <a className="kr-brand footerBrand" href="#top">
          <Logo/>
          <span><b>{schoolName}</b><small>Bugünün minikleri, yarının büyük adımları</small></span>
        </a>
        <div>
          <b>Hızlı Erişim</b>
          <a href="#about">Kurumsal</a>
          <a href="#classes">Sınıflarımız</a>
          <a href="#ateliers">Atölyeler</a>
          <a href="#gallery">Galeri</a>
          <a href="#news">Duyurular</a>
        </div>
        <div>
          <b>Bize Ulaşın</b>
          <span>☎ {config.phone || "0542 123 45 67"}</span>
          <span>✉ {email}</span>
          <span>⌖ {config.address || "Muğla / Türkiye"}</span>
        </div>
        <div className="kr-social">
          <a href={config.instagramUrl || "#contact"}>◎</a>
          <a href="#contact">f</a>
          <a href="#contact">▶</a>
        </div>
      </div>
      <div className="kr-footerBottom">
        © 2026 {schoolName}. Tüm Hakları Saklıdır.
        <span>FK Digital</span>
      </div>
    </footer>
  </main>;
}
