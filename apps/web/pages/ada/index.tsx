import { SeoHead } from "../../src/components/SeoHead";

const featureCards = [
  { icon: "🎨", title: "Sanat", text: "Yaratıcılığı besleyen atölye çalışmaları.", accent: "purple" },
  { icon: "🎵", title: "Müzik", text: "Ritim, şarkı ve enstrüman eğitimi.", accent: "teal" },
  { icon: "🧱", title: "Oyun", text: "Eğitici oyunlarla öğrenme.", accent: "orange" },
  { icon: "🌿", title: "Gelişim", text: "Fiziksel, sosyal ve zihinsel gelişim.", accent: "blue" },
  { icon: "📸", title: "Galeri", text: "Etkinliklerden kareler ve özel anlar.", accent: "pink" }
];

const trustItems = [
  { icon: "🛡️", title: "Güvenli Ortam", text: "Deneyimli kadro ve hijyenik alanlarda güvenli eğitim." },
  { icon: "❤️", title: "Bireysel İlgi", text: "Her çocuğa özel yaklaşım ve takip sistemi." },
  { icon: "🎓", title: "Uzman Kadro", text: "Alanında uzman öğretmen ve eğitmenler." },
  { icon: "🌱", title: "Doğayla İç İçe", text: "Yeşil alanlar, bahçe etkinlikleri ve doğa sevgisi." }
];

const footerItems = [
  { icon: "📍", title: "Kolay Ulaşım", text: "Merkezi konum, kolay erişim." },
  { icon: "👨‍👩‍👧", title: "Aile İletişimi", text: "Düzenli bilgilendirme ve açık iletişim." },
  { icon: "📅", title: "Esnek Program", text: "Yaşa ve ihtiyaçlara uygun esnek programlar." }
];

export default function AdaGatewayPage() {
  return (
    <main className="adaPlayPage">
      <SeoHead
        title="Ada Kreş & Sanat Akademisi | Kreş, Dans ve Müzik Okulu"
        description="Ada Kreş & Sanat Akademisi için kreş, dans ve müzik okulunu tek çatı altında tanıtan renkli ve modern demo site."
        canonicalPath="/ada"
      />

      <header className="adaPlayHeader" aria-label="Ada ana navigasyon">
        <a className="adaPlayLogo" href="/ada" aria-label="Ada ana sayfa">
          <span className="adaLogoWord"><b>A</b><b>d</b><b>a</b><i>✦</i></span>
          <small>KREŞ &amp; SANAT AKADEMİSİ</small>
        </a>

        <nav className="adaPlayTabs" aria-label="Ada bölümleri">
          <a className="isActive" href="/ada/kres"><span>🏡</span> Kreş</a>
          <a href="/ada/sanat"><span>♫</span> Dans &amp; Müzik Okulu</a>
        </nav>

        <div className="adaPlayTopLinks">
          <a href="#about">◎ Hakkımızda</a>
          <a href="#contact">☻ İletişim</a>
          <a className="adaPlayCall" href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">☎ Bize Ulaşın</a>
        </div>
      </header>

      <section className="adaPlayHero" aria-label="Ada Kreş ve Sanat Akademisi giriş">
        <article className="adaPlayHeroCard adaPlayKresCard">
          <div className="adaPlayBlob adaPlayBlobBlue" />
          <span className="adaPlayBadge">♥ KREŞ</span>
          <h1>Sevgi dolu<br />kreş deneyimi</h1>
          <p>
            Güvenli, sıcak ve eğlenceli bir ortamda çocukların merakını destekliyor,
            potansiyellerini keşfetmelerine eşlik ediyoruz.
          </p>
          <a className="adaPlayPrimary" href="/ada/kres">Kreşi İncele <span>→</span></a>
          <div className="adaPlaySun" aria-hidden="true">☀</div>
          <div className="adaPlayCloud" aria-hidden="true">☁</div>
          <figure className="adaPlayPhoto adaPlayPhotoKres" aria-label="Oyunla öğrenen çocuklar">
            <img
              src="/ada/ada-kres-bloklar.png"
              alt="Renkli bloklarla oynayan çocuklar"
            />
          </figure>
        </article>

        <article className="adaPlayHeroCard adaPlayArtCard">
          <div className="adaPlayBlob adaPlayBlobPink" />
          <span className="adaPlayBadge adaPlayPurpleBadge">♫ DANS &amp; MÜZİK OKULU</span>
          <h2>Ritimle özgüven,<br /><strong>dansla hareket</strong></h2>
          <p>
            Dans ve müzikle kendini ifade eden, özgüvenli, yaratıcı ve mutlu bireyler yetiştiriyoruz.
          </p>
          <div className="adaPlayHeroActions">
            <a className="adaPlayPurple" href="/ada/sanat">Programları İncele <span>→</span></a>
            <a className="adaPlayOutline" href="/ada/sanat#request-form">▣ Deneme Dersi Al</a>
          </div>
          <div className="adaPlayNotes" aria-hidden="true">♪ ♫ ✦</div>
          <figure className="adaPlayDancer" aria-label="Dans eğitimi alan çocuk">
            <img
              src="/ada/ada-bale.png"
              alt="Bale yapan çocuk"
            />
          </figure>
          <figure className="adaPlayMusicKid" aria-label="Müzik eğitimi alan çocuk">
            <img
              src="/ada/ada-gitar.png"
              alt="Gitar çalan çocuk"
            />
          </figure>
        </article>
      </section>

      <section className="adaPlayFeatures" id="about" aria-label="Ada program özellikleri">
        {featureCards.map((item) => (
          <article className={`adaPlayFeature adaAccent-${item.accent}`} key={item.title}>
            <b>{item.icon}</b>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <i />
          </article>
        ))}
      </section>

      <section className="adaPlayTrustAndCta" aria-label="Ada güven ve iletişim alanı">
        <div className="adaPlayTrustBand">
          {trustItems.map((item) => (
            <article key={item.title}>
              <b>{item.icon}</b>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <aside className="adaPlayYellowCta" id="contact">
          <div>
            <h2>Mutlu çocuklar,<br />güçlü yarınlar!</h2>
            <a href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">Hemen İletişime Geç <span>→</span></a>
          </div>
          <figure className="adaPlayHappyKids" aria-label="Sanatla mutlu çocuklar">
            <img
              src="/ada/ada-renkli-eller.png"
              alt="Renkli boyalı ellerini gösteren çocuklar"
            />
          </figure>
        </aside>
      </section>

      <footer className="adaPlayFooter">
        {footerItems.map((item) => (
          <article key={item.title}>
            <b>{item.icon}</b>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
        <strong>Hayal et, keşfet, parılda! ✨</strong>
      </footer>
    </main>
  );
}
