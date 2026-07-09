import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { listProperties, type Property } from "@fk-templates/firebase";
import { isDemoMode } from "../../src/runtimeMode";
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

type DisplayProperty = {
  id: string;
  title: string;
  listingType: string;
  propertyType: string;
  price: string;
  location: string;
  squareMeters: string;
  roomCount: string;
  bathroomCount: string;
  isFeatured: boolean;
  isLive?: boolean;
};

function mapLiveProperty(property: Property): DisplayProperty {
  return {
    id: property.id,
    title: property.title,
    listingType: property.listingType === "sale" ? "Satılık" : "Kiralık",
    propertyType: property.propertyType,
    price: new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(property.price),
    location: property.location,
    squareMeters: property.squareMeters ? `${property.squareMeters} m²` : "m² yok",
    roomCount: property.roomCount || "-",
    bathroomCount: property.bathroomCount ? String(property.bathroomCount) : "-",
    isFeatured: Boolean(property.isFeatured),
    isLive: true
  };
}

function mapDemoProperty(property: typeof propertyDemoData[number]): DisplayProperty {
  return { ...property, isLive: false };
}

export default function PropertiesPage() {
  const [liveProperties, setLiveProperties] = useState<DisplayProperty[]>([]);
  const [dataMode, setDataMode] = useState(isDemoMode() ? "Demo portföyler" : "Canlı portföyler");

  useEffect(() => {
    let isMounted = true;
    async function loadProperties() {
      try {
        const items = await listProperties();
        if (!isMounted) return;
        const activeItems = items.filter((item) => item.isActive !== false);
        if (activeItems.length) {
          setLiveProperties(activeItems.map(mapLiveProperty));
          setDataMode("Canlı portföyler");
        } else {
          setLiveProperties([]);
          setDataMode(isDemoMode() ? "Canlı ilan yok, demo portföyler gösteriliyor" : "Henüz ilan eklenmedi");
        }
      } catch (error) {
        if (isMounted) {
          setLiveProperties([]);
          setDataMode(isDemoMode() ? "Firebase bağlı değil, demo portföyler gösteriliyor" : "İlanlar şu anda yüklenemedi");
        }
      }
    }
    loadProperties();
    return () => { isMounted = false; };
  }, []);

  const displayProperties = liveProperties.length ? liveProperties : isDemoMode() ? propertyDemoData.map(mapDemoProperty) : [];

  return (
    <main className="pageShell" style={themeStyle}>
      <div className="topBar">Emlak ilan portföyü • Vitrin ilanları • Hızlı talep</div>
      <nav className="navbar">
        <a className="logoLockup navButtonLink" href="/real-estate"><span className="logoMark">{config.brandName.slice(0, 2).toUpperCase()}</span><span>{config.brandName}</span></a>
        <div className="navActions">{isDemoMode() ? <a className="ghostButton navButtonLink" href="/admin">Demo Panel</a> : null}<a className="pillButton navButtonLink" href="/real-estate">Siteye Dön</a></div>
      </nav>

      <section className="section">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Vitrin portföyleri</span>
            <h2>Satılık ve kiralık ilanlar</h2>
          </div>
          <p>Güncel portföyleri inceleyebilir, ilan detayından hızlı bilgi talebi bırakabilirsiniz. {isDemoMode() ? `Veri modu: ${dataMode}.` : null}</p>
        </div>
        {displayProperties.length ? (
          <div className="propertyGrid">
            {displayProperties.map((property) => (
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
        ) : (
          <div className="formPanel"><h3>Henüz ilan eklenmedi</h3><p>Portföyler eklendiğinde bu sayfada yayınlanacaktır.</p><a className="pillButton navButtonLink" href="/iletisim">İletişime Geç</a></div>
        )}
      </section>
    </main>
  );
}
