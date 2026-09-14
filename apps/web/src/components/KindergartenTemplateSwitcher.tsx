import type { TemplateKey } from "@fk-templates/shared";

type Props = {
  activeTemplate: TemplateKey;
  onTemplateChange: (template: TemplateKey) => void;
};

export function KindergartenTemplateSwitcher({ activeTemplate }: Props) {
  if (activeTemplate !== "kindergarten") return null;
  return null;
}
