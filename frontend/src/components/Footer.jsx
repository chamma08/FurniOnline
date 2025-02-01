import React from "react";
import { FaMailBulk } from "react-icons/fa";
import { FaLocationDot, FaPhone, FaQuestion } from "react-icons/fa6";
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

const Footer = () => {
  return (
    <footer>
      <div className="max-padd-container flex items-start justify-between flex-col lg:flex-row gap-8 py-6 mb-7 bg-primary">
        <div>
          <motion.h4
            variants={fadeUp(0.4)}
            initial="hidden"
            whileInView="show"
            className="h4"
          >
            We are always here to help
          </motion.h4>
          <motion.p variants={fadeUp(1)} initial="hidden" whileInView="show">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae.
          </motion.p>
        </div>
        <div className="flexStart flex-wrap gap-8">
          <div className="flexCenter gap-x-6">
            <FaLocationDot />
            <div>
              <motion.h5
                variants={fadeUp(1.2)}
                initial="hidden"
                whileInView="show"
                className="h5"
              >
                Location
              </motion.h5>
              <motion.p
                variants={fadeUp(1.6)}
                initial="hidden"
                whileInView="show"
              >
                123, Colombo, Sri lanka
              </motion.p>
            </div>
          </div>
          <div className="flexCenter gap-x-6">
            <FaPhone />
            <div>
              <motion.h5
                variants={fadeUp(1.9)}
                initial="hidden"
                whileInView="show"
                className="h5"
              >
                Phone
              </motion.h5>
              <motion.p
                variants={fadeUp(2.2)}
                initial="hidden"
                whileInView="show"
              >
                +0123456789
              </motion.p>
            </div>
          </div>
          <div className="flexCenter gap-x-6">
            <FaMailBulk />
            <div>
              <motion.h5
                variants={fadeUp(2.6)}
                initial="hidden"
                whileInView="show"
                className="h5"
              >
                Email Support
              </motion.h5>
              <motion.p
                variants={fadeUp(2.8)}
                initial="hidden"
                whileInView="show"
              >
                matheeshacham08@gmail.com
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-padd-container flex items-start justify-between flex-wrap gap-12 mt-12">
        {/* logo - Left side */}
        <div className="flex flex-col max-w-sm gap-y-5">
          <div className="bold-32">
            Furni<span className="text-secondary">Online</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            earum reprehenderit possimus!
          </p>
        </div>
        <div className="flexStart gap-7 xl:gap-x-36 flex-wrap">
          <ul>
            <h4 className="h4 mb-3">Customer Service</h4>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Help center
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Payment methods
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Contact
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Shipping status
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Complaints
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="h4 mb-3">Legal</h4>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Privacy Policy
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Cookie settings
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Terms & conditions
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Cancelation
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Imprint
              </a>
            </li>
          </ul>
          <ul>
            <h4 className="h4 mb-3">Others</h4>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Our teams
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Sustainability
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Press
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Jobs
              </a>
            </li>
            <li className="my-2">
              <a href="" className="text-gray-30 regular-14 ">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* copyrights */}
      <p className="max-padd-container bg-primary medium-14 py-2 px-8 rounded flexBetween mt-6">
        <span>2025 Research Project - Matheesha Dissanayake</span>
        <span>All Rights Reserved</span>
      </p>
    </footer>
  );
};

export default Footer;
