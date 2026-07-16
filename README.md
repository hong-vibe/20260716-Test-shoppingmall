# 🛍️ React 쇼핑몰 앱 (VIBE SHOP)

본 프로젝트는 React, Redux Toolkit, Firebase Authentication, React Router, Tailwind CSS v4를 유기적으로 결합하여 구축된 견고하고 세련된 프론트엔드 쇼핑몰 데모 애플리케이션입니다. 
가상의 상품 API 데이터를 연동하고, 인터넷 연결 해제와 같은 다양한 예외 상황에서도 끊김 없이 로컬 Mock 데이터로 원활히 구동되며, 리액트 라우터를 이용한 멀티 페이지 아키텍처를 자랑합니다.

---

## 🛠️ 기술 스택 및 구성 요소

* **Core & Build:** React 19 (Vite 기반 최신 빌드 환경)
* **Routing:** React Router v6 (`react-router-dom`)
* **Styling:** Tailwind CSS v4 + `@tailwindcss/vite` (플러그인 기반 빌드 최적화)
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Backend Service:** Firebase Authentication SDK v12
* **Icons:** Lucide React

---

## 📁 폴더 및 파일 구조

```text
20260716-Test-shoppingmall/
├── .env                  # [보안] 로컬 개발용 Firebase API 설정값 파일 (깃허브 커밋 제외)
├── .env.example          # [보안] 깃허브 공유용 환경변수 자리표시자 템플릿
├── index.html            # 웹 진입 브라우저 템플릿
├── package.json          # 프로젝트 의존성 라이브러리 목록
├── vite.config.js        # Vite 및 Tailwind v4 컴파일러 설정
└── src/
    ├── main.jsx          # React 앱 렌더링 출발점 (BrowserRouter 주입)
    ├── App.jsx           # 최상위 라우팅 테이블 정의, 인증 구독 및 공통 Layout 구성
    ├── App.css           # 전역 추가 스타일 (Tailwind CSS v4 통합으로 비워둠)
    ├── index.css         # Tailwind v4 임포트 CSS
    ├── app/
    │   └── store.js      # Redux 전역 스토어 구성
    ├── features/
    │   └── cart/
    │       └── cartSlice.js  # 장바구니 리듀서, 액션(다량 담기 지원), 셀렉터(총액,개수)
    ├── services/
    │   └── firebase.js   # Firebase Web App 인증 함수 및 로컬 Mock 로그인 Fallback
    ├── mocks/
    │   └── products.json # API 통신 장애용 비상 대책 로컬 가짜 상품 목록
    └── components/
        ├── Navbar.jsx       # 상단 메뉴바 (인증 정보 마스킹, 장바구니 페이지 이동 링크)
        ├── Login.jsx        # 이메일/비밀번호 가입/로그인 양식 & 구글 소셜 로그인
        ├── ProtectedRoute.jsx # [보안] 로그인 미필 사용자의 강제 진입을 차단하는 경로 가드
        ├── ProductList.jsx  # 상품 그리드 (Vite Fetch, 로딩 스켈레톤, 재시도 및 Mock 복구)
        ├── ProductCard.jsx  # 개별 상품 카드 (상세페이지 이동 링크 탑재, 대체 이미지)
        ├── ProductDetail.jsx # [신규] 상품 상세 사양 노출 및 수량 조절 후 카트 담기 기능
        └── CartSection.jsx  # 장바구니 전용 페이지 (수량 +/- 제한, 제거, 총액 실시간 계산)
```

---

## 💡 핵심 기능 설계 및 아키텍처

### 1. React Router 기반 멀티 페이지 라우팅
* **주소 체계 매핑:**
  - `/login`: 로그인/회원가입 화면 (이미 로그인 상태면 홈으로 자동 튕김)
  - `/`: 메인 상품 목록 화면 (홈)
  - `/product/:id`: 개별 상품 상세 정보 화면 (동적 파라미터 `:id` 사용)
  - `/cart`: 독립된 장바구니 관리 화면
  - `*`: 정의되지 않은 기타 모든 주소는 홈(`/`)으로 리다이렉트
