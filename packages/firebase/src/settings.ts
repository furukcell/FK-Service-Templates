import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { LayoutVariant, ServiceItem, TemplateKey, VisualItem } from "@fk-templates/shared";
import { COLLECTIONS } from "./collections";
import { getFirestoreDb } from "./client";

export type ContentPageKey = "about" | "contact" | "privacy" | "kvkk" | "cookies" | "terms";

export type ManagedContentPage = {
  title: string;
  description: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ManagedSiteSettings = {
  id?: string;
  businessId?: string;
  template?: TemplateKey;
  layoutVariant?: LayoutVariant;
  brandName?: string;
  eyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  primaryCta?: string;
  secondaryCta?: string;
  topBarText?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  mapsUrl?: string;
  instagramUrl?: string;
  workingHours?: string;
  contactEmail?: string;
  requestFormTitle?: string;
  requestFormDescription?: string;
  requestTypeOptions?: string[];
  campaignItems?: ServiceItem[];
  galleryItems?: VisualItem[];
  contentPages?: Partial<Record<ContentPageKey, ManagedContentPage>>;
  faqItems?: FaqItem[];
  updatedAt?: unknown;
  createdAt?: unknown;
};

export async function getSiteSettings(businessId = "demo-business"): Promise<ManagedSiteSettings | null> {
  const snapshot = await getDoc(doc(getFirestoreDb(), COLLECTIONS.settings, businessId));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as Omit<ManagedSiteSettings, "id">) };
}

export async function saveSiteSettings(businessId: string, payload: ManagedSiteSettings) {
  return setDoc(doc(getFirestoreDb(), COLLECTIONS.settings, businessId), {
    ...payload,
    businessId,
    updatedAt: serverTimestamp(),
    createdAt: payload.createdAt || serverTimestamp()
  }, { merge: true });
}
