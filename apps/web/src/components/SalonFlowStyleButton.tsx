import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { layoutVariantLabels } from "@fk-templates/shared";

export function SalonFlowStyleButton({
  activeTemplate,
  activeLayout,
  onSelect
}: {
  activeTemplate: TemplateKey;
  activeLayout: LayoutVariant;
  onSelect: (layout: LayoutVariant) => void;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const findTarget = () => {
      const layoutSwitch = document.querySelector<HTMLElement>(".layoutSwitch");
      if (layoutSwitch) setTarget(layoutSwitch);
    };

    findTarget();
    const observer = new MutationObserver(findTarget);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [activeTemplate]);

  if (!target) return null;

  return createPortal(
    <button
      className={`templateButton salonFlowButton flowStyleButton flowStyleButton-${activeTemplate} ${activeLayout === "flow" ? "active" : ""}`}
      onClick={() => onSelect("flow")}
      type="button"
    >
      {layoutVariantLabels.flow}
    </button>,
    target
  );
}
