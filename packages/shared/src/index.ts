export type TemplateKey = "appointment" | "salon" | "real-estate";

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
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    soft: string;
    dark: string;
  };
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
  "real-estate": "Emlakçı"
};
