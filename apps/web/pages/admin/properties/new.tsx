import { useState } from "react";
import { createProperty, uploadBusinessImage, type PropertyListingType, type PropertyType } from "@fk-templates/firebase";
import { useOptionalAdminGuard } from "../../../src/useOptionalAdminGuard";

const propertyTypes: Array<{ value: PropertyType; label: string }> = [
  { value: "apartment", label: "Daire" },
  { value: "villa", label: "Villa" },
  { value: "land", label: "Arsa" },
  { value: "office", label: "Ofis" },
  { value: "shop", label: "Dükkan" },
  { value: "dailyRental", label: "Günlük kiralık" }
];

export default function NewPropertyPage() {
  const guard = useOptionalAdminGuard();
  const [status, setStatus] = useState("Yeni emlak ilanı Firestore'a kaydedilmeye hazır.");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    listingType: "sale" as PropertyListingType,
    propertyType: "apartment" as PropertyType,
    price: "",
    location: "",
    squareMeters: "",
    roomCount: "",
    bathroomCount: "",
    description: "",
    imageUrls: "",
    consultantName: "",
    consultantPhone: "",
    isFeatured: false
  });

  function updateField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function uploadSelectedImage(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setIsUploading(true);
    setStatus("Görsel yükleniyor...");
    try {
      const imageUrl = await uploadBusinessImage(file, "property-images");
      setForm((current) => ({
        ...current,
        imageUrls: current.imageUrls ? `${current.imageUrls}\n${imageUrl}` : imageUrl
      }));
      setStatus("Görsel yüklendi ve URL listeye eklendi.");
    } catch (error) {
      setStatus("Görsel yüklenemedi. Firebase Storage, admin giriş veya storage rules kontrol edilmeli.");
    } finally {
      setIsUploading(false);
    }
  }

  async function saveProperty() {
    if (!form.title || !form.price || !form.location || !form.description) {
      setStatus("Başlık, fiyat, konum ve açıklama zorunludur.");
      return;
    }
    setIsSaving(true);
    try {
      await createProperty({
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
        isFeatured: form.isFeatured,
        consultantName: form.consultantName,
        consultantPhone: form.consultantPhone,
        isActive: true
      });
      setStatus("İlan kaydedildi. /properties sayfasında canlı veri varsa listelenecek.");
      setForm((current) => ({ ...current, title: "", price: "", location: "", squareMeters: "", roomCount: "", bathroomCount: "", description: "", imageUrls: "" }));
    } catch (error) {
      setStatus("İlan kaydedilemedi. Firebase env, admin giriş veya Firestore rules kontrol edilmeli.");
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
        <a className="adminLogo" href="/admin"><span>FK</span><strong>Yeni İlan</strong></a>
        <nav>
          <a href="/admin">Talepler</a>
          <a className="active" href="/admin/properties/new">Yeni ilan</a>
          <a href="/properties">İlanlar</a>
        </nav>
      </aside>
      <section className="adminMain">
        <header className="adminHeader">
          <div>
            <span className="eyebrow">Emlak Şablonu</span>
            <h1>Yeni ilan ekle</h1>
            <p>Bu form emlak müşterisinin admin panelinden portföy eklemesi için kullanılacak ilk MVP ekranıdır.</p>
            <p className="adminMode">{status}</p>
          </div>
          <a className="pillButton navButtonLink" href="/admin">Panele Dön</a>
        </header>

        <section className="adminCard">
          <div className="formFields adminPropertyForm">
            <label className="field"><span>Başlık</span><input value={form.title} onChange={(event) => updateField("title", event.currentTarget.value)} placeholder="Milas merkez 2+1 daire" /></label>
            <label className="field"><span>İlan tipi</span><select value={form.listingType} onChange={(event) => updateField("listingType", event.currentTarget.value as PropertyListingType)}><option value="sale">Satılık</option><option value="rent">Kiralık</option></select></label>
            <label className="field"><span>Mülk tipi</span><select value={form.propertyType} onChange={(event) => updateField("propertyType", event.currentTarget.value as PropertyType)}>{propertyTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label className="field"><span>Fiyat</span><input value={form.price} onChange={(event) => updateField("price", event.currentTarget.value)} placeholder="2850000" /></label>
            <label className="field"><span>Konum</span><input value={form.location} onChange={(event) => updateField("location", event.currentTarget.value)} placeholder="Milas / Merkez" /></label>
            <label className="field"><span>Metrekare</span><input value={form.squareMeters} onChange={(event) => updateField("squareMeters", event.currentTarget.value)} placeholder="95" /></label>
            <label className="field"><span>Oda sayısı</span><input value={form.roomCount} onChange={(event) => updateField("roomCount", event.currentTarget.value)} placeholder="2+1" /></label>
            <label className="field"><span>Banyo</span><input value={form.bathroomCount} onChange={(event) => updateField("bathroomCount", event.currentTarget.value)} placeholder="1" /></label>
            <label className="field"><span>Danışman adı</span><input value={form.consultantName} onChange={(event) => updateField("consultantName", event.currentTarget.value)} placeholder="Faruk Danışman" /></label>
            <label className="field"><span>Danışman telefon</span><input value={form.consultantPhone} onChange={(event) => updateField("consultantPhone", event.currentTarget.value)} placeholder="+90 5xx xxx xx xx" /></label>
            <label className="field"><span>Görsel yükle</span><input type="file" accept="image/*" disabled={isUploading} onChange={(event) => uploadSelectedImage(event.currentTarget.files)} /></label>
            <label className="field"><span>Görsel URL'leri</span><textarea value={form.imageUrls} onChange={(event) => updateField("imageUrls", event.currentTarget.value)} placeholder="Her satıra bir görsel URL" /></label>
            <label className="field"><span>Açıklama</span><textarea value={form.description} onChange={(event) => updateField("description", event.currentTarget.value)} placeholder="İlan açıklaması" /></label>
            <label className="field checkboxField"><span>Vitrin ilan</span><input type="checkbox" checked={form.isFeatured} onChange={(event) => updateField("isFeatured", event.currentTarget.checked)} /></label>
            <button className="pillButton" type="button" disabled={isSaving || isUploading} onClick={saveProperty}>{isSaving ? "Kaydediliyor..." : isUploading ? "Görsel yükleniyor..." : "İlanı Kaydet"}</button>
          </div>
        </section>
      </section>
    </main>
  );
}
