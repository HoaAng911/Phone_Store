import { SlidersHorizontal } from 'lucide-react'

export default function ProductSortBar({ sortBy, setSortBy, onOpenMobileFilter }) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white border border-gray-200 rounded-lg p-4">
      <button
        onClick={onOpenMobileFilter}
        className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Bộ lọc
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm text-gray-600">Sắp xếp:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="newest">Mới nhất</option>
          <option value="price_asc">Giá: Thấp → Cao</option>
          <option value="price_desc">Giá: Cao → Thấp</option>
        </select>
      </div>
    </div>
  )
}