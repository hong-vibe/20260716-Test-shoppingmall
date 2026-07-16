import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const HeroBento = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* 3열 비대칭 Bento Grid 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. 메인 배너 (좌측 2열 너비 차지) */}
        <div className="md:col-span-2 bg-gradient-to-br from-emerald-100/80 to-teal-50/60 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between overflow-hidden relative group min-h-[350px] md:min-h-[420px] shadow-xs">
          
          {/* 텍스트 영역 */}
          <div className="flex flex-col text-left space-y-3 md:max-w-[50%] z-10">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight whitespace-pre-line">
              Summer{"\n"}Arrival of{"\n"}Outfit
            </h1>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[90%] font-medium">
              Discover quality fashion that reflects your style and makes everyday enjoyable.
            </p>
            <div className="pt-2">
              <Link 
                to="/category/men's clothing" 
                className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-full text-xs transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>EXPLORE PRODUCT</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* 데코 50% OFF 배지 */}
          <div className="absolute top-6 right-8 text-right z-10 opacity-20 md:opacity-80">
            <span className="text-6xl md:text-7xl font-black text-emerald-800/15 block leading-none">50%</span>
            <span className="text-[10px] font-black text-emerald-700 tracking-widest uppercase">OFF SALE</span>
          </div>

          {/* 누끼 컷 모델 이미지 (크기를 극대화하여 프레임 하단을 완전히 꽉 채우도록 조율) */}
          <div className="w-[80%] md:w-[50%] mt-6 md:mt-0 flex justify-center items-end h-[115%] absolute -bottom-2 -right-4 md:right-4 z-0">
            <img
              src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80"
              alt="Summer Outfit"
              className="w-full h-full object-contain drop-shadow-2xl scale-105 group-hover:scale-108 transition-transform duration-500 ease-out origin-bottom"
            />
          </div>
        </div>

        {/* 2. 서브 배너 (우측 1열 너비, 세로 2행 높이 모두 차지) */}
        <Link 
          to="/category/children"
          className="md:col-span-1 md:row-span-2 bg-slate-100 rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden relative group min-h-[380px] md:min-h-full shadow-xs cursor-pointer block text-left"
        >
          <div className="z-10">
            <h2 className="text-2xl font-extrabold text-slate-950 leading-snug">
              Fashion{"\n"}Style
            </h2>
            <p className="text-slate-400 text-[10px] font-bold tracking-wide mt-1 uppercase">New kid's collection</p>
          </div>

          {/* 우하단 이동 뱃지 */}
          <div className="absolute bottom-6 right-6 w-9 h-9 bg-white rounded-full flex items-center justify-center text-slate-900 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300 shadow-sm z-10">
            <ArrowUpRight size={16} />
          </div>

          {/* 아동 모델 컷 (높이를 85%까지 확장하여 빈틈을 완전히 메움) */}
          <div className="w-[120%] h-[85%] -ml-[10%] -mb-[5%] mt-4 flex justify-center items-end relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=400&q=80"
              alt="Fashion Style Kids"
              className="w-full h-full object-contain drop-shadow-xl scale-110 group-hover:scale-115 transition-transform duration-500 ease-out origin-bottom"
            />
          </div>
        </Link>

        {/* 3. 선글라스 배너 (2행 좌측 1열 차지) */}
        <Link
          to="/category/jewelery"
          className="md:col-span-1 bg-stone-200/80 rounded-[2rem] p-5 flex flex-col justify-between overflow-hidden relative group min-h-[180px] shadow-xs cursor-pointer block text-left"
        >
          <div className="z-10">
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Trendy</h3>
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Sunglasses</h3>
          </div>

          {/* 우하단 이동 뱃지 */}
          <div className="absolute bottom-5 right-5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300 shadow-xs z-10">
            <ArrowUpRight size={14} />
          </div>

          {/* 상품 이미지 (크기와 배치 한도를 늘려 프레임 우측 하단을 꽉 메움) */}
          <div className="absolute -right-4 -bottom-4 w-[75%] h-[75%] flex justify-end items-end">
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80"
              alt="Sunglasses"
              className="object-contain w-full h-full drop-shadow-lg scale-110 group-hover:scale-115 transition-transform duration-500 ease-out origin-bottom-right"
            />
          </div>
        </Link>

        {/* 4. 스니커즈 배너 (2행 중앙 1열 차지) */}
        <Link
          to="/category/shoes"
          className="md:col-span-1 bg-rose-50 rounded-[2rem] p-5 flex flex-col justify-between overflow-hidden relative group min-h-[180px] shadow-xs cursor-pointer block text-left"
        >
          <div className="z-10">
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Popular</h3>
            <h3 className="text-base font-extrabold text-slate-800 tracking-tight">Shoes</h3>
          </div>

          {/* 우하단 이동 뱃지 */}
          <div className="absolute bottom-5 right-5 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-slate-800 group-hover:bg-slate-950 group-hover:text-white transition-colors duration-300 shadow-xs z-10">
            <ArrowUpRight size={14} />
          </div>

          {/* 상품 이미지 (신발 크기를 키워 프레임 아래를 꽉 메움) */}
          <div className="absolute -right-2 -bottom-2 w-[72%] h-[78%] flex justify-end items-end">
            <img
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80"
              alt="Popular Shoes"
              className="object-contain w-full h-full -rotate-12 drop-shadow-lg scale-110 group-hover:scale-115 group-hover:rotate-0 transition-all duration-500 ease-out origin-bottom-right"
            />
          </div>
        </Link>

      </div>
    </section>
  );
};

export default HeroBento;
