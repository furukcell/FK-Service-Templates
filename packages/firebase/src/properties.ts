import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { COLLECTIONS } from "./collections";
import { getFirestoreDb } from "./client";

export type PropertyListingType = "sale" | "rent";
export type PropertyType = "apartment" | "villa" | "land" | "office" | "shop" | "dailyRental";

export type CreatePropertyPayload = {
  title: string;
  listingType: PropertyListingType;
  propertyType: PropertyType;
  price: number;
  location: string;
  squareMeters?: number;
  roomCount?: string;
  bathroomCount?: number;
  description: string;
  imageUrls?: string[];
  isFeatured?: boolean;
  consultantName?: string;
  consultantPhone?: string;
  isActive?: boolean;
};

export type Property = CreatePropertyPayload & {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export async function createProperty(payload: CreatePropertyPayload) {
  return addDoc(collection(getFirestoreDb(), COLLECTIONS.properties), {
    ...payload,
    imageUrls: payload.imageUrls || [],
    isFeatured: payload.isFeatured || false,
    isActive: payload.isActive ?? true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function listProperties(): Promise<Property[]> {
  const propertyQuery = query(collection(getFirestoreDb(), COLLECTIONS.properties), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(propertyQuery);
  return snapshot.docs.map((item) => ({ id: item.id, ...(item.data() as Omit<Property, "id">) }));
}

export async function updateProperty(propertyId: string, payload: Partial<CreatePropertyPayload>) {
  return updateDoc(doc(getFirestoreDb(), COLLECTIONS.properties, propertyId), {
    ...payload,
    updatedAt: serverTimestamp()
  });
}
