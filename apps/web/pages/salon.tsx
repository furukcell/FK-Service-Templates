import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";

export default function SalonTemplatePage() {
  return (
    <TemplateLanding
      config={templateConfigs.salon}
      activeTemplate="salon"
      showTemplateSwitch={false}
    />
  );
}
