import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
    <div>
      <div className="max-padd-container mx-auto px-4 py-10 bg-primary mb-8">
        {/* Title & Cart Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
          {/* <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
          Cart Items: {getCartCount()}
        </span> */}
        </div>

        {/* Product Grid */}
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
              {/* Product Image */}

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {product.description}
                </p>
                <p className="text-blue-500 font-bold mt-2 text-lg">
                  ${product.price}
                </p>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product._id, product.sizes[0])}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-3 transition-all duration-300"
                >
                  Add to Cart
                </button>
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
