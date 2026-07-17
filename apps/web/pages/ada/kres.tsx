import { FlowTemplateEnhancements } from "../../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../../src/components/ImmersiveScrollMount";
import { KindergartenPremiumHeroMount } from "../../src/components/KindergartenPremiumHeroMount";
import { SeoHead } from "../../src/components/SeoHead";
import { TemplateLanding } from "../../src/components/TemplateLanding";
import { adaKresConfig } from "../../../../configs/ada-kres";

export default function AdaKresPage() {
  return (
    <>
      <SeoHead title={`${adaKresConfig.brandName} | ${adaKresConfig.sector}`} description={adaKresConfig.heroDescription} canonicalPath="/ada/kres" />
      <div className="adaSubsiteTopLink"><a href="/ada">← Ada ana sayfa</a><a href="/ada/sanat">Müzik & Dans Okulu</a></div>
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
    </>
  );
}
