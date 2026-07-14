import { useEffect } from "react";
import type { BusinessTemplateConfig } from "@fk-templates/shared";

const SALON_NAV_ITEMS = [
  { label: "Hizmetler", href: "#services" },
  { label: "Kampanyalar", href: "#campaigns" },
  { label: "Randevu", href: "#request-form" },
  { label: "Galeri", href: "#gallery" },
  { label: "Hakkımızda", href: "#about" },
  { label: "İletişim", href: "#contact" }
];

function normalizePhone(phone: string) {
  return phone.replace(/[^0-9]/g, "");
}

function salonWhatsappUrl(config: BusinessTemplateConfig) {
  const phone = normalizePhone(config.whatsapp || config.phone);
  const message = encodeURIComponent(`Merhaba ${config.brandName}, hizmetleriniz ve randevu seçenekleriniz hakkında bilgi almak istiyorum.`);
  return phone.length >= 10
    ? `https://wa.me/${phone}?text=${message}`
    : `https://api.whatsapp.com/send?text=${message}`;
}

function rememberAttribute(element: HTMLElement, attribute: string, value: string) {
  const key = `salonOriginal${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`;
  if (!(key in element.dataset)) element.dataset[key] = element.getAttribute(attribute) || "";
  element.setAttribute(attribute, value);
}

function restoreAttribute(element: HTMLElement, attribute: string) {
  const key = `salonOriginal${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`;
  const original = element.dataset[key];
  if (original === undefined) return;
  if (original) element.setAttribute(attribute, original);
  else element.removeAttribute(attribute);
  delete element.dataset[key];
}

export function SalonSiteEnhancements({
  active,
  config
}: {
  active: boolean;
  config: BusinessTemplateConfig;
}) {
  useEffect(() => {
    if (!active) return undefined;

    let createdWhatsapp: HTMLAnchorElement | null = null;
    let scheduled = false;
    const addedNavLinks: HTMLAnchorElement[] = [];
    const touchedNavLinks = new Set<HTMLAnchorElement>();
    const touchedIds = new Set<HTMLElement>();
    const touchedActions = new Set<HTMLAnchorElement>();
    const touchedWhatsapp = new Set<HTMLAnchorElement>();

    function assignSectionId(element: HTMLElement | null, id: string) {
      if (!element) return;
      rememberAttribute(element, "id", id);
      touchedIds.add(element);
    }

    function applyEnhancements() {
      scheduled = false;
      const shell = document.querySelector<HTMLElement>(".pageShell");
      if (!shell) return;
      shell.classList.add("salonEnhancedPage");

      assignSectionId(shell.querySelector<HTMLElement>("#services"), "services");
      assignSectionId(shell.querySelector<HTMLElement>(".campaignCard")?.closest<HTMLElement>("section") || null, "campaigns");
      assignSectionId(shell.querySelector<HTMLElement>(".staffCard")?.closest<HTMLElement>("section") || null, "about");
      assignSectionId(shell.querySelector<HTMLElement>(".visualGrid")?.closest<HTMLElement>("section") || null, "gallery");
      assignSectionId(shell.querySelector<HTMLElement>(".locationCard"), "contact");

      const nav = shell.querySelector<HTMLElement>(".navLinks");
      if (nav) {
        const existingLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"));
        SALON_NAV_ITEMS.forEach((item, index) => {
          let link = existingLinks[index];
          if (!link) {
            link = document.createElement("a");
            link.dataset.salonAddedNav = "true";
            nav.appendChild(link);
            addedNavLinks.push(link);
          }
          if (!link.dataset.salonOriginalText) link.dataset.salonOriginalText = link.textContent || "";
          rememberAttribute(link, "href", item.href);
          link.textContent = item.label;
          touchedNavLinks.add(link);
        });
      }

      shell.querySelectorAll<HTMLAnchorElement>(".navActions a[href='#request-form']").forEach((action) => {
        if (!action.dataset.salonOriginalText) action.dataset.salonOriginalText = action.textContent || "";
        action.textContent = "Randevu Al";
        touchedActions.add(action);
      });

      const href = salonWhatsappUrl(config);
      let whatsapp = shell.querySelector<HTMLAnchorElement>(".floatingWhatsappButton");
      if (!whatsapp) {
        whatsapp = document.createElement("a");
        whatsapp.className = "floatingWhatsappButton salonCreatedWhatsapp";
        whatsapp.target = "_blank";
        whatsapp.rel = "noreferrer";
        whatsapp.innerHTML = '<span class="floatingWhatsappMark" aria-hidden="true">WA</span><span class="floatingWhatsappText"><strong>WhatsApp</strong><small>Randevu ve bilgi</small></span>';
        shell.appendChild(whatsapp);
        createdWhatsapp = whatsapp;
      }
      rememberAttribute(whatsapp, "href", href);
      whatsapp.setAttribute("aria-label", `${config.brandName} WhatsApp iletişim`);
      const whatsappText = whatsapp.querySelector<HTMLElement>(".floatingWhatsappText small");
      if (whatsappText) {
        if (!whatsappText.dataset.salonOriginalText) whatsappText.dataset.salonOriginalText = whatsappText.textContent || "";
        whatsappText.textContent = "Randevu ve bilgi";
      }
      touchedWhatsapp.add(whatsapp);
    }

    function scheduleApply() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(applyEnhancements);
    }

    scheduleApply();
    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document.querySelector<HTMLElement>(".pageShell")?.classList.remove("salonEnhancedPage");
      addedNavLinks.forEach((link) => link.remove());
      touchedNavLinks.forEach((link) => {
        restoreAttribute(link, "href");
        if (link.dataset.salonOriginalText !== undefined) {
          link.textContent = link.dataset.salonOriginalText;
          delete link.dataset.salonOriginalText;
        }
      });
      touchedActions.forEach((action) => {
        if (action.dataset.salonOriginalText !== undefined) {
          action.textContent = action.dataset.salonOriginalText;
          delete action.dataset.salonOriginalText;
        }
      });
      touchedIds.forEach((element) => restoreAttribute(element, "id"));
      touchedWhatsapp.forEach((whatsapp) => {
        restoreAttribute(whatsapp, "href");
        const small = whatsapp.querySelector<HTMLElement>(".floatingWhatsappText small");
        if (small?.dataset.salonOriginalText !== undefined) {
          small.textContent = small.dataset.salonOriginalText;
          delete small.dataset.salonOriginalText;
        }
      });
      createdWhatsapp?.remove();
    };
  }, [active, config]);

  return null;
}
