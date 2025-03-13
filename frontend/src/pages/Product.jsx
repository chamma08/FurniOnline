import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaCamera, FaHeart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import ProductDescription from "../components/ProductDescription";
import ProductFeatures from "../components/ProductFeatures";
import RelatedProducts from "../components/RelatedProducts";
import Footer from "../components/Footer";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-padd-container ">
        <div className="flex gap-12 flex-col xl:flex-row bg-primary rounded-2xl p-3 mb-6">
          <div className="flex flex-1 gap-x-2 xl:flex-1">
            <div className="flexCenter flex-col gap-[7px] flex-wrap">
              {product.image.map((img, index) => (
                <img
                  className="max-h-[89px] max-w-[95px] rounded-lg"
                  src={img}
                  key={index}
                  alt="product"
                  onClick={() => setImage(img)}
                />
              ))}
            </div>{" "}
            <div className="max-h-[377px] max-w-[270px] w-auto flex">
              <img
                className="bg-gray-10 rounded-xl"
                src={image}
                alt="product"
              />
            </div>
          </div>
          <div className="flex-[1.5] rounded-2xl xl:px-7">
            <h3 className="h3 leading-none text-2xl font-bold">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-x-5">
              <div className="flex items-center gap-x-2 text-secondary">
                <div className="flex gap-x-2 text-secondary">
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStar className="text-yellow-400" />
                  <FaStarHalfAlt className="text-yellow-400" />
                </div>
                <span className="text-gray-400 medium-14">(134)</span>
              </div>
            </div>
            <h4 className="h4 my-2">
              {currency}
              {product.price}.00
            </h4>
            <p className="max-w-[555px]">{product.description}</p>
            <div className="flex flex-col gap-4 my-4 mb-5">
              <div className="flex  gap-2">
                {[...product.sizes]
                  .sort((a, b) => {
                    const order = ["XS", "S", "M", "L", "XL", "XXL"];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((item, i) => (
                    <button
                      key={i}
                      onClick={() => setSize(item)}
                      className={`border medium-14 h-8 w-20 bg-primary rounded ${
                        size === item
                          ? "bg-blue-400 ring-1 ring-slate-900/20 border-gray-90"
                          : "ring-1 ring-slate-900/5"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <button
                className="bg-secondary !rounded-lg text-white sm:w-1/2 p-2 flexCenter gap-x-2 capitalize"
                onClick={() => addToCart(product._id, size)}
              >
                Add to cart <TbShoppingBagPlus />
              </button>
              <button className="btn-light !rounded-lg !py-3.5 gap-x-2">
                <FaHeart />
              </button>
              <Link
                to={`/arview?model=${product.model?.[0] || ""}&price=${
                  product.price
                }`}
              >
                <button className="btn-light !rounded-lg !py-3.5 gap-x-2">
                  <FaCamera />
                </button>
              </Link>
            </div>
            <div className="flex items-center gap-x-2 mt-3">
              <FaTruckFast className="text-lg" />
              <span className="text-gray-400 flex flex-col gap-1 text-sm medium-14">
                Delivery Furnitures to your door
              </span>
            </div>
            <hr className="my-3 w-2/3" />
            <div className="text-gray-400 flex flex-col gap-1 text-[14px]medium-14">
              <p>Authencity You can Trust</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        <ProductDescription />
        <ProductFeatures />
        <RelatedProducts
          category={product.category}
          subCategory={product.subCategory}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Product;
