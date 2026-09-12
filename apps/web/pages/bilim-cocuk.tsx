import type { LayoutVariant } from "@fk-templates/shared";
import { useState } from "react";
import { KindergartenDesignChooser } from "../src/components/KindergartenDesignChooser";
import { SeoHead } from "../src/components/SeoHead";
import { demoKindergartenConfig } from "../../configs/demo-kindergarten";

const kindergartenDemoConfig = {
  ...demoKindergartenConfig,
  brandName: "Bilim Çocuk Anaokulu"
};

export default function BilimCocukDemoPage() {
  const [activeLayout, setActiveLayout] = useState<LayoutVariant>("kindergarten-reference");

  return (
    <>
      <SeoHead
        title="Bilim Çocuk Anaokulu | Web Site Demo"
        description="Bilim Çocuk Anaokulu için hazırlanmış web site tasarım seçenekleri."
        canonicalPath="/bilim-cocuk"
      />
      <style jsx global>{`
        .bcDemoOnly .kindergartenDesignToolbarLegacy {
          display: flex !important;
          position: relative;
          z-index: 120;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 18px 24px;
          margin: 0;
          background: linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%);
          border-bottom: 1px solid #dceafb;
          box-shadow: 0 8px 24px rgba(13, 71, 161, .08);
          font-family: 'Nunito', system-ui, sans-serif;
        }
        .bcDemoOnly .kindergartenDesignToolbarTitle {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .bcDemoOnly .kindergartenDesignToolbarTitle strong {
          color: #0d47a1;
          font: 900 18px/1 'Baloo 2', sans-serif;
        }
        .bcDemoOnly .kindergartenDesignToolbarTitle span {
          color: #6b7f99;
          font-size: 11px;
          font-weight: 800;
        }
        .bcDemoOnly .kindergartenDesignToolbarButtons {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          width: 100%;
          max-width: 1050px;
        }
        .bcDemoOnly .kindergartenDesignToolbarButtons button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-width: 118px;
          justify-content: center;
          padding: 10px 14px;
          border: 1px solid #d7e5f5;
          border-radius: 12px;
          background: #fff;
          color: #45617d;
          font: 900 12px/1 'Nunito', system-ui, sans-serif;
          cursor: pointer;
          box-shadow: 0 5px 14px rgba(13, 71, 161, .06);
          transition: transform .18s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease;
        }
        .bcDemoOnly .kindergartenDesignToolbarButtons button:hover {
          transform: translateY(-2px);
          border-color: #90caf9;
          color: #1976d2;
          box-shadow: 0 9px 20px rgba(25, 118, 210, .12);
        }
        .bcDemoOnly .kindergartenDesignToolbarButtons button.active {
          border-color: #1976d2;
          background: linear-gradient(135deg, #1976d2, #42a5f5);
          color: #fff;
          box-shadow: 0 9px 22px rgba(25, 118, 210, .22);
        }
        .bcDemoOnly .kindergartenDesignToolbarButtons button small {
          display: grid;
          place-items: center;
          width: 22px;
          height: 22px;
          border-radius: 7px;
          background: #edf5fd;
          color: #1976d2;
          font-size: 9px;
        }
        .bcDemoOnly .kindergartenDesignToolbarButtons button.active small {
          background: rgba(255,255,255,.22);
          color: #fff;
        }
        @media (max-width: 620px) {
          .bcDemoOnly .kindergartenDesignToolbarLegacy { padding: 14px 12px; }
          .bcDemoOnly .kindergartenDesignToolbarTitle { gap: 5px; }
          .bcDemoOnly .kindergartenDesignToolbarTitle strong { font-size: 16px; }
          .bcDemoOnly .kindergartenDesignToolbarButtons { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .bcDemoOnly .kindergartenDesignToolbarButtons button { min-width: 0; width: 100%; }
        }
      `}</style>
      <div className="bcDemoOnly">
        <KindergartenDesignChooser
          config={kindergartenDemoConfig}
          activeLayout={activeLayout}
          onLayoutChange={setActiveLayout}
        />
      </div>
    </>
  );
}
