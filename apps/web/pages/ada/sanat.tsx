import { AdaSiteTabs } from "../../src/components/AdaSiteTabs";
import { FlowTemplateEnhancements } from "../../src/components/FlowTemplateEnhancements";
import { ImmersiveScrollMount } from "../../src/components/ImmersiveScrollMount";
import { SalonBookingMount } from "../../src/components/SalonBookingMount";
import { SalonGalleryMount } from "../../src/components/SalonGalleryMount";
import { SalonSiteEnhancements } from "../../src/components/SalonSiteEnhancements";
import { SeoHead } from "../../src/components/SeoHead";
import { TemplateLanding } from "../../src/components/TemplateLanding";
import { adaSanatConfig } from "../../../../configs/ada-sanat";

export default function AdaSanatPage() {
  return (
    <main className="adaPage adaSanatPage">
      <SeoHead title={`${adaSanatConfig.brandName} | ${adaSanatConfig.sector}`} description={adaSanatConfig.heroDescription} canonicalPath="/ada/sanat" />
      <AdaSiteTabs active="sanat" />
      <section className="adaArtLead" aria-label="Ada Dans ve Müzik Okulu giriş alanı">
        <div className="adaArtLeadCopy">
          <span>Dans & Müzik Okulu</span>
          <h1>Ritimle özgüven, dansla hareket, müzikle ifade.</h1>
          <p>Çocukların enerjisini sahne özgüvenine, ritim duygusuna ve yaratıcı ifadeye dönüştüren sıcak bir sanat eğitim alanı.</p>
          <div>
            <a className="adaGatewayPrimary" href="#request-form">Deneme Dersi Al</a>
            <a className="adaGatewaySecondary" href="#services">Programları İncele</a>
          </div>
        </div>
        <div className="adaArtLeadVisual" aria-hidden="true">
          <span>♪</span>
          <strong>Dans</strong>
          <em>Ritim • Müzik • Sahne</em>
        </div>
      </section>
      <TemplateLanding
        config={adaSanatConfig}
        activeTemplate="salon"
        activeLayout="modern"
        showTemplateSwitch={false}
        showLayoutSwitch={false}
        hidePreviewMiniGrid
      />
      <SalonGalleryMount active config={adaSanatConfig} />
      <SalonBookingMount config={adaSanatConfig} immersive />
      <ImmersiveScrollMount active />
      <FlowTemplateEnhancements active config={adaSanatConfig} />
      <SalonSiteEnhancements active config={adaSanatConfig} />
    </main>
  );
}
