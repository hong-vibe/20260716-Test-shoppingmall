import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import mockProducts from '../mocks/products.json';
import { RefreshCw, AlertTriangle, Package2 } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error' | 'empty'
  const [errorMessage, setErrorMessage] = useState('');
  const [isUsingMock, setIsUsingMock] = useState(false);

  // API 호출 함수
  const fetchProducts = async () => {
    setStatus('loading');
    setErrorMessage('');
    setIsUsingMock(false);

    try {
      // 1. Fake Store API 호출
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error(`서버 응답 오류 (상태코드: ${response.status})`);
      }
      
      const data = await response.json();

      if (!data || data.length === 0) {
        setStatus('empty');
      } else {
        // 내부 데이터 필드 매핑 및 검증 (price 타입 보장)
        const mappedProducts = data.map(item => ({
          id: item.id,
          title: item.title,
          price: Number(item.price), // price를 숫자로 강제 변환 및 검증
          description: item.description,
          category: item.category,
          image: item.image
        }));
        setProducts(mappedProducts);
        setStatus('success');
      }
    } catch (error) {
      console.warn("API 연동 실패로 인해 로컬 Mock 데이터로 대체합니다.", error);
      loadMockFallback(error.message);
    }
  };

  // Mock 데이터 Fallback 함수
  const loadMockFallback = (errText) => {
    setErrorMessage(errText);
    
    if (mockProducts && mockProducts.length > 0) {
      const mappedMock = mockProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        description: item.description,
        category: item.category,
        image: item.image
      }));
      setProducts(mappedMock);
      setIsUsingMock(true);
      setStatus('success');
    } else {
      setStatus('empty');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. 로딩 상태 스켈레톤(Skeleton UI) 카드 부품
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col h-full animate-pulse">
      <div className="pt-[100%] bg-slate-200 rounded-xl mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-slate-200 rounded w-full mb-1"></div>
      <div className="h-3 bg-slate-200 rounded w-5/6 mb-4"></div>
      <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-center">
        <div className="w-1/3 h-5 bg-slate-200 rounded"></div>
        <div className="w-1/4 h-8 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  );

  // 2. 로딩 화면
  if (status === 'loading') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 text-left">🛍️ 상품 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  // 3. 완전히 실패하여 데이터를 불러오지 못한 경우 (Mock도 불러오지 못한 극단적 상황)
  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-rose-50 rounded-3xl border border-rose-100 text-center shadow-xs">
        <AlertTriangle className="mx-auto text-rose-500 mb-4" size={48} />
        <h3 className="text-lg font-bold text-rose-900 mb-2">상품 정보를 가져오지 못했습니다</h3>
        <p className="text-sm text-rose-700 mb-6">
          네트워크 연결 상태를 확인하고 아래 재시도 버튼을 눌러보세요.<br/>
          <span className="text-xs text-rose-500 font-mono">({errorMessage})</span>
        </p>
        <button
          onClick={fetchProducts}
          className="inline-flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition duration-200 cursor-pointer"
        >
          <RefreshCw size={16} />
          <span>다시 시도하기</span>
        </button>
      </div>
    );
  }

  // 4. 상품이 없는 경우 (Empty)
  if (status === 'empty') {
    return (
      <div className="max-w-md mx-auto my-16 text-center">
        <Package2 className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-lg font-bold text-slate-800 mb-2">등록된 상품이 없습니다</h3>
        <p className="text-sm text-slate-500 mb-6">
          현재 판매 중이거나 조회할 수 있는 상품 목록이 비어있습니다.
        </p>
        <button
          onClick={fetchProducts}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition duration-200 cursor-pointer"
        >
          목록 새로고침
        </button>
      </div>
    );
  }

  // 5. 성공적으로 상품을 가져온 경우 (Success)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 타이틀 및 경고 배지 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 text-left">🛍️ 추천 상품</h2>
        {isUsingMock && (
          <span className="mt-2 sm:mt-0 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-xl flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>인터넷이 불안정하여 비상용 오프라인 상품 목록을 보여주고 있습니다.</span>
          </span>
        )}
      </div>

      {/* 상품 그리드 레이아웃 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
