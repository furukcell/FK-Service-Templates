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
const WhatsAppIcon = () => <svg viewBox="0 0 360 362" aria-hidden="true"><path fill="#25D366" fillRule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" clipRule="evenodd"/></svg>;

export function KindergartenDesignChooser({ config, activeLayout, onLayoutChange }: Props) {
  const isReference = activeLayout === "kindergarten-reference";
  const templateLayout = activeLayout === "flow" ? "modern" : activeLayout;
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const schoolName = "Bilim Çocuk Anaokulu";

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
      {isReference ? <KindergartenReferenceLayout config={{...config, brandName: schoolName}} onLayoutChange={onLayoutChange} /> : <TemplateLanding config={config} activeTemplate="kindergarten" activeLayout={templateLayout} onLayoutChange={onLayoutChange} showTemplateSwitch showLayoutSwitch={false} />}
    </main>
  );
}
