import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeDown = (delay) => {
  return {
    hidden: { opacity: 0, y: -100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const fadeUp = (delay) => {
  return {
    hidden: { opacity: 0, y: 100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const Item = ({ product }) => {
  return (
    <div className="bottom-12 relative">
      <Link
        to={`/product/${product._id}`}
        className="relative flexCenter top-12 overflow-hidden m-2.5 rounded-xl"
      >
        <motion.img
          variants={fadeUp(0.6)}
          initial="hidden"
          whileInView="show"
          src={product.image[0]}
          className="w-60 h-60 object-cover sm:w-48 sm:h-48 xs:w-40 xs:h-40 bg-[#f1f1f17f]"
        />
      </Link>
      <div className="p-3 rounded-lg pt-12 h-52 bg-white shadow border-2 border-gray-400 ">
        <h4
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="show"
          className="bold-15 line-clamp-1 lmy-0"
        >
          {product.name}
        </h4>
        <div className="flexBetween pt-1">
          <h5 className="h5 pr-2">${product.price}.00</h5>
          <div className="flex items-baseline gap-x-1">
            <FaStar className="text-yellow-400" />
            <h5 className="h5 relative bottom-0.5">4.8</h5>
          </div>
        </div>
        <p className="line-clamp-5 py-1">{product.description}</p>
      </div>
    </div>
  );
};

export default Item;
