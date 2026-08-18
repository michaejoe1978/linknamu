# 링크나무 (Link in Bio 서비스)

## 프로젝트 개요

Linktree 처럼 내 모든 링크를 한 페이지에 모아 두고 하나의 URL로 공유할 수 있는 서비스입니다.

## 기술 스택
- Next.js 16 (App Router)
- Tailwind CSS
- MongoDB Atlas (클릭 수 저장)
- Vercel (배포)

## 주요 기능
- 프로필 표시 (이름, 소개, 사진)
- 링크 카드 목록 
- 링크 클릭 수 집계

## 코드 규칙
- TypeScript 사용
- 컴포넌트는 src/components/ 아래에 작성
- 환경 변수는 .env.local 에 저장(절대 커밋하지 않음)
- 모바일 우선 반응형 디자인 

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
