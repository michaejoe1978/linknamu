"use client";

import { FormEvent, useState } from "react";
import { LinkItem } from "@/types/link";

const inputClass =
  "rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900";

export function AdminLinkManager({ initialLinks }: { initialLinks: LinkItem[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [addError, setAddError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editError, setEditError] = useState<string | null>(null);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    setAddError(null);

    if (!title.trim() || !url.trim()) {
      setAddError("제목과 URL을 입력해주세요.");
      return;
    }

    setSubmitting(true);
    const response = await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url }),
    });
    setSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setAddError(data?.error ?? "추가에 실패했습니다.");
      return;
    }

    const created: LinkItem = await response.json();
    setLinks((prev) => [...prev, created]);
    setTitle("");
    setUrl("");
  };

  const startEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setEditError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError(null);
  };

  const handleUpdate = async (id: string) => {
    setEditError(null);

    if (!editTitle.trim() || !editUrl.trim()) {
      setEditError("제목과 URL을 입력해주세요.");
      return;
    }

    const response = await fetch(`/api/admin/links/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, url: editUrl }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setEditError(data?.error ?? "수정에 실패했습니다.");
      return;
    }

    const updated: LinkItem = await response.json();
    setLinks((prev) => prev.map((link) => (link.id === id ? updated : link)));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 링크를 삭제할까요?")) return;

    const response = await fetch(`/api/admin/links/${id}`, { method: "DELETE" });
    if (!response.ok) return;

    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-2 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
      >
        <h2 className="text-sm font-medium text-zinc-500">링크 추가</h2>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="제목"
          className={inputClass}
        />
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className={inputClass}
        />
        {addError && <p className="text-sm text-red-500">{addError}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
        >
          추가
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {links.length === 0 && (
          <li className="rounded-xl border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-400 dark:border-zinc-700">
            아직 등록된 링크가 없습니다.
          </li>
        )}

        {links.map((link) => (
          <li key={link.id} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
            {editingId === link.id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  className={inputClass}
                />
                <input
                  value={editUrl}
                  onChange={(event) => setEditUrl(event.target.value)}
                  className={inputClass}
                />
                {editError && <p className="text-sm text-red-500">{editError}</p>}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(link.id)}
                    className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white dark:bg-zinc-50 dark:text-zinc-900"
                  >
                    저장
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
                  >
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium text-zinc-900 dark:text-zinc-50">
                    {link.title}
                  </p>
                  <p className="truncate text-sm text-zinc-500">{link.url}</p>
                  <p className="text-xs text-zinc-400">클릭 {link.clicks ?? 0}회</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => startEdit(link)}
                    className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 dark:border-red-800"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
