import React from "react";
import img1 from "../assets/features/5.jpg";
import img2 from "../assets/features/2.jpg";
import img3 from "../assets/features/3.jpg";
import img4 from "../assets/features/4.jpg";
import img6 from "../assets/features/6.jpg";
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

const Features = () => {
  return (
    <section className="max-padd-container pt-14 pb-20">
      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-6 gap-y-12 rounded-xl">
        <div className="flexCenter gap-x-10">
          <motion.div
            variants={fadeUp(0.4)}
            initial="hidden"
            whileInView="show"
          >
            <img
              src={img2}
              alt=""
              height={77}
              width={222}
              className="rounded-full "
            />
          </motion.div>
          <motion.div
            variants={fadeUp(0.8)}
            initial="hidden"
            whileInView="show"
          >
            <img
              src={img6}
              alt=""
              height={77}
              width={222}
              className="rounded-full "
            />
          </motion.div>
        </div>
        <div className="flexCenter flex-wrap sm:flex-nowrap gap-x-5">
          <div className="p-4 rounded-3xl">
            <motion.h4
              variants={fadeDown(1)}
              initial="hidden"
              whileInView="show"
              className="h4 capitalize"
            >
              AR Powered
            </motion.h4>
            <motion.p
              variants={fadeUp(1.2)}
              initial="hidden"
              whileInView="show"
              className="justify"
            >
              Transform the way you shop for furniture with our cutting-edge
              AR-powered experience! Visualize how each piece fits into your
              space in real-time, explore different styles, colors, and
              arrangements, and make confident decisions before you buy. Say
              goodbye to guesswork and hello to a seamless, immersive shopping
              experience!
            </motion.p>
          </div>
          <div className="p-4 rounded-3xl">
            <motion.h4
              variants={fadeDown(1.4)}
              initial="hidden"
              whileInView="show"
              className="h4 capitalize"
            >
              Secure Payment
            </motion.h4>
            <motion.p
              variants={fadeUp(1.6)}
              initial="hidden"
              whileInView="show"
            >
              Enjoy a safe and seamless shopping experience with our highly
              secure payment options. We use advanced encryption and trusted
              payment gateways to protect your transactions, ensuring your
              personal and financial information remains safe. Shop for your
              perfect furniture with confidence, knowing that your payments are
              secure, reliable, and hassle-free
            </motion.p>
          </div>
          <div className="p-4 rounded-3xl">
            <motion.h4
              variants={fadeDown(1.8)}
              initial="hidden"
              whileInView="show"
              className="h4 capitalize "
            >
              AI Powered
            </motion.h4>
            <motion.p variants={fadeUp(2)} initial="hidden" whileInView="show">
            Discover the perfect furniture effortlessly with our AI-powered recommendation system! Simply upload an image, and our smart AI will suggest matching products tailored to your style. Plus, get personalized design advice from our AI Assistant, making your shopping experience seamless and hassle-free!
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
