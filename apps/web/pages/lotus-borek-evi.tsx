import { demoLotusBorekConfig } from "../../../configs/demo-lotus-borek";
import { SeoHead } from "../src/components/SeoHead";
import { TemplateLanding } from "../src/components/TemplateLanding";

export default function LotusBorekDemoPage() {
  return (
    <div className="lotusDemoPage">
      <SeoHead
        title="Lotus Börek Evi | Günlük Taze Lezzetler"
        description={demoLotusBorekConfig.heroDescription}
        canonicalPath="/lotus-borek-evi"
        noIndex
      />
      <style jsx global>{`
        .lotusDemoPage .navbar {
          height: 98px;
        }

        .lotusDemoPage .logoLockup {
          gap: 0;
          min-width: 330px;
        }

        .lotusDemoPage .logoLockup .logoMark {
          display: none;
        }

        .lotusDemoPage .logoLockup > span:not(.logoMark) {
          width: 330px;
          height: 76px;
          display: block;
          overflow: hidden;
          color: transparent;
          font-size: 0;
          line-height: 0;
          background-image: url("/images/logos/lotus-borek-logo.png");
          background-repeat: no-repeat;
          background-position: left center;
          background-size: contain;
        }

        @media (max-width: 1180px) {
          .lotusDemoPage .logoLockup {
            min-width: 250px;
          }

          .lotusDemoPage .logoLockup > span:not(.logoMark) {
            width: 250px;
            height: 58px;
          }
        }

        @media (max-width: 760px) {
          .lotusDemoPage .navbar {
            height: auto;
            gap: 14px;
          }

          .lotusDemoPage .logoLockup {
            min-width: 220px;
          }

          .lotusDemoPage .logoLockup > span:not(.logoMark) {
            width: 220px;
            height: 52px;
          }
        }
      `}</style>
      <TemplateLanding
        config={demoLotusBorekConfig}
        activeTemplate="cafe"
        activeLayout="showcase"
        showTemplateSwitch={false}
        showLayoutSwitch={false}
        contentBasePath="/lotus-borek-evi"
        hideShowcaseServiceStrip
        hidePreviewMiniGrid
        prominentLocationCard
      />
    </div>
  );
}
