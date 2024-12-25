import React from 'react'
import Home from './pages/Home'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'

const App = () => {
  return (
    <main className='overflow-hidden text-[#404040]'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} /> 
        <Route path="/product/:productId" element={<Product/>} /> 
        <Route path="/testimonials" element={<Testimonials/>} /> 
        <Route path='//mailto:info@furnionline.com' element={<Contact/>} />

      </Routes>
    </main>
  )
}

export default App
