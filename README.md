# 링크나무

내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하는 Link in Bio 서비스입니다.

## 기술 스택

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB Atlas (클릭 수 저장)

## 시작하기

```bash
npm install
cp .env.local.example .env.local  # MONGODB_URI, ADMIN_PASSWORD 값을 채워주세요
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 링크 관리

`/admin` 에서 `ADMIN_PASSWORD` 로 로그인하면 링크를 추가/수정/삭제할 수 있습니다.

- `MONGODB_URI` 가 설정되어 있으면 MongoDB Atlas의 `links` 컬렉션에 저장됩니다.
- 설정되어 있지 않으면(로컬 개발 편의용) `.data/links.json` 파일에 저장되는 폴백을 사용합니다. 이 폴백은 개발용이며 git에는 커밋되지 않습니다.

## 프로젝트 구조

- `src/app` — 라우트, API 핸들러 (`/admin`, `/api/admin/*`, `/api/links/click`)
- `src/components` — UI 컴포넌트 (`src/components/admin` 은 관리자 전용)
- `src/data` — 프로필/링크 초기(seed) 데이터
- `src/lib` — MongoDB 연결, 링크 데이터 접근, 관리자 인증 등 공용 유틸
- `src/types` — 공용 타입
