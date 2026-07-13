import type { CSSProperties } from "react";
import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";
import { demoLotusBorekConfig } from "../../../configs/demo-lotus-borek";

export const lotusAdminTemplateKeys: TemplateKey[] = ["cafe"];

export function isLotusAdminDemo() {
  return process.env.NEXT_PUBLIC_BUSINESS_ID === "lotus-borek-demo" || process.env.NEXT_PUBLIC_SITE_HOME_PATH === "/lotus-borek-evi";
}

export function getLotusAdminConfig(template: TemplateKey, templateConfigs: Record<TemplateKey, BusinessTemplateConfig>) {
  if (isLotusAdminDemo() && template === "cafe") return demoLotusBorekConfig;
  return templateConfigs[template];
}

export function getLotusAwareTemplate(defaultTemplate: TemplateKey): TemplateKey {
  return isLotusAdminDemo() ? "cafe" : defaultTemplate;
}

export function getAdminShellClassName() {
  return isLotusAdminDemo() ? "adminShell lotusAdminShell" : "adminShell";
}

export function getAdminShellStyle(): CSSProperties | undefined {
  if (!isLotusAdminDemo()) return undefined;

  return {
    "--primary": demoLotusBorekConfig.theme.primary,
    "--secondary": demoLotusBorekConfig.theme.secondary,
    "--accent": demoLotusBorekConfig.theme.accent,
    "--soft": demoLotusBorekConfig.theme.soft,
    "--dark": demoLotusBorekConfig.theme.dark
  } as CSSProperties;
}

export const lotusColorPresets = [
  {
    label: "Lotus sıcak",
    primary: "#7C2D12",
    secondary: "#F97316",
    accent: "#FACC15",
    soft: "#FFF7ED",
    dark: "#431407"
  },
  {
    label: "Kahve krem",
    primary: "#92400E",
    secondary: "#D97706",
    accent: "#FDE68A",
    soft: "#FFFBEB",
    dark: "#451A03"
  },
  {
    label: "Siyah altın",
    primary: "#111827",
    secondary: "#B45309",
    accent: "#FBBF24",
    soft: "#FFF7ED",
    dark: "#030712"
  }
];
