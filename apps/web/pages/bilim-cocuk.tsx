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
  const [activeLayout] = useState<LayoutVariant>("kindergarten-reference");

  return (
    <>
      <SeoHead
        title="Bilim Çocuk Anaokulu | Web Site Demo"
        description="Bilim Çocuk Anaokulu web sitesi."
        canonicalPath="/bilim-cocuk"
      />
      <style jsx global>{`
        /* Public Bilim Çocuk link: show one fixed design only. */
        .bcDemoOnly .kindergartenDesignToolbarLegacy {
          display: none !important;
        }
      `}</style>
      <div className="bcDemoOnly">
        <KindergartenDesignChooser
          config={kindergartenDemoConfig}
          activeLayout={activeLayout}
          onLayoutChange={() => undefined}
        />
      </div>
    </>
  );
}
