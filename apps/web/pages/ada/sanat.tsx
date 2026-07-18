import { AdaSiteTabs } from "../../src/components/AdaSiteTabs";
import { SeoHead } from "../../src/components/SeoHead";
import { adaSanatConfig } from "../../../../configs/ada-sanat";

const programs = [
  {
    title: "Çocuk Dans",
    text: "Ritim, koordinasyon, beden farkındalığı ve grup uyumunu destekleyen eğlenceli dans dersleri.",
    tag: "Hareket"
  },
  {
    title: "Müzik & Ritim",
    text: "Çocukların müziği keşfetmesini, ritim duygusunu ve yaratıcı ifadesini güçlendiren çalışmalar.",
    tag: "Müzik"
  },
  {
    title: "Sahne Hazırlık",
    text: "Özgüven, duruş ve grup performansı için dönemsel etkinlik ve gösteri hazırlıkları.",
    tag: "Sahne"
  }
];

const reasons = ["Deneme dersi bilgisi", "Yaşa göre grup planı", "Kreş + sanat avantajı", "WhatsApp hızlı dönüş"];

export default function AdaSanatPage() {
  return (
    <main className="adaPage adaSanatStandalone">
      <SeoHead title={`${adaSanatConfig.brandName} | ${adaSanatConfig.sector}`} description={adaSanatConfig.heroDescription} canonicalPath="/ada/sanat" />
      <AdaSiteTabs active="sanat" />

      <section className="adaHero adaSanatHero" aria-label="Ada Dans ve Müzik Okulu giriş alanı">
        <div className="adaHeroCopy">
          <span className="adaPill adaPinkPill">Ada Dans & Müzik Okulu</span>
          <h1>Ritimle özgüven, dansla hareket, müzikle ifade.</h1>
          <p>
            Çocukların enerjisini sahne özgüvenine, ritim duygusuna ve yaratıcı ifadeye dönüştüren sıcak bir sanat eğitim alanı.
          </p>
          <div className="adaHeroActions">
            <a className="adaPrimary adaPinkPrimary" href="#request-form">Deneme Dersi Al</a>
            <a className="adaSecondary" href="#programs">Programları İncele</a>
          </div>
        </div>

        <div className="adaArtVisual" aria-hidden="true">
          <div className="adaNote">♪</div>
          <strong>Dans</strong>
          <span>Ritim • Müzik • Sahne</span>
        </div>
      </section>

      <section className="adaStats adaArtStats" aria-label="Ada Dans ve Müzik öne çıkan bilgiler">
        {reasons.map((item) => (
          <div key={item}>
            <strong>✦</strong>
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="adaSection" id="programs">
        <div className="adaSectionHead">
          <span>Programlar</span>
          <h2>Çocuğun enerjisine uygun dans, müzik ve ritim deneyimi.</h2>
        </div>
        <div className="adaCardGrid">
          {programs.map((item) => (
            <article className="adaInfoCard adaArtCard" key={item.title}>
              <small>{item.tag}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="adaSplitSection adaArtSplit">
        <div>
          <span className="adaPill adaPinkPill">Deneme dersi</span>
          <h2>Veliler önce görsün, çocuklar önce deneyimlesin.</h2>
          <p>
            Ders programı, yaş grubu ve kontenjan bilgisi için hızlı talep bırakılır. Kurum ekibi WhatsApp veya telefonla dönüş yapar.
          </p>
        </div>
        <div className="adaMiniPoster">
          <b>ADA</b>
          <strong>Sanatla büyüyen çocuklar</strong>
          <span>Dans • Müzik • Ritim</span>
        </div>
      </section>

      <section className="adaSection" id="gallery">
        <div className="adaSectionHead">
          <span>Galeri</span>
          <h2>Stüdyo, ders ve gösteri fotoğrafları için premium galeri alanı.</h2>
        </div>
        <div className="adaGalleryGrid adaArtGallery">
          {['Dans stüdyosu', 'Ritim çalışması', 'Gösteri hazırlığı'].map((item, index) => (
            <div className="adaGalleryItem" key={item}>
              <b>{index + 1}</b>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="adaFormBand adaArtForm" id="request-form">
        <div>
          <span className="adaPill adaPinkPill">Kayıt bilgisi</span>
          <h2>Dans, müzik ve ritim dersleri için bilgi talebi alın.</h2>
          <p>Gerçek iletişim bilgileri geldiğinde form ve WhatsApp bağlantısı kuruma göre düzenlenecek.</p>
        </div>
        <a className="adaPrimary adaPinkPrimary" href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">WhatsApp’tan Ders Bilgisi Al</a>
      </section>
    </main>
  );
}
