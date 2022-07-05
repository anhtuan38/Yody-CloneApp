import React, { useState } from "react";
import Product from "../../../components/Product";

import { Row, Col } from "antd";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct } from "../../../redux/actions";

const title = [
  "cafe",
  "mắt chim",
  "coolmax",
  "airy cool",
  "vỏ hàu",
  "cool compact",
  "airmax",
  "askin",
];

const Content = () => {
  const [active, setActive] = useState(title[0]);
  const dispatch = useDispatch();

  const { products, filter } = useSelector((state) => state.productReducer);
  console.log(products);
  return (
    <>
      <div className="header-content">
        <div className="content-title">
          <h2>POLO YODY - THOẢI MÁI, TỰ TIN MỌI LÚC MỌI NƠI</h2>
        </div>
        <ul className="list-title">
          {title.map((item) => {
            return (
              <li
                key={item}
                onClick={() => setActive(item)}
                className={
                  active === item
                    ? "list-title-item item-active"
                    : "list-title-item"
                }
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <Row gutter={16}>
        {products.map((item) => {
          return (
            <Col key={item.id} xs={24} sm={12} md={6} lg={4}>
              <Product item={item} />
            </Col>
          );
        })}
      </Row>
      <div
        className="more"
        onClick={() => {
          dispatch(filterProduct({ ...filter, _limit: filter._limit + 6 }));
        }}
      >
        Xem thêm
      </div>
    </>
  );
};

export default Content;
