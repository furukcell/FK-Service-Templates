import { useEffect, useState } from "react";
import { getSiteSettings, saveSiteSettings, uploadBusinessImage, type ManagedSiteSettings } from "@fk-templates/firebase";
import type { TemplateKey, VisualItem } from "@fk-templates/shared";
import { getDefaultTemplate } from "../../src/defaultTemplate";
import { getAdminShellClassName, getAdminShellStyle, getLotusAdminConfig, getLotusAwareTemplate, isLotusAdminDemo, lotusAdminTemplateKeys } from "../../src/lotusAdmin";
import { templateConfigs } from "../../src/templateConfigs";
import { useOptionalAdminGuard } from "../../src/useOptionalAdminGuard";

const templateKeys: TemplateKey[] = ["appointment", "salon", "real-estate", "cafe", "kindergarten", "event-venue"];
const salonCategories: NonNullable<VisualItem["category"]>[] = ["Saç", "Nail", "Cilt", "Salon", "Diğer"];

function cleanFileTitle(filename: string) {
  return filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim() || "Salon çalışması";
}

export default function AdminGalleryPage() {
  const guard = useOptionalAdminGuard();
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const isLotus = isLotusAdminDemo();
  const defaultTemplate = getLotusAwareTemplate(getDefaultTemplate());
  const visibleTemplateKeys = isLotus ? lotusAdminTemplateKeys : templateKeys;
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [template, setTemplate] = useState<TemplateKey>(defaultTemplate);
  const [items, setItems] = useState<VisualItem[]>(getLotusAdminConfig(defaultTemplate, templateConfigs).galleryItems || []);
  const [form, setForm] = useState<VisualItem>({ title: "", description: "", imageUrl: "", category: "Salon", featured: false });
  const [bulkCategory, setBulkCategory] = useState<NonNullable<VisualItem["category"]>>("Diğer");
  const [status, setStatus] = useState(isLotus ? "Lotus galeri görselleri panelden yönetilebilir." : "Galeri panelden yönetilebilir.");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isSalon = template === "salon";
  const itemLimit = isSalon ? 20 : 12;

  useEffect(() => {
    if (!guard.isAllowed) return;
    async function loadGallery() {
      try {
        const siteSettings = await getSiteSettings(businessId);
        setSettings(siteSettings);
        const selectedTemplate = isLotus ? "cafe" : siteSettings?.template || defaultTemplate;
        setTemplate(selectedTemplate);
        setItems(siteSettings?.galleryItems?.length ? siteSettings.galleryItems : getLotusAdminConfig(selectedTemplate, templateConfigs).galleryItems || []);
        setStatus(siteSettings?.galleryItems?.length ? "Canlı galeri yüklendi." : isLotus ? "Kayıt yok, Lotus demo görsel kartları gösteriliyor." : "Galeri kaydı yok, demo görsel kartları gösteriliyor.");
      } catch (error) {
        setTemplate(defaultTemplate);
        setItems(getLotusAdminConfig(defaultTemplate, templateConfigs).galleryItems || []);
        setStatus(isLotus ? "Firebase bağlı değil, Lotus demo görsel kartları gösteriliyor." : "Firebase bağlı değil, demo görsel kartları gösteriliyor.");
      }
    }
    loadGallery();
  }, [businessId, defaultTemplate, guard.isAllowed, isLotus]);

  function changeTemplate(selectedTemplate: TemplateKey) {
    setTemplate(selectedTemplate);
    setItems(getLotusAdminConfig(selectedTemplate, templateConfigs).galleryItems || []);
    setForm({ title: "", description: "", imageUrl: "", category: selectedTemplate === "salon" ? "Salon" : undefined, featured: false });
  }

  async function uploadSingleImage(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setIsUploading(true);
    setStatus("Görsel yükleniyor...");
    try {
      const imageUrl = await uploadBusinessImage(file, "site-gallery");
      setForm((current) => ({ ...current, imageUrl, title: current.title || cleanFileTitle(file.name) }));
      setStatus("Görsel yüklendi. Bilgileri kontrol edip listeye ekleyin.");
    } catch (error) {
      setStatus("Görsel yüklenemedi. Firebase Storage, admin giriş veya storage rules kontrol edilmeli.");
    } finally {
      setIsUploading(false);
    }
  }

  async function uploadMultipleImages(fileList: FileList | null) {
    const availableSlots = itemLimit - items.length;
    const files = Array.from(fileList || []).slice(0, Math.max(0, availableSlots));
    if (!files.length) {
      setStatus(availableSlots <= 0 ? `Galeri en fazla ${itemLimit} görsel alabilir.` : "Yüklenecek görsel seçilmedi.");
      return;
    }

    setIsUploading(true);
    setStatus(`${files.length} görsel yükleniyor...`);
    try {
      const uploaded = await Promise.all(files.map(async (file, index) => ({
        title: cleanFileTitle(file.name),
        description: isSalon ? "Salon çalışması" : "Galeri görseli",
        imageUrl: await uploadBusinessImage(file, "site-gallery"),
        category: isSalon ? bulkCategory : undefined,
        featured: isSalon && items.length === 0 && index === 0
      } satisfies VisualItem)));
      setItems((current) => [...current, ...uploaded].slice(0, itemLimit));
      setStatus(`${uploaded.length} görsel listeye eklendi. Başlık ve kategorileri düzenleyip galeriyi kaydedin.`);
    } catch (error) {
      setStatus("Görsellerden biri yüklenemedi. Firebase Storage ve bağlantıyı kontrol edin.");
    } finally {
      setIsUploading(false);
    }
  }

  function addGalleryItem() {
    if (!form.title.trim() || !form.description.trim()) {
      setStatus("Galeri başlığı ve açıklaması zorunludur.");
      return;
    }
    if (items.length >= itemLimit) {
      setStatus(`Galeri en fazla ${itemLimit} görsel alabilir.`);
      return;
    }
    const nextItem = { ...form, title: form.title.trim(), description: form.description.trim(), category: isSalon ? form.category || "Diğer" : undefined };
    setItems((current) => form.featured ? [...current.map((item) => ({ ...item, featured: false })), nextItem] : [...current, nextItem]);
    setForm({ title: "", description: "", imageUrl: "", category: isSalon ? "Salon" : undefined, featured: false });
    setStatus("Görsel listeye eklendi. Canlıya yansıtmak için kaydedin.");
  }

  function updateGalleryItem(index: number, patch: Partial<VisualItem>) {
    setItems((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : patch.featured ? { ...item, featured: false } : item));
  }

  function moveGalleryItem(index: number, direction: -1 | 1) {
    setItems((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeGalleryItem(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function saveGallery() {
    setIsSaving(true);
    try {
      await saveSiteSettings(businessId, { ...(settings || {}), template: isLotus ? "cafe" : template, galleryItems: items.slice(0, itemLimit) });
      setSettings((current) => ({ ...(current || {}), template: isLotus ? "cafe" : template, galleryItems: items.slice(0, itemLimit) }));
      setStatus("Galeri kaydedildi. Site bu görselleri canlı okuyacak.");
    } catch (error) {
      setStatus("Galeri kaydedilemedi. Admin giriş, Firebase env veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  if (guard.isChecking) return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><h1>Admin kontrol ediliyor</h1><p>{guard.message}</p></header></section></main>;
  if (!guard.isAllowed) return <main className={getAdminShellClassName()} style={getAdminShellStyle()}><section className="adminMain"><header className="adminHeader"><h1>Giriş gerekli</h1><p>{guard.message}</p><a className="pillButton navButtonLink" href="/login">Admin Giriş</a></header></section></main>;

  return (
    <main className={getAdminShellClassName()} style={getAdminShellStyle()}>
      <aside className="adminSidebar">
        <a className="adminLogo" href="/admin"><span>{isLotus ? "LB" : "FK"}</span><strong>Galeri</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/services">{isLotus ? "Menü Kartları" : "Hizmetler"}</a>
          <a href="/admin/campaigns">{isLotus ? "Duyurular" : "Kampanyalar"}</a>
          <a className="active" href="/admin/gallery">Galeri</a>
          {!isLotus ? <a href="/admin/properties/new">Yeni İlan</a> : null}
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">{isLotus ? "Lotus Görsel Yönetimi" : "Müşteri Site Yönetimi"}</span>
            <h1>Galeri yönetimi</h1>
            <p>{isSalon ? "En fazla 20 salon fotoğrafını aynı anda yükleyin; kategori, kapak ve sıralamayı yönetin." : isLotus ? "Lotus’un vitrin, ürün ve mekan görsellerini yükleyip sitede yayınlayabilirsiniz." : "Müşteri galeri görsellerini yükleyip sitede yayınlayabilir."}</p>
            <p className="adminMode">{status}</p>
          </div>
          <button className="pillButton" type="button" disabled={isSaving || isUploading} onClick={saveGallery}>{isSaving ? "Kaydediliyor..." : `Galeriyi Kaydet (${items.length}/${itemLimit})`}</button>
        </header>

        <section className="adminCard">
          <div className="adminPropertyForm formFields">
            {!isLotus ? <label className="field"><span>Aktif sektör</span><select value={template} onChange={(event) => changeTemplate(event.currentTarget.value as TemplateKey)}>{visibleTemplateKeys.map((item) => <option value={item} key={item}>{getLotusAdminConfig(item, templateConfigs).sector}</option>)}</select></label> : <div className="lotusAdminBadge">Lotus Börek Evi galerisi</div>}
            {isSalon ? <div className="adminGalleryBulkPanel"><div><strong>Çoklu fotoğraf yükleme</strong><p>Aynı anda birden fazla fotoğraf seçebilirsiniz. Fotoğraflar seçtiğiniz kategoriyle listeye eklenir.</p></div><label className="field"><span>Kategori</span><select value={bulkCategory} onChange={(event) => setBulkCategory(event.currentTarget.value as NonNullable<VisualItem["category"]>)}>{salonCategories.map((category) => <option key={category}>{category}</option>)}</select></label><label className="field"><span>Fotoğrafları seç</span><input type="file" accept="image/*" multiple disabled={isUploading || items.length >= itemLimit} onChange={(event) => uploadMultipleImages(event.currentTarget.files)} /></label></div> : null}
            <div className="adminGallerySinglePanel">
              <strong>{isSalon ? "Tek görsel ekleme" : "Yeni galeri görseli"}</strong>
              <label className="field"><span>Görsel yükle</span><input type="file" accept="image/*" disabled={isUploading} onChange={(event) => uploadSingleImage(event.currentTarget.files)} /></label>
              <label className="field"><span>Görsel URL</span><input value={form.imageUrl || ""} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.currentTarget.value }))} placeholder="Manuel URL de girebilirsiniz" /></label>
              <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} placeholder={isLotus ? "Taze börek vitrini" : "Kalıcı oje çalışması"} /></label>
              <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Görsel açıklaması" /></label>
              {isSalon ? <><label className="field"><span>Kategori</span><select value={form.category || "Diğer"} onChange={(event) => setForm((current) => ({ ...current, category: event.currentTarget.value as NonNullable<VisualItem["category"]> }))}>{salonCategories.map((category) => <option key={category}>{category}</option>)}</select></label><label className="adminGalleryCheck"><input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => setForm((current) => ({ ...current, featured: event.currentTarget.checked }))} /><span>Kapak görseli yap</span></label></> : null}
              <button className="ghostButton" type="button" onClick={addGalleryItem}>Listeye Ekle</button>
            </div>
          </div>
        </section>

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut galeri</h2><p>{isSalon ? "İlk sıradaki veya kapak seçilen görsel galeride büyük görünür. Oklarla sıralamayı değiştirebilirsiniz." : "Bu liste kaydedilince sitedeki galeri alanında görünür."}</p></div></div>
          <div className="adminGalleryEditorGrid">
            {items.map((item, index) => (
              <article className={`adminGalleryEditorCard ${item.featured ? "featured" : ""}`} key={`${item.title}-${index}`}>
                <div className="adminGalleryMedia">{item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : <span>{String(index + 1).padStart(2, "0")}</span>}{item.featured ? <mark>Kapak</mark> : null}</div>
                <div className="adminGalleryFields">
                  <label className="field"><span>Başlık</span><input value={item.title} onChange={(event) => updateGalleryItem(index, { title: event.currentTarget.value })} /></label>
                  <label className="field"><span>Açıklama</span><textarea value={item.description} onChange={(event) => updateGalleryItem(index, { description: event.currentTarget.value })} /></label>
                  {isSalon ? <label className="field"><span>Kategori</span><select value={item.category || "Diğer"} onChange={(event) => updateGalleryItem(index, { category: event.currentTarget.value as NonNullable<VisualItem["category"]> })}>{salonCategories.map((category) => <option key={category}>{category}</option>)}</select></label> : null}
                  {isSalon ? <label className="adminGalleryCheck"><input type="checkbox" checked={Boolean(item.featured)} onChange={(event) => updateGalleryItem(index, { featured: event.currentTarget.checked })} /><span>Kapak görseli</span></label> : null}
                </div>
                <div className="adminGalleryActions"><button className="ghostButton" disabled={index === 0} onClick={() => moveGalleryItem(index, -1)} type="button">← Öne</button><button className="ghostButton" disabled={index === items.length - 1} onClick={() => moveGalleryItem(index, 1)} type="button">Arkaya →</button><button className="ghostButton dangerButton" type="button" onClick={() => removeGalleryItem(index)}>Kaldır</button></div>
              </article>
            ))}
          </div>
          {!items.length ? <div className="formPanel"><h3>Henüz görsel yok</h3><p>Yukarıdan fotoğraf yükleyip galeriye ekleyin.</p></div> : null}
        </section>
      </section>
    </main>
  );
}
