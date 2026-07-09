import type { CSSProperties } from "react";
import { propertyDemoData } from "../../src/propertyDemoData";
import { templateConfigs } from "../../src/templateConfigs";

const config = templateConfigs["real-estate"];
const themeStyle = {
  "--primary": config.theme.primary,
  "--secondary": config.theme.secondary,
  "--accent": config.theme.accent,
  "--soft": config.theme.soft,
  "--dark": config.theme.dark
} as CSSProperties;

export default function PropertiesPage() {
  return (
    <main className="pageShell" style={themeStyle}>
      <div className="topBar">Emlak ilan portföyü • Vitrin ilanları • WhatsApp talep</div>
      <nav className="navbar">
        <a className="logoLockup navButtonLink" href="/real-estate"><span className="logoMark">FK</span><span>{config.brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href="/admin">Demo Panel</a><a className="pillButton navButtonLink" href="/real-estate">Siteye Dön</a></div>
      </nav>

      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Vitrin portföyleri</span>
            <h2>Satılık ve kiralık ilanlar</h2>
          </div>
          <p>Bu sayfa emlak şablonu için ilan listeleme demosudur. Firebase bağlanınca admin panelden eklenen portföyler burada listelenir.</p>
        </div>
        <div className="propertyGrid">
          {propertyDemoData.map((property) => (
            <article className="propertyCard" key={property.id}>
              <div className="propertyVisual"><span>{property.propertyType}</span>{property.isFeatured ? <mark>Vitrin</mark> : null}</div>
              <div className="propertyBody">
                <span className="priceTag">{property.listingType}</span>
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <strong>{property.price}</strong>
                <div className="propertyMeta"><span>{property.squareMeters}</span><span>{property.roomCount}</span><span>{property.bathroomCount} banyo</span></div>
                <a className="pillButton navButtonLink" href={`/properties/${property.id}`}>İlanı İncele</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
