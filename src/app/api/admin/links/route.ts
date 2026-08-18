import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";
import { createLink } from "@/lib/links";

export async function POST(request: NextRequest) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { title, url } = await request.json();

  if (typeof title !== "string" || !title.trim() || typeof url !== "string" || !url.trim()) {
    return NextResponse.json({ error: "title과 url은 필수입니다." }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "올바른 URL 형식이 아닙니다." }, { status: 400 });
  }

  const link = await createLink({ title: title.trim(), url: url.trim() });
  return NextResponse.json(link, { status: 201 });
}
