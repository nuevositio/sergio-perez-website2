import { NextRequest, NextResponse } from "next/server";

const META_API_VERSION = "v26.0";

const allowedEvents = new Set(["Lead", "Contact", "PageView"]);

interface MetaEventPayload {
  eventName?: string;
  eventId?: string;
  source?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
}

function getIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();

  return request.headers.get("x-real-ip") ?? undefined;
}

export async function POST(request: NextRequest) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: true, configured: false });
  }

  let body: MetaEventPayload;

  try {
    body = (await request.json()) as MetaEventPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = body.eventName ?? "Lead";
  if (!allowedEvents.has(eventName)) {
    return NextResponse.json({ error: "Unsupported event" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") ?? undefined;
  const clientIpAddress = getIp(request);

  const userData: Record<string, string> = {};
  if (clientIpAddress) userData.client_ip_address = clientIpAddress;
  if (userAgent) userData.client_user_agent = userAgent;
  if (body.fbp) userData.fbp = body.fbp;
  if (body.fbc) userData.fbc = body.fbc;

  const metaPayload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        action_source: "website",
        event_source_url: body.eventSourceUrl,
        user_data: userData,
        custom_data: {
          content_name: body.source ?? "site_lead",
        },
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    metaPayload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const response = await fetch(
    `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaPayload),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ ok: false, error }, { status: 502 });
  }

  const result = await response.json();
  return NextResponse.json({ ok: true, configured: true, result });
}
