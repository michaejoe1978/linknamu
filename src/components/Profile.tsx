import Image from "next/image";
import { Profile as ProfileType } from "@/types/link";

export function Profile({ name, bio, avatarUrl }: ProfileType) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="rounded-full bg-gradient-to-b from-white/80 to-white/20 p-1 shadow-[0_8px_24px_-6px_rgba(194,120,60,0.35)] dark:from-white/10 dark:to-white/0">
        <Image
          src={avatarUrl}
          alt={`${name} 프로필 사진`}
          width={150}
          height={150}
          className="h-24 w-24 rounded-full object-cover ring-1 ring-black/5 sm:h-28 sm:w-28"
          priority
        />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {name}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{bio}</p>
    </div>
  );
}
