import React from "react";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
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
const ProductHero = () => {
  return (
    <section className="relative h-[400px] w-full mb-10 overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    className="absolute top-0 left-0 w-full h-full object-cover border-2 border-red-500" 
    src="/videos/hero-1.mp4"
    type="video/mp4"
    poster="/src/assets/bg.jpg" // Fallback image
  >
    Your browser does not support the video tag.
  </video>

  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Content */}
  <div className="relative z-10 max-padd-container mt-12 sm:mt-20 xl:mt-40 max-w-[777px] text-white">
    <motion.h5
      variants={fadeDown(0.4)}
      initial="hidden"
      whileInView="show"
      className="flex items-baseline gap-x-2 uppercase text-secondary medium-18"
    >
      URBAN AESTHETIC <BsFire />
    </motion.h5>
    <motion.h1
      variants={fadeUp(0.7)}
      initial="hidden"
      whileInView="show"
      className="h1 font-[500] capitalize max-w-[722px]"
    >
      Visualise furniture in your space with AR
    </motion.h1>
    <div className="flex">
      <Link
        to={"/collection"}
        className="bg-white text-xs font-medium pl-5 rounded-full flexCenter gap-x-2 group"
      >
        Check Our Modern Collection
        <FaArrowRight className="bg-secondary text-white rounded-full w-11 h-11 p-3 m-[3px] border border-white group-hover:-rotate-[20deg] transition-all duration-500" />
      </Link>
    </div>
  </div>
</section>
  );
};

export default ProductHero;
