import { useEffect } from "react";
import { demoLotusBorekConfig } from "../../../configs/demo-lotus-borek";
import { SeoHead } from "../src/components/SeoHead";
import { TemplateLanding } from "../src/components/TemplateLanding";

const lotusWhatsappUrl = `https://wa.me/905370584420?text=${encodeURIComponent("Merhaba Lotus Börek Evi, sipariş vermek ve menü/fiyat bilgisi almak istiyorum.")}`;

export default function LotusBorekDemoPage() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a"));
    links.forEach((link) => {
      if (link.textContent?.includes("WhatsApp")) {
        link.href = lotusWhatsappUrl;
        link.target = "_blank";
        link.rel = "noreferrer";
      }
    });
  }, []);

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