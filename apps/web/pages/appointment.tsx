import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";

export default function AppointmentTemplatePage() {
  return (
    <TemplateLanding
      config={templateConfigs.appointment}
      activeTemplate="appointment"
      showTemplateSwitch={false}
    />
  );
}
