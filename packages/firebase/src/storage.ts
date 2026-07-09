import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseApp } from "./client";
import { getStorage } from "firebase/storage";

export function getFirebaseStorage() {
  return getStorage(getFirebaseApp());
}

export async function uploadBusinessImage(file: File, folder = "business-images") {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const imageRef = ref(getFirebaseStorage(), `${folder}/${Date.now()}-${safeName}`);
  const result = await uploadBytes(imageRef, file);
  return getDownloadURL(result.ref);
}
