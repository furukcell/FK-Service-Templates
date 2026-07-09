import { SeoHead } from "../src/components/SeoHead";
import { SiteSetupGuard } from "../src/components/SiteSetupGuard";
import { TemplateLanding } from "../src/components/TemplateLanding";
import { templateConfigs } from "../src/templateConfigs";
import { useLayoutVariantFromQuery } from "../src/useLayoutVariantFromQuery";
import { useManagedTemplateConfig } from "../src/useManagedTemplateConfig";

export default function AppointmentTemplatePage() {
  const { config, layoutVariant, requiresSetup } = useManagedTemplateConfig(templateConfigs.appointment);
  const activeLayout = useLayoutVariantFromQuery(layoutVariant || "modern");

  if (requiresSetup) return <SiteSetupGuard />;

  return (
    <>
      <SeoHead title={`${config.brandName} | ${config.sector}`} description={config.heroDescription} canonicalPath="/appointment" />
      <TemplateLanding
        config={config}
        activeTemplate="appointment"
        activeLayout={activeLayout}
        showTemplateSwitch={false}
        showLayoutSwitch={false}
      />
    </>
  );
}
