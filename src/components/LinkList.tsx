"use client";

import { useEffect, useState } from "react";
import { LinkItem } from "@/types/link";
import { LinkCard } from "@/components/LinkCard";

export function LinkList({ links }: { links: LinkItem[] }) {
  const [clicks, setClicks] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;

    fetch("/api/links/clicks")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { id: string; clicks: number }[] | null) => {
        if (cancelled || !data) return;
        setClicks((prev) => {
          const next = { ...prev };
          for (const item of data) {
            next[item.id] = Math.max(next[item.id] ?? 0, item.clicks);
          }
          return next;
        });
      })
      .catch(() => {
        // 조회 실패 시 0회로 유지
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLinkClick = (id: string) => {
    setClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} {...link} clicks={clicks[link.id] ?? 0} onLinkClick={handleLinkClick} />
      ))}
    </div>
  );
}
