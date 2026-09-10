import type { BusinessTemplateConfig } from "@fk-templates/shared";

type Props = {
  config: BusinessTemplateConfig;
  onLayoutChange?: (layout: "corporate" | "kindergarten-reference") => void;
};

const fallbackHero = "https://picsum.photos/seed/minik-adimlar-reference/1800/1050";

function logoMark() {
  return (
    <span className="kr-logoMark" aria-hidden="true">
      <svg viewBox="0 0 54 54" role="img">
        <circle cx="27" cy="27" r="25" fill="#fff" />
        <path d="M16 32c-7-8 1-19 10-12 4-8 17-3 15 7-1 8-12 11-25 5Z" fill="#ff4b87" />
        <circle cx="21" cy="22" r="4" fill="#ffd447" />
        <circle cx="35" cy="20" r="4" fill="#69c95b" />
        <path d="M18 34c4 7 17 9 22 0" fill="none" stroke="#34206e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Sun() {
  return <div className="kr-sun" aria-hidden="true"><span>☻</span></div>;
}
function Cloud({ className = "" }: { className?: string }) {
  return <div className={`kr-cloud ${className}`} aria-hidden="true"><i /><i /><i /></div>;
}
function Flower({ className = "" }: { className?: string }) {
  return <div className={`kr-flower ${className}`} aria-hidden="true"><span>✿</span></div>;
}
function Rocket() {
  return <div className="kr-rocket" aria-hidden="true">🚀</div>;
}
function Teddy() {
  return <div className="kr-teddy" aria-hidden="true"><div className="kr-ear l"/><div className="kr-ear r"/><div className="kr-teddyFace">●ᴗ●</div><div className="kr-tummy">♥</div></div>;
}
function Bunny() {
  return <div className="kr-bunny" aria-hidden="true"><div className="kr-bunnyEar l"/><div className="kr-bunnyEar r"/><div className="kr-bunnyFace">●ᴗ●</div></div>;
}
function Elephant() {
  return <div className="kr-elephant" aria-hidden="true">🐘</div>;
}
function Hill({ className = "" }: { className?: string }) {
  return <div className={`kr-hill ${className}`} aria-hidden="true"><Flower className="one"/><Flower className="two"/><span className="kr-bush"/><span className="kr-bush b2"/></div>;
}

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
      <nav className="kr-nav">
        <a className="kr-brand" href="#top" aria-label={config.brandName}>{logoMark()}<span><b>{config.brandName}</b><small>Bugünün minikleri, yarının büyük adamları</small></span></a>
        <div className="kr-navLinks">
          {['Ana Sayfa', 'Kurumsal', 'Atölyelerimiz', 'Galeri', 'Duyurular', 'İletişim'].map((item, i) => <a key={item} className={i === 0 ? 'active' : ''} href={i === 0 ? '#top' : i === 2 ? '#workshops' : i === 3 ? '#gallery' : i === 4 ? '#news' : '#contact'}>{item}</a>)}
        </div>
        <div className="kr-navRight"><button className="kr-search" aria-label="Ara">⌕</button><a className="kr-navCta" href="#contact">Kayıt &amp; Bilgi Al</a></div>
      </nav>

      <header id="top" className="kr-hero">
        <div className="kr-heroImage" style={{ backgroundImage: `linear-gradient(90deg, rgba(19,15,45,.5), rgba(19,15,45,.08) 62%, rgba(19,15,45,0)), url(${hero})` }} />
        <div className="kr-heroOverlay" />
        <Sun /><Cloud className="heroCloud" /><Rocket /><Teddy />
        <div className="kr-heroCopy">
          <span className="kr-scribble">SEVGİ • GÜVEN • KEŞİF</span>
          <h1><span>Minik Adımlar</span><strong>Büyük Yarınlara</strong></h1>
          <p>Sevgi, güven ve keşifle dolu<br />bir öğrenme yolculuğu...</p>
          <a className="kr-pinkBtn" href="#contact">Okulumuzu Keşfedin <b>→</b></a>
        </div>
        <div className="kr-sign"><b>Oyna</b><b>Keşfet</b><b>Öğren</b><b>Büyü</b></div>
        <div className="kr-scroll">◉</div>
        <Hill className="heroHill" />
      </header>

      <section id="about" className="kr-story kr-paper">
        <div className="kr-storyInner">
          <div className="kr-storyPhotos">
            <Photo src={photoA} title="Sınıf etkinliği" className="photoA" />
            <Photo src={photoB} title="Öğretmen ve çocuklar" className="photoB" />
            <div className="kr-dashedCircle" /><div className="kr-ball">◕</div><div className="kr-heartBubble">♡</div><span className="kr-bird">•ᴗ•</span>
          </div>
          <div className="kr-storyCopy">
            <span className="kr-kicker">BİZİM İÇİN EN DEĞERLİSİ</span>
            <h2>Odağımız Çocuklarımızın <strong>İyiliği</strong></h2>
            <p>Minik Adımlar Kreşi olarak, her çocuğun kendine özgü bir keşif yolculuğuna sahip olduğuna inanıyoruz. Sevgi dolu, güvenli ve destekleyici bir ortamda çocuklarımızın potansiyellerini en iyi şekilde ortaya çıkarmaları için çalışıyoruz.</p>
            <div className="kr-facts">
              <article><span>♡</span><div><b>Güvenli Ortam</b><small>Çocuklarımızın fiziksel, duygusal ve sosyal olarak güvende hissettiği bir ortam.</small></div></article>
              <article><span>♟</span><div><b>Uzman Kadro</b><small>Alanında deneyimli, çocuk gelişimi konusunda uzman öğretmenler.</small></div></article>
            </div>
            <a className="kr-pinkBtn small" href="#contact">Bizi Daha Yakından Tanıyın <b>→</b></a>
          </div>
        </div>
      </section>

      <section className="kr-stats">
        <Hill className="statsHill" />
        <div className="kr-statsInner">
          {stats.map(stat => <article className="kr-stat" key={stat.label}><div className="kr-statIcon">{stat.icon}</div><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
        </div>
        <div className="kr-signpost"><b>DAHA MUTLU</b><b>DAHA ÖZGÜVENLİ</b><b>DAHA YARATICI</b></div>
        <div className="kr-bee">🐝</div>
      </section>

      <section id="news" className="kr-news kr-paper">
        <Cloud className="newsCloud l" /><Cloud className="newsCloud r" /><Elephant />
        <div className="kr-sectionHead"><span className="kr-kicker">MİNİK ADIMLAR’DAN HABERLER</span><h2>Duyurular &amp; Etkinlikler <i>〽</i></h2><a href="#contact">Tüm Duyurular →</a></div>
        <div className="kr-newsGrid">
          {news.map((item, index) => <article className="kr-newsCard" key={`${item.title}-${index}`}>
            <div className="kr-newsImage"><Photo src={item.title === gallery[0]?.title ? gallery[0]?.imageUrl : undefined} title={item.title} /><span>{index === 0 ? '12 EYLÜL 2025' : index === 1 ? '5 EYLÜL 2025' : '1 EYLÜL 2025'}</span></div>
            <div className="kr-newsBody"><h3>{item.title}</h3><p>{item.description}</p><a href="#contact">Daha Fazla →</a></div>
          </article>)}
        </div>
      </section>

      <section id="workshops" className="kr-join">
        <Hill className="joinHill" /><Bunny />
        <div><span>Gelin, Minik Adımlar Ailemize Katılın</span><small>Çocuğunuzun mutlu ve başarılı bir geleceğe adım atması için bizimle iletişime geçin.</small></div>
        <a href="#contact">Randevu Al →</a>
      </section>

      <section id="gallery" className="kr-workshops kr-paper">
        <div className="kr-sectionHead"><span className="kr-kicker">OYUN • SANAT • KEŞİF</span><h2>Atölyelerimiz</h2></div>
        <div className="kr-workshopGrid">
          {(config.workshops || []).slice(0, 3).map((workshop, index) => <article key={workshop.title} className="kr-workshopCard"><div className="kr-workshopVisual">{workshop.imageUrl ? <img src={workshop.imageUrl} alt="" /> : <span>{['🎨','🧩','♟'][index]}</span>}</div><b>{workshop.title}</b><small>{workshop.ageRange}</small><p>{workshop.description}</p></article>)}
        </div>
      </section>

      <section id="contact" className="kr-footer">
        <div className="kr-footerTop">
          <a className="kr-brand footerBrand" href="#top">{logoMark()}<span><b>{config.brandName}</b><small>Bugünün minikleri, yarının büyük adamları</small></span></a>
          <div><b>Hızlı Erişim</b><a href="#top">Ana Sayfa</a><a href="#about">Kurumsal</a><a href="#workshops">Atölyelerimiz</a></div>
          <div><b>Bize Ulaşın</b><span>☎ {config.phone}</span><span>✉ info@minikadimlar.com</span><span>⌖ {config.address}</span></div>
          <div className="kr-social"><a href={config.instagramUrl || '#'}>◎</a><a href="#contact">f</a><a href="#contact">▶</a></div>
        </div>
        <div className="kr-footerBottom">© 2025 {config.brandName}. Tüm Hakları Saklıdır.<span>Tasarım: FK Digital</span></div>
        {onLayoutChange ? <button className="kr-backToCorporate" type="button" onClick={() => onLayoutChange('corporate')}>Kurumsal tasarıma dön</button> : null}
      </section>
    </main>
  );
}
