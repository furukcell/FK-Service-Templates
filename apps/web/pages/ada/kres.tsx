import { AdaSiteTabs } from "../../src/components/AdaSiteTabs";
import { SeoHead } from "../../src/components/SeoHead";
import { adaKresConfig } from "../../../../configs/ada-kres";

const strengths = [
  { value: "2-6", label: "yaş grubu" },
  { value: "30", label: "öğrenci kapasitesi" },
  { value: "Günlük", label: "veli bilgilendirme" },
  { value: "Sanat", label: "destekli eğitim" }
];

const ageGroups = [
  {
    title: "Oyun Grubu",
    text: "Sosyalleşme, öz bakım, güvenli oyun ve sınıfa uyum odaklı küçük yaş grubu programı.",
    tag: "2-3 yaş"
  },
  {
    title: "Anaokulu Programı",
    text: "Dil gelişimi, motor beceriler, sanat etkinlikleri ve düzenli günlük akışla desteklenen program.",
    tag: "3-5 yaş"
  },
  {
    title: "Okula Hazırlık",
    text: "Dikkat, sorumluluk, sosyal uyum ve temel akademik hazırlık çalışmalarıyla ilkokula güvenli geçiş.",
    tag: "5-6 yaş"
  }
];

const dayFlow = [
  "Karşılama ve serbest oyun",
  "Kahvaltı ve sabah çemberi",
  "Sanat, müzik ve keşif etkinlikleri",
  "Öğle yemeği ve dinlenme",
  "Bahçe, hareket ve veli bilgilendirme"
];

const gallery = ["Sınıf ortamı", "Sanat etkinliği", "Bahçe ve hareket"];

export default function AdaKresPage() {
  return (
    <main className="adaPage adaKresStandalone">
      <SeoHead title={`${adaKresConfig.brandName} | ${adaKresConfig.sector}`} description={adaKresConfig.heroDescription} canonicalPath="/ada/kres" />
      <AdaSiteTabs active="kres" />

      <section className="adaHero adaKresHero" aria-label="Ada Kreş giriş alanı">
        <div className="adaHeroCopy">
          <span className="adaPill">Ada Kreş • Okul öncesi eğitim</span>
          <h1>Güvenle büyüyen, sanatla gelişen çocuklar.</h1>
          <p>
            Sevgi dolu sınıflar, güvenli oyun alanları ve çocuğun gelişimini destekleyen sanat, müzik ve keşif temelli günlük akış.
          </p>
          <div className="adaHeroActions">
            <a className="adaPrimary" href="#request-form">Ön Kayıt Oluştur</a>
            <a className="adaSecondary" href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">WhatsApp’tan Bilgi Al</a>
          </div>
        </div>

        <div className="adaKresVisual" aria-hidden="true">
          <div className="adaSun" />
          <div className="adaVisualCard">
            <span>AD</span>
            <strong>Günlük akış</strong>
            <em>Oyun • Sanat • Gelişim</em>
          </div>
          <div className="adaChild adaChildOne">☺</div>
          <div className="adaChild adaChildTwo">✿</div>
        </div>
      </section>

      <section className="adaStats" aria-label="Ada Kreş öne çıkan bilgiler">
        {strengths.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="adaSection" id="services">
        <div className="adaSectionHead">
          <span>Yaş grupları</span>
          <h2>Çocuğun yaşına uygun sıcak ve düzenli program.</h2>
        </div>
        <div className="adaCardGrid">
          {ageGroups.map((item) => (
            <article className="adaInfoCard" key={item.title}>
              <small>{item.tag}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="adaSplitSection" id="campaigns">
        <div>
          <span className="adaPill">Günlük akış</span>
          <h2>Velinin içini rahatlatan, çocuğun ritmini koruyan gün.</h2>
          <p>
            Ada Kreş’te gün; oyun, beslenme, sanat, dinlenme ve hareket dengesiyle planlanır. Gün sonunda veliye düzenli bilgilendirme yapılır.
          </p>
        </div>
        <ol className="adaTimeline">
          {dayFlow.map((item) => <li key={item}>{item}</li>)}
        </ol>
      </section>

      <section className="adaSection" id="gallery">
        <div className="adaSectionHead">
          <span>Galeri</span>
          <h2>Gerçek fotoğraflar geldiğinde burada kurumu göstereceğiz.</h2>
        </div>
        <div className="adaGalleryGrid">
          {gallery.map((item, index) => (
            <div className="adaGalleryItem" key={item}>
              <b>{index + 1}</b>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="adaFormBand" id="request-form">
        <div>
          <span className="adaPill">Ön kayıt</span>
          <h2>Kayıt, kontenjan ve görüşme bilgisi için hızlı talep bırakın.</h2>
          <p>Form aktif edildiğinde veli adı, telefon, çocuk yaşı ve görüşme tarihi alınacak. Şimdilik demo CTA olarak WhatsApp’a yönlendiriyoruz.</p>
        </div>
        <a className="adaPrimary" href="https://wa.me/905xxxxxxxxx" target="_blank" rel="noreferrer">WhatsApp’tan Ön Kayıt Al</a>
      </section>
    </main>
  );
}
