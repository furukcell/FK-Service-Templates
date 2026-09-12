import type { TemplateKey } from "@fk-templates/shared";
import { templateConfigs, templateOrder } from "../templateConfigs";

type Props = {
  activeTemplate: TemplateKey;
  onTemplateChange: (template: TemplateKey) => void;
};

export function KindergartenTemplateSwitcher({ activeTemplate, onTemplateChange }: Props) {
  return (
    <section
      aria-label="Şablon seçici"
      style={{
        padding: "22px 24px 18px",
        background: "linear-gradient(180deg,#f7fbff 0%,#eef7ff 100%)",
        borderBottom: "1px solid rgba(25,118,210,.12)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 1.2, color: "#6b7c93", marginBottom: 10 }}>
          WEB ŞABLONLARI
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {templateOrder.map((template) => {
            const label = template === "kindergarten" ? "Bilim Çocuk Anaokulu" : templateConfigs[template].sector;
            const active = activeTemplate === template;
            return (
              <button
                key={template}
                type="button"
                onClick={() => onTemplateChange(template)}
                style={{
                  appearance: "none",
                  border: active ? "1px solid #1976d2" : "1px solid #d8e5f2",
                  background: active ? "linear-gradient(135deg,#1976d2,#42a5f5)" : "#fff",
                  color: active ? "#fff" : "#31506e",
                  borderRadius: 999,
                  padding: "10px 15px",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: active ? "0 8px 20px rgba(25,118,210,.18)" : "0 3px 10px rgba(25,70,110,.06)",
                  transition: "all .2s ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
