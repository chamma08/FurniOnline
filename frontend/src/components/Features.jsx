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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis, reiciendis eius tenetur perspiciatis doloribus non
              repudiandae tempore cumque adipisci ea minima ab provident quis
              ratione facilis velit ad est molestiae.
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              iure excepturi quia eius reiciendis velit perspiciatis quam, fugit
              nulla rem sit ex consectetur pariatur distinctio tempore vel
              officiis? Nihil, quas!
            </motion.p>
          </div>
          <div className="p-4 rounded-3xl">
            <motion.h4
              variants={fadeDown(1.8)}
              initial="hidden"
              whileInView="show"
              className="h4 capitalize"
            >
              AI Powered
            </motion.h4>
            <motion.p variants={fadeUp(2)} initial="hidden" whileInView="show">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium numquam ipsa, vero corporis exercitationem doloremque
              eveniet ab quasi iusto, minima asperiores error dolor mollitia
              commodi iste. Vitae error corrupti sed!
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
