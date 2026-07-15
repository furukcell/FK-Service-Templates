import { FlowTemplateEnhancements } from "../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../src/components/ImmersiveScrollMount";
import { SeoHead } from "../src/components/SeoHead";
import { SiteSetupGuard } from "../src/components/SiteSetupGuard";
import { SalonBookingMount } from "../src/components/SalonBookingMount";
import { SalonGalleryMount } from "../src/components/SalonGalleryMount";
import { SalonHeroSliderMount } from "../src/components/SalonHeroSliderMount";
import { SalonHybridHeroMount } from "../src/components/SalonHybridHeroMount";
import { SalonSiteEnhancements } from "../src/components/SalonSiteEnhancements";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function SalonTemplatePage() {
  const { config, layoutVariant, requiresSetup } = useManagedTemplateConfig(templateConfigs.salon);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");
  const isImmersive = activeLayout === "flow";
  const baseLayout = isImmersive ? "modern" : activeLayout;

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/salon" />
      <TemplateLanding
        config={config}
        activeTemplate="salon"
        activeLayout={baseLayout}
        showTemplateSwitch={false}
        showLayoutSwitch={false}
      />
      <SalonHybridHeroMount active={isImmersive} config={config} />
      <SalonHeroSliderMount active config={config} />
      <SalonGalleryMount active config={config} />
      <SalonBookingMount config={config} immersive={isImmersive} />
      <ImmersiveScrollMount active={isImmersive} />
      <FlowTemplateEnhancements active={isImmersive} config={config} />
      <SalonSiteEnhancements active config={config} />
    </>
  );
}