* **보안 라우팅 가드 (`ProtectedRoute`):** 로그인 유무(`authUser`) 상태를 감시하여, 비로그인 상태로 장바구니나 상세페이지에 직접 링크를 치고 무단 진입할 시 `Navigate` 컴포넌트를 이용해 즉각 로그인창(`/login`)으로 격리합니다.
* **공통 레이아웃 아키텍처 (`Layout`):** 메뉴바(Navbar)와 푸터(Footer)를 공통 레이아웃으로 묶고, 리액트 라우터의 `<Outlet />`을 활용해 페이지 전환 시 헤더와 푸터가 부드럽게 유지되는 세련된 싱글 페이지 애플리케이션(SPA)을 완성했습니다.

### 2. 장바구니 전역 상태관리 (Redux Toolkit)
* **상태 구조 (`cartSlice`):** 장바구니 내부 아이템 리스트는 `items` 배열에 관리되며, 각 요소는 `{ id, title, price, image, quantity }` 형태를 갖습니다.
* **다량 담기 지원 스키마 개편:** 상세페이지에서 상품의 수량을 사전에 지정(예: 3개)하여 담을 수 있도록, `addToCart` 액션에 `quantity` 페이로드가 실려 오면 그 수량만큼 한꺼번에 가산하도록 리듀서 로직을 정교하게 확장했습니다.
* **수량 범위 제한:** `updateQuantity` 액션은 `Math.max(1, quantity)` 로직을 강제하여 장바구니 내 수량이 1 미만으로 감쇄되는 현상을 방어합니다.
* **파생 상태 계산 (Selectors):** 
  - `selectCartTotal`: 모든 장바구니 품목의 $\sum (price \times quantity)$ 을 반환하여 실시간 합산 총액을 도출합니다.
  - `selectCartCount`: 총 장바구니 물품 누적 수량을 도출해 메뉴바 배지에 갱신합니다.

### 3. Firebase Authentication 연동 및 예외 처리
* **비동기 상태 리스너:** `App.jsx`에서 `onAuthStateChanged` 비동기 리스너를 실행해 실시간 로그인/비로그인/로그아웃 전환을 동기화합니다.
* **초기 로딩 UX:** 인증 상태가 아직 미확인(Loading) 단계인 시점에는 동글동글 도는 스피너 UI를 배치해, 비로그인 폼이 오표시되거나 화면이 깜빡이는 현상을 원천 방어했습니다.
* **로컬 Mock 로그인 완충(Fallback):** 개발자나 평가자가 Firebase API key 설정을 완료하기 전이라도 즉시 로컬 실행이 가능하게끔, `.env` 키 미등록 시 `user@test.com` / `123456` 계정을 사용하는 내부 가상 로그인 모드를 구축했습니다.
* **보안 노출 방지:** `Navbar.jsx`에서 사용자 메일 주소 표시 시 이메일 마스킹 처리(`abcde@test.com` -> `ab***@test.com`)를 적용하여 캡처 및 화면 유출 위험을 낮췄습니다.

### 4. API 비동기 흐름 및 비상 백업 모드
* **비동기 4가지 상태 제어:** `loading`(스켈레톤 카드 디자인 나열), `success`(정상 렌더링), `error`(재시도 패널 노출), `empty`(조회 불가 화면)를 완벽하게 분기 처리했습니다.
* **Mock Fallback 시스템:** 네트워크 장애나 `Fake Store API` 서버 다운 시 크래시가 발생하는 대신, `src/mocks/products.json`에 보관된 비상용 상품 데이터로 대체 로드합니다. 이때 화면 상단에 비상 모드 가동 상태를 주황색 경고 배지로 알려줍니다.

---

## 🛠️ 트러블슈팅 및 문제 해결 과정

### 🚨 이슈 1: Tailwind CSS v4 연동 시 CLI 초기화 명령어 오류
* **해결 방법:** Vite 빌더 환경에 가장 최적화된 플러그인 형태인 `@tailwindcss/vite` 패키지를 설치한 후, `vite.config.js`에 플러그인을 아래와 같이 직접 주입하고, `index.css`에 임포트하여 설정 파일 생성 에러를 방지함과 동시에 컴파일 성능을 향상시켰습니다.

### 🚨 이슈 2: Firebase API Key 유출 위험 및 빈 설정으로 인한 크래시
* **해결 방법:** `src/services/firebase.js` 내부에서 환경 변수 유효성 검사 코드를 감싸는 `try-catch` 안전 장치를 도입하고 키 미지정 시 가상 로그인 모드를 제공하도록 유연하게 대처했습니다.

