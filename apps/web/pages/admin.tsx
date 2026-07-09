import { useEffect, useMemo, useRef, useState } from "react";
import {
  listenBusinessRequests,
  listBusinessRequests,
  updateBusinessRequestAdminNote,
  updateBusinessRequestStatus,
  type BusinessRequest,
  type RequestStatus
} from "@fk-templates/firebase";
import { demoProperties, demoRequests, statusLabels, type DemoRequest } from "../src/adminDemoData";
import { useOptionalAdminGuard } from "../src/useOptionalAdminGuard";

type DisplayRequest = {
  id: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  date: string;
  status: DemoRequest["status"];
  source: string;
  adminNote?: string;
  extra?: Record<string, string | number | boolean | null>;
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

function csvEscape(value: string | number | boolean | null | undefined) {
  const stringValue = String(value ?? "");
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function requestExtraSummary(extra?: Record<string, string | number | boolean | null>) {
  if (!extra) return [];
  return Object.entries(extra).filter(([, value]) => value !== "" && value !== null && value !== undefined);
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
    extra: request.extra,
    isLive: true
  };
}

function mapDemoRequest(request: DemoRequest): DisplayRequest {
  return { ...request, isLive: false };
}

function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 880;
    gain.gain.value = 0.08;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  } catch (error) {
    // Ses izni yoksa sessiz geç.
  }
}

