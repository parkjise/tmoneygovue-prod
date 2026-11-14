# Vue Atelier

[공개 화면 열기](https://parkjise.github.io/tmoneygovue-prod/) · [GitHub 저장소](https://github.com/parkjise/tmoneygovue-prod)

Vue 3 실무 레퍼런스 및 UI 컴포넌트 아카이브. 외부 CSS 프레임워크 없이 Vue 3 Composition API, Vue Router, SCSS, Lucide 아이콘으로 구현했습니다.

```sh
npm install
npm run dev
```

기본 주소는 http://localhost:4000 입니다. (Vite server.port 설정 기준)

```sh
npm run build
npm run preview
npm test
npx playwright test
```

브라우저 테스트는 Chromium이 필요합니다. 미설치 환경에서는 `npx playwright install chromium`을 실행하세요.

## 구성

- 기본 문법 6종, 실무 패턴 6종, 대시보드·위젯 5종, 앱 17종, UI Kit·Bonus UI 25종, Forms·Tables 5종, SCSS 실무 가이드 8종, SCSS 원본 소스 5종: BEM Generator와 AI Q&A, Vue 실무예제, HTML5 메뉴를 포함해 총 81개 경로
- `src/data/menuData.js`를 기준으로 사이드바와 라우터를 함께 생성합니다.
- `src/views`의 실제 SFC를 `?raw`로 읽어 코드 뷰어에 표시합니다. 필요한 공통 컴포넌트와 Composable, 공통 Sass 파일도 파일 선택에서 볼 수 있습니다.
- 코드 탭을 선택하면 해당 블록을 복사합니다. 처음에는 전체 `.vue` 코드가 선택됩니다.
- 복사한 예제는 이 프로젝트의 `@` 별칭, Vue Router, 전역 `src/assets/styles/main.scss` 환경을 기준으로 실행됩니다. `useToast` 예제는 앱에 `<BaseToast />`도 배치하세요. 네트워크 예제의 `src/data/apiPeople.json`도 함께 제공됩니다.
- 기본 경로는 Overview로 이동합니다. 미등록 경로도 Overview로 복귀합니다.
- 모바일 사이드바, 테마 저장, 네이티브 dialog 포커스 관리, 키보드 Tabs·Rating, 상태 알림을 지원합니다.

## 데모 데이터 범위

채팅은 미리 작성한 로컬 응답이며 AI API를 호출하지 않습니다. 이메일은 세션 내 편지함만 변경합니다. 업로드는 파일 메타데이터만 추가하며 서버로 전송하지 않습니다. Checkout은 테스트 주문이며 결제하지 않습니다. 대시보드는 샘플 통계입니다.

장바구니와 테마는 localStorage에 저장합니다. 프로젝트·태스크·북마크·연락처·달력 등 다른 앱 데이터는 새로고침하면 초기화됩니다. API 예제는 동일 출처 정적 JSON을 fetch하며 실패·재시도·요청 취소 흐름을 제공합니다.

프로덕션 호스팅은 SPA fallback(모든 앱 URL → `index.html`)을 설정해야 합니다. Vite 개발/프리뷰 서버에서는 직접 경로 접근을 지원합니다.

## SCSS 실무 가이드

사이드바의 **SCSS 실무 가이드**에는 공통 Mixin 40종과 나머지 11개 메뉴를 위한 **실무 레시피 76개**가 있습니다. 디자인 토큰, 함수, Media/Container Query, 타이포그래피, Flex/Grid, 상태·접근성, Map/List 반복문, 모듈 설계를 다룹니다.

각 레시피는 `src/assets/styles/recipes`의 실제 SCSS 파일입니다. 버튼으로 선택하면 설명·주의점, HTML, SCSS 사용 예시, 실제 Sass 컴파일 결과, 호출한 API 정의와 `@use`/`@forward` 의존 파일을 확인·복사할 수 있습니다. `@forward` 접두어가 있는 API도 원래 선언을 따라갑니다.

**화면보기**는 샌드박스 iframe에서 실제 HTML과 컴파일된 CSS를 표시합니다. 프레임 너비(280~1440px)로 실제 미디어 쿼리를 확인하고 밝은/어두운 테마를 비교할 수 있습니다. 스크립트·서버 제출은 실행하지 않습니다. hover·인쇄·모션 감소 같은 환경 조건은 실제 브라우저 설정으로도 확인하세요.

Practice 진입점 `@use '@/assets/styles/practice' as ui;`는 토큰 15개 그룹, 계산 함수 16종, 토큰 기반 Mixin 24종을 공개합니다. 기존 `$unit`, `$radius`, `space()`, `rem()`과 기존 8개 믹스인 호출은 유지됩니다. 새 토큰과 함수의 인자·기본값·오류 조건은 원본 주석에 있습니다. 공통 Mixin 원본과 내부 호출을 보는 기존 메뉴도 유지합니다.

레시피를 추가·수정하면 다음 명령으로 CSS 데이터를 재생성하고 검사하세요. `npm run build`도 먼저 레시피를 재컴파일합니다. 브라우저에서 Sass를 실행하지 않습니다.

```bash
npm run scss:recipes
npm test
npm run build
```

Sass 정의는 빌드 시점, CSS 변수는 브라우저 실행 시점에 동작합니다. 원본 파일을 복사할 때 디렉터리 구조와 의존 경로를 유지하고, 테마를 쓰는 컴포넌트에는 전역 `src/assets/styles/main.scss`의 CSS 변수도 제공하세요. 레시피의 `sample-*` 클래스는 프로젝트 BEM 이름으로 바꿔 적용할 수 있습니다.

## 개인 Gemini / OpenAI BEM Generator

서버 API 실행에는 Node.js 20.12 이상을 사용하세요.

사이드바 독립 메뉴 **BEM Generator** (`/tools/bem-generator`)에서 HTML/Vue 템플릿을 붙여넣고 AI 공급자를 선택해 BEM 클래스 대응표, 변환 마크업, SCSS 구조를 생성합니다. 기존 태그·텍스트·이벤트를 유지하도록 요청하며, AI 결과는 직접 검토한 후 적용하세요. 기존 CSS/JS의 클래스 참조는 별도 수정해야 합니다. 동적 Vue 바인딩의 의미가 보존되는지도 확인하세요. 결과는 화면에 텍스트로만 표시하며 자동 실행·파일 수정은 하지 않습니다.

1. [Google AI Studio](https://aistudio.google.com/apikey)에서 개인 API 키를 발급합니다.
2. 프로젝트 루트의 `.env.example`을 `.env.local`로 복사합니다.
3. `.env.local`의 `GEMINI_API_KEY`에 키를 넣고, 계정에서 사용할 `GEMINI_MODEL`을 지정합니다.
4. 개발 서버를 재시작하고 생성기의 **설정 확인**을 누릅니다.

```dotenv
GEMINI_API_KEY=여기에_개인_API_키
GEMINI_MODEL=gemini-3.5-flash-lite
```

```sh
npm run dev
# 빌드 화면에서도 동일한 서버 API 제공
npm run build
npm run preview
```

키는 채팅·브라우저 입력창·localStorage·`VITE_` 변수에 넣지 않습니다. `.env.local`은 Git 제외 대상입니다. `server/vite-plugin.js`가 Vite의 Node 프로세스에서만 환경변수를 읽고, `server/bem.js`가 선택한 Gemini / OpenAI API를 호출합니다. `/api/bem/status`는 키의 **설정 여부**만 확인하며 유효한 키인지 원격으로 검증하지 않습니다. 실제 키 검증은 첫 생성 요청에서 이뤄집니다.

버튼을 누르면 입력한 마크업과 추가 조건이 선택한 Gemini / OpenAI로 전송되며 계정의 API 한도·과금 설정이 적용됩니다. 키가 없으면 **샘플 결과 보기**로 정해진 로컬 결과만 확인할 수 있습니다. 샘플은 AI 호출이 아닙니다. 이 구현에는 실제 키가 포함되어 있지 않으므로 사용자 키로 실제 API 연결을 확인해야 합니다.

개인용 서버 API는 루프백 주소 및 동일 출처만 허용하고, 동시 요청 1개·분당 10회·45초 타임아웃을 적용합니다. 공개 배포용 인증은 포함하지 않았습니다. 정적 `dist/`만 호스팅하면 AI 생성 API가 작동하지 않으므로 Node 서버가 필요합니다. `npm run preview`의 Vite 미들웨어에서도 로컬 확인할 수 있으며, 운영 서비스로 배포하려면 인증을 갖춘 별도 백엔드에 `createBemHandler` 또는 `generateBem`을 연결하세요.

모델 ID는 서버 환경변수로 변경할 수 있습니다. [Gemini 모델 목록](https://ai.google.dev/gemini-api/docs/models)과 [API 키 보안 지침](https://ai.google.dev/gemini-api/docs/api-key)을 참고하세요.

### OpenAI API도 함께 사용하기

BEM 생성기의 **AI 공급자**에서 Gemini / OpenAI를 선택합니다. 선택한 공급자로만 입력을 전송하며 오류나 할당량 초과 시 자동 대체 호출을 하지 않습니다. 결과에는 실제 사용한 공급자와 모델을 표시합니다.

`.env.local`에 다음 설정을 추가하고 개발 서버를 재시작하세요. 기존 Gemini 설정은 그대로 사용할 수 있으며, 사용할 공급자의 키만 설정해도 됩니다.

```dotenv
OPENAI_API_KEY=여기에_개인_OpenAI_API_키
OPENAI_MODEL=gpt-5.6-terra
```

[OpenAI API Platform](https://platform.openai.com/api-keys)에서 API 키를 관리합니다. ChatGPT 웹 구독 로그인으로 자동 연결되지 않으며, API 계정의 키·할당량·사용 요금 설정을 따릅니다. 모델 ID는 계정에서 사용할 수 있는 Responses API 및 Structured Outputs 지원 모델로 변경할 수 있습니다.

OpenAI는 [Responses API의 Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)를 사용하고 서버에서 BEM 결과를 추가 검증합니다. 요청에는 `store: false`를 설정합니다. API 키는 서버에서만 읽으며 `/api/bem/status`는 두 공급자의 설정 여부·모델 ID와 요청 위조 방지용 세션 토큰을 반환합니다. API 키는 반환하지 않습니다. 현재 검증은 모의 응답으로 수행했으며 실제 API 연결은 개인 키 설정 후 확인해야 합니다.

## API 키 보안

- 개발·프리뷰 서버는 기본적으로 `127.0.0.1`에만 바인딩합니다. 로컬 IP·Host·Origin·Fetch Metadata도 검사하며 다른 출처의 API 요청을 허용하지 않습니다.
- 생성 요청은 `/api/bem/status`에서 발급한 메모리 세션 토큰을 `X-BEM-Token` 헤더에 포함해야 합니다. 재시작하면 토큰이 바뀌므로 생성 화면의 **설정 확인**을 누르세요. 토큰은 API 키와 다르며 localStorage에 저장하지 않습니다.
- `.env.local` 및 모드별 개인 환경 파일은 Unix에서 소유자 읽기·쓰기(`600`)로 유지합니다. 서버는 필요한 환경변수 4개만 보관하고 `VITE_` 변수의 비밀값은 시작·빌드 단계에서 거부합니다.
- `.env`·서버 코드·인증서·개인 설정 경로는 일반 URL, 인코딩 URL, `?raw` 가져오기, 심볼릭 링크 접근을 차단합니다. 공개 폴더에도 비공개 파일·심볼릭 링크를 둘 수 없습니다.
- 입력이나 AI 응답에 현재 API 키 또는 알려진 API 키 형식이 포함되면 전송·표시를 차단합니다. 공급자 응답 오류 원문은 노출하지 않으며, API 요청의 HTTP 리다이렉트도 따라가지 않습니다.
- 공개 파일·예시 파일·생성 번들에 비밀값이 감지되면 검사 또는 빌드를 중단합니다. `.env.example`에는 실제 키를 저장하지 마세요.

```sh
npm run security:check
npm test
npm run build
```

개인 로컬 사용을 위한 보호입니다. `.env.local`은 암호화 저장소가 아니며, 같은 사용자 권한으로 실행되는 악성 프로그램까지 막지는 못합니다. 공개 배포에는 별도의 사용자 인증·HTTPS·서버 비밀 저장소가 필요합니다. 키 형식 검사는 알려진 패턴과 현재 설정값을 기준으로 하므로 모든 종류의 비밀값 탐지를 보장하지 않습니다.

## AI Q&A

**Applications → AI Q&A** (`/tools/ai-assistant`)에서 일반 질문과 후속 대화를 나눕니다. 기존 `.env.local`의 Gemini / OpenAI 키와 모델 설정을 재사용하며, 별도 키 등록은 필요하지 않습니다. 실시간 검색이나 프로젝트 파일 자동 열람 기능은 없습니다.

질문은 최대 4,000자이며 후속 질문에는 최근 최대 9문답(메시지 19개, 총 20,000자 한도)의 텍스트 대화를 함께 보냅니다. 오래되거나 너무 긴 문답은 참조에서 제외됩니다. 공급자를 변경하면 다음 요청의 최근 대화도 선택한 공급자에게 전송됩니다. 대화는 브라우저 메모리에만 보관하며 새로고침·초기화 시 지워집니다. 서버는 대화를 별도 저장하지 않습니다. OpenAI 요청에는 `store:false`를 사용합니다.

`/api/assistant/chat`는 BEM API와 같은 로컬 출처·CSRF 토큰·비밀값 검사 및 동시 1건/분당 10회 제한을 공유합니다. 실패·취소한 질문은 입력창에 유지해 재시도할 수 있고 완료되지 않은 질문은 다음 대화 이력에 추가하지 않습니다. 코드 블록은 Vue 텍스트 바인딩으로 표시하며 실행하지 않습니다. 샘플 대화는 API를 호출하지 않습니다.

## GitHub Pages 공개 화면

배포 저장소: https://github.com/parkjise/tmoneygovue-prod
공개 화면: https://parkjise.github.io/tmoneygovue-prod/

```sh
VITE_BASE_PATH=/tmoneygovue-prod/ VITE_ROUTER_MODE=hash VITE_STATIC_DEPLOY=true npm run build
```

GitHub Pages 배포는 하위 경로용 base와 hash 라우터를 사용해 모든 메뉴와 직접 링크를 지원합니다. 공개 화면의 BEM / AI Q&A는 샘플 모드이며 개인 API 서버를 호출하지 않습니다. `.env.local`은 업로드하지 않습니다. 로컬에서 `npm run dev`를 실행하면 기존 실제 AI 기능을 그대로 사용할 수 있습니다.
