import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { BusinessTemplateConfig, VisualItem } from "@fk-templates/shared";

const CATEGORY_ORDER = ["Tümü", "Saç", "Nail", "Cilt", "Salon", "Diğer"] as const;
type GalleryCategory = typeof CATEGORY_ORDER[number];

function inferCategory(item: VisualItem): Exclude<GalleryCategory, "Tümü"> {
  if (item.category) return item.category;
  const text = `${item.title} ${item.description}`.toLocaleLowerCase("tr-TR");
  if (text.includes("tırnak") || text.includes("nail") || text.includes("oje")) return "Nail";
  if (text.includes("cilt") || text.includes("bakım")) return "Cilt";
  if (text.includes("saç") || text.includes("fön") || text.includes("kesim")) return "Saç";
  if (text.includes("salon") || text.includes("atmosfer") || text.includes("mekan")) return "Salon";
  return "Diğer";
}

function orderedGalleryItems(items: VisualItem[]) {
  return items
    .map((item, index) => ({ ...item, category: inferCategory(item), originalIndex: index }))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.originalIndex - b.originalIndex)
    .slice(0, 20);
}

function normalizedPhone(phone: string) {
  return phone.replace(/[^0-9+]/g, "");
}

function whatsappUrl(config: BusinessTemplateConfig) {
  const number = (config.whatsapp || config.phone).replace(/[^0-9]/g, "");
  const message = encodeURIComponent(`Merhaba ${config.brandName}, çalışmalarınız ve randevu seçenekleriniz hakkında bilgi almak istiyorum.`);
  return number.length >= 10 ? `https://wa.me/${number}?text=${message}` : `https://api.whatsapp.com/send?text=${message}`;
}

function mapEmbedUrl(config: BusinessTemplateConfig) {
  return `https://www.google.com/maps?q=${encodeURIComponent(config.address)}&output=embed`;
}

function GalleryVisual({ item, index }: { item: VisualItem; index: number }) {
  if (item.imageUrl) return <img src={item.imageUrl} alt={item.title} loading="lazy" />;
  return (
    <div className={`salonGalleryPlaceholder salonGalleryPlaceholder${(index % 5) + 1}`}>
      <span>{item.category || inferCategory(item)}</span>
      <strong>{String(index + 1).padStart(2, "0")}</strong>
    </div>
  );
}

