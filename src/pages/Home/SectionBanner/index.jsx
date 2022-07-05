import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import banner_1 from "../../../assets/Banner/b1.webp";
import banner_2 from "../../../assets/Banner/b2.webp";
import banner_3 from "../../../assets/Banner/b3.webp";
import banner_4 from "../../../assets/Banner/b5.webp";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./style.scss";

const SectionBanner = () => {
  return (
    <section className="section-banner">
      <div className="content-title">
        <h2>#YODY</h2>
      </div>
      <div className="img-effect">
        <a href="#!">
          <img src={banner_1} alt="" />
        </a>
      </div>
      <div className="img-effect">
        <a href="#!">
          <img src={banner_2} alt="" />
        </a>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        loopFillGroupWithBlank={true}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <div className="img-effect">
            <a href="#!">
              <img src={banner_3} alt="" />
            </a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="img-effect">
            <a href="#!">
              <img src={banner_4} alt="" />
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default SectionBanner;
