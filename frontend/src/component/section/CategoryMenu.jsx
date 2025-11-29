'use client';

import { useState } from 'react';
import Phone from '../../assets/phone.jpg';
import Laptop from '../../assets/laptop.webp';
import Tablet from '../../assets/ipad.png';
import Ac from '../../assets/as.webp';

export default function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { name: 'phone', img: Phone },
    { name: 'laptop', img: Laptop },
    { name: 'tablet', img: Tablet },
    { name: 'accessories', img: Ac },
  ];

  return (
    <div className="category-menu p-4">
      <div className="category-header mb-4">
        <h2 className="text-xl font-semibold">Danh mục sản phẩm</h2>
      </div>

      <div className="category-list flex flex-wrap gap-4 justify-around">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;

          return (
            <div
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`
                cursor-pointer
                border
                rounded
                overflow-hidden
                w-70
                ${isActive ? 'border-blue-500' : 'border-gray-300'}
                hover:scale-105
                transition-transform
              `}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-70 object-cover"
              />
              <div className="text-center font-medium p-2">
                {cat.name.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
