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

  const managedConfig = useMemo<BusinessTemplateConfig>(() => ({
    ...baseConfig,
    brandName: cleanText(settings?.brandName) || baseConfig.brandName,
    eyebrow: cleanText(settings?.eyebrow) || baseConfig.eyebrow,
    heroTitle: cleanText(settings?.heroTitle) || baseConfig.heroTitle,
    heroDescription: cleanText(settings?.heroDescription) || baseConfig.heroDescription,
    primaryCta: cleanText(settings?.primaryCta) || baseConfig.primaryCta,
    secondaryCta: cleanText(settings?.secondaryCta) || baseConfig.secondaryCta,
    topBarText: cleanText(settings?.topBarText) || baseConfig.topBarText,
    phone: cleanText(settings?.phone) || baseConfig.phone,
    whatsapp: cleanText(settings?.whatsapp) || baseConfig.whatsapp,
    address: cleanText(settings?.address) || baseConfig.address,
    mapsUrl: cleanText(settings?.mapsUrl) || baseConfig.mapsUrl,
    instagramUrl: cleanText(settings?.instagramUrl) || baseConfig.instagramUrl,
    services: liveServices.length ? mapLiveServices(liveServices) : baseConfig.services,
    campaignItems: settings?.campaignItems?.length ? settings.campaignItems : baseConfig.campaignItems,
    galleryItems: settings?.galleryItems?.length ? settings.galleryItems : baseConfig.galleryItems
  }), [baseConfig, liveServices, settings]);

  return {
    config: managedConfig,
    layoutVariant: settings?.layoutVariant as LayoutVariant | undefined,
    settings
  };
}
