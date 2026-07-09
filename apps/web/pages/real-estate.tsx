import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";

export default function RealEstateTemplatePage() {
  return (
    <TemplateLanding
      config={templateConfigs["real-estate"]}
      activeTemplate="real-estate"
      showTemplateSwitch={false}
    />
  );
}
