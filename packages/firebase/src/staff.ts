import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { COLLECTIONS } from "./collections";
import { getFirestoreDb } from "./client";

export type SalonStaff = {
  id: string;
  businessId: string;
  name: string;
  role: string;
  description?: string;
  serviceIds: string[];
  workDays: number[];
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
  slotMinutes: number;
  isActive: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type SalonStaffPayload = Omit<SalonStaff, "id" | "createdAt" | "updatedAt">;

function mapStaff(item: { id: string; data: () => unknown }): SalonStaff {
  return { id: item.id, ...(item.data() as Omit<SalonStaff, "id">) };
}

export async function listAdminSalonStaff(businessId?: string) {
  const snapshot = await getDocs(collection(getFirestoreDb(), COLLECTIONS.staff));
  const items = snapshot.docs.map(mapStaff).sort((a, b) => a.name.localeCompare(b.name, "tr"));
  return businessId ? items.filter((item) => !item.businessId || item.businessId === businessId) : items;
}

export async function listSalonStaff(businessId?: string) {
  const items = await listAdminSalonStaff(businessId);
  return items.filter((item) => item.isActive !== false);
}

export async function createSalonStaff(payload: SalonStaffPayload) {
  return addDoc(collection(getFirestoreDb(), COLLECTIONS.staff), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function updateSalonStaff(staffId: string, payload: Partial<SalonStaffPayload>) {
  return updateDoc(doc(getFirestoreDb(), COLLECTIONS.staff, staffId), {
    ...payload,
    updatedAt: serverTimestamp()
  });
}
