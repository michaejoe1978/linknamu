import crypto from "crypto";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { Collection, ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";
import { LinkItem } from "@/types/link";
import { links as seedLinks } from "@/data/profile";

type LinkDocument = {
  _id: ObjectId;
  title: string;
  url: string;
  order: number;
  clicks: number;
};

function toLinkItem(doc: LinkDocument): LinkItem {
  return {
    id: doc._id.toString(),
    title: doc.title,
    url: doc.url,
    clicks: doc.clicks ?? 0,
  };
}

async function getCollection(): Promise<Collection<LinkDocument> | null> {
  const clientPromise = getMongoClient();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db("linknamu").collection<LinkDocument>("links");
}

// MongoDB가 설정되지 않은 환경을 위한 파일 기반 폴백(개발 편의용, 영구 저장소가 아님).
// Next.js는 라우트 핸들러와 서버 컴포넌트를 별도 모듈 인스턴스로 번들링할 수 있어
// 모듈 전역 변수로는 상태가 공유되지 않으므로, 디스크에 기록해 요청 간 일관성을 보장한다.
// Vercel 등 서버리스 환경은 배포 디렉터리가 읽기 전용이므로 반드시 os.tmpdir()을 사용해야 하며,
// 그마저도 인스턴스마다 격리되어 있어 프로덕션에서는 MONGODB_URI 설정이 필수다.
const DATA_FILE = path.join(os.tmpdir(), "linknamu", "links.json");

function seedFallbackLinks(): LinkItem[] {
  return seedLinks.map((link) => ({ ...link, clicks: 0 }));
}

async function readFallbackLinks(): Promise<LinkItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as LinkItem[];
  } catch {
    const seeded = seedFallbackLinks();
    await writeFallbackLinks(seeded);
    return seeded;
  }
}

async function writeFallbackLinks(links: LinkItem[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf-8");
  } catch (error) {
    // 읽기 전용 파일시스템 등에서는 저장을 건너뛰고 메모리 상 값만 반환한다.
    console.warn("[linknamu] fallback 링크 저장 실패 - MONGODB_URI 설정을 확인하세요.", error);
  }
}

export async function getLinks(): Promise<LinkItem[]> {
  const collection = await getCollection();
  if (!collection) return readFallbackLinks();

  const docs = await collection.find().sort({ order: 1 }).toArray();
  return docs.map(toLinkItem);
}

export async function createLink(input: { title: string; url: string }): Promise<LinkItem> {
  const collection = await getCollection();
  if (!collection) {
    const links = await readFallbackLinks();
    const link: LinkItem = { id: crypto.randomUUID(), title: input.title, url: input.url, clicks: 0 };
    await writeFallbackLinks([...links, link]);
    return link;
  }

  const result = await collection.insertOne({
    _id: new ObjectId(),
    title: input.title,
    url: input.url,
    order: Date.now(),
    clicks: 0,
  });

  return { id: result.insertedId.toString(), title: input.title, url: input.url, clicks: 0 };
}

export async function updateLink(
  id: string,
  input: { title: string; url: string }
): Promise<LinkItem | null> {
  const collection = await getCollection();
  if (!collection) {
    const links = await readFallbackLinks();
    let updated: LinkItem | null = null;
    const next = links.map((link) => {
      if (link.id !== id) return link;
      updated = { ...link, title: input.title, url: input.url };
      return updated;
    });
    if (updated) await writeFallbackLinks(next);
    return updated;
  }

  if (!ObjectId.isValid(id)) return null;
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { title: input.title, url: input.url } },
    { returnDocument: "after" }
  );
  return result ? toLinkItem(result) : null;
}

export async function deleteLink(id: string): Promise<boolean> {
  const collection = await getCollection();
  if (!collection) {
    const links = await readFallbackLinks();
    const next = links.filter((link) => link.id !== id);
    if (next.length === links.length) return false;
    await writeFallbackLinks(next);
    return true;
  }

  if (!ObjectId.isValid(id)) return false;
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}

export async function incrementLinkClicks(id: string): Promise<void> {
  const collection = await getCollection();
  if (!collection) {
    const links = await readFallbackLinks();
    const next = links.map((link) =>
      link.id === id ? { ...link, clicks: (link.clicks ?? 0) + 1 } : link
    );
    await writeFallbackLinks(next);
    return;
  }

  if (!ObjectId.isValid(id)) return;
  await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { clicks: 1 } });
}
