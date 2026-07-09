import { useState } from "react";
import type { TemplateKey } from "@fk-templates/shared";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";

export default function HomePage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("appointment");
  const config = templateConfigs[activeTemplate];

  return (
    <TemplateLanding
      config={config}
      activeTemplate={activeTemplate}
      onTemplateChange={setActiveTemplate}
      showTemplateSwitch
    />
  );
}
