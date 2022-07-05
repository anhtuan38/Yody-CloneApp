import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Table, Space, Button, Col, Row, Modal } from "antd";
import { formatNumber, openNotificationWithIcon } from "../../helper";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAmountProduct,
  removeFromCart,
} from "../../redux/actions/cart.action";

function Cart() {
  const { cart } = useSelector((state) => state.cartReducer);
  const { userInfo, token } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  let totalMoney = 0;

  const handleCalculateTotalMoney = () =>
    cart.reduce(
      (previousValue, item) => previousValue + item.amount * item.price,
      totalMoney
    );

  const dataSource = () =>
    cart.map((item, index) => ({
      ...item,
      key: index,
      total: item.amount * item.price,
    }));

  const handleChangeAmount = ({ id, type }) => {
    dispatch(changeAmountProduct({ id, type }));
  };

  const handleRemoveCart = ({ id }) => {
    Modal.confirm({
      visible: visible,
      title: "Xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Xác nhận xóa sản phẩm ra khỏi giỏ hàng",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        dispatch(removeFromCart({ id }));
        setVisible(false);
      },
    });
  };

  const columns = [
    {
      key: "key",
      title: "STT",
      align: "center",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (_, { image }) => (
        <div className="product-img">
          <img src={image} alt="product" />
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "color",
      key: "color",
      align: "center",
      render: (_, { colorName, size }) => (
        <>
          <div>Màu: {colorName}</div>
          <div>Size: {size}</div>
        </>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_, { price }) => (
        <span className="price-product">{formatNumber(price)}</span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (_, { amount, id }) => {
        return (
          <>
            <Button onClick={() => handleChangeAmount({ id: id, type: "sub" })}>
              -
            </Button>
            <span style={{ margin: "0 0.5rem" }}>{amount}</span>
            <Button onClick={() => handleChangeAmount({ id: id, type: "add" })}>
              +
            </Button>
          </>
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (_, { price, amount }) => (
        <span className="price-product">{formatNumber(price * amount)}</span>
      ),
    },
    {
      align: "center",
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <Button danger type="link" onClick={() => handleRemoveCart({ id })}>
          <i
            className="fa-solid fa-trash-can"
            style={{ marginRight: "5px" }}
          ></i>
          Xoá
        </Button>
      ),
    },
  ];

  const handleCheckOut = () => {
    if (token !== "") {
      navigate("/checkout");
    } else {
      openNotificationWithIcon({
        type: "error",
        message: "Bạn phải đăng nhập trước!",
      });
      navigate("/login");
    }
  };
  return (
    <div className="header-like-content">
      <div className="top-header-like">
        <Link to="/" className="home">
          Trang chủ
        </Link>
        <span className="separation">/</span>
        <span className="text-like">Giỏ Hàng</span>
        <h2 className="title-header">Giỏ Hàng</h2>
      </div>
      <div className="container cart-container">
        <Row gutter={32}>
          <Col span={18} className="table-cart">
            <Table
              columns={columns}
              dataSource={dataSource()}
              pagination={false}
            />
          </Col>
          <Col span={6}>
            <Row justify="space-between" style={{ marginTop: "1rem" }}>
              <div>Tổng cộng</div>
              <div className="price-product">
                {formatNumber(handleCalculateTotalMoney())}
              </div>
              <Button className="buy-now button" onClick={handleCheckOut}>
                Thanh toán
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Cart;
