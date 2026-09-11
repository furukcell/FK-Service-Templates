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
  ["Ana Sayfa", "#top"], ["Kurumsal", "#about"], ["Atölyelerimiz", "#workshops"],
  ["Galeri", "#gallery"], ["Duyurular", "#news"], ["İletişim", "#contact"]
] as const;

export function KindergartenReferenceLayout({ config, onLayoutChange }: Props) {
  const schoolName = config.brandName || "Bilim Çocuk Anaokulu";
  const email = `info@${slugify(schoolName)}.com`;
  const hero = "/images/logos/bilim-cocuk-hero.png";
  const gallery = config.galleryItems || [];
  const news = config.campaignItems?.length ? config.campaignItems.slice(0, 3) : [
    { title: "Renkli Eller Atölyesi", description: "Miniklerimizle yaratıcılığımızı renklerle konuşturduk." },
    { title: "Doğa Günümüz", description: "Bahçemizde doğayı keşfettik, eğlendik ve öğrendik." },
    { title: "Yıl Sonu Gösterimiz", description: "Miniklerimizin hazırladığı gösteriye sizleri de bekliyoruz." }
  ];
  const stats = [["🎓", "150+", "Mutlu Öğrenci"], ["📚", "20+", "Eğitici Atölye"], ["🚌", "5+", "Servis Güzergahı"], ["😊", "10+", "Yıllık Deneyim"]];
  const classes = ["Minik Kaşifler", "Renkli Düşler", "Meraklı Mucitler", "Büyük Adımlar"];
  const workshops = ["Bilim Atölyesi", "Sanat & Tasarım", "Müzik ve Ritim", "Doğa ve Bahçe", "Drama", "Kodlama ve Robotik"];
  const staff = ["Sınıf Öğretmenlerimiz", "Çocuk Gelişimi Uzmanımız", "Rehberlik Uzmanımız", "Yardımcı Öğretmenlerimiz"];
  const storyPhotos = [
    ["/images/logos/bilim-cocuk-bahce-oyunlari.png", "Bahçe oyunları"],
    ["/images/logos/bilim-cocuk-boyama-etkinligi.png", "Boyama etkinliği"]
  ] as const;

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

    <section className="kr-waveSection kr-classesWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">SINIFLARIMIZ</span><h2>Her yaşa özel <strong>öğrenme alanları</strong></h2><p>Çocuklarımızın yaşına, gelişimine ve meraklarına uygun sıcak sınıflar.</p></div><div className="kr-cardGrid">{classes.map((x,i) => <article className="kr-featureCard" key={x}><div className="kr-cardIcon">{["🧸","🎨","🔬","🚀"][i]}</div><h3>{x}</h3><p>Oyun, keşif ve arkadaşlıkla öğrenmenin keyfini çıkaran özel sınıf ortamı.</p><a href="#contact">Sınıfı Keşfet →</a></article>)}</div></div></section>

    <section id="workshops" className="kr-waveSection kr-workshopsWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">KEŞFET • ÜRET • EĞLEN</span><h2>Sınıflarımız ve <strong>Atölyeler</strong></h2><p>Yaparak ve yaşayarak öğrenmeyi destekleyen eğlenceli çalışmalar.</p></div><div className="kr-workshopGrid">{workshops.map((x,i)=><article className="kr-workshopCard" key={x}><div className="kr-workshopVisual">{["🔬","🎨","🎵","🌱","🎭","🤖"][i]}</div><b>{x}</b><small>Uygulamalı etkinlik</small></article>)}</div></div></section>

    <section id="news" className="kr-waveSection kr-newsWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">{schoolName.toUpperCase()}'DAN HABERLER</span><h2>Etkinlik ve Duyurular</h2><a href="#contact">Tüm Duyurular →</a></div><div className="kr-newsGrid">{news.map((item,i)=><article className="kr-newsCard" key={`${item.title}-${i}`}><div className="kr-newsImage"><Photo src={gallery[i]?.imageUrl} title={item.title}/><span>{i===0?"12 EYLÜL":i===1?"05 EYLÜL":"01 EYLÜL"}</span></div><div className="kr-newsBody"><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">Daha Fazla →</a></div></article>)}</div><span className="kr-elephant">🐘</span></div></section>

    <section id="gallery" className="kr-waveSection kr-galleryWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">ÇOCUKLARIMIZDAN KARELER</span><h2>Galerimiz</h2></div><div className="kr-galleryGrid">{[0,1,2,3,4,5].map(n => <Photo key={n} src={gallery[n]?.imageUrl} title={`Galeri ${n+1}`} className={`galleryPhoto g${n+1}`}/>)}</div></div></section>

    <section className="kr-waveSection kr-staffWave"><div className="kr-waveInner"><div className="kr-sectionHead"><span className="kr-kicker">AİLEMİZ</span><h2>Kurum Personelimiz</h2><p>Çocuklarımızın gelişimine sevgi, deneyim ve uzmanlıkla eşlik eden ekibimiz.</p></div><div className="kr-staffGrid">{staff.map((x,i)=><article key={x}><Photo src={gallery[i+6]?.imageUrl} title={x}/><div><b>{x}</b><span>{schoolName}</span></div></article>)}</div></div></section>

    <section className="kr-join"><div><span>Gelin, {schoolName} Ailemize Katılın</span><small>Çocuğunuzun mutlu ve başarılı bir geleceğe adım atması için bizimle iletişime geçin.</small></div><a href="#contact">Randevu Al →</a><div className="kr-bunny" aria-hidden="true">🐰</div></section>

    <footer id="contact" className="kr-footer"><div className="kr-footerTop"><a className="kr-brand footerBrand" href="#top"><Logo/><span><b>{schoolName}</b><small>Bugünün minikleri, yarının büyük adımları</small></span></a><div><b>Hızlı Erişim</b><a href="#about">Kurumsal</a><a href="#workshops">Atölyelerimiz</a><a href="#gallery">Galeri</a><a href="#news">Duyurular</a></div><div><b>Bize Ulaşın</b><span>☎ {config.phone || "0542 123 45 67"}</span><span>✉ {email}</span><span>⌖ {config.address || "Muğla / Türkiye"}</span></div><div className="kr-social"><a href={config.instagramUrl || "#contact"}>◎</a><a href="#contact">f</a><a href="#contact">▶</a></div></div><div className="kr-footerBottom">© 2026 {schoolName}. Tüm Hakları Saklıdır.<span>FK Digital</span></div></footer>
  </main>;
}