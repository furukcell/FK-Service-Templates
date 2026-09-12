import { useState } from "react";
import type { BusinessTemplateConfig, LayoutVariant } from "@fk-templates/shared";
import { KindergartenReferenceLayout } from "./KindergartenReferenceLayout";
import { TemplateLanding } from "./TemplateLanding";

type Props = {
  config: BusinessTemplateConfig;
  activeLayout: LayoutVariant;
  onLayoutChange: (layout: LayoutVariant) => void;
};

const kindergartenLayouts: LayoutVariant[] = [
  "modern",
  "split",
  "showcase",
  "flow",
  "corporate",
  "kindergarten-reference"
];

const galleryItems = [
  ["📷", "Fotoğraf Galerisi", "#gallery"],
  ["▶", "Video Galerisi", "#gallery"],
  ["▧", "Sınıflarımız", "#classes"],
  ["▣", "Etkinlik Galerisi", "#gallery"],
  ["⌂", "Okul Alanlarımız", "#about"]
] as const;

const statItems = [
  ["♟", "Öğrenci Sayılarımız", "#stats"],
  ["🎓", "Mezunlarımız", "#stats"],
  ["🏆", "Başarılarımız", "#stats"],
  ["♥", "Veli Memnuniyeti", "#stats"],
  ["▥", "Yıllık Gelişim Raporları", "#stats"]
] as const;

const eventItems = [
  ["▣", "Yaklaşan Etkinlikler", "#news"],
  ["★", "Etkinlik Takvimi", "#news"],
  ["📷", "Etkinlik Galerisi", "#gallery"]
] as const;

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
            <span>📍 Milas, Muğla</span>
            <div className="bcTopRight"><span>☎ +90 507 807 69 07</span><span>f</span><span>◎</span><span>▶</span></div>
          </div>
        </div>
        <div className="bcNavWrap">
          <a className="bcBrand" href="#top">
            <span className="bcBrandLogo" aria-hidden="true"><span>☺</span></span>
            <span><strong>Bilim Çocuk <em>Anaokulu</em></strong><small>Güvenli Yarınlar, Mutlu Çocuklar</small></span>
          </a>
          <button className="bcSearch" type="button" aria-label="Ara">⌕</button>
          <nav className="bcNav" aria-label="Ana menü">
            <a className="bcNavLink active" href="#top">Anasayfa</a>
            <div className="bcMenu">
              <button className={`bcNavLink ${openMenu === "gallery" ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === "gallery" ? null : "gallery")} type="button">Galeri <span>⌄</span></button>
              {openMenu === "gallery" && <div className="bcDropdown">{galleryItems.map(([icon, label, href]) => <a key={label} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}
            </div>
            <div className="bcMenu">
              <button className={`bcNavLink ${openMenu === "stats" ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === "stats" ? null : "stats")} type="button">İstatistik <span>⌄</span></button>
              {openMenu === "stats" && <div className="bcDropdown">{statItems.map(([icon, label, href]) => <a key={label} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}
            </div>
            <div className="bcMenu">
              <button className={`bcNavLink ${openMenu === "events" ? "open" : ""}`} onClick={() => setOpenMenu(openMenu === "events" ? null : "events")} type="button">Etkinlikler <span>⌄</span></button>
              {openMenu === "events" && <div className="bcDropdown">{eventItems.map(([icon, label, href]) => <a key={label} href={href}><i>{icon}</i><span>{label}</span></a>)}</div>}
            </div>
            <a className="bcNavLink" href="#contact">Randevu Al</a>
          </nav>
          <a className="bcCta" href="#contact">Ön Kayıt <b>›</b></a>
        </div>
      </header>

      <div className="kindergartenDesignToolbarLegacy" aria-hidden="true">
        {kindergartenLayouts.map((layout, index) => <button key={layout} type="button" className={activeLayout === layout ? "active" : ""} onClick={() => onLayoutChange(layout)}><small>{index + 1}</small>{layout === "kindergarten-reference" ? "Bilim Çocuk" : layout}</button>)}
      </div>

      {isReference ? (
        <KindergartenReferenceLayout config={config} onLayoutChange={onLayoutChange} />
      ) : (
        <TemplateLanding
          config={config}
          activeTemplate="kindergarten"
          activeLayout={templateLayout}
          onLayoutChange={onLayoutChange}
          showTemplateSwitch
          showLayoutSwitch={false}
        />
      )}
    </main>
  );
}
