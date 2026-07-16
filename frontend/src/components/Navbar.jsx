import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../features/cart/cartSlice';
import { ShoppingBag, LogOut, User, Search } from 'lucide-react';

const Navbar = ({ authUser, onLogout }) => {
  const cartCount = useSelector(selectCartCount);

  // 이메일 마스킹 처리 함수
  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) {
      return `${localPart.charAt(0)}*@${domain}`;
    }
    return `${localPart.substring(0, 2)}${'*'.repeat(localPart.length - 2)}@${domain}`;
  };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      {/* 1. 상단 메인 라인 (로고, 검색바, 유저 아이콘들) */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* A. 로고 */}
        <Link to="/" className="flex items-center space-x-1 cursor-pointer">
          <span className="text-2xl font-black italic tracking-tighter text-slate-900 font-sans">
            Brand
          </span>
        </Link>

        {/* B. 중앙 검색바 (레퍼런스 스타일 이식) */}
        <div className="hidden md:flex items-center relative w-[320px]">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-50 border border-slate-200/80 focus:border-slate-400 focus:bg-white focus:ring-0 rounded-full pl-5 pr-10 py-2 text-xs transition-all duration-200 outline-hidden text-slate-800"
          />
          <Search size={14} className="absolute right-4 text-slate-400 pointer-events-none" />
        </div>

        {/* C. 오른쪽 유저 세션 및 카트 버튼 */}
        <div className="flex items-center space-x-5">
          {/* 유저 프로필 카드 */}
          {authUser && (
            <div className="flex items-center space-x-2 text-xs text-slate-600">
              {authUser.photoURL ? (
                <img 
                  src={authUser.photoURL} 
                  alt="Profile" 
                  className="w-7 h-7 rounded-full border border-slate-200 object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                  <User size={13} className="text-slate-500" />
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="font-bold text-slate-800">{authUser.displayName || '고객'}</p>
                <p className="text-[10px] text-slate-400">{maskEmail(authUser.email)}</p>
              </div>
            </div>
          )}

          {/* 장바구니 버튼 (레퍼런스에 있는 쇼핑백 아이콘 매치) */}
          <Link to="/cart" className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors duration-200 cursor-pointer">
            <ShoppingBag size={20} className="stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 로그아웃 버튼 */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 hover:bg-slate-50 text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-full text-xs font-semibold transition duration-200 cursor-pointer border border-transparent hover:border-slate-100"
            title="로그아웃"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </div>

      {/* 2. 하단 서브 메뉴 카테고리 링크 라인 (레퍼런스 스타일) */}
      <div className="bg-white border-t border-slate-50 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex space-x-6 sm:space-x-8 text-[11px] font-extrabold tracking-wider text-slate-500 justify-start md:justify-center whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">NEW ARRIVAL</Link>
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">MOST PICK</Link>
          <Link to="/" className="text-rose-500 hover:text-rose-600 transition-colors duration-200">SALE</Link>
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">WOMEN</Link>
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">MEN</Link>
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">SNEAKERS</Link>
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">STORE LOCATION</Link>
          <Link to="/" className="hover:text-slate-900 transition-colors duration-200">CONTACT US</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
