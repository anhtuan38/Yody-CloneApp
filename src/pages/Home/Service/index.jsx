import React from "react";
import { Row, Col } from "antd";

import service_1 from "../../../assets/Avatar/ser_1.webp";
import service_2 from "../../../assets/Avatar/ser_2.webp";
import service_3 from "../../../assets/Avatar/ser_3.webp";
import service_4 from "../../../assets/Avatar/ser_4.webp";

import "./style.scss";

const services = [
  {
    img: service_1,
    title: "Miễn phí giao hàng",
    subtitle: "FREESHIP mọi đơn từ ",
    subtitlelight: ">498k",
  },
  {
    img: service_2,
    title: "Thanh toán COD",
    subtitle: "Thanh toán khi",
    subtitlelight: " nhận hàng (COD)",
  },
  {
    img: service_3,
    title: "Khách hàng VIP",
    subtitle: "Ưu đãi cho",
    subtitlelight: " khách hàng VIP",
  },
  {
    img: service_4,
    title: "Hỗ trợ bảo hành",
    subtitle: "đồ tại tất cả YODY store",
    subtitlelight_left: "Đổi sửa ",
  },
];
const Service = () => {
  return (
    <div className="service">
      <Row gutter={[32, 32]}>
        {services.map((service, index) => {
          return (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Row>
                <img src={service.img} alt="photos" />
                <div className="description">
                  <div className="description-title">{service.title}</div>
                  <div className="description-sub-title">
                    <span className="description-sub-title-light">
                      {service.subtitlelight_left}
                    </span>
                    {service.subtitle}
                    <span className="description-sub-title-light">
                      {service.subtitlelight}
                    </span>
                  </div>
                </div>
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Service;
