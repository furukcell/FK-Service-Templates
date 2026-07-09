import type { NextApiRequest, NextApiResponse } from "next";

type NotifyBody = {
  template?: string;
  businessId?: string;
  customerName?: string;
  customerPhone?: string;
  subject?: string;
  note?: string;
  source?: string;
  preferredDate?: string;
  preferredTime?: string;
  extra?: Record<string, string | number | boolean | null>;
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

function getClientIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (Array.isArray(forwardedFor)) return forwardedFor[0] || "unknown";
  return forwardedFor?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || record.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count += 1;
  rateLimitStore.set(ip, record);
  return record.count > RATE_LIMIT_MAX;
}

function isAllowedOrigin(req: NextApiRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return true;
  const origin = req.headers.origin;
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(siteUrl).host;
  } catch (error) {
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

function extraRows(extra?: Record<string, string | number | boolean | null>) {
  if (!extra) return "";
  return Object.entries(extra)
    .filter(([key, value]) => key !== "website" && value !== "" && value !== null && value !== undefined)
    .map(([key, value]) => `<tr><td><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(String(value))}</td></tr>`)
    .join("");
}

function buildEmailHtml(body: NotifyBody) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;padding:24px;background:#f8fafc;color:#0f172a">
      <div style="background:white;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
        <h1 style="margin:0 0 12px;font-size:26px">Yeni talep geldi</h1>
        <p style="margin:0 0 20px;color:#475569">Web sitesinden yeni bir form talebi alındı.</p>
        <table style="width:100%;border-collapse:collapse">
          <tr><td><strong>Müşteri</strong></td><td>${escapeHtml(body.customerName || "-")}</td></tr>
          <tr><td><strong>Telefon</strong></td><td>${escapeHtml(body.customerPhone || "-")}</td></tr>
          <tr><td><strong>Konu</strong></td><td>${escapeHtml(body.subject || "-")}</td></tr>
          <tr><td><strong>Not</strong></td><td>${escapeHtml(body.note || "-")}</td></tr>
          <tr><td><strong>Tarih/Saat</strong></td><td>${escapeHtml([body.preferredDate, body.preferredTime].filter(Boolean).join(" ") || "-")}</td></tr>
          <tr><td><strong>Kaynak</strong></td><td>${escapeHtml(body.source || "website")}</td></tr>
          ${extraRows(body.extra)}
        </table>
        <p style="margin-top:22px"><a href="${escapeHtml(process.env.NEXT_PUBLIC_SITE_URL || "")}/admin" style="display:inline-block;background:#0f172a;color:white;text-decoration:none;border-radius:999px;padding:12px 18px;font-weight:bold">Admin panelde görüntüle</a></p>
      </div>
    </div>
  `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, error: "Forbidden origin" });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many requests" });
  }

  const body = req.body as NotifyBody;
  if (body.extra?.website) {
    return res.status(200).json({ ok: true, skipped: true, reason: "Honeypot filled." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REQUEST_NOTIFICATION_TO;
  const from = process.env.REQUEST_NOTIFICATION_FROM || "Site Bildirimi <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return res.status(200).json({ ok: true, skipped: true, reason: "Email notification env is not configured." });
  }

  if (!body.customerName || !body.customerPhone || !body.subject) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Yeni talep: ${body.subject}`,
      html: buildEmailHtml(body)
    })
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(502).json({ ok: false, error: "Email provider failed", detail: text });
  }

  return res.status(200).json({ ok: true });
}
