import React, { useEffect } from "react";

import { Button, Row, Col, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  getOrderFromServer,
} from "../../../redux/actions/cart.action";
import { formatNumber } from "../../../helper";

import "./style.scss";

const MyOrder = () => {
  const { ordered } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleCancel = (id) => {
    dispatch(cancelOrder({ id, status: "cancel", userID: userInfo.id }));
  };

  return (
    <div className="container-profile">
      <Row justify="space-between">
        <Col className="title">Đơn hàng của tôi</Col>
        <Col>
          <p>{ordered.length} đơn hàng</p>
        </Col>
      </Row>
      <div className="profile-content">
        <Row
          className="border-bottom"
          align="middle"
          justify="space-between"
          style={{ fontWeight: "bold" }}
        >
          <Col span={1}>STT</Col>
          <Col span={15}>
            <Row gutter={[32, 32]} align="middle">
              <Col span={3}>Hình ảnh</Col>
              <Col span={14}>Tên Sản Phẩm</Col>
              <Col span={4}>Kích cỡ / Màu sắc</Col>
              <Col span={3}>Số lượng</Col>
            </Row>
          </Col>
          <Col span={2}>Tổng tiền</Col>
          <Col span={2}>Status</Col>
          <Col span={2}>Action</Col>
        </Row>
        {ordered.length > 0 ? (
          ordered.map(({ status, cart, total, id }, index) => {
            return (
              <Row
                className="border-bottom"
                key={index}
                align="middle"
                justify="space-between"
              >
                <Col span={1}>{index + 1}</Col>
                <Col span={15}>
                  {cart.map((item, index) => {
                    return (
                      <Row gutter={[32, 32]} key={index} align="middle">
                        <Col span={3}>
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={item.image}
                            alt={item.name}
                          />
                        </Col>
                        <Col span={14}>{item.name}</Col>
                        <Col span={4}>{`${item.size} / ${item.colorName}`}</Col>
                        <Col span={3}>{item.amount}</Col>
                      </Row>
                    );
                  })}
                </Col>
                <Col span={2} className="price">
                  {formatNumber(total)}
                </Col>
                <Col span={2}>
                  {status === "pending" ? (
                    <Tag color="warning">{status.toUpperCase()}</Tag>
                  ) : (
                    <Tag color="red">{status.toUpperCase()}</Tag>
                  )}
                </Col>
                <Col span={2}>
                  {status === "pending" ? (
                    <Button onClick={() => handleCancel(id)} type="link" danger>
                      Hủy đơn
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            );
          })
        ) : (
          <span>Bạn chưa mua đơn hàng nào cả </span>
        )}
      </div>
    </div>
  );
};
export default MyOrder;
