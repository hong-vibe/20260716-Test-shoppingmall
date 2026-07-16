import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from './features/cart/cartSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logoutUser } from './services/firebase';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartSection from './components/CartSection';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CategoryPage from './components/CategoryPage';
import { Loader2 } from 'lucide-react';

// 공통 레이아웃 컴포넌트 (상단 네비게이션바 + 페이지 콘텐츠(Outlet) + 하단 푸터 배치)
const Layout = ({ authUser, onLogout }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    <Navbar authUser={authUser} onLogout={onLogout} />
    <main className="flex-grow">
      <Outlet />
    </main>
    <footer className="bg-slate-900 text-slate-500 py-8 text-center text-xs border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p>© 2026 VIBE SHOP. All rights reserved.</p>
        <p>이 웹사이트는 React + Redux Toolkit + Firebase + React Router 기술을 활용해 구축된 쇼핑몰 데모 프로젝트입니다.</p>
      </div>
    </footer>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Firebase auth가 활성화된 경우 리스너 부착
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser({
            uid: user.uid,
            displayName: user.displayName || '쇼핑몰 고객',
            email: user.email,
            photoURL: user.photoURL,
          });
        } else {
          setAuthUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // 2. Firebase가 비활성화된 경우(Mock 모드), 로컬스토리지에 저장된 유저 정보를 확인
      const savedUser = localStorage.getItem('mock_auth_user');
      if (savedUser) {
        setAuthUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
  }, []);

  // 로그인 성공 시 호출 함수
  const handleLoginSuccess = (user) => {
    const formattedUser = {
      uid: user.uid,
      displayName: user.displayName || '쇼핑몰 고객',
      email: user.email,
      photoURL: user.photoURL,
    };
    setAuthUser(formattedUser);
    
    // Mock 모드 세션 유지를 위해 로컬스토리지 저장
    if (!auth) {
      localStorage.setItem('mock_auth_user', JSON.stringify(formattedUser));
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      localStorage.removeItem('mock_auth_user');
      dispatch(clearCart());
    } catch (error) {
      console.error("로그아웃 에러:", error);
      alert("로그아웃 도중 오류가 발생했습니다.");
    }
  };

  // 1. 초기 인증 정보를 불러오는 동안의 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-sm text-slate-500 font-medium">인증 정보를 동기화하는 중입니다...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* A. 공개 라우트: 로그인 페이지 (이미 로그인했으면 홈으로 자동 튕겨냄) */}
      <Route 
        path="/login" 
        element={authUser ? <Navigate to="/" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
      />

      {/* B. 보호(Guard) 라우트: 로그인한 사용자만 진입 가능 */}
      <Route element={<ProtectedRoute authUser={authUser} />}>
        {/* 공통 레이아웃이 적용되는 영역 */}
        <Route element={<Layout authUser={authUser} onLogout={handleLogout} />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartSection />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Route>
      </Route>

      {/* C. 그 외 정의되지 않은 모든 주소는 홈(/)으로 강제 리다이렉트 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
