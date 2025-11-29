import { Banner, CategoryMenu, FlashSaleSection, ArticleSection } from '@/component/section'
import FeaturedProducts from '../features/products/FeatureProduct'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Banner />
      <CategoryMenu />
      <FeaturedProducts />
      <FlashSaleSection />
      <ArticleSection />
    </div>
  )
}

export default Home