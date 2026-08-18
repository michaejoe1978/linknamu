import { Profile } from "@/components/Profile";
import { LinkList } from "@/components/LinkList";
import { profile } from "@/data/profile";
import { getLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export default async function Home() {
  const links = await getLinks();

  return (
    <div className="flex min-h-full flex-1 items-start justify-center bg-zinc-50 px-4 py-10 dark:bg-black sm:items-center sm:py-16">
      <main className="flex w-full max-w-sm flex-col items-center gap-8 rounded-3xl border border-zinc-200 bg-white px-6 py-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Profile {...profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
