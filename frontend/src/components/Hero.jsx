import React from "react";
import heroImg from "../assets/bg.jpg";
import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";
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

const Hero = () => {
  return (
    <section className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[667px] w-full mb-10 relative">
      <div className="relative bg-white p-3 rounded-2xl max-w-[233px] top-8 xl:top-12">
        <div className="relative">
          <img
            src={heroImg}
            height={211}
            width={211}
            className="rounded-3xl mb-3"
            alt=""
          />
          <span className="absolute top-1/2 left-1/2 flexCenter -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-secondary rounded-full cursor-pointer">
            <span className="absolute w-full h-full rounded-full bg-white opacity-50 animate-ping"></span>
            <FaPlay className="text-sm relative left-[1px] text-white" />
          </span>
        </div>
        <p className="text-[13px]">
          <b className="uppercase">UNLOCK</b> your dream home with our curated
          furniture selection
        </p>
      </div>
      <div className="mt-12 sm:mt-20 xl:mt-40 max-w-[777px]">
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
          className="h1 font-[500] capitalize max-w-[722px] text-white"
        >
          Visualise furniture in your space with AR
        </motion.h1>
        <div className="flex">
          <Link className="bg-white text-xs font-medium pl-5 rounded-full flexCenter gap-x-2 group">
            Check Our Modern Collection
            <FaArrowRight className="bg-secondary text-white rounded-full w-11 h-11 p-3 m-[3px] border border-white group-hover:-rotate-[20deg] transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
