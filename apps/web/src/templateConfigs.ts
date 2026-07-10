import type { BusinessTemplateConfig, TemplateKey } from "@fk-templates/shared";
import { demoVeterinaryConfig } from "../../../configs/demo-veterinary";
import { demoSalonConfig } from "../../../configs/demo-salon";
import { demoRealEstateConfig } from "../../../configs/demo-real-estate";
import { demoCafeConfig } from "../../../configs/demo-cafe";
import { demoKindergartenConfig } from "../../../configs/demo-kindergarten";
import { demoEventVenueConfig } from "../../../configs/demo-event-venue";

export const templateConfigs: Record<TemplateKey, BusinessTemplateConfig> = {
  appointment: demoVeterinaryConfig,
  salon: demoSalonConfig,
  "real-estate": demoRealEstateConfig,
  cafe: demoCafeConfig,
  kindergarten: demoKindergartenConfig,
  "event-venue": demoEventVenueConfig
};

export const templateOrder: TemplateKey[] = ["appointment", "salon", "real-estate", "cafe", "kindergarten", "event-venue"];