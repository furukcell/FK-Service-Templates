import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";

export default function RealEstateTemplatePage() {
  const activeLayout = useLayoutVariantFromQuery("modern");

  return (
    <TemplateLanding
      config={templateConfigs["real-estate"]}
      activeTemplate="real-estate"
      activeLayout={activeLayout}
      showTemplateSwitch={false}
    />
  );
}
