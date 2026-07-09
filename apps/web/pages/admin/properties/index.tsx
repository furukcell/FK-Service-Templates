import { useEffect, useState } from "react";
import {
  listAdminProperties,
  restoreProperty,
  updateProperty,
  type Property,
  type PropertyListingType,
  type PropertyType
} from "@fk-templates/firebase";
import { useOptionalAdminGuard } from "../../../src/useOptionalAdminGuard";

const propertyTypes: Array<{ value: PropertyType; label: string }> = [
  { value: "apartment", label: "Daire" },
  { value: "villa", label: "Villa" },
  { value: "land", label: "Arsa" },
  { value: "office", label: "Ofis" },
  { value: "shop", label: "Dükkan" },
  { value: "dailyRental", label: "Günlük kiralık" }
];

type PropertyEditForm = {
  title: string;
  listingType: PropertyListingType;
  propertyType: PropertyType;
  price: string;
  location: string;
  squareMeters: string;
  roomCount: string;
  bathroomCount: string;
  description: string;
  imageUrls: string;
  consultantName: string;
  consultantPhone: string;
  isFeatured: boolean;
  isActive: boolean;
};

function formFromProperty(property: Property): PropertyEditForm {
  return {
    title: property.title,
    listingType: property.listingType,
    propertyType: property.propertyType,
    price: String(property.price || ""),
    location: property.location || "",
    squareMeters: property.squareMeters ? String(property.squareMeters) : "",
    roomCount: property.roomCount || "",
    bathroomCount: property.bathroomCount ? String(property.bathroomCount) : "",
    description: property.description || "",
    imageUrls: property.imageUrls?.join("\n") || "",
    consultantName: property.consultantName || "",
    consultantPhone: property.consultantPhone || "",
    isFeatured: Boolean(property.isFeatured),
    isActive: property.isActive !== false
  };
}

