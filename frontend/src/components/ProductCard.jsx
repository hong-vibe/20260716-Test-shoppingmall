import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);

  // 기본 대체 이미지 링크 (상품 이미지가 로드 실패할 경우를 위해 준비)
  const defaultImage = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80';

  const handleAddToCart = () => {
    // 상품 담기 요청(Action)을 공용 보관함에 전달(dispatch)합니다.
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* 상품 이미지 영역 (클릭 시 상세페이지로 이동) */}
      <Link to={`/product/${product.id}`} className="relative pt-[100%] bg-slate-50 overflow-hidden block cursor-pointer">
        <img
          src={imageError ? defaultImage : product.image}
          alt={product.title}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-xs">
          {product.category}
        </div>
      </Link>

      {/* 상품 정보 영역 */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="cursor-pointer block text-left">
          <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 min-h-[40px] hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 mb-3 flex-grow">
          {product.description}
        </p>

        {/* 가격 & 담기 버튼 */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-50">
          <div>
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Price</span>
            <span className="text-lg font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm shadow-blue-200"
          >
            <Plus size={14} />
            <span>담기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
