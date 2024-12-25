import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Banner from '../components/Banner'
import PopularProducts from '../components/PopularProducts'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <Banner/>
      <PopularProducts/>
      <Footer/>
    </>
  )
}

export default Home
