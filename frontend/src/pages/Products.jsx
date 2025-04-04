import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Filter, Search, Star } from "lucide-react";

const Products = () => {
  const { products, loading, addToCart } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const text = "Discover our exclusive range of high-quality products";

  // Extract unique categories
  const categories = ["All", ...new Set(products.map(product => product.category || "Uncategorized"))];

  // Filter products based on search and category
  useEffect(() => {
    let result = products;
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeCategory !== "All") {
      result = result.filter(product => product.category === activeCategory);
    }
    
    setFilteredProducts(result);
  }, [searchTerm, activeCategory, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-gray-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            className="absolute w-full h-full object-cover"
          >
            <source src="/videos/hero-3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
          {/* Using original heading style */}
          <motion.h1
            className="text-8xl md:text-5xl font-extrabold text-yellow-500"
            style={{ fontFamily: "'Dancing Script', cursive" }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Products
          </motion.h1>
          
          {/* Original text animation */}
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
          
          {/* Search Bar */}
          <motion.div 
            className="mt-8 w-full max-w-xl relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 pr-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 text-gray-400" size={20} />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full shadow-sm text-gray-700 mr-2"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            
            <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-wrap gap-2`}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-50 text-white hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="relative overflow-hidden group">
                {/* Link to single product */}
                <Link to={`/single-product/${product._id}`} className="block cursor-pointer">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </Link>
                
                {product.isNew && (
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    NEW
                  </div>
                )}
                
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < (product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">
                    ({product.reviews || Math.floor(Math.random() * 100) + 10})
                  </span>
                </div>
                
                <Link to={`/single-product/${product._id}`} className="block">
                  <h3 className="font-medium text-gray-900 text-lg mb-1 hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm mr-2">
                        ${product.oldPrice}
                      </span>
                    )}
                    <span className="text-indigo-600 font-bold text-lg">
                      ${product.price}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm transition-colors duration-300"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try changing your search or filter criteria</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;