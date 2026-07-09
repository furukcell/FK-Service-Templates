import { useState } from "react";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { SeoHead } from "../src/components/SeoHead";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function HomePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("appointment");
  const [activeLayout, setActiveLayout] = useState<LayoutVariant>("modern");
  const baseConfig = templateConfigs[activeTemplate];
  const { config } = useManagedTemplateConfig(baseConfig);

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/" />
      <TemplateLanding
        config={config}
        activeTemplate={activeTemplate}
        activeLayout={activeLayout}
        onTemplateChange={setActiveTemplate}
        onLayoutChange={setActiveLayout}
        showTemplateSwitch
        showLayoutSwitch
      />
    </>
  );
}
