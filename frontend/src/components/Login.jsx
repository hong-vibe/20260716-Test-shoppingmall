import React, { useState } from 'react';
import { loginWithEmail, loginWithGoogle, registerWithEmail } from '../services/firebase';
import { LogIn, Key, Mail, AlertCircle, Sparkles } from 'lucide-react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false); // 회원가입 모드 분기

  // 1. 이메일 로그인/회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isRegisterMode) {
        // 회원가입 실행
        const user = await registerWithEmail(email, password);
        alert('회원가입이 완료되었습니다! 자동 로그인합니다.');
        onLoginSuccess(user);
      } else {
        // 로그인 실행
        const user = await loginWithEmail(email, password);
        onLoginSuccess(user);
      }
    } catch (err) {
      console.error(err);
      // 에러 메시지 한글화
      let koreanMsg = err.message;
      if (err.code === 'auth/invalid-credential') {
        koreanMsg = '이메일 혹은 비밀번호가 틀렸습니다. 다시 확인해주세요.';
      } else if (err.code === 'auth/email-already-in-use') {
        koreanMsg = '이미 사용 중인 이메일 주소입니다.';
      } else if (err.code === 'auth/weak-password') {
        koreanMsg = '비밀번호는 최소 6자리 이상이어야 합니다.';
      } else if (err.code === 'auth/invalid-email') {
        koreanMsg = '유효하지 않은 이메일 형식입니다.';
      }
      setError(koreanMsg);
    } finally {
      setLoading(false);
    }
  };

  // 2. 구글 소셜 로그인 처리
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await loginWithGoogle();
      onLoginSuccess(user);
    } catch (err) {
      console.error(err);
      setError('구글 로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6 text-center">
        {/* 상단 장식 및 타이틀 */}
        <div>
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isRegisterMode ? 'VIBE STUDIO 회원가입' : 'VIBE STUDIO 로그인'}
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            {isRegisterMode ? '새 계정을 만들고 쇼핑을 시작하세요' : '로그인하여 멋진 상품들을 확인하세요'}
          </p>
        </div>

        {/* 안내 배지 */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3 text-xs text-blue-700 text-left space-y-1">
          <div>💡 <strong>테스트 이메일 :</strong> user@test.com</div>
          <div>🔑 <strong>테스트 비밀번호 :</strong> 123456</div>
        </div>

        {/* 에러 알림창 */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start space-x-2 text-rose-800 text-sm text-left animate-shake">
            <AlertCircle className="text-rose-500 flex-shrink-0 mt-0.5" size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3.5">
            {/* 이메일 입력 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-2xl pl-12 pr-4 py-3 text-sm transition-all duration-200 outline-hidden"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-slate-400">
                <Key size={16} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 (6자리 이상)"
                className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 rounded-2xl pl-12 pr-4 py-3 text-sm transition-all duration-200 outline-hidden"
              />
            </div>
          </div>

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-md shadow-blue-200 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <LogIn size={16} />
            <span>{loading ? '처리 중...' : isRegisterMode ? '회원가입 완료' : '로그인 하기'}</span>
          </button>
        </form>

        {/* 소셜 로그인 구분선 */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs uppercase tracking-wider font-semibold">또는</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border border-slate-200 hover:bg-slate-50 active:scale-98 text-slate-700 font-bold py-3.5 rounded-2xl text-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" 
            alt="Google" 
            className="w-5 h-5"
          />
          <span>Google 계정으로 로그인</span>
        </button>

        {/* 모드 전환 */}
        <div className="text-sm pt-2">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
          >
            {isRegisterMode ? '이미 계정이 있으신가요? 로그인하기' : '아직 계정이 없으신가요? 회원가입하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
