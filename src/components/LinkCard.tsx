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
      className="flex w-full items-center justify-center rounded-2xl border border-white/60 bg-white/40 px-5 py-4 text-center font-medium text-zinc-800 shadow-[0_4px_16px_-4px_rgba(120,80,40,0.15)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/55 hover:shadow-[0_8px_20px_-6px_rgba(120,80,40,0.22)] dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10"
    >
      {title}
    </a>
  );
}
