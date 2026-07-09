import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseApp } from "./client";
import { getStorage } from "firebase/storage";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function getFirebaseStorage() {
  return getStorage(getFirebaseApp());
}

function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Sadece JPG, PNG veya WEBP görsel yüklenebilir.");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Görsel boyutu en fazla 5 MB olabilir.");
  }
}

export async function uploadBusinessImage(file: File, folder = "business-images") {
  validateImage(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const imageRef = ref(getFirebaseStorage(), `${folder}/${Date.now()}-${safeName}`);
  const result = await uploadBytes(imageRef, file, { contentType: file.type });
  return getDownloadURL(result.ref);
}
