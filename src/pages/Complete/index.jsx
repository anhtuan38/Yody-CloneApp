import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.scss";
import { Row, Col, Card, Button } from "antd";

function Complete() {
  const { userInfo, fullName } = useSelector((state) => state.userReducer);

  useEffect(() => {}, []);

  return (
    <div className="container container-complete">
      <Row gutter={32}>
        <Col>
          <CheckCircleOutlined className="check-icon" />
        </Col>
        <Col>
          <h2>Cảm ơn bạn đã đặt hàng</h2>
          <p>Một email xác nhận đã gửi tới {userInfo.email}</p>
          <p>Xin vui lòng kiểm tra email của bạn</p>
        </Col>
        <Card style={{ width: "100%" }}>
          <Row gutter={32}>
            <Col span={12}>
              <h2>Thông tin mua hàng</h2>
              <p>{`${userInfo.surname} ${userInfo.name}`}</p>
              <p>{userInfo.email}</p>
              <p>{userInfo.phone}</p>
            </Col>
            <Col span={12}>
              <h2>Địa chỉ nhận hàng</h2>
              <p>{`${userInfo.surname} ${userInfo.name}`}</p>
              <p>Địa chỉ:</p>
              <Col>{userInfo.location.address}</Col>
              <Col>{userInfo.location.ward.name}</Col>
              <Col>{userInfo.location.district.name}</Col>
              <Col>{userInfo.location.city.name}</Col>
              <p>SDT: {userInfo.phone}</p>
            </Col>
            <Col span={12}>
              <h2>Phương thức thanh toán</h2>
              <p>{userInfo.paymentMethod}</p>
            </Col>
            <Col span={12}>
              <h2>Phương thức vận chuyển</h2>
              <p>Miễn phí vận chuyển</p>
            </Col>
          </Row>
        </Card>
        <Col>
          <Link to="/">
            <Button type="primary">Tiếp tục mua hàng</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/my-order">
            <Button>Xem lịch sử mua hàng</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Complete;