function SalonGallery({ config }: { config: BusinessTemplateConfig }) {
  const items = useMemo(() => orderedGalleryItems(config.galleryItems || []), [config.galleryItems]);
  const categories = useMemo(() => CATEGORY_ORDER.filter((category) => category === "Tümü" || items.some((item) => item.category === category)), [items]);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Tümü");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filteredItems = useMemo(() => activeCategory === "Tümü" ? items : items.filter((item) => item.category === activeCategory), [activeCategory, items]);
  const visibleItems = filteredItems.slice(0, 5);

  useEffect(() => {
    if (activeCategory !== "Tümü" && !categories.includes(activeCategory)) setActiveCategory("Tümü");
  }, [activeCategory, categories]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % filteredItems.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + filteredItems.length) % filteredItems.length);
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [filteredItems.length, lightboxIndex]);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function changeLightbox(direction: number) {
    setLightboxIndex((current) => current === null ? null : (current + direction + filteredItems.length) % filteredItems.length);
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 45) return;
    changeLightbox(distance < 0 ? 1 : -1);
  }

  if (!items.length) return null;

  return (
    <>
      <section className="section salonGallerySection" id="gallery">
        <div className="salonGalleryHeader">
          <div>
            <span className="eyebrow">Görsel ve sosyal medya vitrini</span>
            <h2>Çalışmalarımız ve Salon Vitrini</h2>
            <p>Saç, nail art ve cilt bakımı uygulamalarımızdan örnekleri inceleyin; salon atmosferimizi keşfedin ve daha fazla çalışma için sosyal medya hesabımıza göz atın.</p>
          </div>
          {config.instagramUrl ? <a className="salonInstagramButton" href={config.instagramUrl} target="_blank" rel="noreferrer"><span>Instagram</span><strong>Daha fazla çalışmayı gör</strong></a> : null}
        </div>

        <div className="salonGalleryFilters" aria-label="Galeri kategorileri">
          {categories.map((category) => <button className={activeCategory === category ? "active" : ""} key={category} onClick={() => { setActiveCategory(category); setLightboxIndex(null); }} type="button">{category}</button>)}
        </div>

        <div className={`salonGalleryMosaic salonGalleryCount${Math.min(visibleItems.length, 5)}`}>
          {visibleItems.map((item, index) => {
            const hiddenCount = filteredItems.length - 5;
            const showMoreOverlay = index === 4 && hiddenCount > 0;
            return (
              <button className={`salonGalleryTile ${index === 0 ? "featured" : ""}`} key={`${item.title}-${item.originalIndex}`} onClick={() => openLightbox(index)} type="button">
                <GalleryVisual item={item} index={index} />
                <span className="salonGalleryTileShade" />
                <span className="salonGalleryTileCopy"><small>{item.category}</small><strong>{showMoreOverlay ? `+${hiddenCount} fotoğraf` : item.title}</strong>{!showMoreOverlay ? <em>{item.description}</em> : null}</span>
              </button>
            );
          })}
        </div>

        <div className="salonGalleryFooter">
          <span>{filteredItems.length} çalışma</span>
          <button className="ghostButton" onClick={() => openLightbox(0)} type="button">Tüm Galeriyi Aç</button>
        </div>
      </section>

      <section className="section salonContactSection" id="contact">
        <div className="sectionHead salonContactHead">
          <span className="eyebrow">Konum ve iletişim</span>
          <h2>Salonumuza kolayca ulaşın</h2>
          <p>Haritadan konumumuzu inceleyin; telefon, WhatsApp veya Instagram üzerinden bize ulaşın.</p>
        </div>
        <div className="salonWideMap">
          <iframe title={`${config.brandName} harita konumu`} src={mapEmbedUrl(config)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="salonContactStrip">
          <div><span>Adres</span><strong>{config.address}</strong></div>
          <a href={`tel:${normalizedPhone(config.phone)}`}><span>Telefon</span><strong>{config.phone}</strong></a>
          <div className="salonContactActions">
            <a className="ghostButton" href={config.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(config.address)}`} target="_blank" rel="noreferrer">Haritada Aç</a>
            <a className="salonContactWhatsapp" href={whatsappUrl(config)} target="_blank" rel="noreferrer">WhatsApp</a>
            {config.instagramUrl ? <a className="pillButton" href={config.instagramUrl} target="_blank" rel="noreferrer">Instagram</a> : null}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && filteredItems[lightboxIndex] ? createPortal(
        <div className="salonLightbox" role="dialog" aria-modal="true" aria-label="Salon galerisi" onClick={() => setLightboxIndex(null)}>
          <button className="salonLightboxClose" onClick={() => setLightboxIndex(null)} type="button" aria-label="Galeriyi kapat">×</button>
          <button className="salonLightboxArrow salonLightboxPrev" onClick={(event) => { event.stopPropagation(); changeLightbox(-1); }} type="button" aria-label="Önceki fotoğraf">‹</button>
          <div className="salonLightboxContent" onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={handleTouchEnd}>
            <div className="salonLightboxMedia"><GalleryVisual item={filteredItems[lightboxIndex]} index={lightboxIndex} /></div>
            <div className="salonLightboxCaption"><span>{filteredItems[lightboxIndex].category}</span><h3>{filteredItems[lightboxIndex].title}</h3><p>{filteredItems[lightboxIndex].description}</p><small>{lightboxIndex + 1} / {filteredItems.length}</small></div>
          </div>
          <button className="salonLightboxArrow salonLightboxNext" onClick={(event) => { event.stopPropagation(); changeLightbox(1); }} type="button" aria-label="Sonraki fotoğraf">›</button>
        </div>, document.body) : null}
    </>
  );
}

export function SalonGalleryMount({ active, config }: { active: boolean; config: BusinessTemplateConfig }) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active) {
      setTarget(null);
      return undefined;
    }

    let legacySection: HTMLElement | null = null;
    let mount: HTMLDivElement | null = null;

    function install() {
      if (mount?.isConnected) return;
      const shell = document.querySelector<HTMLElement>(".pageShell");
      legacySection = shell?.querySelector<HTMLElement>(".visualGrid")?.closest<HTMLElement>("section") || null;
      if (!shell || !legacySection) return;
      legacySection.dataset.salonGalleryLegacyDisplay = legacySection.style.display;
      legacySection.style.display = "none";
      legacySection.removeAttribute("id");
      mount = document.createElement("div");
      mount.className = "salonGalleryPortal";
      legacySection.parentElement?.insertBefore(mount, legacySection);
      setTarget(mount);
    }

    install();
    const observer = new MutationObserver(install);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mount?.remove();
      if (legacySection) legacySection.style.display = legacySection.dataset.salonGalleryLegacyDisplay || "";
    };
  }, [active]);

  return target ? createPortal(<SalonGallery config={config} />, target) : null;
}
