"use client";

import { LinkItem } from "@/types/link";

export function LinkCard({ id, title, url }: LinkItem) {
  const handleClick = () => {
    fetch("/api/links/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: id }),
      keepalive: true,
    }).catch(() => {
      // 클릭 집계 실패는 사용자 이동을 막지 않는다.
    });
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-4 text-center font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
    >
      {title}
    </a>
  );
}
