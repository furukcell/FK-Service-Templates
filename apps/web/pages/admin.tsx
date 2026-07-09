import { useEffect, useMemo, useState } from "react";
import {
  listBusinessRequests,
  updateBusinessRequestAdminNote,
  updateBusinessRequestStatus,
  type BusinessRequest,
  type RequestStatus
} from "@fk-templates/firebase";
import { demoProperties, demoRequests, statusLabels, type DemoRequest } from "../src/adminDemoData";

type DisplayRequest = {
  id: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  date: string;
  status: DemoRequest["status"];
  source: string;
  adminNote?: string;
  isLive?: boolean;
};

const requestStatuses: RequestStatus[] = ["new", "contacted", "confirmed", "cancelled", "completed"];

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function whatsappUrl(phone: string, subject: string) {
  const normalized = normalizePhone(phone);
  const message = encodeURIComponent(`Merhaba, ${subject} talebiniz için dönüş yapıyorum.`);
  return normalized ? `https://wa.me/${normalized}?text=${message}` : `https://wa.me/?text=${message}`;
}

function mapLiveRequest(request: BusinessRequest): DisplayRequest {
  return {
    id: request.id,
    customerName: request.customerName,
    customerPhone: request.customerPhone,
    subject: request.subject,
    date: request.preferredDate || "Canlı kayıt",
    status: request.status,
    source: request.source || "website",
    adminNote: request.adminNote,
    isLive: true
  };
}

function mapDemoRequest(request: DemoRequest): DisplayRequest {
  return { ...request, isLive: false };
}

export default function AdminDemoPage() {
  const [liveRequests, setLiveRequests] = useState<DisplayRequest[]>([]);
  const [dataMode, setDataMode] = useState("Demo data");
  const [actionStatus, setActionStatus] = useState("");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  async function loadRequests() {
    try {
      const items = await listBusinessRequests();
      if (items.length) {
        const mappedItems = items.map(mapLiveRequest);
        setLiveRequests(mappedItems);
        setNoteDrafts(Object.fromEntries(mappedItems.map((item) => [item.id, item.adminNote || ""])));
        setDataMode("Firestore canlı kayıtlar");
      } else {
        setLiveRequests([]);
        setDataMode("Firestore boş, demo data gösteriliyor");
      }
    } catch (error) {
      setLiveRequests([]);
      setDataMode("Firebase bağlı değil, demo data gösteriliyor");
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function changeStatus(request: DisplayRequest, status: RequestStatus) {
    setActionStatus("");
    if (!request.isLive) {
      setActionStatus("Demo kayıt üzerinde status değişikliği simüle edildi. Firebase bağlanınca gerçek kayıt güncellenecek.");
      return;
    }
    try {
      await updateBusinessRequestStatus(request.id, status);
      setActionStatus("Status güncellendi.");
      await loadRequests();
    } catch (error) {
      setActionStatus("Status güncellenemedi. Admin girişi veya Firestore rules kontrol edilmeli.");
    }
  }

  async function saveNote(request: DisplayRequest) {
    setActionStatus("");
    if (!request.isLive) {
      setActionStatus("Demo kayıt üzerinde not kaydı simüle edildi. Firebase bağlanınca gerçek kayıt güncellenecek.");
      return;
    }
    try {
      await updateBusinessRequestAdminNote(request.id, noteDrafts[request.id] || "");
      setActionStatus("Admin notu kaydedildi.");
      await loadRequests();
    } catch (error) {
      setActionStatus("Admin notu kaydedilemedi. Admin girişi veya Firestore rules kontrol edilmeli.");
    }
  }

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
            {actionStatus ? <p className="adminMode">{actionStatus}</p> : null}
          </div>
          <div className="navActions"><a className="ghostButton navButtonLink" href="/login">Admin Giriş</a><a className="pillButton navButtonLink" href="/">Siteye Dön</a></div>
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
          <div className="adminRequestList">
            {displayRequests.map((request) => (
              <article className="adminRequestCard" key={request.id}>
                <div className="adminRequestTop">
                  <span className="priceTag">{request.id}</span>
                  <mark>{statusLabels[request.status]}</mark>
                </div>
                <h3>{request.subject}</h3>
                <p><strong>{request.customerName}</strong> • {request.customerPhone}</p>
                <p>{request.date} / Kaynak: {request.source}</p>
                <div className="adminActionGrid">
                  <label className="field"><span>Durum</span><select value={request.status} onChange={(event) => changeStatus(request, event.currentTarget.value as RequestStatus)}>{requestStatuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}</select></label>
                  <label className="field"><span>Admin notu</span><input value={noteDrafts[request.id] || ""} onChange={(event) => setNoteDrafts((current) => ({ ...current, [request.id]: event.currentTarget.value }))} placeholder="Görüşme notu" /></label>
                </div>
                <div className="heroActions">
                  <a className="pillButton navButtonLink" href={whatsappUrl(request.customerPhone, request.subject)} target="_blank" rel="noreferrer">WhatsApp</a>
                  <button className="ghostButton" type="button" onClick={() => saveNote(request)}>Notu Kaydet</button>
                </div>
              </article>
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
