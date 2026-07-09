import { SeoHead } from "../src/components/SeoHead";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function SalonTemplatePage() {
  const { config, layoutVariant } = useManagedTemplateConfig(templateConfigs.salon);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/salon" />
      <TemplateLanding
        config={config}
        activeTemplate="salon"
        activeLayout={activeLayout}
        showTemplateSwitch={false}
        showLayoutSwitch={false}
      />
    </>
  );
}
