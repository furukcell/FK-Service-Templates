import { useEffect, useMemo, useState } from "react";
import type { BusinessTemplateConfig, LayoutVariant, ServiceItem } from "@fk-templates/shared";
import { getSiteSettings, listBusinessServices, type ManagedSiteSettings } from "@fk-templates/firebase";

function cleanText(value?: string) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function mapLiveServices(services: ServiceItem[]) {
  return services.map((service) => ({
    title: service.title,
    description: service.description,
    price: service.price
  }));
}

export function useManagedTemplateConfig(baseConfig: BusinessTemplateConfig) {
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [liveServices, setLiveServices] = useState<ServiceItem[]>([]);
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";

  useEffect(() => {
    let isMounted = true;

    async function loadManagedContent() {
      try {
        const [siteSettings, services] = await Promise.all([
          getSiteSettings(businessId),
          listBusinessServices(baseConfig.template)
        ]);
        if (!isMounted) return;
        setSettings(siteSettings);
        setLiveServices(services.map((service) => ({ title: service.title, description: service.description, price: service.price })));
      } catch (error) {
        if (!isMounted) return;
        setSettings(null);
        setLiveServices([]);
      }
    }

    loadManagedContent();
    return () => { isMounted = false; };
  }, [baseConfig.template, businessId]);

  const activeSettings = !settings?.template || settings.template === baseConfig.template ? settings : null;

  const managedConfig = useMemo<BusinessTemplateConfig>(() => ({
    ...baseConfig,
    brandName: cleanText(activeSettings?.brandName) || baseConfig.brandName,
    eyebrow: cleanText(activeSettings?.eyebrow) || baseConfig.eyebrow,
    heroTitle: cleanText(activeSettings?.heroTitle) || baseConfig.heroTitle,
    heroDescription: cleanText(activeSettings?.heroDescription) || baseConfig.heroDescription,
    primaryCta: cleanText(activeSettings?.primaryCta) || baseConfig.primaryCta,
    secondaryCta: cleanText(activeSettings?.secondaryCta) || baseConfig.secondaryCta,
    topBarText: cleanText(activeSettings?.topBarText) || baseConfig.topBarText,
    phone: cleanText(activeSettings?.phone) || baseConfig.phone,
    whatsapp: cleanText(activeSettings?.whatsapp) || baseConfig.whatsapp,
    address: cleanText(activeSettings?.address) || baseConfig.address,
    mapsUrl: cleanText(activeSettings?.mapsUrl) || baseConfig.mapsUrl,
    instagramUrl: cleanText(activeSettings?.instagramUrl) || baseConfig.instagramUrl,
    services: liveServices.length ? mapLiveServices(liveServices) : baseConfig.services,
    campaignItems: activeSettings?.campaignItems?.length ? activeSettings.campaignItems : baseConfig.campaignItems,
    galleryItems: activeSettings?.galleryItems?.length ? activeSettings.galleryItems : baseConfig.galleryItems
  }), [activeSettings, baseConfig, liveServices]);

  return {
    config: managedConfig,
    layoutVariant: activeSettings?.layoutVariant as LayoutVariant | undefined,
    settings: activeSettings
  };
}
