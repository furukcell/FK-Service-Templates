import { useEffect, useState } from "react";

const STORAGE_KEY = "fk-cookie-consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY) !== "accepted");
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div className="cookieBanner">
      <div>
        <strong>Çerez bilgilendirmesi</strong>
        <p>Site deneyimini iyileştirmek ve gerekli teknik işlemleri yürütmek için çerezler kullanılabilir.</p>
      </div>
      <div className="heroActions">
        <a className="ghostButton navButtonLink" href="/cerez-politikasi">Detaylar</a>
        <button className="pillButton" type="button" onClick={acceptCookies}>Kabul Et</button>
      </div>
    </div>
  );
}
