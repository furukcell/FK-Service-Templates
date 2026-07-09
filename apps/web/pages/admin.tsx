import { useEffect, useMemo, useState } from "react";
import { listBusinessRequests, type BusinessRequest } from "@fk-templates/firebase";
import { demoProperties, demoRequests, statusLabels, type DemoRequest } from "../src/adminDemoData";

type DisplayRequest = {
  id: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  date: string;
  status: DemoRequest["status"];
  source: string;
};

function mapLiveRequest(request: BusinessRequest): DisplayRequest {
  return {
    id: request.id,
    customerName: request.customerName,
    customerPhone: request.customerPhone,
    subject: request.subject,
    date: request.preferredDate || "Canlı kayıt",
    status: request.status,
    source: request.source || "website"
  };
}

function mapDemoRequest(request: DemoRequest): DisplayRequest {
  return request;
}

export default function AdminDemoPage() {
  const [liveRequests, setLiveRequests] = useState<DisplayRequest[]>([]);
  const [dataMode, setDataMode] = useState("Demo data");

  useEffect(() => {
    let isMounted = true;

    async function loadRequests() {
      try {
        const items = await listBusinessRequests();
        if (!isMounted) return;
        if (items.length) {
          setLiveRequests(items.map(mapLiveRequest));
          setDataMode("Firestore canlı kayıtlar");
        } else {
          setLiveRequests([]);
          setDataMode("Firestore boş, demo data gösteriliyor");
        }
      } catch (error) {
        if (isMounted) {
          setLiveRequests([]);
          setDataMode("Firebase bağlı değil, demo data gösteriliyor");
        }
      }
    }

    loadRequests();
    return () => { isMounted = false; };
  }, []);

  const displayRequests = liveRequests.length ? liveRequests : demoRequests.map(mapDemoRequest);
  const summaryCards = useMemo(() => [
    { value: displayRequests.length.toString(), label: "toplam talep" },
    { value: displayRequests.filter((item) => item.status === "new").length.toString(), label: "yeni talep" },
    { value: demoProperties.length.toString(), label: "demo ilan" },
    { value: "3", label: "aktif şablon" }
  ], [displayRequests]);

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/"><span>FK</span><strong>Admin Demo</strong></a>
        <nav>
          <a className="active" href="#requests">Talepler</a>
          <a href="#properties">İlanlar</a>
          <a href="#templates">Şablonlar</a>
          <a href="#settings">Ayarlar</a>
        </nav>
      </aside>

      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">FK Service Templates</span>
            <h1>Müşteri paneli demo görünümü</h1>
            <p>Randevu, talep ve ilanlar tek panelde yönetilecek. Firebase env girilirse canlı kayıtlar, yoksa demo data gösterilir.</p>
            <p className="adminMode">Veri modu: {dataMode}</p>
          </div>
          <a className="pillButton navButtonLink" href="/">Siteye Dön</a>
        </header>

        <div className="adminStats">
          {summaryCards.map((card) => (
            <article className="adminStat" key={card.label}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </article>
          ))}
        </div>

        <section className="adminCard" id="requests">
          <div className="adminSectionHead">
            <div>
              <h2>Gelen talepler</h2>
              <p>Veteriner, salon ve emlak formlarından gelen başvurular burada listelenecek.</p>
            </div>
            <button className="ghostButton">CSV indir</button>
          </div>
          <div className="adminTable">
            <div className="adminTableRow adminTableHead">
              <span>Kod</span>
              <span>Müşteri</span>
              <span>Konu</span>
              <span>Tarih</span>
              <span>Durum</span>
              <span>Kaynak</span>
            </div>
            {displayRequests.map((request) => (
              <div className="adminTableRow" key={request.id}>
                <span>{request.id}</span>
                <span><strong>{request.customerName}</strong><small>{request.customerPhone}</small></span>
                <span>{request.subject}</span>
                <span>{request.date}</span>
                <span><mark>{statusLabels[request.status]}</mark></span>
                <span>{request.source}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="adminCard" id="properties">
          <div className="adminSectionHead">
            <div>
              <h2>Emlak ilan demo listesi</h2>
              <p>Emlak şablonunda ilan ekleme/düzenleme bu panelden yönetilecek.</p>
            </div>
            <a className="pillButton navButtonLink" href="/properties">İlanları Aç</a>
          </div>
          <div className="adminPropertyGrid">
            {demoProperties.map((property) => (
              <article className="adminProperty" key={property.id}>
                <span>{property.listingType}</span>
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <strong>{property.price}</strong>
                {property.isFeatured ? <mark>Vitrin</mark> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="adminCard" id="templates">
          <div className="adminSectionHead">
            <div>
              <h2>Şablon durumu</h2>
              <p>İlk satış için 3 sektör şablonu hazırlanıyor.</p>
            </div>
          </div>
          <div className="adminPropertyGrid">
            <article className="adminProperty"><span>Template</span><h3>Veteriner / Klinik</h3><p>Randevu formu, hizmetler, uzman kartları.</p><strong>İlk taslak hazır</strong></article>
            <article className="adminProperty"><span>Template</span><h3>Kuaför / Güzellik</h3><p>Hizmet fiyatları, kampanya ve randevu.</p><strong>İlk taslak hazır</strong></article>
            <article className="adminProperty"><span>Template</span><h3>Emlakçı</h3><p>İlan kartları, vitrin ve müşteri talebi.</p><strong>İlk taslak hazır</strong></article>
          </div>
        </section>
      </section>
    </main>
  );
}
