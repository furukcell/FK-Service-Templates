import { useEffect } from "react";
import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";

type NavItem = { label: string; href: string };

const FLOW_NAV_ITEMS: Record<TemplateKey, NavItem[]> = {
  appointment: [
    { label: "Hizmetler", href: "#services" },
    { label: "Ekip", href: "#about" },
    { label: "Klinik", href: "#gallery" },
    { label: "Randevu", href: "#request-form" },
    { label: "İletişim", href: "#contact" }
  ],
  salon: [
    { label: "Hizmetler", href: "#services" },
    { label: "Kampanyalar", href: "#campaigns" },
    { label: "Randevu", href: "#request-form" },
    { label: "Galeri", href: "#gallery" },
    { label: "Hakkımızda", href: "#about" },
    { label: "İletişim", href: "#contact" }
  ],
  "real-estate": [
    { label: "İlanlar", href: "#services" },
    { label: "Vitrin", href: "#gallery" },
    { label: "Danışmanlar", href: "#about" },
    { label: "Talep Bırak", href: "#request-form" },
    { label: "İletişim", href: "#contact" }
  ],
  cafe: [
    { label: "Menü", href: "#services" },
    { label: "Fırsatlar", href: "#campaigns" },
    { label: "Vitrin", href: "#gallery" },
    { label: "Sipariş", href: "#request-form" },
    { label: "Konum", href: "#contact" }
  ],
  kindergarten: [
    { label: "Sınıflar", href: "#services" },
    { label: "Günlük Akış", href: "#campaigns" },
    { label: "Eğitim Ekibi", href: "#about" },
    { label: "Galeri", href: "#gallery" },
    { label: "Kayıt", href: "#request-form" }
  ],
  "event-venue": [
    { label: "Paketler", href: "#services" },
    { label: "Fırsatlar", href: "#campaigns" },
    { label: "Galeri", href: "#gallery" },
    { label: "Tarih Sor", href: "#request-form" },
    { label: "İletişim", href: "#contact" }
  ]
};

const CTA_LABELS: Record<TemplateKey, string> = {
  appointment: "Randevu Al",
  salon: "Randevu Al",
  "real-estate": "Talep Bırak",
  cafe: "Sipariş Ver",
  kindergarten: "Ön Görüşme",
  "event-venue": "Tarih Sor"
};

function rememberAttribute(element: HTMLElement, attribute: string, value: string) {
  const key = `flowOriginal${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`;
  if (!(key in element.dataset)) element.dataset[key] = element.getAttribute(attribute) || "";
  element.setAttribute(attribute, value);
}

function restoreAttribute(element: HTMLElement, attribute: string) {
  const key = `flowOriginal${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`;
  const original = element.dataset[key];
  if (original === undefined) return;
  if (original) element.setAttribute(attribute, original);
  else element.removeAttribute(attribute);
  delete element.dataset[key];
}

export function FlowTemplateEnhancements({
  active,
  config
}: {
  active: boolean;
  config: BusinessTemplateConfig;
}) {
  useEffect(() => {
    if (!active) return undefined;

    let scheduled = false;
    const addedLinks: HTMLAnchorElement[] = [];
    const touchedLinks = new Set<HTMLAnchorElement>();
    const touchedIds = new Set<HTMLElement>();
    const touchedActions = new Set<HTMLAnchorElement>();

    function assignId(element: HTMLElement | null, id: string) {
      if (!element) return;
      rememberAttribute(element, "id", id);
      touchedIds.add(element);
    }

    function apply() {
      scheduled = false;
      const shell = document.querySelector<HTMLElement>(".pageShell");
      if (!shell) return;

      shell.classList.add("flowTemplatePage", `flowTemplate-${config.template}`);
      assignId(shell.querySelector<HTMLElement>("#services"), "services");
      assignId(shell.querySelector<HTMLElement>(".campaignCard")?.closest<HTMLElement>("section") || null, "campaigns");
      assignId(shell.querySelector<HTMLElement>(".staffCard")?.closest<HTMLElement>("section") || null, "about");
      assignId(shell.querySelector<HTMLElement>(".visualGrid")?.closest<HTMLElement>("section") || null, "gallery");
      assignId(shell.querySelector<HTMLElement>(".locationCard"), "contact");

      if (config.template !== "salon") {
        const nav = shell.querySelector<HTMLElement>(".navLinks");
        if (nav) {
          const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a"));
          FLOW_NAV_ITEMS[config.template].forEach((item, index) => {
            let link = links[index];
            if (!link) {
              link = document.createElement("a");
              nav.appendChild(link);
              addedLinks.push(link);
            }
            if (link.dataset.flowOriginalText === undefined) link.dataset.flowOriginalText = link.textContent || "";
            rememberAttribute(link, "href", item.href);
            link.textContent = item.label;
            touchedLinks.add(link);
          });
        }

        shell.querySelectorAll<HTMLAnchorElement>(".navActions a[href='#request-form']").forEach((action) => {
          if (action.dataset.flowOriginalText === undefined) action.dataset.flowOriginalText = action.textContent || "";
          action.textContent = CTA_LABELS[config.template];
          touchedActions.add(action);
        });
      }
    }

    function scheduleApply() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(apply);
    }

    scheduleApply();
    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const shell = document.querySelector<HTMLElement>(".pageShell");
      shell?.classList.remove("flowTemplatePage", `flowTemplate-${config.template}`);
      addedLinks.forEach((link) => link.remove());
      touchedLinks.forEach((link) => {
        restoreAttribute(link, "href");
        if (link.dataset.flowOriginalText !== undefined) {
          link.textContent = link.dataset.flowOriginalText;
          delete link.dataset.flowOriginalText;
        }
      });
      touchedActions.forEach((action) => {
        if (action.dataset.flowOriginalText !== undefined) {
          action.textContent = action.dataset.flowOriginalText;
          delete action.dataset.flowOriginalText;
        }
      });
      touchedIds.forEach((element) => restoreAttribute(element, "id"));
    };
  }, [active, config]);

  return null;
}
