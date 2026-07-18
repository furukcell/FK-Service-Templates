import { AdaSiteTabs } from "../../src/components/AdaSiteTabs";
import { SeoHead } from "../../src/components/SeoHead";

const paths = [
  {
    href: "/ada/kres",
    eyebrow: "Ada Kreş",
    title: "Güvenle büyüyen, sanatla gelişen çocuklar",
    description: "Okul öncesi eğitim, günlük akış, yaş grupları, galeri ve ön kayıt bilgileri için kreş bölümünü inceleyin.",
    cta: "Kreş Bölümünü Aç",
    mark: "K",
    tags: ["2-6 yaş", "Günlük akış", "Ön kayıt"]
  },
  {
    href: "/ada/sanat",
    eyebrow: "Ada Dans & Müzik Okulu",
    title: "Ritim, hareket ve müzikle özgüven kazandıran sanat okulu",
    description: "Dans, müzik, ritim, deneme dersi ve dönem programları için dans & müzik okulu bölümünü inceleyin.",
    cta: "Dans & Müzik Bölümünü Aç",
    mark: "S",
    tags: ["Dans", "Müzik", "Deneme dersi"]
  }
];

export default function AdaGatewayPage() {
  return (
    <main className="adaGateway">
      <SeoHead
        title="Ada Kreş & Dans Müzik Okulu | Milas"
        description="Ada çatısı altında kreş, dans ve müzik okulu için sekmeli iki ayrı bölümden oluşan kurumsal tanıtım sitesi."
        canonicalPath="/ada"
      />
      <AdaSiteTabs active="home" />
      <section className="adaGatewayHero">
        <div className="adaGatewayGlow adaGatewayGlowOne" />
        <div className="adaGatewayGlow adaGatewayGlowTwo" />

        <div className="adaGatewayContent">
          <span className="adaGatewayBadge">Ada Kreş & Sanat Akademisi</span>
          <h1>Çocukların güvenle büyüdüğü, sanatla geliştiği sıcak bir eğitim ortamı.</h1>
          <p>
            Ada; kreş ve dans & müzik okulunu aynı marka çatısı altında sunar. Veliler tek siteden hem okul öncesi eğitim yaklaşımını hem de sanat programlarını inceleyip hızlıca bilgi talebi bırakabilir.
          </p>
          <div className="adaGatewayActions">
            <a className="adaGatewayPrimary" href="/ada/kres">Kreş Ön Kayıt</a>
            <a className="adaGatewaySecondary" href="/ada/sanat">Deneme Dersi Bilgisi</a>
          </div>
        </div>

        <div className="adaGatewayCards adaGatewayCardsCompact" aria-label="Ada bölümleri">
          {paths.map((item) => (
            <a className="adaChoiceCard" href={item.href} key={item.href}>
              <span className="adaChoiceMark">{item.mark}</span>
              <small>{item.eyebrow}</small>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="adaChoiceTags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <strong>{item.cta}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
