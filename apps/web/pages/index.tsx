import { useState } from "react";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
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

  if (requiresSetup) return <SiteSetupGuard />;

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
