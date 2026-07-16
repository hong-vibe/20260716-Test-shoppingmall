import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import mockProducts from '../mocks/products.json';
import { ChevronLeft, AlertTriangle, Package2, Loader2 } from 'lucide-react';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error' | 'empty'
  const [isUsingMock, setIsUsingMock] = useState(false);

  // 카테고리 매칭 사전 (클릭한 메뉴명 ➔ Fake Store API 카테고리명 변환용)
  const mapCategoryName = (name) => {
    const lower = name.toLowerCase();
    if (lower === 'shoes') return 'men\'s clothing'; // 신발 카테고리가 API에 없으므로 남성의류로 매치해 샘플 제공
    if (lower === 'cleaning') return 'electronics'; // 청소/위생도 가전제품으로 매칭해 샘플 제공
    if (lower === 'bags') return 'jewelery'; // 가방은 악세서리 쥬얼리로 매치
    if (lower === 't-shirts') return 'men\'s clothing';
    if (lower === 'woman') return "women's clothing";
    if (lower === 'children') return "women's clothing"; // 아동도 임시로 매치
    return name; // 그 외엔 그대로 전달
  };

  const fetchCategoryProducts = async () => {
    setStatus('loading');
    setIsUsingMock(false);
    const targetApiCategory = mapCategoryName(categoryName);

    try {
      // 1. API 호출 시도 (주소창에 한글이나 공백이 있을 수 있으므로 encodeURIComponent 처리)
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(targetApiCategory)}`
      );

      if (!response.ok) {
        throw new Error(`서버 응답 오류 (상태코드: ${response.status})`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        // API 결과가 없으면 Mock 로드 시도
        loadMockCategoryFallback(targetApiCategory);
      } else {
        const mapped = data.map(item => ({
          id: item.id,
          title: item.title,
          price: Number(item.price),
          description: item.description,
          category: item.category,
          image: item.image
        }));
        setProducts(mapped);
        setStatus('success');
      }
    } catch (error) {
      console.warn("카테고리 API 조회 실패로 로컬 mock 데이터를 필터링합니다.", error);
      loadMockCategoryFallback(targetApiCategory);
    }
  };

  // Mock 데이터 필터링 Fallback
  const loadMockCategoryFallback = (apiCategory) => {
    // mockProducts에서 대소문자 구분 없이 카테고리 매칭 필터링
    const filtered = mockProducts.filter(item => 
      item.category.toLowerCase().includes(apiCategory.toLowerCase()) ||
      apiCategory.toLowerCase().includes(item.category.toLowerCase())
    );

    if (filtered.length > 0) {
      const mappedMock = filtered.map(item => ({
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
      // 매칭되는 카테고리가 없는 극단적인 경우 가짜 전체 데이터를 노출
      const allMock = mockProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        description: item.description,
        category: item.category,
        image: item.image
      }));
      setProducts(allMock);
      setIsUsingMock(true);
      setStatus('success');
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  // 스켈레톤 로딩 부품
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl border border-slate-100 p-4 flex flex-col h-full animate-pulse min-h-[300px]">
      <div className="pt-[90%] bg-slate-200 rounded-2xl mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2 mb-4"></div>
      <div className="mt-auto pt-3 border-t border-slate-100/50 flex justify-between items-center">
        <div className="w-1/3 h-5 bg-slate-200 rounded"></div>
        <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );

  // 1. 로딩
  if (status === 'loading') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-8 bg-slate-200 rounded w-48 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  // 2. 완전히 상품이 없는 경우 (Empty)
  if (status === 'empty') {
    return (
      <div className="max-w-md mx-auto my-16 text-center">
        <Package2 className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-lg font-bold text-slate-800 mb-2">해당 카테고리에 상품이 없습니다</h3>
        <p className="text-sm text-slate-500 mb-6">다른 카테고리를 탐색해 보세요.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition duration-200 cursor-pointer"
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-left pb-16">
      {/* 상단 헤더 라인 */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold transition duration-200 text-sm cursor-pointer mb-4"
        >
          <ChevronLeft size={18} />
          <span>뒤로 가기</span>
        </button>
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-baseline border-b border-slate-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tight">
            Category: {categoryName}
          </h2>
          <span className="text-sm text-slate-400 font-bold mt-1 sm:mt-0">
            총 {products.length}개의 상품 발견
          </span>
        </div>
      </div>

      {isUsingMock && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-2xl p-3 mb-6">
          ⚠️ 인터넷 연결 끊김 혹은 API 제한으로 인해 오프라인 백업 데이터를 보여주고 있습니다.
        </div>
      )}

      {/* 카테고리 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
