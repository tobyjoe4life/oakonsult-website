const MAX_PUBLIC_BODY_BYTES = 16_384;

export function validatePublicRequest(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_PUBLIC_BODY_BYTES) {
    return { ok: false as const, status: 413, message: "This form submission is too large." };
  }

  const origin = request.headers.get("origin");
  if (!origin) return { ok: true as const };

  const allowedOrigins = new Set<string>();
  allowedOrigins.add(new URL(request.url).origin);
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowedOrigins.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
    } catch {
      // Invalid optional configuration is ignored here and caught during deployment checks.
    }
  }

  if (!allowedOrigins.has(origin)) {
    return { ok: false as const, status: 403, message: "This form request was not accepted." };
  }

  return { ok: true as const };
}
