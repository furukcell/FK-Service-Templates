import { SeoHead } from "../../src/components/SeoHead";

const features = [
  { icon: "🎨", title: "Sanat", text: "Yaratıcılığı besleyen atölye çalışmaları.", tone: "purple" },
  { icon: "🎵", title: "Müzik", text: "Ritim, şarkı ve enstrüman eğitimi.", tone: "teal" },
  { icon: "🧱", title: "Oyun", text: "Eğitici oyunlarla öğrenme.", tone: "orange" },
  { icon: "🌿", title: "Gelişim", text: "Fiziksel, sosyal ve zihinsel gelişim.", tone: "blue" },
  { icon: "📸", title: "Galeri", text: "Etkinliklerden kareler ve özel anlar.", tone: "pink" },
];

const trust = [
  { icon: "🛡️", title: "Güvenli Ortam", text: "Deneyimli kadro ve hijyenik alanlarda güvenli eğitim." },
  { icon: "❤️", title: "Bireysel İlgi", text: "Her çocuğa özel yaklaşım ve takip sistemi." },
  { icon: "🎓", title: "Uzman Kadro", text: "Alanında uzman öğretmen ve eğitmenler." },
  { icon: "🌱", title: "Doğayla İç İçe", text: "Yeşil alanlar, bahçe etkinlikleri ve doğa sevgisi." },
];

const footer = [
  { icon: "📍", title: "Kolay Ulaşım", text: "Merkezi konum, kolay erişim." },
  { icon: "👨‍👩‍👧", title: "Aile İletişimi", text: "Düzenli bilgilendirme ve açık iletişim." },
  { icon: "📅", title: "Esnek Program", text: "Yaşa ve ihtiyaçlara uygun esnek programlar." },
];

export default function AdaYeniPage() {
  return (
    <main className="adaPosterPage">
      <SeoHead
        title="Ada Yeni | Kreş & Sanat Akademisi"
        description="Ada Kreş & Sanat Akademisi için sıfırdan hazırlanmış yeni premium landing page demo tasarımı."
        canonicalPath="/ada-yeni"
      />

      <section className="adaPosterShell" aria-label="Ada Kreş ve Sanat Akademisi yeni demo">
        <header className="adaPosterHeader">
          <a className="adaPosterLogo" href="/ada-yeni" aria-label="Ada yeni ana sayfa">
            <span className="adaPosterLogoText"><b>A</b><b>d</b><b>a</b><i>✦</i></span>
            <small>KREŞ &amp; SANAT AKADEMİSİ</small>
          </a>

          <nav className="adaPosterTabs" aria-label="Ada bölümleri">
            <a href="/ada/kres" className="isActive"><span>🏡</span> Kreş</a>
            <a href="/ada/sanat"><span>♫</span> Dans &amp; Müzik Okulu</a>
          </nav>

          <div className="adaPosterLinks">
            <a href="#hakkimizda">◎ Hakkımızda</a>
            <a href="#iletisim">☻ İletişim</a>
            <a className="adaPosterContact" href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">☎ Bize Ulaşın</a>
          </div>
        </header>

        <section className="adaPosterHero">
          <article className="adaPosterPanel adaPosterKresPanel">
            <div className="adaPosterTextBlock adaPosterKresText">
              <span className="adaPosterBadge">♥ KREŞ</span>
              <h1>Sevgi dolu<br />kreş deneyimi</h1>
              <p>
                Güvenli, sıcak ve eğlenceli bir ortamda çocukların merakını destekliyor,
                potansiyellerini keşfetmelerine eşlik ediyoruz.
              </p>
              <a className="adaPosterPrimary" href="/ada/kres">Kreşi İncele <span>→</span></a>
            </div>
          </article>

          <article className="adaPosterPanel adaPosterArtPanel">
            <div className="adaPosterTextBlock adaPosterArtText">
              <span className="adaPosterBadge adaPosterPurpleBadge">♫ DANS &amp; MÜZİK OKULU</span>
              <h2>Ritimle özgüven,<br /><strong>dansla hareket</strong></h2>
              <p>
                Dans ve müzikle kendini ifade eden, özgüvenli, yaratıcı ve mutlu bireyler yetiştiriyoruz.
              </p>
              <div className="adaPosterActions">
                <a className="adaPosterPurple" href="/ada/sanat">Programları İncele <span>→</span></a>
                <a className="adaPosterOutline" href="/ada/sanat#request-form">▣ Deneme Dersi Al</a>
              </div>
            </div>
          </article>
        </section>

        <section className="adaPosterFeatures" id="hakkimizda" aria-label="Ada özellikleri">
          {features.map((item) => (
            <article className={`adaPosterFeature tone-${item.tone}`} key={item.title}>
              <b>{item.icon}</b>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <i />
            </article>
          ))}
        </section>

        <section className="adaPosterInfoRow" aria-label="Ada güven ve iletişim">
          <div className="adaPosterTrust">
            {trust.map((item) => (
              <article key={item.title}>
                <b>{item.icon}</b>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <aside className="adaPosterCta" id="iletisim">
            <div>
              <h2>Mutlu çocuklar,<br />güçlü yarınlar!</h2>
              <a href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">Hemen İletişime Geç <span>→</span></a>
            </div>
            <figure>
              <img src="/ada/ada-renkli-eller.png" alt="Renkli boyalı ellerini gösteren çocuklar" />
            </figure>
          </aside>
        </section>

        <footer className="adaPosterFooter">
          {footer.map((item) => (
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
      </section>
    </main>
  );
}
