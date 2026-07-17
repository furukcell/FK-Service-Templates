import { AdaSiteTabs } from "../../src/components/AdaSiteTabs";
import { SeoHead } from "../../src/components/SeoHead";

const paths = [
  {
    href: "/ada/kres",
    eyebrow: "Ada Kreş",
    title: "Güvenli, sevgi dolu ve düzenli kreş ortamı",
    description: "Yaş grupları, günlük akış, sanatla desteklenen gelişim ve ön kayıt bilgileri için kreş bölümünü inceleyin.",
    cta: "Kreş Sayfasına Git",
    mark: "K"
  },
  {
    href: "/ada/sanat",
    eyebrow: "Ada Dans & Müzik Okulu",
    title: "Müzik, ritim ve dansla özgüven kazandıran sanat okulu",
    description: "Dans, müzik, ritim, deneme dersi ve sanat programları için dans & müzik okulu bölümünü inceleyin.",
    cta: "Dans & Müzik Sayfasına Git",
    mark: "S"
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
          <h1>Üstteki sekmeden kreş veya dans & müzik okulunu seçin.</h1>
          <p>
            Ada; aynı çatı altında iki ayrı kurumsal deneyim sunar. Kreş bölümü güvenli eğitim ve günlük akışı anlatır; dans & müzik okulu bölümü ise sanat programları, deneme dersleri ve kayıt taleplerine odaklanır.
          </p>
          <div className="adaGatewayActions">
            <a className="adaGatewayPrimary" href="/ada/kres">Kreş Sekmesine Git</a>
            <a className="adaGatewaySecondary" href="/ada/sanat">Dans & Müzik Sekmesine Git</a>
          </div>
        </div>

        <div className="adaGatewayCards adaGatewayCardsCompact" aria-label="Ada bölümleri">
          {paths.map((item) => (
            <a className="adaChoiceCard" href={item.href} key={item.href}>
              <span className="adaChoiceMark">{item.mark}</span>
              <small>{item.eyebrow}</small>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <strong>{item.cta}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
