import { useEffect } from "react";
import { useRouter } from "next/router";
import { getDefaultTemplate } from "../defaultTemplate";
import { isLotusAdminDemo } from "../lotusAdmin";

const salonLinks = [
  { href: "/admin/appointments", label: "Randevular" },
  { href: "/admin/booking-services", label: "Randevu Hizmetleri" },
  { href: "/admin/staff", label: "Personel & Saatler" }
];

export function SalonAdminNavigation() {
  const router = useRouter();

  useEffect(() => {
    if (!router.pathname.startsWith("/admin")) return undefined;
    if (getDefaultTemplate() !== "salon" || isLotusAdminDemo()) return undefined;

    const nav = document.querySelector<HTMLElement>(".adminSidebar nav");
    if (!nav || nav.querySelector("[data-salon-booking-link]")) return undefined;

    const created = salonLinks.map((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      link.dataset.salonBookingLink = "true";
      if (router.pathname === item.href) link.classList.add("active");
      return link;
    });

    const firstLink = nav.querySelector("a");
    created.reverse().forEach((link) => {
      if (firstLink?.nextSibling) nav.insertBefore(link, firstLink.nextSibling);
      else nav.appendChild(link);
    });

    return () => created.forEach((link) => link.remove());
  }, [router.pathname]);

  return null;
}
