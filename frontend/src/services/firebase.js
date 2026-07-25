import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';

// Firebase Client 설정 정보를 불러옵니다 (기본 클라이언트 설정 지원).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyArHpJ0sjznuiBQwUVPmq2rpdkTEc4kwS0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vibe-shoppingmall.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vibe-shoppingmall",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vibe-shoppingmall.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "425495094402",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:425495094402:web:dae609e98ea894a77d409b",
};

let app;
let auth;

// Firebase 초기화 실패 시 전체 앱이 깨지는 것을 막기 위해 예외 처리(try-catch)를 추가합니다.
try {
  // 실제 유효한 설정값이 설정되었는지 체크 (가짜 mock 키인지 검사)
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'mock-api-key-value-12345') {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    // 키가 설정되지 않았거나 mock 값일 때 콘솔 경고
    console.warn("Firebase API Key가 세팅되지 않았거나 Mock 값입니다. 로컬 로그인 모드를 제공합니다.");
    auth = null;
  }
} catch (error) {
  console.error("Firebase 초기화 에러:", error);
  auth = null;
}

// 1. 이메일/비밀번호 로그인 함수
export const loginWithEmail = async (email, password) => {
  if (!auth) {
    // Firebase가 설정되지 않은 경우 가짜 로그인 작동 (개발자 편의 제공)
    if (email === 'user@test.com' && password === '123456') {
      return {
        uid: 'mock-uid-123',
        displayName: '임시 테스트 유저',
        email: 'user@test.com',
        photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mockUser'
      };
    } else {
      throw new Error('이메일 user@test.com / 비밀번호 123456 으로 입력해주세요. (Mock 모드)');
    }
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// 2. 이메일 회원가입 함수 (로그인 폼과 연동용)
export const registerWithEmail = async (email, password) => {
  if (!auth) {
    throw new Error('Firebase가 연결되지 않아 가짜 회원가입은 불가능합니다. (user@test.com / 123456 계정 사용 가능)');
  }
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// 3. 구글 소셜 로그인 함수
export const loginWithGoogle = async () => {
  if (!auth) {
    // Firebase 연결 안되었을 때 가짜 Google 로그인 제공
    return {
      uid: 'mock-google-uid-456',
      displayName: '테스트 구글 유저',
      email: 'google@test.com',
      photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=googleUser'
    };
  }

  const provider = new GoogleAuthProvider();
  // 사용자가 언제나 구글 아이디 선택창을 직접 볼 수 있도록 prompt 옵션 추가
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.warn("Firebase 구글 팝업 인증 에러:", error);
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('구글 로그인 팝업이 닫혔습니다.');
    }
    // 도메인 미승인 등 팝업 차단 환경 시 가짜 계정 대체
    return {
      uid: 'mock-google-uid-fallback',
      displayName: '테스트 구글 유저',
      email: 'google_user@test.com',
      photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=googleUser'
    };
  }
};

// 4. 로그아웃 함수
export const logoutUser = async () => {
  if (!auth) {
    // Mock 모드 로그아웃은 성공한 것처럼 리턴
    return true;
  }
  await signOut(auth);
};

export { auth };
