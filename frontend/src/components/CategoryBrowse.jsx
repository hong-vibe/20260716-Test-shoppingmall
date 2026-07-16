import React, { useState } from 'react';

const CategoryBrowse = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = [
    {
      name: 'SHOES',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'CLEANING',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'BAGS',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'T-SHIRTS',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* 타이틀 및 탭 버튼 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight text-left">
          Browse by categories
        </h2>

        {/* 필터 탭 조립 */}
        <div className="flex items-center space-x-2">
          {['ALL', 'WOMAN', 'CHILDREN'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
                activeTab === tab
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-transparent border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리 카드 4단 리스트 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-slate-100/70 border border-slate-50 hover:border-slate-200 hover:bg-slate-100 rounded-3xl p-6 flex flex-col items-center justify-between group cursor-pointer transition-all duration-300 min-h-[220px]"
          >
            {/* 이미지 영역 (누끼 스튜디오 컷 연출) */}
            <div className="w-full h-[120px] flex items-center justify-center overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="max-h-full object-contain drop-shadow-md group-hover:scale-106 transition-transform duration-300"
              />
            </div>

            {/* 카테고리 명칭 배지 */}
            <div className="bg-white/80 border border-slate-100 px-4 py-1.5 rounded-full text-[10px] font-extrabold text-slate-700 tracking-widest uppercase shadow-xs group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
              {cat.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowse;
