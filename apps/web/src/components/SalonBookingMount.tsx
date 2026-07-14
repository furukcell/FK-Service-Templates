import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { BusinessTemplateConfig } from "@fk-templates/shared";
import { SalonBooking } from "./SalonBooking";

export function SalonBookingMount({ config }: { config: BusinessTemplateConfig }) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".pageShell");
    if (!shell) return undefined;

    const legacyForm = shell.querySelector<HTMLElement>("section#request-form");
    if (legacyForm) {
      legacyForm.id = "legacy-request-form";
      legacyForm.style.display = "none";
    }

    const mount = document.createElement("div");
    mount.className = "salonBookingPortal";
    const footer = shell.querySelector("footer.footer");
    shell.insertBefore(mount, footer || null);
    setTarget(mount);

    return () => {
      mount.remove();
      if (legacyForm) {
        legacyForm.id = "request-form";
        legacyForm.style.display = "";
      }
    };
  }, []);

  return target ? createPortal(<SalonBooking config={config} />, target) : null;
}
