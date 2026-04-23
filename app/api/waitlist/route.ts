import { NextRequest, NextResponse } from "next/server";

const WAITLIST_API = "https://waitlist-api-sigma.vercel.app/api/waitlist";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body as { email: string };

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const upstream = await fetch(WAITLIST_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, product: "breathly" }),
  });

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
