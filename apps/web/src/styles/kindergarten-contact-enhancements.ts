function enhanceKindergartenContact() {
  const footer = document.querySelector(".kr-footer");
  if (!footer) return;

  const contactColumn = Array.from(footer.querySelectorAll(".kr-footerTop > div")).find((el) =>
    el.querySelector("b")?.textContent?.trim() === "Bize Ulaşın"
  );
  if (!contactColumn) return;

  const title = contactColumn.querySelector("b");
  if (!title) return;

  const phones = ["0507 952 12 82", "0532 699 45 85"];
  const address = "İsmetpaşa Mahallesi, Ahmet Taner Kışlalı Cad. No: 19, 48200 Milas/Muğla";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);

  contactColumn.querySelectorAll("a.kr-contactPhone, a.kr-contactAddress, a.kr-contactAction").forEach((el) => el.remove());
  contactColumn.querySelectorAll(":scope > span").forEach((el) => el.remove());

  phones.forEach((phone) => {
    const a = document.createElement("a");
    a.className = "kr-contactPhone";
    a.href = `tel:+90${phone.replace(/\\D/g, "").replace(/^0/, "")}`;
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
