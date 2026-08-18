import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";
import { deleteLink, updateLink } from "@/lib/links";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  const { title, url } = await request.json();

  if (typeof title !== "string" || !title.trim() || typeof url !== "string" || !url.trim()) {
    return NextResponse.json({ error: "title과 url은 필수입니다." }, { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "올바른 URL 형식이 아닙니다." }, { status: 400 });
  }

  const updated = await updateLink(id, { title: title.trim(), url: url.trim() });
  if (!updated) {
    return NextResponse.json({ error: "링크를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  if (!isValidAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteLink(id);
  if (!deleted) {
    return NextResponse.json({ error: "링크를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
