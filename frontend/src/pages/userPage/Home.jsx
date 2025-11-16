import Banner from '@/components/user/Banner'
import CategoryMenu from '@/components/user/CategoryMenu'
import FeaturedProducts from '@/components/user/FeatureProduct'
import FlashSaleSection from '@/components/user/FlashSaleSection'
import React from 'react'

const Home = () => {
  return (
    <div>
       <CategoryMenu/>
       <Banner/>
       <FeaturedProducts/>
       <FlashSaleSection/>
    </div>
  )
}

export default Home