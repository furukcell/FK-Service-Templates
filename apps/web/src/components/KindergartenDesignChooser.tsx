import { useState } from "react";
import type { BusinessTemplateConfig, LayoutVariant } from "@fk-templates/shared";
import { KindergartenReferenceLayout } from "./KindergartenReferenceLayout";
import { TemplateLanding } from "./TemplateLanding";

type Props = {
  config: BusinessTemplateConfig;
  activeLayout: LayoutVariant;
  onLayoutChange: (layout: LayoutVariant) => void;
};

const kindergartenLayouts: LayoutVariant[] = ["modern", "split", "showcase", "flow", "corporate", "kindergarten-reference"];
const galleryItems = [["▧", "Fotoğraf Galerisi", "#gallery"], ["▶", "Video Galerisi", "#gallery"], ["▦", "Sınıflarımız", "#classes"], ["▣", "Etkinlik Galerisi", "#gallery"], ["⌂", "Okul Alanlarımız", "#about"]] as const;
const statItems = [["♟", "Öğrenci Sayılarımız", "#stats"], ["🎓", "Mezunlarımız", "#stats"], ["🏆", "Başarılarımız", "#stats"], ["♥", "Veli Memnuniyeti", "#stats"], ["▥", "Yıllık Gelişim Raporları", "#stats"]] as const;
const eventItems = [["▣", "Yaklaşan Etkinlikler", "#news"], ["★", "Etkinlik Takvimi", "#news"], ["▧", "Etkinlik Galerisi", "#gallery"]] as const;

const FacebookIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.1l.9-4H13V9c0-.7.3-1 1-1Z" fill="currentColor" /></svg>;
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.6" cy="6.5" r="1.2" fill="currentColor"/></svg>;
const WhatsAppIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.7a9.2 9.2 0 0 0-7.9 13.9L2.7 21.3l4.9-1.3A9.2 9.2 0 1 0 12 2.7Zm0 2a7.2 7.2 0 0 1 6.2 10.8 7.1 7.1 0 0 1-6.2 3.6 7.2 7.2 0 0 1-3.6-1l-2.7.7.7-2.6a7.2 7.2 0 1 1 5.6-11.5Zm-3.1 3.2c-.3 0-.7.1-.9.5-.3.4-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3c.2.3 2.2 3.4 5.3 4.6 2.6 1 3.1.8 3.7.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.7-.4l-2-.9c-.4-.2-.7-.1-1 .3l-.8 1c-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.1-.7l-.9-2.1c-.2-.6-.5-.6-.8-.6Z" fill="currentColor"/></svg>;

export function KindergartenDesignChooser({ config, activeLayout, onLayoutChange }: Props) {
  const isReference = activeLayout === "kindergarten-reference";
  const templateLayout = activeLayout === "flow" ? "modern" : activeLayout;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const schoolName = config.brandName || "Bilim Çocuk Anaokulu";

  return (
    <main className="kindergartenDesignHub">
      <header className="bcHeader" onMouseLeave={() => setOpenMenu(null)}>
        <div className="bcTopbar">
          <div className="bcTopbarInner">
            <span>✉ info@bilimcocukanaokulu.com</span>
            <span className="bcLocation"><b>⌖</b><span>Milas / Muğla</span></span>
            <div className="bcTopRight">
              <span>☎ +90 507 807 69 07</span>
              <a href="#contact" aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href="#contact" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#contact" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>
        </div>
        <div className="bcNavWrap">
          <a className="bcBrand" href="#top"><span className="bcBrandLogo" aria-hidden="true"><span>☺</span></span><span><strong>{schoolName}</strong><small>Güvenli Yarınlar, Mutlu Çocuklar</small></span></a>
          <button className="bcSearch" type="button" aria-label="Ara">⌕</button>
          <nav className="bcNav" aria-label="Ana menü">
            <a className="bcNavLink active" href="#top">Anasayfa</a>
            <div className="bcMenu"><button className={`bcNavLink ${openMenu === "gallery" ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === "gallery" ? null : "gallery")} type="button">Galeri <span className="bcChevron" /></button>{openMenu === "gallery" && <div className="bcDropdown">{galleryItems.map(([icon, label, href]) => <a key={label} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}</div>
            <div className="bcMenu"><button className={`bcNavLink ${openMenu === "stats" ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === "stats" ? null : "stats")} type="button">İstatistik <span className="bcChevron" /></button>{openMenu === "stats" && <div className="bcDropdown">{statItems.map(([icon, label, href]) => <a key={label} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}</div>
            <div className="bcMenu"><button className={`bcNavLink ${openMenu === "events" ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === "events" ? null : "events")} type="button">Etkinlikler <span className="bcChevron" /></button>{openMenu === "events" && <div className="bcDropdown">{eventItems.map(([icon, label, href]) => <a key={label} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}</div>
            <a className="bcNavLink" href="#contact">Randevu Al</a>
          </nav>
          <a className="bcCta" href="#contact">Ön Kayıt <b>›</b></a>
        </div>
      </header>
      <div className="kindergartenDesignToolbarLegacy" aria-hidden="true">{kindergartenLayouts.map((layout, index) => <button key={layout} type="button" className={activeLayout === layout ? "active" : ""} onClick={() => onLayoutChange(layout)}><small>{index + 1}</small>{layout === "kindergarten-reference" ? "Bilim Çocuk" : layout}</button>)}</div>
      {isReference ? <KindergartenReferenceLayout config={config} onLayoutChange={onLayoutChange} /> : <TemplateLanding config={config} activeTemplate="kindergarten" activeLayout={templateLayout} onLayoutChange={onLayoutChange} showTemplateSwitch showLayoutSwitch={false} />}
    </main>
  );
}
