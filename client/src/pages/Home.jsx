import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import Bestseller from '../components/bestseller'
import BottomBanner from '../components/BottomBanner'
import Newsletter from '../assets/Newsletter'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories />
        <Bestseller />
        <BottomBanner />
        <Newsletter />
        
      </div>
  )
}

export default Home
