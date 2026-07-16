# 💻 VIBE SHOP 백엔드 API 서비스 (뼈대)

이 폴더는 향후 실제 백엔드 서버(Node.js Express, Spring Boot, Supabase Edge Functions 등)를 구축하여 연결할 때 소스코드를 배치하는 공간입니다.

현재 프론트엔드는 임시로 Fake Store API 및 로컬 비상 백업용 Mock 데이터를 바라보고 구현되어 있습니다.

## 🚀 향후 백엔드 개발 로드맵 예시
1. `npm init -y` 및 `npm install express cors dotenv` 실행
2. `server.js` 개발 (Fake Store API 데이터를 대행하여 DB 정보를 조회 및 전달하는 API 라우트 구축)
3. 프론트엔드의 `ProductList.jsx` 내 API endpoint 주소를 이 로컬 백엔드 주소(`http://localhost:5000/api/products` 등)로 스위칭하여 연동
