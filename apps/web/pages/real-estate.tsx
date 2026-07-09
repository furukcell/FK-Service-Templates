import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function RealEstateTemplatePage() {
  const { config, layoutVariant } = useManagedTemplateConfig(templateConfigs["real-estate"]);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");

  return (
    <TemplateLanding
      config={config}
      activeTemplate="real-estate"
      activeLayout={activeLayout}
      showTemplateSwitch={false}
      showLayoutSwitch={false}
    />
  );
}
