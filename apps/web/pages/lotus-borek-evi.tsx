import { demoLotusBorekConfig } from "../../../configs/demo-lotus-borek";
import { SeoHead } from "../src/components/SeoHead";
import { TemplateLanding } from "../src/components/TemplateLanding";

export default function LotusBorekDemoPage() {
  return (
    <>
      <SeoHead
        title="Lotus Börek Evi | Günlük Taze Börek ve Tepsi Sipariş"
        description={demoLotusBorekConfig.heroDescription}
        canonicalPath="/lotus-borek-evi"
        noIndex
      />
      <TemplateLanding
        config={demoLotusBorekConfig}
        activeTemplate="cafe"
        activeLayout="showcase"
        showTemplateSwitch={false}
        showLayoutSwitch={false}
        contentBasePath="/lotus-borek-evi"
      />
    </>
  );
}
