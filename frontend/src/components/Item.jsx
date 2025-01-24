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
        />
      </Link>
      <div className="p-3 rounded-lg pt-12 bg-white shadow">
        <motion.h4
          variants={fadeUp(1)}
          initial="hidden"
          whileInView="show"
          className="bold-15 line-clamp-1 lmy-0"
        >
          {product.name}
        </motion.h4>
        <div className="flexBetween pt-1">
          <h5 className="h5 pr-2">${product.price}.00</h5>
          <div className="flex items-baseline gap-x-1">
            <FaStar className="text-yellow-400" />
            <h5 className="h5 relative bottom-0.5">4.8</h5>
          </div>
        </div>
        <p className="line-clamp-2 py-1">{product.description}</p>
      </div>
    </div>
  );
};

export default Item;
