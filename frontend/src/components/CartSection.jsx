import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  selectCartItems, 
  selectCartTotal, 
  updateQuantity, 
  removeFromCart, 
  clearCart 
} from '../features/cart/cartSlice';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

const CartSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // 수량 조절 핸들러 (최소 수량 1개 제한)
  const handleQuantityChange = (id, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty >= 1) {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  // 장바구니 비어 있을 때
  if (cartItems.length === 0) {
    return (
      <div id="cart-section" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-20">
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
          <ShoppingBag className="mx-auto text-slate-300 mb-4" size={64} />
          <h2 className="text-xl font-bold text-slate-800 mb-2">장바구니가 비어 있습니다</h2>
          <p className="text-slate-500 mb-6 text-sm">
            원하는 상품들을 골라 장바구니에 담아보세요!
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition duration-200 cursor-pointer"
          >
            쇼핑하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-section" className="max-w-6xl mx-auto px-4 py-8 scroll-mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">🛒 내 장바구니</h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center space-x-1 px-3 py-2 rounded-xl hover:bg-rose-50/50 transition duration-200 cursor-pointer"
        >
          <Trash2 size={14} />
          <span>전체 비우기</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* 장바구니 아이템 리스트 */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center space-x-4 shadow-xs hover:border-slate-200 transition duration-200"
            >
              {/* 이미지 */}
              <div className="w-20 h-20 bg-slate-50 rounded-xl flex-shrink-0 overflow-hidden p-2 border border-slate-50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* 정보 */}
              <div className="flex-grow text-left">
                <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">단가: ${item.price.toFixed(2)}</p>
                <div className="text-sm font-extrabold text-slate-900 mt-1">
                  소계: ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              {/* 수량 조작 버튼 */}
              <div className="flex items-center space-x-2.5 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                  disabled={item.quantity <= 1}
                  className="p-1 rounded-lg hover:bg-white text-slate-500 disabled:opacity-40 transition cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-xs font-bold text-slate-800 w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                  className="p-1 rounded-lg hover:bg-white text-slate-500 transition cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* 단일 삭제 버튼 */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50/50 transition cursor-pointer"
                title="삭제"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* 장바구니 결제 총합 금액판 (CartSummary) */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-900 shadow-xl lg:sticky lg:top-24">
          <h3 className="text-lg font-bold pb-4 border-b border-slate-800 text-left">주문 요약</h3>
          
          <div className="space-y-3.5 my-6 text-sm text-slate-300">
            <div className="flex justify-between">
              <span>선택 품목 종류</span>
              <span className="font-medium text-white">{cartItems.length}종</span>
            </div>
            <div className="flex justify-between">
              <span>총 주문 수량</span>
              <span className="font-medium text-white">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}개
              </span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span className="text-emerald-400 font-bold">무료 (이벤트)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline mb-6">
            <span className="font-bold text-slate-200">결제 예상 총액</span>
            <span className="text-2xl font-extrabold text-blue-400">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              alert(`🎉 총 $${cartTotal.toFixed(2)} 주문 및 구매 시뮬레이션이 성공적으로 완료되었습니다!\n장바구니 목록이 비워집니다.`);
              dispatch(clearCart());
            }}
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-bold py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-md shadow-blue-900/30 cursor-pointer"
          >
            구매 시뮬레이션 하기
          </button>
          
          <p className="text-[10px] text-slate-500 mt-3 text-center">
            * 본 쇼핑몰은 포트폴리오용 과제로 실제 결제는 지원하지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