export default function AdminPropertiesPage() {
  const guard = useOptionalAdminGuard();
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyEditForm | null>(null);
  const [status, setStatus] = useState("İlan yönetimi Firestore'a hazır.");
  const [isSaving, setIsSaving] = useState(false);

  async function loadProperties() {
    try {
      const items = await listAdminProperties();
      setProperties(items);
      setStatus(items.length ? "Canlı ilanlar yüklendi." : "Henüz canlı ilan yok.");
    } catch (error) {
      setProperties([]);
      setStatus("İlanlar yüklenemedi. Firebase env, admin giriş veya Firestore rules kontrol edilmeli.");
    }
  }

  useEffect(() => {
    if (!guard.isAllowed) return;
    loadProperties();
  }, [guard.isAllowed]);

  function startEdit(property: Property) {
    setEditingId(property.id);
    setForm(formFromProperty(property));
    setStatus("İlan düzenleme modunda.");
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(null);
  }

  function updateField<K extends keyof PropertyEditForm>(key: K, value: PropertyEditForm[K]) {
    setForm((current) => current ? { ...current, [key]: value } : current);
  }

  async function saveProperty() {
    if (!editingId || !form) return;
    if (!form.title || !form.price || !form.location || !form.description) {
      setStatus("Başlık, fiyat, konum ve açıklama zorunludur.");
      return;
    }
    setIsSaving(true);
    try {
      await updateProperty(editingId, {
        title: form.title,
        listingType: form.listingType,
        propertyType: form.propertyType,
        price: Number(form.price),
        location: form.location,
        squareMeters: form.squareMeters ? Number(form.squareMeters) : undefined,
        roomCount: form.roomCount,
        bathroomCount: form.bathroomCount ? Number(form.bathroomCount) : undefined,
        description: form.description,
        imageUrls: form.imageUrls ? form.imageUrls.split("\n").map((url) => url.trim()).filter(Boolean) : [],
        consultantName: form.consultantName,
        consultantPhone: form.consultantPhone,
        isFeatured: form.isFeatured,
        isActive: form.isActive
      });
      setStatus("İlan güncellendi.");
      cancelEdit();
      await loadProperties();
    } catch (error) {
      setStatus("İlan güncellenemedi. Firebase env, admin giriş veya Firestore rules kontrol edilmeli.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleProperty(property: Property) {
    setIsSaving(true);
    try {
      if (property.isActive === false) {
        await restoreProperty(property.id);
        setStatus("İlan tekrar yayına alındı.");
      } else {
        await updateProperty(property.id, { isActive: false });
        setStatus("İlan yayından kaldırıldı.");
      }
      await loadProperties();
    } catch (error) {
      setStatus("İlan durumu değiştirilemedi.");
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
        <a className="adminLogo" href="/admin"><span>FK</span><strong>İlanlar</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a href="/admin/settings">Site Ayarları</a>
          <a href="/admin/content">Kurumsal Metinler</a>
          <a href="/admin/services">Hizmetler</a>
          <a href="/admin/campaigns">Kampanyalar</a>
          <a href="/admin/gallery">Galeri</a>
          <a className="active" href="/admin/properties">İlanlar</a>
          <a href="/admin/properties/new">Yeni İlan</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Emlak Yönetimi</span>
            <h1>İlan yönetimi</h1>
            <p>İlan fiyatı, konumu, açıklaması, görselleri, vitrin ve yayında/pasif durumu buradan yönetilir.</p>
            <p className="adminMode">{status}</p>
          </div>
          <a className="pillButton navButtonLink" href="/admin/properties/new">Yeni İlan Ekle</a>
        </header>

        {form ? (
          <section className="adminCard">
            <div className="adminSectionHead"><div><h2>İlanı düzenle</h2><p>Kaydettiğiniz değişiklikler public ilan sayfasına yansır.</p></div></div>
            <div className="formFields adminPropertyForm">
              <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => updateField("title", event.currentTarget.value)} /></label>
              <label className="field"><span>İlan tipi</span><select value={form.listingType} onChange={(event) => updateField("listingType", event.currentTarget.value as PropertyListingType)}><option value="sale">Satılık</option><option value="rent">Kiralık</option></select></label>
              <label className="field"><span>Mülk tipi</span><select value={form.propertyType} onChange={(event) => updateField("propertyType", event.currentTarget.value as PropertyType)}>{propertyTypes.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
              <label className="field"><span>Fiyat</span><input value={form.price} onChange={(event) => updateField("price", event.currentTarget.value)} /></label>
              <label className="field"><span>Konum</span><input value={form.location} onChange={(event) => updateField("location", event.currentTarget.value)} /></label>
              <label className="field"><span>m²</span><input value={form.squareMeters} onChange={(event) => updateField("squareMeters", event.currentTarget.value)} /></label>
              <label className="field"><span>Oda</span><input value={form.roomCount} onChange={(event) => updateField("roomCount", event.currentTarget.value)} /></label>
              <label className="field"><span>Banyo</span><input value={form.bathroomCount} onChange={(event) => updateField("bathroomCount", event.currentTarget.value)} /></label>
              <label className="field"><span>Danışman</span><input value={form.consultantName} onChange={(event) => updateField("consultantName", event.currentTarget.value)} /></label>
              <label className="field"><span>Danışman telefonu</span><input value={form.consultantPhone} onChange={(event) => updateField("consultantPhone", event.currentTarget.value)} /></label>
              <label className="field"><span>Görsel URL'leri</span><textarea value={form.imageUrls} onChange={(event) => updateField("imageUrls", event.currentTarget.value)} /></label>
              <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => updateField("description", event.currentTarget.value)} /></label>
              <label className="field checkboxField"><span>Vitrin ilan</span><input type="checkbox" checked={form.isFeatured} onChange={(event) => updateField("isFeatured", event.currentTarget.checked)} /></label>
              <label className="field checkboxField"><span>Yayında</span><input type="checkbox" checked={form.isActive} onChange={(event) => updateField("isActive", event.currentTarget.checked)} /></label>
              <div className="heroActions"><button className="pillButton" type="button" disabled={isSaving} onClick={saveProperty}>{isSaving ? "Kaydediliyor..." : "İlanı Güncelle"}</button><button className="ghostButton" type="button" onClick={cancelEdit}>Vazgeç</button></div>
            </div>
          </section>
        ) : null}

        <section className="adminCard">
          <div className="adminSectionHead"><div><h2>Mevcut ilanlar</h2><p>Pasif ilanlar panelde kalır ama public listede görünmez.</p></div></div>
          <div className="adminPropertyGrid">
            {properties.map((property) => (
              <article className="adminProperty" key={property.id}>
                <span>{property.isActive === false ? "Pasif" : "Yayında"}</span>
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <strong>{new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(property.price)}</strong>
                {property.isFeatured ? <mark>Vitrin</mark> : null}
                <div className="heroActions">
                  <button className="ghostButton" type="button" onClick={() => startEdit(property)}>Düzenle</button>
                  <button className="ghostButton" type="button" disabled={isSaving} onClick={() => toggleProperty(property)}>{property.isActive === false ? "Yayına Al" : "Yayından Kaldır"}</button>
                  <a className="ghostButton navButtonLink" href={`/properties/${property.id}`} target="_blank" rel="noreferrer">Aç</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