### 🚨 이슈 3: 상세페이지에서 2개 이상의 수량 한꺼번에 담기 시 리듀서 충돌
* **문제 상황:** 상품 상세페이지에서 수량을 2개 이상 지정하여 '장바구니 담기'를 클릭하였으나, 기존 Redux `addToCart` 액션은 1개 추가만 상정하고 있어 실제 1개만 카트에 쌓였습니다.
* **원인 분석:** `cartSlice.js`의 `addToCart` 함수 내부에 수량 가산 로직이 `existingItem.quantity += 1`로 하드코딩되어 있었습니다.
* **해결 방법:** 페이로드에 동적 `quantity` 정보가 실려 올 수 있도록 확장하고, 유무에 따라 기본값(`|| 1`) 처리를 가미해 주었습니다.
  ```javascript
  addToCart: (state, action) => {
    const product = action.payload;
    const addQty = product.quantity || 1; // 다량 담기 지원
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += addQty;
    } else {
      state.items.push({ ...product, quantity: addQty });
    }
  }
  ```

---

## 📝 대표적인 AI 프롬프트 사용 및 대화 기록표

| 회차 | 단계 및 목적 | 핵심 프롬프트 요약 | AI 해결 내용 | 내가 커스텀/수정 수정한 부분 |
| :--- | :--- | :--- | :---: | :--- |
| **1** | **요구사항 분석 및 설계** | "PRD.md 파일을 읽어 전체 아키텍처를 잡고, 코딩 입문자가 보기 좋게 쉬운 용어로 계획서를 작성해줘." | 용어 사전을 정의하고, 6단계 점검 로드맵을 수립하여 승인을 대기함. | 계획서를 검토 및 승인하고 본격 코딩 방향을 최종 확정함. |
| **2** | **Redux 및 Firebase 기초 조립** | "장바구니 전역 상태관리를 위한 cartSlice.js와 firebase.js 연동 함수를 조립해줘." | Redux 슬라이스 생성, Firebase Auth 리스너 연결 및 로컬 임시 로그인 대응 코드 완성. | 마스킹 헬퍼 추가 및 에러코드 한글 매핑. |
| **3** | **API 데이터 연동 & UI 통합** | "Fake Store API를 긁어오고 실패 시 mocks/products.json으로 Fallback하는 목록 컴포넌트와 카드, 장바구니 조립을 해줘." | 스켈레톤 카드 UI, 에러 패널, 카트 목록 및 요약 컴포넌트 조립 완료. | 개발 서버 포트를 4000번으로 충돌 없이 기동 완료. |
| **4** | **React Router 멀티 페이지 개편** | "진짜 페이지 이동 방식으로 가기 위해 react-router-dom을 적용하고 상세페이지와 카트 가드 경로를 연결해줘." | 상세페이지(`/product/:id`) 및 보호 가드(`ProtectedRoute`), 공통 Layout 구현 및 리듀서 다량 담기 지원 확장. | 브라우저 자동화 테스트 시나리오(경로 가드 튕김, 썸네일 이동, 실시간 총액) 구동 교차 검증 완료. |

---

## 🧪 자가 점검 및 수동 테스트 시나리오 통과 여부

1. **경로 가드(Guard) 테스트:** 로그아웃 상태에서 직접 브라우저 주소창에 `/cart` 입력 시 `/login`으로 강제 튕김 확인. (통과)
2. **로그인 리다이렉트:** 로그인 성공 즉시 메인 페이지 `/`로 정상 이동함. (통과)
3. **상세 페이지 연동:** 상품 썸네일 클릭 시 상세 사양 화면(`/product/:id`)으로 연결되며, 수량 선택 후 담기 및 카트 페이지 이동까지 매끄럽게 연결됨. (통과)
4. **장바구니 정합성 검사:** 상세페이지에서 2개 추가한 품목이 장바구니 독립 페이지(`/cart`)에 정상 누적되며 총 결제예상액 `$219.90`으로 오차 없이 실시간 출력됨. (통과)
5. **보안 검사:** 민감 설정값들이 `.env`에 보관되어 소스코드 커밋에 영향을 주지 않음. (통과)
