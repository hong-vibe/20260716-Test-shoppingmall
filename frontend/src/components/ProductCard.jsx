import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { Plus, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  // 기본 대체 이미지 링크
  const defaultImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80';

  const handleAddToCart = (e) => {
    // 담기 버튼 클릭 시 상세페이지로의 링크 이동 전파를 완벽히 막아줍니다.
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleWishlist = (e) => {
    // 하트 버튼 클릭 시 상세페이지로의 링크 이동 전파를 완벽히 막아줍니다.
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xs border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden group relative">
      {/* 1. 우상단 위시리스트 하트 버튼 (e.stopPropagation 적용) */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 z-10 cursor-pointer border border-slate-100/50"
      >
        <Heart 
          size={14} 
          className={`transition-colors duration-300 ${
            wishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400 group-hover/btn:text-rose-500'
          }`} 
        />
      </button>

      {/* 2. 상품 이미지 영역 (은은한 백그라운드로 스튜디오 누끼 컷 효과 극대화) */}
      <Link to={`/product/${product.id}`} className="relative pt-[90%] bg-slate-50/70 border-b border-slate-50 overflow-hidden block cursor-pointer">
        <img
          src={imageError ? defaultImage : product.image}
          alt={product.title}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-contain p-5 group-hover:scale-103 transition-transform duration-500 ease-out"
        />
        {/* 카테고리 태그 */}
        <div className="absolute bottom-3 left-3 bg-white/90 text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-slate-100/50 shadow-xs uppercase tracking-wider">
          {product.category}
        </div>
      </Link>

      {/* 3. 상품 정보 영역 (텍스트 크기 및 배치 최적화) */}
      <div className="p-4 flex flex-col flex-grow text-left">
        <Link to={`/product/${product.id}`} className="cursor-pointer block flex-grow">
          <h3 className="font-semibold text-slate-800 text-xs md:text-sm line-clamp-2 min-h-[38px] group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>
        
        {/* 가격 및 담기 버튼 라인 */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100/50">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price</span>
            <span className="text-base font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          {/* 담기 버튼 */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 hover:scale-105 active:scale-95 text-white transition-all duration-200 cursor-pointer shadow-xs"
            title="장바구니 담기"
          >
            <Plus size={16} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
