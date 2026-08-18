import { LinkItem, Profile } from "@/types/link";

export const profile: Profile = {
  name: "김프로",
  bio: "세계 최강의 바이브 코더",
  avatarUrl: "/avatar-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com/blog" },
];
