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

        .lotusDemoPage .navbar .navActions .ghostButton {
          display: none;
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

        .lotusDemoPage .showcaseHero {
          position: relative;
          overflow: hidden;
          color: #fff;
          background:
            radial-gradient(circle at 78% 12%, rgba(255, 255, 255, 0.18), transparent 27%),
            linear-gradient(90deg, rgba(67, 20, 7, 0.92) 0%, rgba(124, 45, 18, 0.76) 46%, rgba(249, 115, 22, 0.72) 100%),
            url("/images/logos/hero-vitrin-real.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 34px 90px rgba(67, 20, 7, 0.18);
        }

        .lotusDemoPage .showcaseHero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.08));
          pointer-events: none;
        }

        .lotusDemoPage .showcaseHero > * {
          position: relative;
          z-index: 1;
        }

        .lotusDemoPage .showcaseHero .eyebrow,
        .lotusDemoPage .showcaseHero p {
          color: rgba(255, 255, 255, 0.92);
        }

        .lotusDemoPage .showcaseHero h1 {
          color: #fff;
          text-shadow: 0 12px 38px rgba(0, 0, 0, 0.26);
        }

        .lotusDemoPage .showcaseHero .ghostButton {
          color: #fff;
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.34);
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

          .lotusDemoPage .showcaseHero {
            background-position: center;
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
