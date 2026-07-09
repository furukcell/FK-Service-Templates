type RequestNotificationPayload = {
  template: string;
  businessId: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  note?: string;
  source?: string;
  preferredDate?: string;
  preferredTime?: string;
  extra?: Record<string, string | number | boolean | null>;
};

export async function notifyNewRequest(payload: RequestNotificationPayload) {
  try {
    await fetch("/api/notify-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // Bildirim hatası form akışını bozmamalı. Talep Firestore'a kaydedildiyse müşteri kaybı yoktur.
  }
}
