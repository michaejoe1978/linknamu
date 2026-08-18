import Image from "next/image";
import { Profile as ProfileType } from "@/types/link";

export function Profile({ name, bio, avatarUrl }: ProfileType) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Image
        src={avatarUrl}
        alt={`${name} 프로필 사진`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover"
        priority
      />
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {name}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{bio}</p>
    </div>
  );
}
