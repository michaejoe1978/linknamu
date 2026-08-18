import { LinkItem } from "@/types/link";
import { LinkCard } from "@/components/LinkCard";

export function LinkList({ links }: { links: LinkItem[] }) {
  return (
    <div className="flex w-full flex-col gap-3">
      {links.map((link) => (
        <LinkCard key={link.id} {...link} />
      ))}
    </div>
  );
}
