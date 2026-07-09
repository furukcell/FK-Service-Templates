import { useState } from "react";
import type { LayoutVariant, TemplateKey } from "@fk-templates/shared";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";

export default function HomePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("appointment");
  const [activeLayout, setActiveLayout] = useState<LayoutVariant>("modern");
  const config = templateConfigs[activeTemplate];

  return (
    <TemplateLanding
      config={config}
      activeTemplate={activeTemplate}
      activeLayout={activeLayout}
      onTemplateChange={setActiveTemplate}
      onLayoutChange={setActiveLayout}
      showTemplateSwitch
    />
  );
}
