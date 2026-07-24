import { crm } from "@/lib/crm/client";
import { donationSchema } from "@/lib/crm/schemas";
import { isReviewSite } from "@/lib/site/review-mode";
import { validatePublicRequest } from "@/lib/security/public-request";
import { checkRateLimit, getClientAddress } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  if (isReviewSite()) {
    return Response.json(
      {
        ok: false,
        preview: true,
        message: "Donation checkout is disabled on this staging site. No details were processed and no payment was taken.",
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  const requestCheck = validatePublicRequest(request);
  if (!requestCheck.ok) {
    return Response.json(
      { message: requestCheck.message },
      { status: requestCheck.status },
    );
  }

  const limit = checkRateLimit(
    `donation:${getClientAddress(request)}`,
    8,
    60_000,
  );
  if (!limit.allowed) {
    return Response.json(
      { message: "Too many attempts. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  const parsed = donationSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success) {
    return Response.json(
      {
        message: "Please check the donation details and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const result = await crm.donation(parsed.data);
  return Response.json(result, { status: result.ok ? 200 : result.status });
}
