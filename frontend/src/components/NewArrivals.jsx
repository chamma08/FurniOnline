import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Title from "./Title";

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { products } from "../assets/data";
import Item from "./Item";

const NewArrivals = () => {

  const [newArrivals, setNewArrivals] = useState([])

  useEffect(() => {
    const data = products.slice(0, 10)
    setNewArrivals(data)
  }, [products])

  return (
    <section>
      <Title />
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 60,
          },
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="h-[555px]"
      >
        {newArrivals.map((product) => (
          <SwiperSlide key={product.id}>
            <Item />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </section>
  );
};

export default NewArrivals;
