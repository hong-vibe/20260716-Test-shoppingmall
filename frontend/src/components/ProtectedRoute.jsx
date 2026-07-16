import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// 로그인 상태(authUser)가 없으면 로그인(/login) 페이지로 리다이렉트 시켜주는 보디가드 컴포넌트입니다.
const ProtectedRoute = ({ authUser }) => {
  if (!authUser) {
    // replace 옵션을 통해 사용자가 뒤로가기를 눌러도 보안 페이지로 오지 못하게 뒤로가기 목록을 대체합니다.
    return <Navigate to="/login" replace />;
  }

  // 로그인 상태라면 감싸져 있는 자식 라우트 화면들(Outlet)을 보여줍니다.
  return <Outlet />;
};

export default ProtectedRoute;
