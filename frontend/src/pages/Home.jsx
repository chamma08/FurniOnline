import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Banner from '../components/Banner'
import PopularProducts from '../components/PopularProducts'
import Footer from '../components/Footer'
import NewArrivals from '../components/NewArrivals'

const Home = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <NewArrivals/>
      <Banner/>
      <PopularProducts/>
      <Footer/>
    </>
  )
}

export default Home