export default function AdminDemoPage() {
  const guard = useOptionalAdminGuard();
  const [liveRequests, setLiveRequests] = useState<DisplayRequest[]>([]);
  const [dataMode, setDataMode] = useState("Demo data");
  const [actionStatus, setActionStatus] = useState("");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [notificationMessage, setNotificationMessage] = useState("");
  const [browserNotificationStatus, setBrowserNotificationStatus] = useState("Tarayıcı bildirimi kapalı.");
  const knownRequestIdsRef = useRef<Set<string>>(new Set());
  const initialSnapshotLoadedRef = useRef(false);

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
    if (!guard.isAllowed) return undefined;
    try {
      const unsubscribe = listenBusinessRequests((items) => {
        const mappedItems = items.map(mapLiveRequest);
        const nextIds = new Set(mappedItems.map((item) => item.id));
        const newRequests = mappedItems.filter((item) => !knownRequestIdsRef.current.has(item.id));
        setLiveRequests(mappedItems);
        setNoteDrafts((current) => ({ ...Object.fromEntries(mappedItems.map((item) => [item.id, current[item.id] ?? item.adminNote ?? ""])) }));
        setDataMode(mappedItems.length ? "Firestore canlı kayıtlar • canlı dinleme aktif" : "Firestore boş, canlı dinleme aktif");

        if (initialSnapshotLoadedRef.current && newRequests.length) {
          const latest = newRequests[0];
          const message = `${newRequests.length} yeni talep geldi: ${latest.subject}`;
          setNotificationMessage(message);
          playNotificationSound();
          document.title = `(${newRequests.length}) Yeni Talep • FK Admin`;
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("Yeni talep geldi", { body: `${latest.customerName} • ${latest.customerPhone} • ${latest.subject}` });
          }
        }

        knownRequestIdsRef.current = nextIds;
        initialSnapshotLoadedRef.current = true;
      }, () => {
        setDataMode("Canlı dinleme açılamadı, klasik listeleme kullanılıyor.");
        loadRequests();
      });
      return unsubscribe;
    } catch (error) {
      loadRequests();
      return undefined;
    }
  }, [guard.isAllowed]);

  async function enableBrowserNotifications() {
    if (typeof Notification === "undefined") {
      setBrowserNotificationStatus("Bu tarayıcı bildirim desteklemiyor.");
      return;
    }
    const permission = await Notification.requestPermission();
    setBrowserNotificationStatus(permission === "granted" ? "Tarayıcı bildirimi açık." : "Tarayıcı bildirimi için izin verilmedi.");
  }

  function clearNotification() {
    setNotificationMessage("");
    document.title = "FK Admin";
  }

  function exportCsv() {
    const header = ["Kod", "Müşteri", "Telefon", "Konu", "Tarih", "Durum", "Kaynak", "Admin Notu"];
    const rows = displayRequests.map((request) => [
      request.id,
      request.customerName,
      request.customerPhone,
      request.subject,
      request.date,
      statusLabels[request.status],
      request.source,
      request.adminNote || noteDrafts[request.id] || ""
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fk-talepler-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function changeStatus(request: DisplayRequest, status: RequestStatus) {
    setActionStatus("");
    if (!request.isLive) {
      setActionStatus("Demo kayıt üzerinde status değişikliği simüle edildi. Firebase bağlanınca gerçek kayıt güncellenecek.");
      return;
    }
    try {
      await updateBusinessRequestStatus(request.id, status);
      setActionStatus("Status güncellendi.");
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
    } catch (error) {
      setActionStatus("Admin notu kaydedilemedi. Admin girişi veya Firestore rules kontrol edilmeli.");
    }
  }

  const displayRequests = liveRequests.length ? liveRequests : demoRequests.map(mapDemoRequest);
  const unreadCount = displayRequests.filter((item) => item.status === "new").length;
  const summaryCards = useMemo(() => [
    { value: displayRequests.length.toString(), label: "toplam talep" },
    { value: unreadCount.toString(), label: "yeni talep" },
    { value: demoProperties.length.toString(), label: "demo ilan" },
    { value: "3", label: "aktif şablon" }
  ], [displayRequests, unreadCount]);

  if (guard.isChecking) {
    return (
      <main className="adminShell">
        <section className="adminMain"><header className="adminHeader"><div><span className="eyebrow">FK Service Templates</span><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></div></header></section>
      </main>
    );
  }

  if (!guard.isAllowed) {
    return (
      <main className="adminShell">
        <section className="adminMain"><header className="adminHeader"><div><span className="eyebrow">FK Service Templates</span><h1>Giriş gerekli</h1><p>{guard.message}</p><p className="adminMode">Müşteri tesliminde paneli kapatmak için `NEXT_PUBLIC_REQUIRE_ADMIN_AUTH=true` kullanılır.</p></div><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section>
      </main>
    );
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/"><span>FK</span><strong>Admin Demo</strong></a>
        <nav>
          <a className="active" href="#requests">Talepler {unreadCount ? `(${unreadCount})` : ""}</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/content">Kurumsal Metinler</a>
          <a href="/admin/services">Hizmetler</a>
          <a href="/admin/campaigns">Kampanyalar</a>
          <a href="/admin/gallery">Galeri</a>
          <a href="/admin/properties">İlanlar</a>
          <a href="#templates">Şablonlar</a>
        </nav>
      </aside>

      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">FK Service Templates</span>
            <h1>Müşteri paneli demo görünümü</h1>
            <p>Randevu, talep, kampanya, galeri, hizmet ve ilanlar tek panelden yönetilecek. Firebase env girilirse canlı kayıtlar, yoksa demo data gösterilir.</p>
            <p className="adminMode">Veri modu: {dataMode}</p>
            <p className="adminMode">Panel modu: {guard.message}</p>
            <p className="adminMode">Bildirim: {browserNotificationStatus}</p>
            {actionStatus ? <p className="adminMode">{actionStatus}</p> : null}
          </div>
          <div className="navActions"><button className="ghostButton" type="button" onClick={enableBrowserNotifications}>Tarayıcı Bildirimi Aç</button><a className="ghostButton navButtonLink" href="/login">Admin Giriş</a><a className="pillButton navButtonLink" href="/">Siteye Dön</a></div>
        </header>

        {notificationMessage ? (
          <section className="adminToast">
            <div><strong>Yeni talep bildirimi</strong><p>{notificationMessage}</p></div>
            <button className="ghostButton" type="button" onClick={clearNotification}>Kapat</button>
          </section>
        ) : null}

        <div className="adminStats">
          {summaryCards.map((card) => (
            <article className="adminStat" key={card.label}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
            </article>
          ))}
        </div>

        <section className="adminCard">
          <div className="adminSectionHead">
            <div>
              <h2>Site yönetimi</h2>
              <p>Müşteri site içeriğini panelden yönetebilir; bize tekrar yazmadan değişiklik yapabilir.</p>
            </div>
          </div>
          <div className="adminPropertyGrid">
            <article className="adminProperty"><span>Yönetim</span><h3>Site Ayarları</h3><p>Firma adı, telefon, adres, başlıklar ve seçili arayüz.</p><a className="ghostButton navButtonLink" href="/admin/settings">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>Kurumsal Metinler</h3><p>Hakkımızda, KVKK, gizlilik ve SSS metinleri.</p><a className="ghostButton navButtonLink" href="/admin/content">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>Hizmetler</h3><p>Hizmet adı, açıklama ve fiyat listesi.</p><a className="ghostButton navButtonLink" href="/admin/services">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>Kampanyalar</h3><p>Dönemsel kampanya ve paket kartları.</p><a className="ghostButton navButtonLink" href="/admin/campaigns">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>Galeri</h3><p>Site görselleri, başlık ve açıklamalar.</p><a className="ghostButton navButtonLink" href="/admin/gallery">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>İlanlar</h3><p>Emlak ilanlarını düzenleme ve yayından kaldırma.</p><a className="ghostButton navButtonLink" href="/admin/properties">Aç</a></article>
          </div>
        </section>

        <section className="adminCard" id="requests">
          <div className="adminSectionHead">
            <div>
              <h2>Gelen talepler {unreadCount ? `(${unreadCount} yeni)` : ""}</h2>
              <p>Veteriner, salon ve emlak formlarından gelen başvurular burada canlı listelenir.</p>
            </div>
            <button className="ghostButton" type="button" onClick={exportCsv}>CSV indir</button>
          </div>
          <div className="adminRequestList">
            {displayRequests.map((request) => {
              const extraEntries = requestExtraSummary(request.extra);
              return (
                <article className={`adminRequestCard ${request.status === "new" ? "newRequestCard" : ""}`} key={request.id}>
                  <div className="adminRequestTop">
                    <span className="priceTag">{request.id}</span>
                    <mark>{statusLabels[request.status]}</mark>
                  </div>
                  <h3>{request.subject}</h3>
                  <p><strong>{request.customerName}</strong> • {request.customerPhone}</p>
                  <p>{request.date} / Kaynak: {request.source}</p>
                  {extraEntries.length ? (
                    <div className="extraDetails">
                      {extraEntries.map(([key, value]) => <span key={key}>{key}: {String(value)}</span>)}
                    </div>
                  ) : null}
                  <div className="adminActionGrid">
                    <label className="field"><span>Durum</span><select value={request.status} onChange={(event) => changeStatus(request, event.currentTarget.value as RequestStatus)}>{requestStatuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}</select></label>
                    <label className="field"><span>Admin notu</span><input value={noteDrafts[request.id] || ""} onChange={(event) => setNoteDrafts((current) => ({ ...current, [request.id]: event.currentTarget.value }))} placeholder="Görüşme notu" /></label>
                  </div>
                  <div className="heroActions">
                    <a className="pillButton navButtonLink" href={whatsappUrl(request.customerPhone, request.subject)} target="_blank" rel="noreferrer">WhatsApp</a>
                    <button className="ghostButton" type="button" onClick={() => saveNote(request)}>Notu Kaydet</button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="adminCard" id="properties">
          <div className="adminSectionHead">
            <div>
              <h2>Emlak ilan yönetimi</h2>
              <p>Emlak şablonunda ilan ekleme/düzenleme bu panelden yönetilecek.</p>
            </div>
            <div className="navActions"><a className="ghostButton navButtonLink" href="/admin/properties">İlanları Yönet</a><a className="pillButton navButtonLink" href="/admin/properties/new">Yeni İlan</a></div>
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
