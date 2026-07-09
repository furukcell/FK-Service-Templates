import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";

export default function SalonTemplatePage() {
  const activeLayout = useLayoutVariantFromQuery("modern");

  return (
    <TemplateLanding
      config={templateConfigs.salon}
      activeTemplate="salon"
      activeLayout={activeLayout}
      showTemplateSwitch={false}
    />
  );
}
