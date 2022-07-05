import React from "react";
import "./style.scss";

import ImgBanner from "../../../assets/bannertop.webp";

const TopBar = () => {
  return (
    <section className="topbar">
      <div className="banner">
        <img src={ImgBanner} alt="imageBaner" />
      </div>
    </section>
  );
};

export default TopBar;
