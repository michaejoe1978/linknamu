import { NextRequest, NextResponse } from "next/server";
import { incrementLinkClicks } from "@/lib/links";

export async function POST(request: NextRequest) {
  const { linkId } = await request.json();

  if (!linkId || typeof linkId !== "string") {
    return NextResponse.json({ error: "linkId is required" }, { status: 400 });
  }

  await incrementLinkClicks(linkId);
  return NextResponse.json({ ok: true });
}
