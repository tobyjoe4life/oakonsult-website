import type { ContactRequest, DonationRequest } from "./schemas";

const approvedCheckoutHosts = new Set(["checkout.stripe.com", "checkout.paystack.com"]);

export function isApprovedCheckoutUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && approvedCheckoutHosts.has(url.hostname);
  } catch {
    return false;
  }
}

export type CrmResult =
  | { ok: true; message?: string; reference?: string; url?: string }
  | { ok: false; status: 502 | 503; message: string };

function getConfiguration() {
  const baseUrl = process.env.CRM_BASE_URL;
  const apiKey = process.env.CRM_WEBSITE_API_KEY;
  if (!baseUrl || !apiKey) return null;

  try {
    const parsed = new URL(baseUrl);
    const isLocal = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
    if (parsed.protocol !== "https:" && !isLocal) return null;
    return { baseUrl: parsed, apiKey };
  } catch {
    return null;
  }
}

export function integrationEnabled() {
  return getConfiguration() !== null;
}

async function send(
  path: string,
  payload: ContactRequest | DonationRequest,
): Promise<CrmResult> {
  const configuration = getConfiguration();
  if (!configuration) {
    return {
      ok: false,
      status: 503,
      message:
        "Online submissions are not active yet. Please use the published contact details if your enquiry is time-sensitive.",
    };
  }

  try {
    const target = new URL(path, configuration.baseUrl);
    const response = await fetch(target, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": configuration.apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return {
        ok: false,
        status: 502,
        message:
          "The secure OAKonsult service is temporarily unavailable. No payment or form submission has been completed.",
      };
    }

    const data = (await response.json().catch(() => ({}))) as {
      message?: string;
      reference?: string;
      url?: string;
    };

    if (data.url) {
      if (!isApprovedCheckoutUrl(data.url)) throw new Error("Checkout URL is not approved");
    }

    return {
      ok: true,
      message: data.message,
      reference: data.reference,
      url: data.url,
    };
  } catch {
    return {
      ok: false,
      status: 502,
      message:
        "The secure OAKonsult service is temporarily unavailable. No payment or form submission has been completed.",
    };
  }
}

export const crm = {
  contact: (payload: ContactRequest) => send("/api/public/website-intake", payload),
  donation: (payload: DonationRequest) =>
    send("/api/public/donations/checkout", payload),
};
