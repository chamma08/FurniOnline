import React from "react";
import Title from "./Title";
import { blogs } from "../assets/data";
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

export default function Blog() {
  return (
    <section className="max-padd-container py-16">
      <Title
        title1={"Our Expert"}
        title2={"Blog"}
        title1Styles={"pb-10"}
        paraStyles={"!block"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <div
            key={blog.name}
            className="rounded-3xl border-[11px] border-primary overflow-hidden relative"
          >
            <motion.img
              variants={fadeDown(0.4)}
              initial="hidden"
              whileInView="show"
              src={blog.image}
              alt={blog.name}
            />
            <div className="absolute top-0 left-0 h-full w-full bg-black/25" />
            <div className="absolute bottom-4 left-4 text-white text-[15px]">
              <motion.h3
                variants={fadeDown(0.8)}
                initial="hidden"
                whileInView="show"
                className="font-[600] text-[16px] pr-4 leading-5"
              >
                {blog.title}
              </motion.h3>
              {/* <h4 className='medium-14 pb-3 pt-1'>{blog.category}</h4> */}
              <button className="bg-primary text-white px-4 py-1 mt-2 rounded-full">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
