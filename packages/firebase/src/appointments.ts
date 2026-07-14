import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";
import { COLLECTIONS } from "./collections";
import { getFirestoreDb } from "./client";

export type SalonAppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed" | "blocked";

export type SalonAppointment = {
  id: string;
  businessId: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  note?: string;
  status: SalonAppointmentStatus;
  slotKeys: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type BookingSlot = {
  id: string;
  businessId: string;
  dayKey: string;
  monthKey: string;
  staffId: string;
  date: string;
  time: string;
  appointmentId: string;
  active: boolean;
};

export type CreateSalonAppointmentPayload = {
  businessId: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  customerName: string;
  customerPhone: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  note?: string;
  slotMinutes?: number;
};

export type CreateSalonBlockPayload = {
  businessId: string;
  staffId: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  note?: string;
  slotMinutes?: number;
};

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

export function minutesToTime(totalMinutes: number) {
  const normalized = Math.max(0, totalMinutes);
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function buildAppointmentSlotTimes(startTime: string, endTime: string, slotMinutes = 30) {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  const slots: string[] = [];
  for (let cursor = start; cursor < end; cursor += slotMinutes) slots.push(minutesToTime(cursor));
  return slots;
}

function slotDocumentId(businessId: string, staffId: string, date: string, time: string) {
  return `${businessId}_${staffId}_${date}_${time.replace(":", "-")}`.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function appointmentEndTime(startTime: string, durationMinutes: number) {
  return minutesToTime(timeToMinutes(startTime) + durationMinutes);
}

async function createAppointmentRecord(payload: CreateSalonAppointmentPayload, status: SalonAppointmentStatus) {
  const db = getFirestoreDb();
  const appointmentRef = doc(collection(db, COLLECTIONS.appointments));
  const endTime = appointmentEndTime(payload.startTime, payload.durationMinutes);
  const slotTimes = buildAppointmentSlotTimes(payload.startTime, endTime, payload.slotMinutes || 30);
  const slotRefs = slotTimes.map((time) => doc(db, COLLECTIONS.bookingSlots, slotDocumentId(payload.businessId, payload.staffId, payload.date, time)));

  await runTransaction(db, async (transaction) => {
    const snapshots = await Promise.all(slotRefs.map((slotRef) => transaction.get(slotRef)));
    if (snapshots.some((snapshot) => snapshot.exists() && snapshot.data()?.active !== false)) {
      const error = new Error("Bu saat az önce doldu. Lütfen başka bir saat seçin.");
      error.name = "slot-taken";
      throw error;
    }

    const slotKeys = slotRefs.map((slotRef) => slotRef.id);
    transaction.set(appointmentRef, {
      ...payload,
      endTime,
      status,
      slotKeys,
      slotMinutes: payload.slotMinutes || 30,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    slotRefs.forEach((slotRef, index) => {
      transaction.set(slotRef, {
        businessId: payload.businessId,
        dayKey: `${payload.businessId}_${payload.date}`,
        monthKey: `${payload.businessId}_${payload.date.slice(0, 7)}`,
        staffId: payload.staffId,
        date: payload.date,
        time: slotTimes[index],
        appointmentId: appointmentRef.id,
        active: true,
        createdAt: serverTimestamp()
      });
    });
  });

  return appointmentRef.id;
}

export async function createSalonAppointment(payload: CreateSalonAppointmentPayload) {
  return createAppointmentRecord(payload, "pending");
}

export async function createSalonBlock(payload: CreateSalonBlockPayload) {
  const durationMinutes = Math.max(30, timeToMinutes(payload.endTime) - timeToMinutes(payload.startTime));
  return createAppointmentRecord({
    businessId: payload.businessId,
    serviceId: "manual-block",
    serviceName: "Kapalı saat",
    staffId: payload.staffId,
    staffName: payload.staffName,
    customerName: "Kapalı",
    customerPhone: "",
    date: payload.date,
    startTime: payload.startTime,
    durationMinutes,
    note: payload.note,
    slotMinutes: payload.slotMinutes || 30
  }, "blocked");
}

function mapAppointment(item: { id: string; data: () => unknown }): SalonAppointment {
  return { id: item.id, ...(item.data() as Omit<SalonAppointment, "id">) };
}

function mapSlot(item: { id: string; data: () => unknown }): BookingSlot {
  return { id: item.id, ...(item.data() as Omit<BookingSlot, "id">) };
}

export async function listSalonAppointments(businessId?: string) {
  const snapshot = await getDocs(query(collection(getFirestoreDb(), COLLECTIONS.appointments), orderBy("createdAt", "desc")));
  const appointments = snapshot.docs.map(mapAppointment);
  return businessId ? appointments.filter((item) => item.businessId === businessId) : appointments;
}

export function listenSalonAppointments(callback: (items: SalonAppointment[]) => void, onError?: (error: unknown) => void, businessId?: string) {
  const appointmentQuery = query(collection(getFirestoreDb(), COLLECTIONS.appointments), orderBy("createdAt", "desc"));
  return onSnapshot(appointmentQuery, (snapshot) => {
    const items = snapshot.docs.map(mapAppointment);
    callback(businessId ? items.filter((item) => item.businessId === businessId) : items);
  }, (error) => onError?.(error));
}

export async function listSalonBookingSlotsForMonth(businessId: string, month: string) {
  const monthKey = `${businessId}_${month}`;
  const snapshot = await getDocs(query(collection(getFirestoreDb(), COLLECTIONS.bookingSlots), where("monthKey", "==", monthKey)));
  return snapshot.docs.map(mapSlot).filter((item) => item.active !== false);
}

export async function updateSalonAppointmentStatus(appointment: SalonAppointment, status: SalonAppointmentStatus) {
  const db = getFirestoreDb();
  if (status !== "cancelled") {
    return updateDoc(doc(db, COLLECTIONS.appointments, appointment.id), { status, updatedAt: serverTimestamp() });
  }

  return runTransaction(db, async (transaction) => {
    transaction.update(doc(db, COLLECTIONS.appointments, appointment.id), { status, updatedAt: serverTimestamp() });
    appointment.slotKeys.forEach((slotKey) => transaction.delete(doc(db, COLLECTIONS.bookingSlots, slotKey)));
  });
}
