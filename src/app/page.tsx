import { Profile } from "@/components/Profile";
import { LinkList } from "@/components/LinkList";
import { profile } from "@/data/profile";
import { getLinks } from "@/lib/links";

export const dynamic = "force-dynamic";

export default async function Home() {
  const links = await getLinks();

  return (
    <div className="flex min-h-full flex-1 items-start justify-center bg-gradient-to-b from-[#fffaf3] via-[#fef3e6] to-[#fbe4cf] px-5 py-14 dark:from-[#221a14] dark:via-[#1a1310] dark:to-[#120d0a] sm:items-center sm:px-8 sm:py-20">
      <main className="flex w-full max-w-md flex-col items-center gap-10 sm:gap-12">
        <Profile {...profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
