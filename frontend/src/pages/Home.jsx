import { Banner, CategoryMenu, FlashSaleSection, ArticleSection } from '@/component/section'
import FeaturedProducts from '../features/products/FeatureProduct'
import React from 'react'
import NewProducts from '@/features/products/NewProduct'

const Home = () => {
  return (
    <div>
      <Banner />
      <CategoryMenu />
      <FeaturedProducts />
      <FlashSaleSection />
      <NewProducts/>
      <ArticleSection />
    </div>
  )
}

export default Home