// pages/ProductCategoryPage.jsx (chỉ còn 80 dòng!)
import { useState } from 'react'
import { useProductStore } from '@/store'
import useProductFilters from '../product-category/hooks/useProductFilters'
import ProductFilterSidebar from '../product-category/ProductFilterSidebar'
import ProductSortBar from '../product-category/ProductSortBar'
import ProductGrid from '../product-category/ProductGrid'


export default function ProductCategoryPage() {
  const { products, categories, loading, total } = useProductStore()
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    clearFilters
  } = useProductFilters()

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tất cả sản phẩm</h1>
        <p className="text-gray-600">{total} sản phẩm</p>
      </div>

      <div className="flex gap-6">
        <ProductFilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          clearFilters={clearFilters}
        />

        <main className="flex-1">
          <ProductSortBar
            sortBy={sortBy}
            setSortBy={setSortBy}
            onOpenMobileFilter={() => setShowMobileFilter(true)}
          />

          <ProductGrid products={products} loading={loading} />
        </main>
      </div>

    </div>
  )
}