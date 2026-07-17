type AdaTabKey = "home" | "kres" | "sanat";

export function AdaSiteTabs({ active }: { active: AdaTabKey }) {
  return (
    <div className="adaSiteTabsWrap">
      <a className="adaSiteMiniBrand" href="/ada" aria-label="Ada ana sayfa">
        <span>A</span>
        <strong>Ada</strong>
      </a>
      <nav className="adaSiteTabs" aria-label="Ada bölüm sekmeleri">
        <a className={`adaSiteTab ${active === "kres" ? "isActive" : ""}`} href="/ada/kres">
          <small>Çocuk gelişimi</small>
          <strong>Kreş</strong>
        </a>
        <a className={`adaSiteTab ${active === "sanat" ? "isActive" : ""}`} href="/ada/sanat">
          <small>Sanat eğitimi</small>
          <strong>Dans & Müzik Okulu</strong>
        </a>
      </nav>
    </div>
  );
}
