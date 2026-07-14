import { FlowTemplateEnhancements } from "../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../src/components/ImmersiveScrollMount";
import { SalonHeroSliderMount } from "../src/components/SalonHeroSliderMount";
import { SeoHead } from "../src/components/SeoHead";
import { SiteSetupGuard } from "../src/components/SiteSetupGuard";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function KindergartenTemplatePage() {
  const { config, layoutVariant, requiresSetup } = useManagedTemplateConfig(templateConfigs.kindergarten);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");
  const isFlow = activeLayout === "flow";

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/kindergarten" />
      <TemplateLanding
        config={config}
        activeTemplate="kindergarten"
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
