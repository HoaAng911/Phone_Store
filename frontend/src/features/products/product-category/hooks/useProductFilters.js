// src/components/product-category/hooks/useProductFilters.js
import { useState, useEffect } from 'react'
import { useProductStore } from '@/store'

export default function useProductFilters() {
  const { fetchFilteredProducts, fetchCategories } = useProductStore()

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100000000])
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchFilteredProducts({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      minPrice: priceRange[0] === 0 ? undefined : priceRange[0],
      maxPrice: priceRange[1] === 100000000 ? undefined : priceRange[1],
      sort: sortBy === 'newest' ? undefined : sortBy,
    })
  }, [selectedCategory, priceRange, sortBy, fetchFilteredProducts])

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange([0, 100000000])
    setSortBy('newest')
  }

  return {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    clearFilters
  }
}