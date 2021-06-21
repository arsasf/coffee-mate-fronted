/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Container } from "react-bootstrap";

import styles from "styles/ManageOrder.module.css";

// import Swiper core and required modules
import SwiperCore, { EffectCube, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectCube, Pagination]);

export default function App() {
  return (
    <>
      <Container className={styles.swiperContainer}>
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={true}
          className="mySwiper"
        >
          <SwiperSlide className={styles.swiperSlide}>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}
