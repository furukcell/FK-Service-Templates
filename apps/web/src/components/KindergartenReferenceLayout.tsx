import type { BusinessTemplateConfig } from "@fk-templates/shared";

type Props = {
  config: BusinessTemplateConfig;
  onLayoutChange?: (layout: "corporate" | "kindergarten-reference") => void;
};

const fallbackHero = "https://picsum.photos/seed/bilim-cocuk-anaokulu/1800/1050";
const schoolName = "Bilim Çocuk Anaokulu";

function logoMark() {
  return (
    <span className="kr-logoMark" aria-hidden="true">
      <svg viewBox="0 0 54 54" role="img">
        <circle cx="27" cy="27" r="25" fill="#fff" />
        <path d="M16 32c-7-8 1-19 10-12 4-8 17-3 15 7-1 8-12 11-25 5Z" fill="#2196f3" />
        <circle cx="21" cy="22" r="4" fill="#64b5f6" />
        <circle cx="35" cy="20" r="4" fill="#1565c0" />
        <path d="M18 34c4 7 17 9 22 0" fill="none" stroke="#0d47a1" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Sun() { return <div className="kr-sun" aria-hidden="true"><span>☻</span></div>; }
function Cloud({ className = "" }: { className?: string }) { return <div className={`kr-cloud ${className}`} aria-hidden="true"><i /><i /><i /></div>; }
function Flower({ className = "" }: { className?: string }) { return <div className={`kr-flower ${className}`} aria-hidden="true"><span>✿</span></div>; }
function Rocket() { return <div className="kr-rocket" aria-hidden="true">🚀</div>; }
function Teddy() { return <div className="kr-teddy" aria-hidden="true"><div className="kr-ear l"/><div className="kr-ear r"/><div className="kr-teddyFace">●ᴗ●</div><div className="kr-tummy">♥</div></div>; }
function Bunny() { return <div className="kr-bunny" aria-hidden="true"><div className="kr-bunnyEar l"/><div className="kr-bunnyEar r"/><div className="kr-bunnyFace">●ᴗ●</div></div>; }
function Elephant() { return <div className="kr-elephant" aria-hidden="true">🐘</div>; }
function Hill({ className = "" }: { className?: string }) { return <div className={`kr-hill ${className}`} aria-hidden="true"><Flower className="one"/><Flower className="two"/><span className="kr-bush"/><span className="kr-bush b2"/></div>; }

function Photo({ src, title, className = "" }: { src?: string; title: string; className?: string }) {
  return <div className={`kr-photo ${className}`}>
    {src ? <img src={src} alt={title} /> : <div className="kr-photoPlaceholder"><span>FOTOĞRAF</span><small>{title}</small></div>}
  </div>;
}

export function KindergartenReferenceLayout({ config, onLayoutChange }: Props) {
  const hero = config.heroSlides?.[0]?.imageUrl || fallbackHero;
  const gallery = config.galleryItems || [];
  const photoA = gallery[0]?.imageUrl;
  const photoB = gallery[1]?.imageUrl;
  const stats = [
    { value: "150+", label: "Mutlu Öğrenci", icon: "🎓" },
    { value: "20+", label: "Eğitici Atölye", icon: "📚" },
    { value: "5+", label: "Servis Güzergahı", icon: "🚌" },
    { value: "10+", label: "Yıllık Deneyim", icon: "☺" }
  ];
  const news = config.campaignItems?.length ? config.campaignItems.slice(0, 3) : [
    { title: "Renkli Eller Atölyesi", description: "Miniklerimizle birlikte yaratıcılığımızı renklerle konuşturduk." },
    { title: "Doğa Günümüz", description: "Bahçemizde doğayı keşfettik, eğlendik ve öğrendik." },
    { title: "Yıl Sonu Gösterimiz", description: "Miniklerimizin yıl boyunca hazırladığı gösteriye sizleri de bekliyoruz." }
  ];

  return (
    <main className="kr-site">
      <style>{`
        .kr-site{--pink:#1976d2;--pink2:#42a5f5;--purple:#0d47a1;--purple2:#1565c0;--green:#43a5df;--green2:#2f8fc8;--blue:#64c5f3;--lav:#9acbff}
        .kr-navLinks a.active,.kr-navCta,.kr-pinkBtn{background:linear-gradient(135deg,#1976d2,#42a5f5)!important}
        .kr-facts article>span{background:#1976d2!important;box-shadow:0 0 0 1px #1976d2!important}
        .kr-facts article:nth-child(2)>span{background:#42a5f5!important;box-shadow:0 0 0 1px #42a5f5!important}
        .kr-stats{background:linear-gradient(135deg,#1687cf,#49b5e8)!important}
        .kr-signpost b{background:#1976d2!important}.kr-signpost b:nth-child(2){background:#42a5f5!important}.kr-signpost b:nth-child(3){background:#0d47a1!important}
        .kr-join{background:linear-gradient(90deg,#0d47a1,#42a5f5)!important}
        .kr-newsImage>span{background:#42a5f5!important;color:#fff!important}
        .kr-join>a{color:#0d47a1!important}
        .kr-kicker,.kr-newsBody a,.kr-sectionHead>a{color:#1976d2!important}
        .kr-search{border-color:#1976d2!important;color:#1976d2!important}
        .kr-brand b{color:#1976d2!important}
        .kr-logoMark svg path{fill:#2196f3}.kr-logoMark svg circle:nth-of-type(1){fill:#eaf6ff}.kr-logoMark svg circle:nth-of-type(2){fill:#64b5f6}.kr-logoMark svg circle:nth-of-type(3){fill:#1565c0}.kr-logoMark svg path:last-child{stroke:#0d47a1}
        .kr-hero h1 strong{color:#8fd3ff!important}
        .kr-sectionHead h2 i{color:#42a5f5!important}
        .kr-navCta,.kr-pinkBtn{box-shadow:0 8px 18px rgba(25,118,210,.24)!important}
      `}</style>
      <nav className="kr-nav">
        <a className="kr-brand" href="#top" aria-label={schoolName}>{logoMark()}<span><b>{schoolName}</b><small>Bilimle büyüyen, mutlu çocuklar</small></span></a>
        <div className="kr-navLinks">
          {['Ana Sayfa', 'Kurumsal', 'Atölyelerimiz', 'Galeri', 'Duyurular', 'İletişim'].map((item, i) => <a key={item} className={i === 0 ? 'active' : ''} href={i === 0 ? '#top' : i === 1 ? '#about' : i === 2 ? '#news' : i === 3 ? '#news' : i === 4 ? '#news' : '#contact'}>{item}</a>)}
        </div>
        <div className="kr-navRight">
          <div className="kr-layoutPicker" aria-label="Anaokulu tasarım seçimi">
            <button className="isActive" type="button" aria-current="page">Bilim Çocuk</button>
            {onLayoutChange ? <button type="button" onClick={() => onLayoutChange('corporate')}>Kurumsal</button> : null}
          </div>
          <button className="kr-search" aria-label="Ara">⌕</button><a className="kr-navCta" href="#contact">Kayıt &amp; Bilgi Al</a>
        </div>
      </nav>

      <header id="top" className="kr-hero">
        <div className="kr-heroImage" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,39,78,.55), rgba(5,39,78,.12) 62%, rgba(5,39,78,0)), url(${hero})` }} />
        <div className="kr-heroOverlay" />
        <Sun /><Cloud className="heroCloud" /><Rocket /><Teddy />
        <div className="kr-heroCopy">
          <span className="kr-scribble">SEVGİ • BİLİM • KEŞİF</span>
          <h1><span>Bilim Çocuk</span><strong>Büyük Yarınlara</strong></h1>
          <p>Sevgi, güven ve keşifle dolu<br />bir öğrenme yolculuğu...</p>
          <a className="kr-pinkBtn" href="#contact">Okulumuzu Keşfedin <b>→</b></a>
        </div>
        <div className="kr-sign"><b>Oyna</b><b>Keşfet</b><b>Öğren</b><b>Büyü</b></div>
        <div className="kr-scroll">◉</div>
        <Hill className="heroHill" />
      </header>

      <section id="about" className="kr-story kr-paper kr-reveal">
        <div className="kr-storyInner">
          <div className="kr-storyPhotos">
            <Photo src={photoA} title="Sınıf etkinliği" className="photoA" />
            <Photo src={photoB} title="Öğretmen ve çocuklar" className="photoB" />
            <div className="kr-dashedCircle" /><div className="kr-ball">◕</div><div className="kr-heartBubble">♡</div><span className="kr-bird">•ᴗ•</span>
          </div>
          <div className="kr-storyCopy">
            <span className="kr-kicker">BİZİM İÇİN EN DEĞERLİSİ</span>
            <h2>Odağımız Çocuklarımızın <strong>İyiliği</strong></h2>
            <p>Bilim Çocuk Anaokulu olarak, her çocuğun kendine özgü bir keşif yolculuğuna sahip olduğuna inanıyoruz. Sevgi dolu, güvenli ve destekleyici bir ortamda çocuklarımızın potansiyellerini en iyi şekilde ortaya çıkarmaları için çalışıyoruz.</p>
            <div className="kr-facts">
              <article><span>♡</span><div><b>Güvenli Ortam</b><small>Çocuklarımızın fiziksel, duygusal ve sosyal olarak güvende hissettiği bir ortam.</small></div></article>
              <article><span>♟</span><div><b>Uzman Kadro</b><small>Alanında deneyimli, çocuk gelişimi konusunda uzman öğretmenler.</small></div></article>
            </div>
            <a className="kr-pinkBtn small" href="#contact">Bizi Daha Yakından Tanıyın <b>→</b></a>
          </div>
        </div>
      </section>

      <section className="kr-stats kr-reveal">
        <Hill className="statsHill" />
        <div className="kr-statsInner">
          {stats.map(stat => <article className="kr-stat" key={stat.label}><div className="kr-statIcon">{stat.icon}</div><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
        </div>
        <div className="kr-signpost"><b>DAHA MUTLU</b><b>DAHA ÖZGÜVENLİ</b><b>DAHA YARATICI</b></div>
        <div className="kr-bee">🐝</div>
      </section>

      <section id="news" className="kr-news kr-paper kr-reveal">
        <Cloud className="newsCloud l" /><Cloud className="newsCloud r" /><Elephant />
        <div className="kr-sectionHead"><span className="kr-kicker">BİLİM ÇOCUK’TAN HABERLER</span><h2>Duyurular &amp; Etkinlikler <i>〽</i></h2><a href="#contact">Tüm Duyurular →</a></div>
        <div className="kr-newsGrid">
          {news.map((item, index) => <article className="kr-newsCard" key={`${item.title}-${index}`}>
            <div className="kr-newsImage"><Photo src={gallery[index]?.imageUrl} title={item.title} /><span>{index === 0 ? '12 EYLÜL 2025' : index === 1 ? '5 EYLÜL 2025' : '1 EYLÜL 2025'}</span></div>
            <div className="kr-newsBody"><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">Daha Fazla →</a></div>
          </article>)}
        </div>
      </section>

      <section id="join" className="kr-join kr-reveal">
        <Hill className="joinHill" /><Bunny />
        <div><span>Gelin, Bilim Çocuk Ailemize Katılın</span><small>Çocuğunuzun mutlu, meraklı ve başarılı bir geleceğe adım atması için bizimle iletişime geçin.</small></div>
        <a href="#contact">Randevu Al →</a>
      </section>

      <section id="contact" className="kr-footer">
        <div className="kr-footerTop">
          <a className="kr-brand footerBrand" href="#top">{logoMark()}<span><b>{schoolName}</b><small>Bilimle büyüyen, mutlu çocuklar</small></span></a>
          <div><b>Hızlı Erişim</b><a href="#top">Ana Sayfa</a><a href="#about">Kurumsal</a><a href="#news">Atölyelerimiz</a><a href="#news">Duyurular</a><a href="#contact">İletişim</a></div>
          <div><b>Bize Ulaşın</b><span>☎ {config.phone}</span><span>✉ info@bilimcocukanaokulu.com</span><span>⌖ {config.address}</span></div>
          <div className="kr-social"><a href={config.instagramUrl || '#'}>◎</a><a href="#contact">f</a><a href="#contact">▶</a></div>
        </div>
        <div className="kr-footerBottom">© 2026 {schoolName}. Tüm Hakları Saklıdır.<span>Tasarım: FK Digital</span></div>
        {onLayoutChange ? <button className="kr-backToCorporate" type="button" onClick={() => onLayoutChange('corporate')}>Kurumsal tasarıma dön</button> : null}
      </section>
    </main>
  );
}
