import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { createBusinessRequest, getPropertyById, type Property } from "@fk-templates/firebase";
import { findPropertyById, propertyDemoData, type PropertyDemo } from "../../src/propertyDemoData";
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
  description: string;
  highlights: string[];
  consultantName: string;
  consultantPhone: string;
  imageUrls: string[];
  isFeatured: boolean;
  isLive?: boolean;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(price);
}

function mapDemoProperty(property: PropertyDemo): DisplayProperty {
  return { ...property, imageUrls: [], isLive: false };
}

function mapLiveProperty(property: Property): DisplayProperty {
  return {
    id: property.id,
    title: property.title,
    listingType: property.listingType === "sale" ? "Satılık" : "Kiralık",
    propertyType: property.propertyType,
    price: formatPrice(property.price),
    location: property.location,
    squareMeters: property.squareMeters ? `${property.squareMeters} m²` : "m² yok",
    roomCount: property.roomCount || "-",
    bathroomCount: property.bathroomCount ? String(property.bathroomCount) : "-",
    description: property.description,
    highlights: [property.location, property.roomCount || "Portföy", property.squareMeters ? `${property.squareMeters} m²` : "Detaylı bilgi", property.isFeatured ? "Vitrin ilan" : "Aktif ilan"],
    consultantName: property.consultantName || "Emlak danışmanı",
    consultantPhone: property.consultantPhone || config.phone,
    imageUrls: property.imageUrls || [],
    isFeatured: Boolean(property.isFeatured),
    isLive: true
  };
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const demoProperty = useMemo(() => findPropertyById(router.query.id), [router.query.id]);
  const [liveProperty, setLiveProperty] = useState<DisplayProperty | null>(null);
  const [dataMode, setDataMode] = useState("Demo portföy detayı");
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const routePropertyId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
    if (!routePropertyId) return;
    const propertyId: string = routePropertyId;

    let isMounted = true;
    async function loadProperty() {
      try {
        const item = await getPropertyById(propertyId);
        if (!isMounted) return;
        if (item) {
          setLiveProperty(mapLiveProperty(item));
          setDataMode("Firestore canlı ilan detayı");
        } else {
          setLiveProperty(null);
          setDataMode("Firestore'da bulunamadı, demo portföy detayı");
        }
      } catch (error) {
        if (isMounted) {
          setLiveProperty(null);
          setDataMode("Firebase bağlı değil, demo portföy detayı");
        }
      }
    }

    loadProperty();
    return () => { isMounted = false; };
  }, [router.query.id]);

  const property = liveProperty || mapDemoProperty(demoProperty);
  const otherProperties = propertyDemoData.filter((item) => item.id !== property.id).slice(0, 2);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("name") || "").trim();
    const customerPhone = String(formData.get("phone") || "").trim();
    const requestType = String(formData.get("requestType") || "İlan talebi");
    const note = String(formData.get("note") || "");
    const acceptedLegal = formData.get("acceptedLegal") === "on";

    if (!customerName || !customerPhone) {
      setSubmitStatus("Ad soyad ve telefon zorunludur.");
      return;
    }

    if (!acceptedLegal) {
      setSubmitStatus("Devam etmek için KVKK/Gizlilik bilgilendirmesini onaylamalısınız.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createBusinessRequest({
        template: "real-estate",
        businessId: process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business",
        customerName,
        customerPhone,
        subject: `${requestType}: ${property.title}`,
        note,
        source: "website",
        extra: {
          propertyId: property.id,
          propertyTitle: property.title,
          price: property.price,
          location: property.location,
          acceptedLegal: "true"
        }
      });
      setSubmitStatus("Talep alındı. Danışman size dönüş yapacak.");
      event.currentTarget.reset();
    } catch (error) {
      setSubmitStatus("Demo mod: Form hazır. Firebase bilgileri girilince bu ilan talebi panele düşecek.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="pageShell" style={themeStyle}>
      <div className="topBar">{property.title} • {property.location} • {property.price}</div>
      <nav className="navbar">
        <a className="logoLockup navButtonLink" href="/properties"><span className="logoMark">FK</span><span>{config.brandName}</span></a>
        <div className="navActions"><a className="ghostButton navButtonLink" href="/properties">Tüm İlanlar</a><a className="pillButton navButtonLink" href="#lead-form">İlanı Sor</a></div>
      </nav>

      <section className="propertyDetailHero">
        <div className="propertyDetailVisual">
          {property.imageUrls[0] ? <img src={property.imageUrls[0]} alt={property.title} /> : null}
          <span>{property.propertyType}</span>{property.isFeatured ? <mark>Vitrin</mark> : null}
        </div>
        <div className="propertyDetailInfo">
          <span className="eyebrow">{property.listingType} {property.propertyType}</span>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
          <strong>{property.price}</strong>
          <div className="propertyMeta"><span>{property.location}</span><span>{property.squareMeters}</span><span>{property.roomCount}</span><span>{property.bathroomCount} banyo</span></div>
          <p className="adminMode">Veri modu: {dataMode}</p>
          <div className="heroActions"><a className="pillButton navButtonLink" href="#lead-form">Bu İlanı Sor</a><a className="ghostButton navButtonLink" href="/properties">Diğer İlanlar</a></div>
        </div>
      </section>

      {property.imageUrls.length ? (
        <section className="section">
          <div className="sectionHead"><h2>Fotoğraf galerisi</h2><p>Admin panelden yüklenen görseller burada portföy galerisi olarak görünür.</p></div>
          <div className="propertyImageGrid">
            {property.imageUrls.map((imageUrl) => <img src={imageUrl} alt={property.title} key={imageUrl} />)}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="sectionHead">
          <h2>Öne çıkan bilgiler</h2>
          <p>İlan detay sayfası müşteri için güven veren, temiz ve hızlı bilgi veren yapıda hazırlanır.</p>
        </div>
        <div className="cardGrid">
          {property.highlights.map((highlight) => <article className="serviceCard" key={highlight}><h3>{highlight}</h3><p>Bu alan admin panelden düzenlenebilir portföy özelliği olarak planlandı.</p></article>)}
        </div>
      </section>

      <section className="section" id="lead-form">
        <div className="sectionHead">
          <h2>İlan için bilgi al</h2>
          <p>{property.consultantName} size WhatsApp veya telefonla dönüş yapabilir.</p>
        </div>
        <div className="formLayout">
          <div className="formPanel">
            <h3>Danışman</h3>
            <p>{property.consultantName}</p>
            <span className="priceTag">{property.consultantPhone}</span>
          </div>
          <form className="formPanel formFields" onSubmit={submitLead}>
            <label className="field"><span>Ad Soyad</span><input name="name" placeholder="Adınız soyadınız" /></label>
            <label className="field"><span>Telefon</span><input name="phone" placeholder="+90 5xx xxx xx xx" /></label>
            <label className="field"><span>Talep tipi</span><select name="requestType" defaultValue=""><option value="" disabled>Seçiniz</option><option>İlanı görmek istiyorum</option><option>Fiyat bilgisi istiyorum</option><option>Benzer ilan istiyorum</option></select></label>
            <label className="field"><span>Not</span><textarea name="note" placeholder="Kısaca talebinizi yazın" /></label>
            <label className="kvkkConsent"><input name="acceptedLegal" type="checkbox" required /><span><a href="/kvkk-aydinlatma-metni" target="_blank">KVKK Aydınlatma Metni</a> ve <a href="/gizlilik-politikasi" target="_blank">Gizlilik Politikası</a> kapsamında bilgilendirmeyi okudum.</span></label>
            <button className="pillButton" type="submit" disabled={isSubmitting}>{isSubmitting ? "Gönderiliyor..." : "Demo Talep Gönder"}</button>
            {submitStatus ? <p className="formStatus">{submitStatus}</p> : null}
          </form>
        </div>
      </section>

      {otherProperties.length ? (
        <section className="section">
          <div className="sectionHead"><h2>Benzer portföyler</h2><p>İlan detayından diğer portföylere geçiş için satış odaklı öneri alanı.</p></div>
          <div className="cardGrid">
            {otherProperties.map((item) => <article className="serviceCard" key={item.id}><h3>{item.title}</h3><p>{item.location}</p><strong>{item.price}</strong><br /><a className="ghostButton navButtonLink" href={`/properties/${item.id}`}>İncele</a></article>)}
          </div>
        </section>
      ) : null}
    </main>
  );
}
