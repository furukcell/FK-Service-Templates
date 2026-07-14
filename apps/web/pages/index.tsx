import { useState } from "react";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { FlowTemplateEnhancements } from "../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../src/components/ImmersiveScrollMount";
import { SalonBookingMount } from "../src/components/SalonBookingMount";
import { SalonFlowStyleButton } from "../src/components/SalonFlowStyleButton";
import { SalonGalleryMount } from "../src/components/SalonGalleryMount";
import { SalonHeroSliderMount } from "../src/components/SalonHeroSliderMount";
import { SalonSiteEnhancements } from "../src/components/SalonSiteEnhancements";
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
  const isSalon = activeTemplate === "salon";
  const isFlow = activeLayout === "flow";
  const isSalonFlow = isSalon && isFlow;

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/" />
      <TemplateLanding
        config={config}
        activeTemplate={activeTemplate}
        activeLayout={isFlow ? "modern" : activeLayout}
        onTemplateChange={setActiveTemplate}
        onLayoutChange={setActiveLayout}
        showTemplateSwitch
        showLayoutSwitch
      />
      <SalonFlowStyleButton activeTemplate={activeTemplate} activeLayout={activeLayout} onSelect={setActiveLayout} />
      <SalonHeroSliderMount active={isSalon || isFlow} config={config} />
      <SalonGalleryMount active={isSalon} config={config} />
      {isSalonFlow ? <SalonBookingMount config={config} immersive /> : null}
      <ImmersiveScrollMount active={isFlow} />
      <FlowTemplateEnhancements active={isFlow} config={config} />
      <SalonSiteEnhancements active={isSalon} config={config} />
    </>
  );
}
