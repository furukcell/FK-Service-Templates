import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { BusinessTemplateConfig } from "@fk-templates/shared";
import { SalonBooking } from "./SalonBooking";
import { SalonBookingWizard } from "./SalonBookingWizard";

export function SalonBookingMount({ config, immersive = false }: { config: BusinessTemplateConfig; immersive?: boolean }) {
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
    mount.className = immersive ? "salonBookingPortal salonBookingPortalImmersive" : "salonBookingPortal";
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
  }, [immersive]);

  if (!target) return null;
  return createPortal(immersive ? <SalonBookingWizard config={config} /> : <SalonBooking config={config} />, target);
}
