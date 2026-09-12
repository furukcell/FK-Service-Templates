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
    main.kr-site .kr-brandSocialWrap{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:24px!important;min-width:0!important}
    main.kr-site .kr-brandSocialWrap .footerBrand{flex:0 0 auto!important}
    main.kr-site .kr-brandSocialWrap .kr-social{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:flex-start!important;gap:10px!important;width:auto!important;margin:0!important;padding:0!important;border:0!important;grid-column:auto!important}
    main.kr-site .kr-social > b{display:none!important}
    main.kr-site .kr-social > a{display:inline-flex!important;flex:0 0 44px!important;align-items:center!important;justify-content:center!important;width:44px!important;min-width:44px!important;height:44px!important;padding:0!important;margin:0!important;border-radius:50%!important;background:rgba(255,255,255,.1)!important;border:1px solid rgba(255,255,255,.14)!important;color:#fff!important;text-decoration:none!important;transition:transform .2s ease,background .2s ease!important}
    main.kr-site .kr-social > a:hover{transform:translateY(-3px)!important;background:rgba(255,255,255,.2)!important}
    main.kr-site .kr-social svg{display:block!important;width:21px!important;height:21px!important;fill:currentColor!important}
    main.kr-site .kr-footerBottom{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:20px!important}
    main.kr-site .kr-footerBottom .kr-footerCopyright{display:block!important;margin:0!important}
    main.kr-site .kr-footerBottom .kr-footerAgency{display:block!important;margin:0!important}
    @media(max-width:760px){
      main.kr-site .kr-footerTop{display:grid!important;grid-template-columns:1fr!important;gap:28px!important;padding:42px 20px 26px!important;align-items:stretch!important}
      main.kr-site .kr-footerTop > div{width:100%!important;min-width:0!important}
      main.kr-site .kr-brandSocialWrap{width:100%!important;justify-content:center!important;gap:14px!important;flex-wrap:nowrap!important}
      main.kr-site .kr-footer .footerBrand{display:flex!important;align-items:center!important;justify-content:center!important;text-align:left!important;width:auto!important}
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
      main.kr-site .kr-social{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;justify-content:flex-start!important;align-items:center!important;gap:8px!important;overflow:visible!important}
      main.kr-site .kr-social > a{flex:0 0 38px!important;width:38px!important;min-width:38px!important;height:38px!important;padding:0!important;margin:0!important}
      main.kr-site .kr-social svg{width:18px!important;height:18px!important}
      main.kr-site .kr-footerBottom{padding:16px 18px 22px!important;text-align:center!important;font-size:11px!important;line-height:1.5!important;flex-direction:column!important;gap:6px!important}
      main.kr-site .kr-join{min-height:220px!important;padding:40px 20px!important}
      main.kr-site .kr-join > div:first-child span::after{font-size:29px!important}
    }
  `;
  document.head.appendChild(style);
}

function setSocialIcons(footer: Element) {
  const social = footer.querySelector(".kr-social");
  if (!social) return;
  const links = Array.from(social.querySelectorAll("a"));
  const icons = [
    `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.7" r="1.2" fill="currentColor"/></svg>`,
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H8v3h2.5v8h2.9Z"/></svg>`,
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.8V8.2l6.5 3.8-6.5 3.8Z"/></svg>`
  ];
  links.slice(0, 3).forEach((link, index) => {
    link.innerHTML = icons[index];
    link.setAttribute("aria-label", ["Instagram", "Facebook", "YouTube"][index]);
    link.setAttribute("title", ["Instagram", "Facebook", "YouTube"][index]);
  });
}

function enhanceKindergartenContact() {
  const footer = document.querySelector(".kr-footer");
  if (!footer) return false;
  addContactStyles();
  setSocialIcons(footer);

  const footerTop = footer.querySelector(".kr-footerTop");
  const contactColumn = Array.from(footer.querySelectorAll(".kr-footerTop > div")).find((el) =>
    el.querySelector("b")?.textContent?.trim() === "Bize Ulaşın"
  );
  const socialColumn = footer.querySelector(".kr-social");
  const footerBrand = footer.querySelector(".footerBrand");
  if (!contactColumn || !footerTop) return false;

  const phones = ["0507 952 12 82", "0532 699 45 85"];
  const address = "İsmetpaşa Mahallesi, Ahmet Taner Kışlalı Cad. No: 19, 48200 Milas/Muğla";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
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

  if (socialColumn && footerBrand && footerBrand.parentElement !== footerTop.querySelector(".kr-brandSocialWrap")) {
    let brandWrap = footerTop.querySelector(".kr-brandSocialWrap");
    if (!brandWrap) {
      brandWrap = document.createElement("div");
      brandWrap.className = "kr-brandSocialWrap";
      footerTop.insertBefore(brandWrap, footerTop.firstChild);
    }
    brandWrap.appendChild(footerBrand);
    brandWrap.appendChild(socialColumn);
  } else if (socialColumn) {
    const brandWrap = footerTop.querySelector(".kr-brandSocialWrap");
    if (brandWrap && socialColumn.parentElement !== brandWrap) brandWrap.appendChild(socialColumn);
  }

  const bottom = footer.querySelector(".kr-footerBottom");
  if (bottom) {
    bottom.innerHTML = "<span class=\"kr-footerCopyright\">© 2026 Bilim Çocuk Anaokulu. Tüm Hakları Saklıdır.</span><span class=\"kr-footerAgency\">FK Digital</span>";
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
