import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import XrHitModelContainer from "./components/xr-hit-model/XrHitModelContainer";
import PlaceOrder from "./pages/PlaceOrder";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Recommendations from "./pages/Recomendation";

const App = () => {
  return (
    <main className="overflow-hidden text-[#404040]">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/recommendations" element={<Recommendations />} />
        {/*  <Route path="/ar-view/:productId" element={<ArView />} /> */}
        <Route path="/arview" element={<XrHitModelContainer />} />
        <Route path="//mailto:info@furnionline.com" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </main>
  );
};

export default App;
