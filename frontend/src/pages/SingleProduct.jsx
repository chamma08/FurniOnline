import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // Updated to use ProductContext
import { FaCamera, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import RelatedProducts from "../components/RelatedProducts";
import Footer from "../components/Footer";

const SingleProduct = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ProductContext); // Using ProductContext
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  }, [productId, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="max-padd-container">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-12 flex-col xl:flex-row bg-primary shadow-lg rounded-2xl p-5 mb-6">
          {/* Product Images */}
          <div className="flex flex-col xl:flex-row gap-5">
            <div className="flex flex-col gap-3">
              {product.image.map((img, index) => (
                <img
                  className="h-20 w-20 rounded-lg cursor-pointer hover:opacity-75"
                  src={img}
                  key={index}
                  alt="product"
                  onClick={() => setImage(img)}
                />
              ))}
            </div>
            <div className="h-96 w-72 flex">
              <img className="rounded-xl object-cover" src={image} alt="product" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              <span className="text-gray-500">(134 Reviews)</span>
            </div>
            <h4 className="text-xl font-semibold my-2">{currency}{product.price}.00</h4>
            <p className="text-gray-600">{product.description}</p>

            {/* Size Selection */}
            <div className="flex gap-2 my-4">
              {product.sizes.sort((a, b) => {
                const order = ["XS", "S", "M", "L", "XL", "XXL"];
                return order.indexOf(a) - order.indexOf(b);
              }).map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSize(item)}
                  className={`border py-1 px-4 rounded-lg ${
                    size === item ? "bg-black text-white" : "border-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                className="bg-secondary !rounded-lg text-white sm:w-1/2 p-2 flexCenter gap-x-2 capitalize"
                onClick={() => addToCart(product._id, size)}
              >
                Add to Cart <TbShoppingBagPlus />
              </button>
              <button className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
                <FaHeart />
              </button>
              {/* <Link to={`/arview?model=${product.model?.[0] || ""}&price=${product.price}`}>
                <button className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200">
                  <FaCamera />
                </button>
              </Link> */}
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-500">
              <FaTruckFast />
              <span>Delivery to your door</span>
            </div>
          </div>
        </div>

        <ProductDescription />
        <ProductFeatures />
        <RelatedProducts category={product.category} subCategory={product.subCategory} />
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
