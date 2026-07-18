import { AdaSiteTabs } from "../../src/components/AdaSiteTabs";
import { FlowTemplateEnhancements } from "../../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../../src/components/ImmersiveScrollMount";
import { KindergartenPremiumHeroMount } from "../../src/components/KindergartenPremiumHeroMount";
import { SeoHead } from "../../src/components/SeoHead";
import { TemplateLanding } from "../../src/components/TemplateLanding";
import { adaKresConfig } from "../../../../configs/ada-kres";

export default function AdaKresPage() {
  return (
    <main className="adaPage adaKresPage">
      <SeoHead title={`${adaKresConfig.brandName} | ${adaKresConfig.sector}`} description={adaKresConfig.heroDescription} canonicalPath="/ada/kres" />
      <AdaSiteTabs active="kres" />
      <TemplateLanding
        config={adaKresConfig}
        activeTemplate="kindergarten"
        activeLayout="modern"
        showTemplateSwitch={false}
        showLayoutSwitch={false}
        hidePreviewMiniGrid
      />
      <KindergartenPremiumHeroMount active config={adaKresConfig} />
      <ImmersiveScrollMount active />
      <FlowTemplateEnhancements active config={adaKresConfig} />
    </main>
  );
}
