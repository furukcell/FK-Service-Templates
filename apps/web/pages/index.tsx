import { useState } from "react";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { ImmersiveScrollMount } from "../src/components/ImmersiveScrollMount";
import { SalonBookingMount } from "../src/components/SalonBookingMount";
import { SalonFlowStyleButton } from "../src/components/SalonFlowStyleButton";
import { SeoHead } from "../src/components/SeoHead";
import { SiteSetupGuard } from "../src/components/SiteSetupGuard";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { getDefaultTemplate } from "../src/defaultTemplate";
import { templateConfigs } from "../src/templateConfigs";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function HomePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>(getDefaultTemplate());
  const [activeLayout, setActiveLayout] = useState<LayoutVariant>("modern");
  const baseConfig = templateConfigs[activeTemplate];
  const { config, requiresSetup } = useManagedTemplateConfig(baseConfig);
  const isSalonFlow = activeTemplate === "salon" && activeLayout === "flow";

  function changeTemplate(template: TemplateKey) {
    setActiveTemplate(template);
    if (template !== "salon" && activeLayout === "flow") setActiveLayout("modern");
  }

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/" />
      <TemplateLanding
        config={config}
        activeTemplate={activeTemplate}
        activeLayout={isSalonFlow ? "modern" : activeLayout}
        onTemplateChange={changeTemplate}
        onLayoutChange={setActiveLayout}
        showTemplateSwitch
        showLayoutSwitch
      />
      <SalonFlowStyleButton activeTemplate={activeTemplate} activeLayout={activeLayout} onSelect={setActiveLayout} />
      {isSalonFlow ? <SalonBookingMount config={config} immersive /> : null}
      <ImmersiveScrollMount active={isSalonFlow} />
    </>
  );
}
