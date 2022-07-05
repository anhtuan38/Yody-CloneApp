import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

import Slider from "./Slider";
import Service from "./Service";
import SectionProduct from "./SectionProduct";
import SectionBanner from "./SectionBanner";
import Content from "./Content";
import SectionBlog from "./SectionBlog";

import "./style.scss";
import { filterProduct } from "../../redux/actions";

function Home() {
  const { loading } = useSelector((state) => state.productReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterProduct({ _page: 1, _limit: 12 }));
  }, []);
  return (
    <div className="container">
      {loading ? (
        <div className="spin">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Slider />
          <Service />
          <SectionProduct />
          <SectionBanner />
          <Content />
          <SectionBlog />
        </>
      )}
    </div>
  );
}

export default Home;
