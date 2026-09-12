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
    main.kr-site .kr-contactActions{display:none!important}
    main.kr-site .kr-contactMap{display:block!important;width:100%!important;height:150px!important;margin-top:12px!important;border:0!important;border-radius:16px!important;overflow:hidden!important;box-shadow:0 8px 24px rgba(0,0,0,.16)!important;background:#dfe7ef!important}
    main.kr-site .kr-social{grid-column:1 / -1!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:12px!important;margin-top:8px!important;padding-top:18px!important;border-top:1px solid rgba(255,255,255,.12)!important}
    main.kr-site .kr-social > b{margin:0 6px 0 0!important;white-space:nowrap!important}
    main.kr-site .kr-social > a{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:42px!important;height:42px!important;padding:0 13px!important;border-radius:999px!important;background:rgba(255,255,255,.1)!important;border:1px solid rgba(255,255,255,.14)!important;color:#fff!important;text-decoration:none!important;font:800 13px/1 'Baloo 2',sans-serif!important;transition:transform .2s ease,background .2s ease!important}
    main.kr-site .kr-social > a:hover{transform:translateY(-3px)!important;background:rgba(255,255,255,.2)!important}
    @media(max-width:760px){
      main.kr-site .kr-footerTop{display:grid!important;grid-template-columns:1fr!important;gap:28px!important;padding:42px 20px 26px!important;align-items:stretch!important}
      main.kr-site .kr-footerTop > div{width:100%!important;min-width:0!important}
      main.kr-site .kr-footer .footerBrand{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;width:100%!important}
      main.kr-site .kr-footer .footerBrand .kr-logoMark{width:54px!important;height:54px!important;margin:0 10px 0 0!important;flex:0 0 auto!important}
      main.kr-site .kr-footer .footerBrand b::after{font-size:20px!important}
      main.kr-site .kr-footer .footerBrand small{font-size:11px!important;line-height:1.3!important}
      main.kr-site .kr-footerTop > div:nth-child(2),
      main.kr-site .kr-footerTop > div:nth-child(3){text-align:center!important}
      main.kr-site .kr-footerTop > div:nth-child(2) b,
      main.kr-site .kr-footerTop > div:nth-child(3) b{display:block!important;margin-bottom:8px!important}
      main.kr-site .kr-footerTop > div:nth-child(2) a{display:block!important;margin:4px 0!important}
      main.kr-site .kr-footerTop > div:nth-child(3) .kr-contactPhone,
      main.kr-site .kr-footerTop > div:nth-child(3) .kr-contactAddress{font-size:13px!important;line-height:1.5!important}
      main.kr-site .kr-contactMap{height:190px!important;margin:12px auto 0!important;width:100%!important;max-width:520px!important;border-radius:14px!important}
      main.kr-site .kr-social{grid-column:1!important;flex-wrap:nowrap!important;justify-content:center!important;gap:8px!important;margin-top:0!important;padding:18px 0 2px!important;overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important}
      main.kr-site .kr-social::-webkit-scrollbar{display:none!important}
      main.kr-site .kr-social > b{flex:0 0 auto!important;font-size:12px!important;margin:0 4px 0 0!important}
      main.kr-site .kr-social > a{flex:0 0 auto!important;min-width:42px!important;height:40px!important;padding:0 12px!important;font-size:12px!important}
      main.kr-site .kr-footerBottom{padding:16px 18px 22px!important;text-align:center!important;font-size:11px!important;line-height:1.5!important}
      main.kr-site .kr-join{min-height:220px!important;padding:40px 20px!important}
      main.kr-site .kr-join > div:first-child span::after{font-size:29px!important}
    }
  `;
  document.head.appendChild(style);
}

function enhanceKindergartenContact() {
  const footer = document.querySelector(".kr-footer");
  if (!footer) return false;
  addContactStyles();

  const footerTop = footer.querySelector(".kr-footerTop");
  const contactColumn = Array.from(footer.querySelectorAll(".kr-footerTop > div")).find((el) =>
    el.querySelector("b")?.textContent?.trim() === "Bize Ulaşın"
  );
  const socialColumn = footer.querySelector(".kr-social");
  if (!contactColumn || !footerTop) return false;

  const phones = ["0507 952 12 82", "0532 699 45 85"];
  const address = "İsmetpaşa Mahallesi, Ahmet Taner Kışlalı Cad. No: 19, 48200 Milas/Muğla";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
  const embedUrl = "https://www.google.com/maps?q=" + encodeURIComponent(address) + "&output=embed";

  contactColumn.querySelectorAll("a.kr-contactPhone, a.kr-contactAddress, .kr-contactActions, .kr-contactMap").forEach((el) => el.remove());
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

  const map = document.createElement("iframe");
  map.className = "kr-contactMap";
  map.src = embedUrl;
  map.title = "Bilim Çocuk Anaokulu konumu";
  map.loading = "lazy";
  map.referrerPolicy = "no-referrer-when-downgrade";
  contactColumn.appendChild(map);

  if (socialColumn && socialColumn.parentElement === footerTop) {
    footerTop.appendChild(socialColumn);
  }

  const bottom = footer.querySelector(".kr-footerBottom");
  if (bottom) {
    const first = bottom.firstChild;
    if (first) first.textContent = "© 2026 Bilim Çocuk Anaokulu. Tüm Hakları Saklıdır.";
  }
  return true;
}

if (typeof window !== "undefined") {
  const run = () => {
    if (enhanceKindergartenContact()) return;
    const observer = new MutationObserver(() => {
      if (enhanceKindergartenContact()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 10000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    window.setTimeout(run, 0);
  }
}

export {};
