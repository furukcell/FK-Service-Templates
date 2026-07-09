import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { createBusinessRequest } from "@fk-templates/firebase";
import { findPropertyById, propertyDemoData } from "../../src/propertyDemoData";
import { templateConfigs } from "../../src/templateConfigs";

const config = templateConfigs["real-estate"];
const themeStyle = {
  "--primary": config.theme.primary,
  "--secondary": config.theme.secondary,
  "--accent": config.theme.accent,
  "--soft": config.theme.soft,
  "--dark": config.theme.dark
} as CSSProperties;

export default function PropertyDetailPage() {
  const router = useRouter();
  const property = findPropertyById(router.query.id);
  const otherProperties = propertyDemoData.filter((item) => item.id !== property.id).slice(0, 2);
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("name") || "").trim();
    const customerPhone = String(formData.get("phone") || "").trim();
    const requestType = String(formData.get("requestType") || "İlan talebi");
    const note = String(formData.get("note") || "");

    if (!customerName || !customerPhone) {
      setSubmitStatus("Ad soyad ve telefon zorunludur.");
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
          location: property.location
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
        <div className="propertyDetailVisual"><span>{property.propertyType}</span>{property.isFeatured ? <mark>Vitrin</mark> : null}</div>
        <div className="propertyDetailInfo">
          <span className="eyebrow">{property.listingType} {property.propertyType}</span>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
          <strong>{property.price}</strong>
          <div className="propertyMeta"><span>{property.location}</span><span>{property.squareMeters}</span><span>{property.roomCount}</span><span>{property.bathroomCount} banyo</span></div>
          <div className="heroActions"><a className="pillButton navButtonLink" href="#lead-form">Bu İlanı Sor</a><a className="ghostButton navButtonLink" href="/properties">Diğer İlanlar</a></div>
        </div>
      </section>

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
