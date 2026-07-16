import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import mockProducts from '../mocks/products.json';
import { ChevronLeft, ShoppingCart, Plus, Minus, AlertTriangle, Loader2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [qty, setQty] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isUsingMock, setIsUsingMock] = useState(false);

  const defaultImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80';

  const fetchProductDetail = async () => {
    setStatus('loading');
    setIsUsingMock(false);

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error(`상세조회 실패 (코드: ${response.status})`);
      }
      const data = await response.json();
      
      if (!data) {
        throw new Error('상품 데이터가 존재하지 않습니다.');
      }

      setProduct({
        id: data.id,
        title: data.title,
        price: Number(data.price),
        description: data.description,
        category: data.category,
        image: data.image
      });
      setStatus('success');
    } catch (error) {
      console.warn("상세페이지 API 호출 실패로 로컬 mock 데이터를 탐색합니다.", error);
      loadMockDetail();
    }
  };

  // Mock 데이터 상세 찾기 Fallback
  const loadMockDetail = () => {
    const matched = mockProducts.find(item => item.id === Number(id));
    if (matched) {
      setProduct({
        id: matched.id,
        title: matched.title,
        price: Number(matched.price),
        description: matched.description,
        category: matched.category,
        image: matched.image
      });
      setIsUsingMock(true);
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  // 수량 가산/감산 제어
  const handleQty = (amount) => {
    setQty(prev => Math.max(1, prev + amount));
  };

  // 장바구니 추가 후 행동 선택 모달이나 알림창 띄우기
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      ...product,
      quantity: qty
    }));

    const confirmGoToCart = window.confirm(
      `"${product.title}" ${qty}개가 장바구니에 담겼습니다.\n장바구니 페이지로 이동하시겠습니까?`
    );

    if (confirmGoToCart) {
      navigate('/cart');
    }
  };

  // 1. 로딩 상태
  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-sm text-slate-500 font-medium">상품 정보를 불러오고 있습니다...</p>
      </div>
    );
  }

  // 2. 완전히 불러오기 실패한 경우
  if (status === 'error' || !product) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-rose-50 rounded-3xl border border-rose-100 text-center shadow-xs">
        <AlertTriangle className="mx-auto text-rose-500 mb-4" size={48} />
        <h3 className="text-lg font-bold text-rose-900 mb-2">상품 정보를 찾을 수 없습니다</h3>
        <p className="text-sm text-rose-700 mb-6">
          존재하지 않는 상품이거나 시스템 장애입니다.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition duration-200 cursor-pointer"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  // 3. 상품 상세 성공 렌더링
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 상단 뒤로가기 링크 */}
      <div className="mb-6 text-left">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold transition duration-200 text-sm cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span>뒤로 가기</span>
        </button>
      </div>

      {isUsingMock && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl p-3 mb-6 text-left">
          ⚠️ 인터넷 연결 끊김 혹은 API 제한으로 인해 내장 백업 데이터를 조회하고 있습니다.
        </div>
      )}

      {/* 상세 구성 영역 */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* 왼쪽: 상품 이미지 */}
        <div className="bg-slate-50 rounded-2xl p-6 flex justify-center items-center border border-slate-50">
          <img
            src={imageError ? defaultImage : product.image}
            alt={product.title}
            onError={() => setImageError(true)}
            className="max-h-[350px] md:max-h-[450px] object-contain rounded-xl hover:scale-102 transition-transform duration-300"
          />
        </div>

        {/* 오른쪽: 설명 및 조작 패널 */}
        <div className="flex flex-col h-full text-left space-y-6">
          {/* 카테고리 배지 */}
          <div>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>

          {/* 제목 */}
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
            {product.title}
          </h2>

          {/* 가격 */}
          <div className="py-2 border-y border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-400 font-bold uppercase">Price</span>
            <span className="text-3xl font-black text-slate-950">${product.price.toFixed(2)}</span>
          </div>

          {/* 상세 설명 */}
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase block mb-2">Description</span>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 수량 선택기 및 장바구니 담기 버튼 조립 영역 */}
          <div className="pt-6 mt-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700 font-semibold">수량 선택</span>
              
              {/* +/- 수량 조작 */}
              <div className="flex items-center space-x-3 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                <button
                  onClick={() => handleQty(-1)}
                  disabled={qty <= 1}
                  className="p-1 rounded-xl hover:bg-white text-slate-500 disabled:opacity-40 transition cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span className="text-sm font-bold text-slate-800 w-6 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => handleQty(1)}
                  className="p-1 rounded-xl hover:bg-white text-slate-500 transition cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* 총 가격 계산 표시 */}
            <div className="flex justify-between items-baseline pt-2">
              <span className="text-xs text-slate-400 font-bold uppercase">합계 금액</span>
              <span className="text-xl font-extrabold text-blue-600">
                ${(product.price * qty).toFixed(2)}
              </span>
            </div>

            {/* 담기 단추 */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold py-4 rounded-2xl text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md shadow-blue-200 cursor-pointer"
            >
              <ShoppingCart size={18} />
              <span>장바구니 담기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
