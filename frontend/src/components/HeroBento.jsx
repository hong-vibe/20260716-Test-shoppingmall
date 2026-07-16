import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const HeroBento = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* 3열 비대칭 Bento Grid 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. 메인 배너 (좌측 2열 너비 차지) */}
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-100/80 to-teal-50/60 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative group min-h-[350px] md:min-h-[420px] shadow-xs">
          {/* 텍스트 영역 */}
          <div className="flex flex-col text-left space-y-4 md:max-w-[50%] z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight whitespace-pre-line">
              Summer{"\n"}Arrival of{"\n"}Outfit
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Discover quality fashion that reflects your style and makes everyday enjoyable.
            </p>
            <div className="pt-2">
              <button className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                <span>EXPLORE PRODUCT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* 데코 50% OFF 배지 */}
          <div className="absolute top-8 right-8 text-right z-10">
            <span className="text-5xl md:text-6xl font-black text-emerald-800/20 block leading-none">50%</span>
            <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">OFF SALE</span>
          </div>

          {/* 누끼 컷 모델 이미지 */}
          <div className="w-full md:w-[48%] mt-6 md:mt-0 flex justify-center items-end h-full relative">
            <img
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80"
              alt="Summer Outfit"
              className="max-h-[300px] md:max-h-[380px] object-contain drop-shadow-2xl group-hover:scale-103 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* 2. 서브 배너 (우측 1열 너비, 세로 2행 높이 모두 차지) */}
        <div className="md:col-span-1 md:row-span-2 bg-slate-100 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden relative group min-h-[380px] md:min-h-full shadow-xs">
          <div className="text-left z-10">
            <h2 className="text-2xl font-extrabold text-slate-950 leading-snug">
              Fashion{"\n"}Style
            </h2>
            <p className="text-slate-400 text-xs mt-1">New kid's collection</p>
          </div>

          {/* 우하단 이동 뱃지 */}
          <div className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300 shadow-sm cursor-pointer z-10">
            <ArrowUpRight size={18} />
          </div>

          {/* 아동 모델 컷 */}
          <div className="w-full h-[65%] mt-6 flex justify-center items-end relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&q=80"
              alt="Fashion Style Kids"
              className="max-h-[250px] md:max-h-[320px] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* 3. 선글라스 배너 (2행 좌측 1열 차지) */}
        <div className="md:col-span-1 bg-stone-200/80 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden relative group min-h-[200px] shadow-xs">
          <div className="text-left z-10">
            <h3 className="text-lg font-extrabold text-slate-800">Trendy</h3>
            <h3 className="text-lg font-extrabold text-slate-800">Sunglasses</h3>
          </div>

          {/* 우하단 이동 뱃지 */}
          <div className="absolute bottom-6 right-6 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300 shadow-xs cursor-pointer z-10">
            <ArrowUpRight size={16} />
          </div>

          {/* 상품 이미지 */}
          <div className="absolute right-2 bottom-2 w-[55%] h-[60%] flex justify-end items-end">
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80"
              alt="Sunglasses"
              className="object-contain max-h-[110px] drop-shadow-lg group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* 4. 스니커즈 배너 (2행 중앙 1열 차지) */}
        <div className="md:col-span-1 bg-rose-50 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden relative group min-h-[200px] shadow-xs">
          <div className="text-left z-10">
            <h3 className="text-lg font-extrabold text-slate-800">Popular</h3>
            <h3 className="text-lg font-extrabold text-slate-800">Shoes</h3>
          </div>

          {/* 우하단 이동 뱃지 */}
          <div className="absolute bottom-6 right-6 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300 shadow-xs cursor-pointer z-10">
            <ArrowUpRight size={16} />
          </div>

          {/* 상품 이미지 */}
          <div className="absolute right-2 bottom-0 w-[60%] h-[65%] flex justify-end items-end">
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80"
              alt="Popular Shoes"
              className="object-contain max-h-[115px] -rotate-12 drop-shadow-lg group-hover:scale-108 group-hover:rotate-0 transition-all duration-500 ease-out"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroBento;
