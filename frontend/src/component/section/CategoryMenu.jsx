'use client';

import { useState } from 'react';
import Phone from '../../assets/phone.jpg';
import Laptop from '../../assets/laptop.webp';
import Tablet from '../../assets/ipad.png';
import Ac from '../../assets/as.webp';
import { Smartphone, LaptopIcon, TabletIcon, Headphones } from 'lucide-react';

export default function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState('phone');

  const categories = [
    { name: 'phone', label: 'Điện thoại', img: Phone, icon: Smartphone },
    { name: 'laptop', label: 'Laptop', img: Laptop, icon: LaptopIcon },
    { name: 'tablet', label: 'Máy tính bảng', img: Tablet, icon: TabletIcon },
    { name: 'accessories', label: 'Phụ kiện', img: Ac, icon: Headphones },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <span className="w-1 h-9 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"></span>
        Danh mục sản phẩm
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          const Icon = cat.icon;

          return (
            <div
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className="relative group cursor-pointer"
            >
              {/* Card chính */}
              <div
                className={`
                  corner-bracket
                  relative overflow-hidden rounded-2xl bg-white shadow-md
                  transition-all duration-500
                  ${isActive ? 'active scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl'}
                `}
              >
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-5 text-center">
                  <Icon className={`mx-auto w-12 h-12 mb-3 transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-600 group-hover:text-cyan-400'}`} />
                  <p className={`font-bold text-lg transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
                    {cat.label}
                  </p>
                </div>

                {/* Bắt buộc có span để 2 góc dưới hoạt động */}
                <span className="absolute inset-0 pointer-events-none"></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}