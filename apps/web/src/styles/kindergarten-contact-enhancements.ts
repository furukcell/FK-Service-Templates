function addContactStyles() {
  if (document.getElementById("kr-contact-enhancements-style")) return;
  const style = document.createElement("style");
  style.id = "kr-contact-enhancements-style";
  style.textContent = `
    main.kr-site .kr-footerTop > div:nth-child(3)::after{content:none!important;display:none!important}
    main.kr-site .kr-footerTop > div:nth-child(3) .kr-contactPhone,
    main.kr-site .kr-footerTop > div:nth-child(3) .kr-contactAddress{display:block!important;color:rgba(255,255,255,.82)!important;font:500 14px/1.55 'Baloo 2',sans-serif!important;text-decoration:none!important;margin:0!important}
    main.kr-site .kr-footerTop > div:nth-child(3) .kr-contactPhone:hover,
    main.kr-site .kr-footerTop > div:nth-child(3) .kr-contactAddress:hover{color:#ffd447!important}
    main.kr-site .kr-contactActions{display:flex!important;flex-wrap:wrap!important;gap:8px!important;margin-top:8px!important}
    main.kr-site .kr-contactAction{display:inline-flex!important;align-items:center!important;justify-content:center!important;padding:7px 11px!important;border-radius:999px!important;background:rgba(255,255,255,.12)!important;border:1px solid rgba(255,255,255,.16)!important;color:#fff!important;font:800 12px/1 'Baloo 2',sans-serif!important;text-decoration:none!important;transition:transform .2s ease,background .2s ease!important}
    main.kr-site .kr-contactAction:hover{transform:translateY(-2px)!important;background:rgba(255,255,255,.2)!important}
  `;
  document.head.appendChild(style);
}

function enhanceKindergartenContact() {
  const footer = document.querySelector(".kr-footer");
  if (!footer) return;
  addContactStyles();

  const contactColumn = Array.from(footer.querySelectorAll(".kr-footerTop > div")).find((el) =>
    el.querySelector("b")?.textContent?.trim() === "Bize Ulaşın"
  );
  if (!contactColumn) return;

  const phones = ["0507 952 12 82", "0532 699 45 85"];
  const address = "İsmetpaşa Mahallesi, Ahmet Taner Kışlalı Cad. No: 19, 48200 Milas/Muğla";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);

  contactColumn.querySelectorAll("a.kr-contactPhone, a.kr-contactAddress, .kr-contactActions").forEach((el) => el.remove());
  contactColumn.querySelectorAll(":scope > span").forEach((el) => el.remove());

  phones.forEach((phone) => {
    const a = document.createElement("a");
    a.className = "kr-contactPhone";
    a.href = `tel:+90${phone.replace(/\D/g, "").replace(/^0/, "")}`;
    a.textContent = `☎ ${phone}`;
    a.setAttribute("aria-label", `${phone} numarasını ara`);
    contactColumn.appendChild(a);
  });

  const addressLink = document.createElement("a");
  addressLink.className = "kr-contactAddress";
  addressLink.href = mapUrl;
  addressLink.target = "_blank";
  addressLink.rel = "noopener noreferrer";
  addressLink.textContent = `⌖ ${address}`;
  addressLink.setAttribute("aria-label", "Adresi Google Haritalar'da aç");
  contactColumn.appendChild(addressLink);

  const actions = document.createElement("div");
  actions.className = "kr-contactActions";

  const map = document.createElement("a");
  map.className = "kr-contactAction";
  map.href = mapUrl;
  map.target = "_blank";
  map.rel = "noopener noreferrer";
  map.textContent = "Haritada Gör";

  const directions = document.createElement("a");
  directions.className = "kr-contactAction";
  directions.href = directionsUrl;
  directions.target = "_blank";
  directions.rel = "noopener noreferrer";
  directions.textContent = "Yol Tarifi Al →";

  actions.append(map, directions);
  contactColumn.appendChild(actions);

  const bottom = footer.querySelector(".kr-footerBottom");
  if (bottom) {
    const first = bottom.firstChild;
    if (first) first.textContent = "© 2026 Bilim Çocuk Anaokulu. Tüm Hakları Saklıdır.";
  }
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceKindergartenContact, { once: true });
  } else {
    enhanceKindergartenContact();
  }
}

export {};
