import { useEffect, useState } from "react";
import { getSiteSettings, type ManagedSiteSettings } from "@fk-templates/firebase";

export function useSiteContent() {
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID || "demo-business";
  const [settings, setSettings] = useState<ManagedSiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadSettings() {
      try {
        const item = await getSiteSettings(businessId);
        if (!isMounted) return;
        setSettings(item);
      } catch (error) {
        if (!isMounted) return;
        setSettings(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadSettings();
    return () => { isMounted = false; };
  }, [businessId]);

  return { settings, isLoading };
}
