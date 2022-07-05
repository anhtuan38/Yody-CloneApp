import React from 'react';

import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import no_like from '../../../assets/Avatar/no-heart.webp';

import '../style.scss';

function MyFavorite() {
  return (
    <div className="container-profile">
      <Row justify="space-between">
        <Col className="title">Sản phẩm yêu thích</Col>
        <Col>1 sản phẩm</Col>
      </Row>
      <Row className="profile-content">
        <Col span={24}>
          <div className="body-content">
            <img src={no_like} alt="" />
            <span>Danh sách yêu thích của bạn trống</span>
            <Link className="buy-now" to="#">
              Mua sắm ngay bây giờ
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MyFavorite;
