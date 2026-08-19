import { LinkItem, Profile } from "@/types/link";

export const profile: Profile = {
  name: "김삼성",
  bio: "시니어 개발자 | AX 에 관심이 많아요",
  avatarUrl: "/profile.jpg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com/blog" },
];
