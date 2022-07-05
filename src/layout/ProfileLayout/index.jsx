import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/user.action";

import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../../components/SideBar";
import "./style.scss";

import IconUser from "../../assets/Icon/acc_user_1.svg";
import IconUserActive from "../../assets/Icon/acc_user_1_hover.svg";
import IconAddress from "../../assets/Icon/acc_user_2.svg";
import IconAddressActive from "../../assets/Icon/acc_user_2_hover.svg";
import IconPassword from "../../assets/Icon/acc_user_3.svg";
import IconPasswordActive from "../../assets/Icon/acc_user_3_hover.svg";
import IconLove from "../../assets/Icon/acc_user_6.svg";
import IconLoveActive from "../../assets/Icon/acc_user_6_hover.svg";

const list = [
  {
    icon: IconUser,
    iconActive: IconUserActive,
    title: "Tài khoản của tôi",
    link: "/my-profile",
  },
  {
    icon: IconUser,
    iconActive: IconUserActive,
    title: "Địa chỉ của tôi",
    link: "/my-address",
  },
  {
    icon: IconAddress,
    iconActive: IconAddressActive,
    title: "Đơn hàng của tôi",
    link: "/my-order",
  },
  {
    icon: IconPassword,
    iconActive: IconPasswordActive,
    title: "Đổi mật khẩu",
    link: "/change-password",
  },
  {
    icon: IconLove,
    iconActive: IconLoveActive,
    title: "Sản phẩm yêu thích",
    header_title: "Yêu thích",
    link: "/favorite-product",
  },
];

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);
  useEffect(() => {
    !token && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <Header />
      <div className="header-like-content">
        <div className="top-header-like">
          <Link to="/" className="home">
            Trang chủ
          </Link>
          <span className="separation">/</span>
          <span className="text-like">Tài khoản của tôi</span>
          <h2 className="title-header">Tài khoản</h2>
        </div>
        <div className="container">
          <Row gutter={32}>
            <Col span={6}>
              <SideBar list={list} />
            </Col>
            <Col span={18}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileLayout;
