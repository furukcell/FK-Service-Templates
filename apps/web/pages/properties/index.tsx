import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { listProperties, type Property } from "@fk-templates/firebase";
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
  const [dataMode, setDataMode] = useState("Demo portföyler");

  useEffect(() => {
    let isMounted = true;
    async function loadProperties() {
      try {
        const items = await listProperties();
        if (!isMounted) return;
        const activeItems = items.filter((item) => item.isActive !== false);
        if (activeItems.length) {
          setLiveProperties(activeItems.map(mapLiveProperty));
          setDataMode("Firestore canlı portföyler");
        } else {
          setLiveProperties([]);
          setDataMode("Firestore boş, demo portföyler gösteriliyor");
        }
      } catch (error) {
        if (isMounted) {
          setLiveProperties([]);
          setDataMode("Firebase bağlı değil, demo portföyler gösteriliyor");
        }
      }
    }
    loadProperties();
    return () => { isMounted = false; };
  }, []);

  const displayProperties = liveProperties.length ? liveProperties : propertyDemoData.map(mapDemoProperty);

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
          <p>Bu sayfa emlak şablonu için ilan listeleme demosudur. Veri modu: {dataMode}.</p>
        </div>
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
      </section>
    </main>
  );
}
