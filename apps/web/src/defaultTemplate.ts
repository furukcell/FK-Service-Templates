import type { TemplateKey } from "@fk-templates/shared";

export const templateRouteByKey: Record<TemplateKey, string> = {
  appointment: "/appointment",
  salon: "/salon",
  "real-estate": "/real-estate",
  cafe: "/cafe",
  kindergarten: "/kindergarten",
  "event-venue": "/event-venue"
};

const validTemplates: TemplateKey[] = ["appointment", "salon", "real-estate", "cafe", "kindergarten", "event-venue"];

export function getDefaultTemplate(): TemplateKey {
  const envTemplate = process.env.NEXT_PUBLIC_DEFAULT_TEMPLATE as TemplateKey | undefined;
  return envTemplate && validTemplates.includes(envTemplate) ? envTemplate : "cafe";
}

export function getDefaultTemplateRoute() {
  const homePath = process.env.NEXT_PUBLIC_SITE_HOME_PATH;
  if (homePath) return homePath;

  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;
  const defaultTemplate = getDefaultTemplate();
  if (businessId === "lotus-borek-demo" || defaultTemplate === "cafe") return "/lotus-borek-evi";

  return templateRouteByKey[defaultTemplate];
}
