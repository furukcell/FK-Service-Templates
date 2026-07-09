import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings, uploadBusinessImage, type ManagedSiteSettings } from "@fk-templates/firebase";
import type { TemplateKey, VisualItem } from "@fk-templates/shared";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate"];

export default function AdminGalleryPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("appointment");
  const [items, setItems] = useState<VisualItem[]>([]);
  const [form, setForm] = useState<VisualItem>({ title: "", description: "", imageUrl: "" });
  const [status, setStatus] = useState("Galeri panelden yönetilebilir.");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!guard.isAllowed) return;
    async function loadGallery() {
      try {
        const siteSettings = await getSiteSettings(businessId);
        setSettings(siteSettings);
        const selectedTemplate = siteSettings?.template || "appointment";
        setTemplate(selectedTemplate);
        setItems(siteSettings?.galleryItems?.length ? siteSettings.galleryItems : templateConfigs[selectedTemplate].galleryItems || []);
        setStatus(siteSettings?.galleryItems?.length ? "Canlı galeri yüklendi." : "Galeri kaydı yok, demo görsel kartları gösteriliyor.");
      } catch (error) {
        setStatus("Firebase bağlı değil, demo görsel kartları gösteriliyor.");
        setItems(templateConfigs.appointment.galleryItems || []);
      }
    }
    loadGallery();
  }, [businessId, guard.isAllowed]);

  async function uploadSelectedImage(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setIsUploading(true);
    setStatus("Görsel yükleniyor...");
    try {
      const imageUrl = await uploadBusinessImage(file, "site-gallery");
      setForm((current) => ({ ...current, imageUrl }));
      setStatus("Görsel yüklendi. Başlık/açıklama girip listeye ekle.");
    } catch (error) {
      setStatus("Görsel yüklenemedi. Firebase Storage, admin giriş veya storage rules kontrol edilmeli.");
    } finally {
      setIsUploading(false);
    }
  }

  function addGalleryItem() {
    if (!form.title || !form.description) {
      setStatus("Galeri başlığı ve açıklaması zorunludur.");
      return;
    }
    setItems((current) => [...current, form]);
    setForm({ title: "", description: "", imageUrl: "" });
    setStatus("Görsel listeye eklendi. Canlıya yansıtmak için kaydet.");
  }

  function removeGalleryItem(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveGallery() {
    setIsSaving(true);
    try {
      await saveSiteSettings(businessId, { ...(settings || {}), template, galleryItems: items });
      setStatus("Galeri kaydedildi. Site bu görselleri canlı okuyacak.");
    } catch (error) {
      setStatus("Galeri kaydedilemedi. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) {
    return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  }

  if (!guard.isAllowed) {
    return <main className="adminShell"><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>FK</span><strong>Galeri</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/services">Hizmetler</a>
          <a href="/admin/campaigns">Kampanyalar</a>
          <a className="active" href="/admin/gallery">Galeri</a>
          <a href="/admin/properties/new">Yeni İlan</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Müşteri Site Yönetimi</span>
            <h1>Galeri yönetimi</h1>
            <p>Müşteri galeri görsellerini yükleyip sitede yayınlayabilir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <button className="pillButton" type="button" disabled={isSaving} onClick={saveGallery}>{isSaving ? "Kaydediliyor..." : "Galeriyi Kaydet"}</button>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            <label className="field"><span>Aktif sektör</span><select value={template} onChange={(event) => setTemplate(event.currentTarget.value as TemplateKey)}>{templateKeys.map((item) => <option value={item} key={item}>{templateConfigs[item].sector}</option>)}</select></label>
            <label className="field"><span>Görsel yükle</span><input type="file" accept="image/*" disabled={isUploading} onChange={(event) => uploadSelectedImage(event.currentTarget.files)} /></label>
            <label className="field"><span>Görsel URL</span><input value={form.imageUrl || ""} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.currentTarget.value }))} placeholder="İstersen manuel URL gir" /></label>
            <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder="Salon atmosferi" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Görsel açıklaması" /></label>
            <button className="ghostButton" type="button" onClick={addGalleryItem}>Listeye Ekle</button>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut galeri</h2><p>Bu liste kaydedilince sitedeki galeri alanında görünür.</p></div></div>
          <div className="adminPropertyGrid">
            {items.map((item, index) => (
              <article className="adminProperty" key={`${item.title}-${index}`}>
                <span>Galeri</span>
                {item.imageUrl ? <img className="adminThumb" src={item.imageUrl} alt={item.title} /> : null}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="ghostButton" type="button" onClick={() => removeGalleryItem(index)}>Kaldır</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
