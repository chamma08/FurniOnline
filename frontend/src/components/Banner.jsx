import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import banner1 from "../assets/4.jpg";
import { motion } from "framer-motion";
import banner2 from "../assets/b2.png";
import banner3 from "../assets/b3.png";
import banner4 from "../assets/b4.png";

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

const fadeRight = (delay) => {
  return {
    hidden: { opacity: 0, x: -100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const fadeLeft = (delay) => {
  return {
    hidden: { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: 0.5,
      },
    },
  };
};

const Banner = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [banner1, banner2, banner3, banner4];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-[1440px]">
      <div className="flexBetween bg-white">
        <div className="hidden lg:block flex-1 px-6 xl:px-12">
          <motion.h2
            variants={fadeDown(0.4)}
            initial="hidden"
            whileInView="show"
            className="h2 uppercase"
          >
            Unmatched Quality, Endless Style
          </motion.h2>
          <motion.h3
            variants={fadeDown(0.8)}
            initial="hidden"
            whileInView="show"
            className="h4 uppercase"
          >
            Discover furniture that redefines comfort and quality
          </motion.h3>
          <motion.div
            variants={fadeUp(1)}
            initial="hidden"
            whileInView="show"
            className="flex mt-5"
          >
            <Link
              to={"/collection"}
              className="btn-secondary !pr-0 !py-0 flexCenter rounded-full gap-x-2 group"
            >
              Explore Collection
              <FaArrowRight className="bg-white text-tertiary rounded-full h-9 w-9 p-3 m-[3px] group-hover:-rotate-[20deg] transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
        <motion.div
          key={bannerIndex} // Triggers animation when index changes
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.8 }}
          className="flex-1"
        >
          <img
            src={banners[bannerIndex]}
            alt="Banner"
            className="rounded-tl-3xl rounded-bl-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
