import React from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import Product from "../../../components/Product";
import { useSelector } from "react-redux";

const SectionProduct = () => {
  const { products } = useSelector((state) => state.productReducer);

  return (
    <section className="section-slider-product">
      <div className="content-title">
        <h2>EVERYDAY WEAR</h2>
      </div>
      <div className="section-image">
        <a href="#!">
          <img
            src="https://bizweb.sapocdn.net/100/438/408/themes/863105/assets/banner_hangngay_1.jpg?1655712416201"
            alt=""
          />
        </a>
      </div>
      <div className="product-content">
        <>
          <Swiper
            breakpoints={{
              0: {
                width: 375,
                slidesPerView: 2.4,
              },
              480: {
                width: 480,
                slidesPerView: 2.4,
              },
              768: {
                width: 768,
                slidesPerView: 4,
              },
              1024: {
                width: 1224,
                slidesPerView: 4,
              },
              1224: {
                width: 1224,
                slidesPerView: 6,
              },
            }}
            navigation={true}
            spaceBetween={20}
            slidesPerView={6}
            modules={[Navigation]}
            className="mySwiper"
          >
            {products.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <Product item={product} showOption={true} />
                </SwiperSlide>
              );
            })}
            <SwiperSlide className="swiper-slide">
              <Link className="swiper-end" to="/bts-xuan-he">
                Xem tất cả
              </Link>
            </SwiperSlide>
          </Swiper>
        </>
      </div>
      <div className="more">Xem tất cả 108 sản phẩm</div>
    </section>
  );
};

export default SectionProduct;
