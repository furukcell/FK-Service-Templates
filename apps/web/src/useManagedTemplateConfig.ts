import { useEffect, useMemo, useState } from "react";
import type { BusinessTemplateConfig, LayoutVariant, ServiceItem } from "@fk-templates/shared";
import { getSiteSettings, listBusinessServices, type ManagedSiteSettings } from "@fk-templates/firebase";
import { isDemoMode } from "./runtimeMode";

function cleanText(value?: string) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cleanOptions(options?: string[]) {
  return options?.map((option) => option.trim()).filter(Boolean) || [];
}

function mapLiveServices(services: ServiceItem[]) {
  return services.map((service) => ({
    title: service.title,
    description: service.description,
    price: service.price
  }));
}

function applyManagedForm(config: BusinessTemplateConfig, settings: ManagedSiteSettings | null): BusinessTemplateConfig["form"] {
  const requestOptions = cleanOptions(settings?.requestTypeOptions);
  const title = cleanText(settings?.requestFormTitle) || config.form.title;
  const description = cleanText(settings?.requestFormDescription) || config.form.description;

  if (!requestOptions.length && title === config.form.title && description === config.form.description) {
    return config.form;
  }

  return {
    ...config.form,
    title,
    description,
    fields: config.form.fields.map((field) => {
      if (field.type === "select" && ["service", "requestType", "listingType"].includes(field.key) && requestOptions.length) {
        return { ...field, options: requestOptions };
      }
      return field;
    })
  };
}

export function useManagedTemplateConfig(baseConfig: BusinessTemplateConfig) {
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [liveServices, setLiveServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";

  useEffect(() => {
    let isMounted = true;

    async function loadManagedContent() {
      setIsLoading(true);
      setHasLoadError(false);
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
        setHasLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadManagedContent();
    return () => { isMounted = false; };
  }, [baseConfig.template, businessId]);

  const activeSettings = !settings?.template || settings.template === baseConfig.template ? settings : null;
  const requiresSetup = !isDemoMode() && !isLoading && (!activeSettings || hasLoadError);

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
    galleryItems: activeSettings?.galleryItems?.length ? activeSettings.galleryItems : baseConfig.galleryItems,
    form: applyManagedForm(baseConfig, activeSettings)
  }), [activeSettings, baseConfig, liveServices]);

  return {
    config: managedConfig,
    layoutVariant: activeSettings?.layoutVariant as LayoutVariant | undefined,
    settings: activeSettings,
    isLoading,
    requiresSetup
  };
}
