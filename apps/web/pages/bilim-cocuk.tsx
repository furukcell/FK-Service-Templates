import type { LayoutVariant } from "@fk-templates/shared";
import { KindergartenDesignChooser } from "../src/components/KindergartenDesignChooser";
import { SeoHead } from "../src/components/SeoHead";
import { demoKindergartenConfig } from "../../configs/demo-kindergarten";

const kindergartenDemoConfig = {
  ...demoKindergartenConfig,
  brandName: "Bilim Çocuk Anaokulu"
};

export default function BilimCocukDemoPage() {
  return (
    <>
      <SeoHead
        title="Bilim Çocuk Anaokulu | Web Site Demo"
        description="Bilim Çocuk Anaokulu web sitesi."
        canonicalPath="/bilim-cocuk"
      />
      <div className="bcDemoOnly">
        <KindergartenDesignChooser
          config={kindergartenDemoConfig}
          activeLayout="kindergarten-reference"
          onLayoutChange={() => undefined}
        />
      </div>
      <style jsx global>{`
        /* The shared chooser keeps its selector hidden on the public demo route. */
        .bcDemoOnly .kindergartenDesignToolbarLegacy {
          display: none !important;
        }
      `}</style>
    </>
  );
}
