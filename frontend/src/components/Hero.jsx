import React, { useRef, useState } from "react";
import heroImg from "../assets/bg.jpg";
import { BsFire } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaPlay, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const videoFiles = [
  "/videos/hero-1.mp4",
  "/videos/hero-2.mp4",
  "/videos/hero-3.mp4",
  "/videos/hero-4.mp4",
];

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
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoFiles.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideo(
      (prev) => (prev - 1 + videoFiles.length) % videoFiles.length
    );
    setIsPlaying(false);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleVideoEnd = () => nextVideo();

  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);
  return (
    <section className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[667px] w-full mb-10 relative">
      <div
        className="relative bg-white p-3 rounded-2xl max-w-[233px] top-8 xl:top-12 transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative">
          <video
            ref={videoRef}
            src={videoFiles[currentVideo]}
            height={211}
            width={211}
            className="rounded-3xl mb-3 transition-opacity duration-300"
            autoPlay
            loop={false}
            muted
            playsInline
            onEnded={handleVideoEnd}
            onPlay={handlePlay}
            onPause={handlePause}
          />

          {/* Play Button (Shows when video is paused) */}
          {!isPlaying && (
            <button
              className={`absolute top-1/2 left-1/2 flexCenter -translate-x-1/2 -translate-y-1/2 h-12 w-12 bg-secondary rounded-full transition-opacity duration-300 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => {
                videoRef.current.play();
                setIsPlaying(true);
              }}
            >
              <span className="absolute w-full h-full rounded-full bg-white opacity-50 animate-ping"></span>
              <FaPlay className="text-lg text-white" />
            </button>
          )}

          <button
            className={`absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={prevVideo}
          >
            <FaArrowLeft />
          </button>
          <button
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
            onClick={nextVideo}
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Description */}
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
          style={{ fontFamily: "'Dancing Script', cursive" }}
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

export default Hero;
