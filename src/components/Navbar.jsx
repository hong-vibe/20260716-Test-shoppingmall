import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartCount } from '../features/cart/cartSlice';
import { ShoppingCart, LogOut, User } from 'lucide-react';

const Navbar = ({ authUser, onLogout }) => {
  const cartCount = useSelector(selectCartCount);

  // 이메일 보안 마스킹 처리 함수 (예: abcde@test.com -> ab***@test.com)
  const maskEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) {
      return `${localPart.charAt(0)}*@${domain}`;
    }
    return `${localPart.substring(0, 2)}${'*'.repeat(localPart.length - 2)}@${domain}`;
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 로고 */}
        <Link to="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-90">
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            VIBE SHOP
          </span>
        </Link>

        {/* 오른쪽 영역 (유저 정보 및 장바구니, 로그아웃) */}
        <div className="flex items-center space-x-6">
          {authUser && (
            <div className="flex items-center space-x-2 text-sm text-slate-300">
              {authUser.photoURL ? (
                <img 
                  src={authUser.photoURL} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <User size={16} className="text-slate-300" />
                </div>
              )}
              <div className="hidden sm:block text-left">
                <p className="font-semibold text-white">
                  {authUser.displayName || '쇼핑몰 고객'}
                </p>
                <p className="text-xs text-slate-400">
                  {maskEmail(authUser.email)}
                </p>
              </div>
            </div>
          )}

          {/* 장바구니 버튼 (주소창 /cart로 이동) */}
          <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition duration-200 cursor-pointer">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 로그아웃 버튼 */}
          <button
            onClick={onLogout}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-sm transition duration-200 border border-slate-700 cursor-pointer"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
