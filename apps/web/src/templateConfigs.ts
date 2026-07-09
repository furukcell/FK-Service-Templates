import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";
import { demoVeterinaryConfig } from "../../../configs/demo-veterinary";
import { demoSalonConfig } from "../../../configs/demo-salon";
import { demoRealEstateConfig } from "../../../configs/demo-real-estate";

export const templateConfigs: Record<TemplateKey, BusinessTemplateConfig> = {
  appointment: demoVeterinaryConfig,
  salon: demoSalonConfig,
  "real-estate": demoRealEstateConfig
};

export const templateOrder: TemplateKey[] = ["appointment", "salon", "real-estate"];
