import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Banner from '../components/Banner'
import PopularProducts from '../components/PopularProducts'
import Footer from '../components/Footer'
import NewArrivals from '../components/NewArrivals'
import Blog from '../components/Blog'

const Home = () => {
  return (
    <>
      <Hero/>
      <Features/>
      <NewArrivals/>
      <Banner/>
      <PopularProducts/>
      <Blog/>
      <Footer/>
    </>
  )
}

export default Home
