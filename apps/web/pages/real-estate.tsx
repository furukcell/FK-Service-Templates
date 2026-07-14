import { FlowTemplateEnhancements } from "../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../src/components/ImmersiveScrollMount";
import { SalonHeroSliderMount } from "../src/components/SalonHeroSliderMount";
import { SeoHead } from "../src/components/SeoHead";
import { SiteSetupGuard } from "../src/components/SiteSetupGuard";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function RealEstateTemplatePage() {
  const { config, layoutVariant, requiresSetup } = useManagedTemplateConfig(templateConfigs["real-estate"]);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");
  const isFlow = activeLayout === "flow";

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/real-estate" />
      <TemplateLanding
        config={config}
        activeTemplate="real-estate"
        activeLayout={isFlow ? "modern" : activeLayout}
        showTemplateSwitch={false}
        showLayoutSwitch={false}
      />
      <SalonHeroSliderMount active={isFlow} config={config} />
      <ImmersiveScrollMount active={isFlow} />
      <FlowTemplateEnhancements active={isFlow} config={config} />
    </>
  );
}
