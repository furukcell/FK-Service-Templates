import { SeoHead } from "../src/components/SeoHead";
import { SiteSetupGuard } from "../src/components/SiteSetupGuard";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function CafeTemplatePage() {
  const { config, layoutVariant, requiresSetup } = useManagedTemplateConfig(templateConfigs.cafe);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/cafe" />
      <TemplateLanding
        config={config}
        activeTemplate="cafe"
        activeLayout={activeLayout}
        showTemplateSwitch={false}
        showLayoutSwitch={false}
      />
    </>
  );
}
