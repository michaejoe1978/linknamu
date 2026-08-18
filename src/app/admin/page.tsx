import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";
import { getLinks } from "@/lib/links";
import { AdminLinkManager } from "@/components/admin/AdminLinkManager";

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isValidAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/admin/login");
  }

  const links = await getLinks();

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">링크 관리</h1>
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="text-sm text-zinc-500 hover:underline">
            로그아웃
          </button>
        </form>
      </div>
      <AdminLinkManager initialLinks={links} />
    </div>
  );
}
