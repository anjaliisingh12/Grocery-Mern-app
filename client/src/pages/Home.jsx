import React, { Suspense, lazy } from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'

const BestSeller = lazy(() => import('../components/BestSeller'))
const BottomBanner = lazy(() => import('../components/BottomBanner'))
const Newsletter = lazy(() => import('../assets/Newsletter'))

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />

      <Suspense fallback={<div>Loading...</div>}>
        <BestSeller />
        <BottomBanner />
        <Newsletter />
      </Suspense>
    </div>
  )
}

export default Home
