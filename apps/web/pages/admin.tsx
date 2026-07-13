import { useEffect, useMemo, useRef, useState } from "react";
import {
  listenBusinessRequests,
  listBusinessRequests,
  updateBusinessRequestAdminNote,
  updateBusinessRequestStatus,
  type BusinessRequest,
  type RequestStatus
} from "@fk-templates/firebase";
import { demoProperties, demoRequests, statusLabels } from "../src/adminDemoData";
import { getDefaultTemplateRoute } from "../src/defaultTemplate";
import { getAdminShellClassName, getAdminShellStyle, isLotusAdminDemo } from "../src/lotusAdmin";
import { isDemoMode } from "../src/runtimeMode";
import { useOptionalAdminGuard } from "../src/useOptionalAdminGuard";

type DisplayRequest = {
  id: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  date: string;
  status: RequestStatus;
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
  return Object.entries(extra).filter(([, value]) => value !== "" && value !== null && value !== undefined && value !== "true");
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

function mapDemoRequest(request: typeof demoRequests[number]): DisplayRequest {
  return { ...request, status: request.status as RequestStatus, isLive: false };
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
    // Tarayıcı ses izni vermezse sessiz geç.
  }
}

export default function AdminPage() {
  const guard = useOptionalAdminGuard();
  const isLotus = isLotusAdminDemo();
  const [liveRequests, setLiveRequests] = useState<DisplayRequest[]>([]);
  const [dataMode, setDataMode] = useState(isDemoMode() ? "Demo kayıtlar" : "Canlı kayıtlar");
  const [actionStatus, setActionStatus] = useState("");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [notificationMessage, setNotificationMessage] = useState("");
  const [browserNotificationStatus, setBrowserNotificationStatus] = useState("Tarayıcı bildirimi kapalı.");
  const knownRequestIdsRef = useRef<Set<string>>(new Set());
  const initialSnapshotLoadedRef = useRef(false);
  const siteReturnPath = getDefaultTemplateRoute();

  async function loadRequests() {
    try {
      const items = await listBusinessRequests();
      const mappedItems = items.map(mapLiveRequest);
      setLiveRequests(mappedItems);
      setNoteDrafts(Object.fromEntries(mappedItems.map((item) => [item.id, item.adminNote || ""])));
      setDataMode(mappedItems.length ? "Canlı kayıtlar" : isDemoMode() ? "Canlı kayıt yok, demo kayıtlar gösteriliyor" : "Henüz talep yok");
    } catch (error) {
      setLiveRequests([]);
      setDataMode(isDemoMode() ? "Bağlantı kurulamadı, demo kayıtlar gösteriliyor" : "Talepler şu anda yüklenemedi");
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
        setDataMode(mappedItems.length ? "Canlı takip aktif" : "Henüz talep yok");

        if (initialSnapshotLoadedRef.current && newRequests.length) {
          const latest = newRequests[0];
          const message = `${newRequests.length} yeni talep geldi: ${latest.subject}`;
          setNotificationMessage(message);
          playNotificationSound();
          document.title = `(${newRequests.length}) Yeni Talep`;
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("Yeni talep geldi", { body: `${latest.customerName} • ${latest.customerPhone} • ${latest.subject}` });
          }
        }

        knownRequestIdsRef.current = nextIds;
        initialSnapshotLoadedRef.current = true;
      }, () => {
        setDataMode("Canlı takip açılamadı, klasik listeleme kullanılıyor.");
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
    document.title = "Yönetim Paneli";
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
    link.download = `talepler-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function changeStatus(request: DisplayRequest, status: RequestStatus) {
    setActionStatus("");
    if (!request.isLive) {
      setActionStatus("Demo kayıtta durum değişikliği simüle edildi.");
      return;
    }
    try {
      await updateBusinessRequestStatus(request.id, status);
      setActionStatus("Durum güncellendi.");
    } catch (error) {
      setActionStatus("Durum güncellenemedi. Lütfen tekrar deneyin.");
    }
  }

  async function saveNote(request: DisplayRequest) {
    setActionStatus("");
    if (!request.isLive) {
      setActionStatus("Demo kayıtta not kaydı simüle edildi.");
      return;
    }
    try {
      await updateBusinessRequestAdminNote(request.id, noteDrafts[request.id] || "");
      setActionStatus("Admin notu kaydedildi.");
    } catch (error) {
      setActionStatus("Admin notu kaydedilemedi. Lütfen tekrar deneyin.");
    }
  }

  const displayRequests = liveRequests.length ? liveRequests : isDemoMode() ? demoRequests.map(mapDemoRequest) : [];
  const unreadCount = displayRequests.filter((item) => item.status === "new").length;
  const summaryCards = useMemo(() => [
    { value: displayRequests.length.toString(), label: "toplam talep" },
    { value: unreadCount.toString(), label: "yeni talep" },
    isLotus ? { value: "Menü", label: "kart yönetimi" } : { value: isDemoMode() ? demoProperties.length.toString() : "0", label: isDemoMode() ? "demo ilan" : "vitrin ilan" },
    { value: isLotus ? "Lotus" : "3", label: isLotus ? "demo panel" : "site bölümü" }
  ], [displayRequests, unreadCount, isLotus]);

  if (guard.isChecking) {
    return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><div><span className="eyebrow">Yönetim Paneli</span><h1>Kontrol ediliyor</h1><p>{guard.message}</p></div></header></section></main>;
  }

  if (!guard.isAllowed) {
    return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><div><span className="eyebrow">Yönetim Paneli</span><h1>Giriş gerekli</h1><p>{guard.message}</p></div><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;
  }

  return (
    <main className={getAdminShellClassName()} style={getAdminShellStyle()}>
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>{isLotus ? "LB" : "YP"}</span><strong>{isLotus ? "Lotus Paneli" : "Yönetim Paneli"}</strong></a>
        <nav>
          <a className="active" href="#requests">Talepler {unreadCount ? `(${unreadCount})` : ""}</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/content">Kurumsal Metinler</a>
          <a href="/admin/services">Menü Kartları</a>
          <a href="/admin/campaigns">Duyurular</a>
          <a href="/admin/gallery">Galeri</a>
          {!isLotus ? <a href="/admin/properties">İlanlar</a> : null}
        </nav>
      </aside>

      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">{isLotus ? "Lotus Börek Evi" : "Yönetim Paneli"}</span>
            <h1>{isLotus ? "Lotus site yönetimi" : "Gelen talepler ve site yönetimi"}</h1>
            <p>{isLotus ? "Lotus Börek Evi için gelen talepleri, menü kartlarını, görselleri, kampanya ve site ayarlarını buradan yönetin." : "Form taleplerini takip edin, site içeriklerini düzenleyin, kampanya, galeri, hizmet ve ilanları yönetin."}</p>
            {isDemoMode() ? <p className="adminMode">Veri modu: {dataMode}</p> : null}
            <p className="adminMode">Bildirim: {browserNotificationStatus}</p>
            {actionStatus ? <p className="adminMode">{actionStatus}</p> : null}
          </div>
          <div className="navActions"><button className="ghostButton" type="button" onClick={enableBrowserNotifications}>Tarayıcı Bildirimi Aç</button><a className="pillButton navButtonLink" href={siteReturnPath}>Siteye Dön</a></div>
        </header>

        {notificationMessage ? <section className="adminToast"><div><strong>Yeni talep bildirimi</strong><p>{notificationMessage}</p></div><button className="ghostButton" type="button" onClick={clearNotification}>Kapat</button></section> : null}

        <div className="adminStats">
          {summaryCards.map((card) => <article className="adminStat" key={card.label}><strong>{card.value}</strong><span>{card.label}</span></article>)}
        </div>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>{isLotus ? "Lotus site yönetimi" : "Site yönetimi"}</h2><p>{isLotus ? "Müşterinin göreceği metin, menü, duyuru ve görselleri buradan düzenleyebilirsiniz." : "Site içeriğini buradan düzenleyebilirsiniz."}</p></div></div>
          <div className="adminPropertyGrid">
            <article className="adminProperty"><span>Yönetim</span><h3>Site Ayarları</h3><p>Firma adı, telefon, adres, başlıklar, renkler ve seçili arayüz.</p><a className="ghostButton navButtonLink" href="/admin/settings">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>Kurumsal Metinler</h3><p>Hakkımızda, iletişim, KVKK, gizlilik ve SSS metinleri.</p><a className="ghostButton navButtonLink" href="/admin/content">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>{isLotus ? "Menü Kartları" : "Hizmetler"}</h3><p>{isLotus ? "Börek, hamur işi, tatlı ve toplu sipariş kartları." : "Hizmet adı, açıklama ve fiyat listesi."}</p><a className="ghostButton navButtonLink" href="/admin/services">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>{isLotus ? "Duyurular" : "Kampanyalar"}</h3><p>{isLotus ? "Günlük ürün, toplu sipariş ve vitrin duyuruları." : "Dönemsel kampanya ve paket kartları."}</p><a className="ghostButton navButtonLink" href="/admin/campaigns">Aç</a></article>
            <article className="adminProperty"><span>Yönetim</span><h3>Galeri</h3><p>Site görselleri, vitrin fotoğrafları, başlık ve açıklamalar.</p><a className="ghostButton navButtonLink" href="/admin/gallery">Aç</a></article>
            {!isLotus ? <article className="adminProperty"><span>Yönetim</span><h3>İlanlar</h3><p>Emlak ilanlarını düzenleme ve yayından kaldırma.</p><a className="ghostButton navButtonLink" href="/admin/properties">Aç</a></article> : null}
          </div>
        </section>

        <section className="adminCard" id="requests">
          <div className="adminSectionHead"><div><h2>Gelen talepler {unreadCount ? `(${unreadCount} yeni)` : ""}</h2><p>{isLotus ? "Web sitesi ve WhatsApp üzerinden gelen sipariş / fiyat bilgisi talepleri burada listelenir." : "Web sitesinden gelen başvurular burada canlı listelenir."}</p></div><button className="ghostButton" type="button" onClick={exportCsv}>CSV indir</button></div>
          {displayRequests.length ? (
            <div className="adminRequestList">
              {displayRequests.map((request) => {
                const extraEntries = requestExtraSummary(request.extra);
                return (
                  <article className={`adminRequestCard ${request.status === "new" ? "newRequestCard" : ""}`} key={request.id}>
                    <div className="adminRequestTop"><span className="priceTag">{request.id}</span><mark>{statusLabels[request.status]}</mark></div>
                    <h3>{request.subject}</h3>
                    <p><strong>{request.customerName}</strong> • {request.customerPhone}</p>
                    <p>{request.date} / Kaynak: {request.source}</p>
                    {extraEntries.length ? <div className="extraDetails">{extraEntries.map(([key, value]) => <span key={key}>{key}: {String(value)}</span>)}</div> : null}
                    <div className="adminActionGrid">
                      <label className="field"><span>Durum</span><select value={request.status} onChange={(event) => changeStatus(request, event.currentTarget.value as RequestStatus)}>{requestStatuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}</select></label>
                      <label className="field"><span>Admin notu</span><input value={noteDrafts[request.id] || ""} onChange={(event) => setNoteDrafts((current) => ({ ...current, [request.id]: event.currentTarget.value }))} placeholder="Görüşme notu" /></label>
                    </div>
                    <div className="heroActions"><a className="pillButton navButtonLink" href={whatsappUrl(request.customerPhone, request.subject)} target="_blank" rel="noreferrer">WhatsApp</a><button className="ghostButton" type="button" onClick={() => saveNote(request)}>Notu Kaydet</button></div>
                  </article>
                );
              })}
            </div>
          ) : <div className="formPanel"><h3>Henüz talep yok</h3><p>Yeni formlar geldikçe bu alanda listelenecek.</p></div>}
        </section>
      </section>
    </main>
  );
}
