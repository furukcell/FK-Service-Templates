import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, updateDoc, doc, where } from "firebase/firestore";
import type { TemplateKey } from "@fk-templates/shared";
import { COLLECTIONS } from "./collections";
import { getFirestoreDb } from "./client";

export type BusinessService = {
  id: string;
  template: TemplateKey;
  title: string;
  description: string;
  price?: string;
  isActive: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type CreateBusinessServicePayload = {
  template: TemplateKey;
  title: string;
  description: string;
  price?: string;
  isActive?: boolean;
};

export async function createBusinessService(payload: CreateBusinessServicePayload) {
  return addDoc(collection(getFirestoreDb(), COLLECTIONS.services), {
    ...payload,
    isActive: payload.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function listBusinessServices(template?: TemplateKey): Promise<BusinessService[]> {
  const constraints = template ? [where("template", "==", template), where("isActive", "==", true), orderBy("createdAt", "desc")] : [where("isActive", "==", true), orderBy("createdAt", "desc")];
  const serviceQuery = query(collection(getFirestoreDb(), COLLECTIONS.services), ...constraints);
  const snapshot = await getDocs(serviceQuery);
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<BusinessService, "id">) }));
}

export async function listAdminBusinessServices(template?: TemplateKey): Promise<BusinessService[]> {
  const constraints = template ? [where("template", "==", template), orderBy("createdAt", "desc")] : [orderBy("createdAt", "desc")];
  const serviceQuery = query(collection(getFirestoreDb(), COLLECTIONS.services), ...constraints);
  const snapshot = await getDocs(serviceQuery);
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<BusinessService, "id">) }));
}

export async function updateBusinessService(serviceId: string, payload: Partial<CreateBusinessServicePayload>) {
  return updateDoc(doc(getFirestoreDb(), COLLECTIONS.services, serviceId), {
    ...payload,
    updatedAt: serverTimestamp()
  });
}

export async function archiveBusinessService(serviceId: string) {
  return updateBusinessService(serviceId, { isActive: false });
}

export async function restoreBusinessService(serviceId: string) {
  return updateBusinessService(serviceId, { isActive: true });
}
