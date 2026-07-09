import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import type { TemplateKey } from "@fk-templates/shared";
import { COLLECTIONS } from "./collections";
import { getFirestoreDb } from "./client";

export type RequestStatus = "new" | "contacted" | "confirmed" | "cancelled" | "completed";

export type CreateRequestPayload = {
  template: TemplateKey;
  businessId: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  note?: string;
  source?: "website" | "qr" | "instagram" | "whatsapp";
  preferredDate?: string;
  preferredTime?: string;
  extra?: Record<string, string | number | boolean | null>;
};

export type BusinessRequest = CreateRequestPayload & {
  id: string;
  status: RequestStatus;
  adminNote?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export async function createBusinessRequest(payload: CreateRequestPayload) {
  return addDoc(collection(getFirestoreDb(), COLLECTIONS.requests), {
    ...payload,
    status: "new",
    source: payload.source || "website",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function listBusinessRequests(): Promise<BusinessRequest[]> {
  const requestQuery = query(collection(getFirestoreDb(), COLLECTIONS.requests), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(requestQuery);
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<BusinessRequest, "id">) }));
}

export async function updateBusinessRequestStatus(requestId: string, status: RequestStatus) {
  return updateDoc(doc(getFirestoreDb(), COLLECTIONS.requests, requestId), {
    status,
    updatedAt: serverTimestamp()
  });
}

export async function updateBusinessRequestAdminNote(requestId: string, adminNote: string) {
  return updateDoc(doc(getFirestoreDb(), COLLECTIONS.requests, requestId), {
    adminNote,
    updatedAt: serverTimestamp()
  });
}
