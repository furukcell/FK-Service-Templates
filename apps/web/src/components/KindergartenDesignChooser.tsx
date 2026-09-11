import type { BusinessTemplateConfig, LayoutVariant } from "@fk-templates/shared";
import { layoutVariantLabels } from "@fk-templates/shared";
import { KindergartenReferenceLayout } from "./KindergartenReferenceLayout";
import { TemplateLanding } from "./TemplateLanding";

type Props = {
  config: BusinessTemplateConfig;
  activeLayout: LayoutVariant;
  onLayoutChange: (layout: LayoutVariant) => void;
};

const kindergartenLayouts: LayoutVariant[] = [
  "modern",
  "split",
  "showcase",
  "flow",
  "corporate",
  "kindergarten-reference"
];

export function KindergartenDesignChooser({ config, activeLayout, onLayoutChange }: Props) {
  const isReference = activeLayout === "kindergarten-reference";
  const templateLayout = activeLayout === "flow" ? "modern" : activeLayout;

  return (
    <main className="kindergartenDesignHub">
      <div className="kindergartenDesignToolbar" role="region" aria-label="Anaokulu tasarım seçenekleri">
        <div>
          <strong>Bilim Çocuk Anaokulu</strong>
          <span>6 tasarım arasından seçim yapın</span>
        </div>
        <div className="kindergartenDesignChoices">
          {kindergartenLayouts.map((layout, index) => (
            <button
              key={layout}
              type="button"
              className={activeLayout === layout ? "active" : ""}
              onClick={() => onLayoutChange(layout)}
            >
              <small>{index + 1}</small>
              {layout === "kindergarten-reference" ? "Bilim Çocuk" : layoutVariantLabels[layout]}
            </button>
          ))}
        </div>
      </div>

      {isReference ? (
        <KindergartenReferenceLayout config={config} onLayoutChange={onLayoutChange} />
      ) : (
        <TemplateLanding
          config={config}
          activeTemplate="kindergarten"
          activeLayout={templateLayout}
          onLayoutChange={onLayoutChange}
          showTemplateSwitch
          showLayoutSwitch={false}
        />
      )}
    </main>
  );
}
