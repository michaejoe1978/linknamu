import { NextResponse } from "next/server";
import { getLinks } from "@/lib/links";

export async function GET() {
  const links = await getLinks();
  return NextResponse.json(links.map(({ id, clicks }) => ({ id, clicks: clicks ?? 0 })));
}
