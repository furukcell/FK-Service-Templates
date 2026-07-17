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
    eyebrow: "Ada Müzik & Dans Okulu",
    title: "Müzik, ritim ve dansla özgüven kazandıran sanat okulu",
    description: "Dans, müzik, ritim, deneme dersi ve sanat programları için müzik & dans okulu bölümünü inceleyin.",
    cta: "Müzik & Dans Sayfasına Git",
    mark: "S"
  }
];

export default function AdaGatewayPage() {
  return (
    <main className="adaGateway">
      <SeoHead
        title="Ada Kreş & Müzik Dans Okulu | Milas"
        description="Ada çatısı altında kreş, müzik ve dans okulu için iki ayrı bölümden oluşan kurumsal tanıtım sitesi."
        canonicalPath="/ada"
      />
      <section className="adaGatewayHero">
        <div className="adaGatewayGlow adaGatewayGlowOne" />
        <div className="adaGatewayGlow adaGatewayGlowTwo" />
        <nav className="adaGatewayNav">
          <a className="adaGatewayLogo" href="/ada" aria-label="Ada ana sayfa">
            <span>A</span>
            <strong>Ada</strong>
          </a>
          <div>
            <a href="/ada/kres">Kreş</a>
            <a href="/ada/sanat">Müzik & Dans</a>
          </div>
        </nav>

        <div className="adaGatewayContent">
          <span className="adaGatewayBadge">Ada Kreş & Sanat Akademisi</span>
          <h1>Tek çatı altında iki ayrı deneyim: güvenli kreş, ilham veren müzik ve dans okulu.</h1>
          <p>
            Ada; çocukların hem güvenli bir kreş ortamında büyümesini hem de sanat, ritim ve hareketle özgüven kazanmasını destekleyen çift yönlü bir kurum yapısı sunar.
          </p>
          <div className="adaGatewayActions">
            <a className="adaGatewayPrimary" href="/ada/kres">Kreşi İncele</a>
            <a className="adaGatewaySecondary" href="/ada/sanat">Müzik & Dansı İncele</a>
          </div>
        </div>

        <div className="adaGatewayCards" aria-label="Ada bölümleri">
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
