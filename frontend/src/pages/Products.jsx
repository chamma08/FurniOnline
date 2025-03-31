import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const text = "Discover our exclusive range of high-quality products";

const Products = () => {
  const { products, loading, addToCart, getCartCount } =
    useContext(ProductContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-padd-container">
      {/* Video Hero Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src="/videos/hero-3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <h1
            className="text-8xl md:text-5xl font-extrabold text-yellow-500"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Our Products
          </h1>

          <p className="text-lg md:text-xl text-white mt-2">
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </p>
        </div>
      </div>

      <div className=" px-4 py-10 bg-primary mb-8 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/single-product/${product._id}`}>
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
              </Link>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
                <p className="text-black font-bold mt-2 text-lg">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
