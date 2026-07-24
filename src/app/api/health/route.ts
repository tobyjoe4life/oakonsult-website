export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    { status: "ok", service: "oakonsult-website", timestamp: new Date().toISOString() },
    { headers: { "cache-control": "no-store" } },
  );
}
