import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function AppointmentTemplatePage() {
  const { config, layoutVariant } = useManagedTemplateConfig(templateConfigs.appointment);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");

  return (
    <TemplateLanding
      config={config}
      activeTemplate="appointment"
      activeLayout={activeLayout}
      showTemplateSwitch={false}
      showLayoutSwitch={false}
    />
  );
}
