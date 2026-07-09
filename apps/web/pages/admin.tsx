import { demoProperties, demoRequests, statusLabels } from "../src/adminDemoData";

const summaryCards = [
  { value: demoRequests.length.toString(), label: "toplam talep" },
  { value: demoRequests.filter((item) => item.status === "new").length.toString(), label: "yeni talep" },
  { value: demoProperties.length.toString(), label: "demo ilan" },
  { value: "3", label: "aktif şablon" }
];

export default function AdminDemoPage() {
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
            <p>Randevu, talep ve ilanlar tek panelde yönetilecek. Bu ekran şu an demo veridir; Firebase bağlanınca canlı kayıtları gösterecek.</p>
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
            {demoRequests.map((request) => (
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
            <button className="pillButton">Yeni ilan</button>
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
            <article className="adminProperty"><span>Template</span><h3>Veteriner / Klinik</h3><p>Randevu formu, hizmetler, uzman kartları.</p><strong>Hazırlanıyor</strong></article>
            <article className="adminProperty"><span>Template</span><h3>Kuaför / Güzellik</h3><p>Hizmet fiyatları, kampanya ve randevu.</p><strong>Hazırlanıyor</strong></article>
            <article className="adminProperty"><span>Template</span><h3>Emlakçı</h3><p>İlan kartları, vitrin ve müşteri talebi.</p><strong>Hazırlanıyor</strong></article>
          </div>
        </section>
      </section>
    </main>
  );
}
