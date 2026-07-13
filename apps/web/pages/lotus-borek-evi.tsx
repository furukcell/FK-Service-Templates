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

        .lotusDemoPage .previewHeader {
          flex-direction: column;
          align-items: stretch;
          gap: 10px;
          padding: 18px;
          border-radius: 24px;
          background: rgba(255, 247, 237, 0.96);
          border: 1px solid rgba(249, 115, 22, 0.16);
          box-shadow: 0 18px 36px rgba(67, 20, 7, 0.16);
        }

        .lotusDemoPage .previewHeader > span:not(.previewBadge) {
          order: 1;
          width: 100%;
          color: #431407;
          text-align: center;
          font-size: 16px;
          line-height: 1.12;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 950;
        }

        .lotusDemoPage .previewHeader > span:not(.previewBadge)::after {
          content: "";
          display: block;
          width: 64px;
          height: 2px;
          margin: 8px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, #f97316, transparent);
        }

        .lotusDemoPage .previewHeader .previewBadge {
          order: 2;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 40px;
          padding: 10px 12px;
          border: 0;
          border-radius: 999px;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          font-size: 13px;
          line-height: 1;
          letter-spacing: -0.01em;
          background: linear-gradient(135deg, #7c2d12 0%, #ea580c 58%, #f97316 100%);
          box-shadow: 0 14px 28px rgba(124, 45, 18, 0.22);
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
          .lotusDemoPage .topBar {
            padding: 8px 12px;
            font-size: 12px;
            line-height: 1.35;
          }

          .lotusDemoPage .navbar {
            height: auto;
            min-height: 0;
            padding: 12px 18px;
            gap: 12px;
            align-items: center;
          }

          .lotusDemoPage .logoLockup {
            min-width: 0;
            flex: 1 1 auto;
          }

          .lotusDemoPage .logoLockup > span:not(.logoMark) {
            width: min(230px, 56vw);
            height: 52px;
          }

          .lotusDemoPage .navLinks {
            display: none;
          }

          .lotusDemoPage .navActions {
            flex: 0 0 auto;
          }

          .lotusDemoPage .navActions .pillButton {
            padding: 11px 14px;
            font-size: 13px;
            white-space: nowrap;
          }

          .lotusDemoPage .showcaseHero {
            width: calc(100vw - 24px);
            min-height: auto;
            margin: 14px auto 0;
            padding: 44px 18px 38px;
            border-radius: 28px;
            background-position: 63% center;
          }

          .lotusDemoPage .showcaseHero .eyebrow {
            padding: 8px 12px;
            font-size: 12px;
            max-width: 92%;
          }

          .lotusDemoPage .showcaseHero h1 {
            font-size: clamp(33px, 11vw, 46px);
            line-height: 0.98;
            letter-spacing: -0.065em;
            max-width: 100%;
            margin: 18px auto 14px;
          }

          .lotusDemoPage .showcaseHero p {
            font-size: 15px;
            line-height: 1.55;
            max-width: 94%;
            margin-left: auto;
            margin-right: auto;
          }

          .lotusDemoPage .showcaseActions {
            justify-content: center;
            gap: 10px;
          }

          .lotusDemoPage .showcaseActions .pillButton,
          .lotusDemoPage .showcaseActions .ghostButton {
            padding: 12px 15px;
            font-size: 13px;
          }

          .lotusDemoPage .showcasePanelGrid {
            width: calc(100vw - 24px);
            margin: 18px auto 0;
            display: block;
          }

          .lotusDemoPage .showcasePanelGrid > .previewPanel {
            display: none;
          }

          .lotusDemoPage .showcasePanelGrid .section {
            width: 100%;
            margin: 0;
            padding: 24px 16px;
            border-radius: 26px;
          }

          .lotusDemoPage .sectionHead {
            gap: 10px;
            margin-bottom: 16px;
          }

          .lotusDemoPage .sectionHead h2 {
            font-size: clamp(26px, 9vw, 36px);
            line-height: 1.02;
            letter-spacing: -0.055em;
          }

          .lotusDemoPage .visualGrid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .lotusDemoPage .visualCard {
            min-width: 0;
            border-radius: 18px;
            overflow: hidden;
          }

          .lotusDemoPage .visualCard img {
            height: 112px;
            width: 100%;
            object-fit: cover;
          }

          .lotusDemoPage .visualCard > div:not(.visualPlaceholder) {
            padding: 12px;
          }

          .lotusDemoPage .visualCard h3 {
            font-size: 15px;
            line-height: 1.15;
          }

          .lotusDemoPage .visualCard p {
            font-size: 13px;
            line-height: 1.45;
          }

          .lotusDemoPage .locationCard,
          .lotusDemoPage .locationCardWide {
            grid-column: 1 / -1;
          }

          .lotusDemoPage .locationCard .mapEmbedFrame,
          .lotusDemoPage .locationCardWide .mapEmbedFrame {
            min-height: 220px;
          }

          .lotusDemoPage #services,
          .lotusDemoPage .section:not(.showcasePanelGrid .section) {
            width: calc(100vw - 24px);
            margin-left: auto;
            margin-right: auto;
            padding-left: 18px;
            padding-right: 18px;
            border-radius: 26px;
          }

          .lotusDemoPage .cardGrid,
          .lotusDemoPage .formLayout {
            grid-template-columns: 1fr;
          }

          .lotusDemoPage .floatingWhatsappButton {
            right: 14px;
            bottom: 14px;
            padding: 10px 12px;
            gap: 8px;
          }

          .lotusDemoPage .floatingWhatsappText strong {
            font-size: 13px;
          }

          .lotusDemoPage .floatingWhatsappText small {
            font-size: 10px;
          }
        }

        @media (max-width: 420px) {
          .lotusDemoPage .logoLockup > span:not(.logoMark) {
            width: 188px;
            height: 44px;
          }

          .lotusDemoPage .navActions .pillButton {
            padding: 10px 12px;
            font-size: 12px;
          }

          .lotusDemoPage .showcaseHero {
            padding: 36px 15px 32px;
            border-radius: 24px;
          }

          .lotusDemoPage .showcaseActions {
            flex-direction: column;
          }

          .lotusDemoPage .showcaseActions .pillButton,
          .lotusDemoPage .showcaseActions .ghostButton {
            width: 100%;
            max-width: 260px;
          }

          .lotusDemoPage .visualGrid {
            grid-template-columns: 1fr;
          }

          .lotusDemoPage .visualCard img {
            height: 170px;
          }

          .lotusDemoPage .floatingWhatsappButton {
            right: 12px;
            bottom: 12px;
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
