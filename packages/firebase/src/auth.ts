import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "./client";

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(getFirebaseAuth(), email, password);
}

export async function sendAdminPasswordReset(email: string) {
  return sendPasswordResetEmail(getFirebaseAuth(), email);
}

export async function logoutCurrentUser() {
  return signOut(getFirebaseAuth());
}

export function listenToCurrentUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
