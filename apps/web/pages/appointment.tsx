import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";

export default function AppointmentTemplatePage() {
  const activeLayout = useLayoutVariantFromQuery("modern");

  return (
    <TemplateLanding
      config={templateConfigs.appointment}
      activeTemplate="appointment"
      activeLayout={activeLayout}
      showTemplateSwitch={false}
    />
  );
}
