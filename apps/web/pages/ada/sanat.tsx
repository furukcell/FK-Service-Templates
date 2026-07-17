import { FlowTemplateEnhancements } from "../../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../../src/components/ImmersiveScrollMount";
import { SalonBookingMount } from "../../src/components/SalonBookingMount";
import { SalonGalleryMount } from "../../src/components/SalonGalleryMount";
import { SalonHeroSliderMount } from "../../src/components/SalonHeroSliderMount";
import { SalonPremiumHeroMount } from "../../src/components/SalonPremiumHeroMount";
import { SalonSiteEnhancements } from "../../src/components/SalonSiteEnhancements";
import { SeoHead } from "../../src/components/SeoHead";
import { TemplateLanding } from "../../src/components/TemplateLanding";
import { adaSanatConfig } from "../../../../configs/ada-sanat";

export default function AdaSanatPage() {
  return (
    <>
      <SeoHead title={`${adaSanatConfig.brandName} | ${adaSanatConfig.sector}`} description={adaSanatConfig.heroDescription} canonicalPath="/ada/sanat" />
      <div className="adaSubsiteTopLink"><a href="/ada">← Ada ana sayfa</a><a href="/ada/kres">Ada Kreş</a></div>
      <TemplateLanding
        config={adaSanatConfig}
        activeTemplate="salon"
        activeLayout="modern"
        showTemplateSwitch={false}
        showLayoutSwitch={false}
        hidePreviewMiniGrid
      />
      <SalonPremiumHeroMount active config={adaSanatConfig} />
      <SalonHeroSliderMount active config={adaSanatConfig} />
      <SalonGalleryMount active config={adaSanatConfig} />
      <SalonBookingMount config={adaSanatConfig} immersive />
      <ImmersiveScrollMount active />
      <FlowTemplateEnhancements active config={adaSanatConfig} />
      <SalonSiteEnhancements active config={adaSanatConfig} />
    </>
  );
}
