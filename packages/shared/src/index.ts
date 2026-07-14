export type TemplateKey = "appointment" | "salon" | "real-estate" | "cafe" | "kindergarten" | "event-venue";
export type LayoutVariant = "modern" | "split" | "showcase" | "flow";

export type ServiceItem = {
  title: string;
  description: string;
  price?: string;
};

export type StaffMember = {
  name: string;
  role: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type VisualItem = {
  title: string;
  description: string;
  imageUrl?: string;
  category?: "Saç" | "Nail" | "Cilt" | "Salon" | "Diğer";
  featured?: boolean;
};

export type BusinessTheme = {
  primary: string;
  secondary: string;
  accent: string;
  soft: string;
  dark: string;
};

export type BusinessTemplateConfig = {
  template: TemplateKey;
  sector: string;
  brandName: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  topBarText: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapsUrl?: string;
  instagramUrl?: string;
  theme: BusinessTheme;
  navItems: string[];
  stats: StatItem[];
  services: ServiceItem[];
  staff: StaffMember[];
  galleryItems?: VisualItem[];
  campaignItems?: ServiceItem[];
  form: {
    title: string;
    description: string;
    fields: Array<{
      key: string;
      label: string;
      type: "text" | "tel" | "date" | "time" | "select" | "textarea";
      placeholder?: string;
      options?: string[];
    }>;
  };
};

export const templateLabels: Record<TemplateKey, string> = {
  appointment: "Veteriner / Klinik",
  salon: "Kuaför / Güzellik",
  "real-estate": "Emlakçı",
  cafe: "Cafe / Pastane / Fırın / Restoran",
  kindergarten: "Kreş / Anaokulu",
  "event-venue": "Düğün Salonu / Organizasyon"
};

export const layoutVariantLabels: Record<LayoutVariant, string> = {
  modern: "Modern Kartlı",
  split: "Split Premium",
  showcase: "Showcase Vitrin",
  flow: "Akışkan Premium"
};
