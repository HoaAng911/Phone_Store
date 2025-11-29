// src/components/product-category/ProductFilterSidebar.jsx
import { SlidersHorizontal } from 'lucide-react'

export default function ProductFilterSidebar({ categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange, clearFilters }) {
  const priceButtons = [
    { label: 'Tất cả giá', range: [0, 100000000] },
    { label: 'Dưới 5 triệu', range: [0, 5000000] },
    { label: '5 - 10 triệu', range: [5000000, 10000000] },
    { label: '10 - 20 triệu', range: [10000000, 20000000] },
    { label: 'Trên 20 triệu', range: [20000000, 100000000] },
  ]

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="font-semibold text-lg">Bộ lọc</h2>
        </div>

        {/* Danh mục */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Danh mục</h3>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === 'all' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Tất cả sản phẩm
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Giá */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Khoảng giá</h3>
          <div className="space-y-2">
            {priceButtons.map(({ label, range }) => (
              <button
                key={label}
                onClick={() => setPriceRange(range)}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-lg hover:bg-gray-100"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={clearFilters} className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
          Xóa bộ lọc
        </button>
      </div>
    </aside>
  )
}