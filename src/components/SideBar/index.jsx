import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IconUser from "../../assets/Avatar/account_ava.webp";
import { Button } from "antd";

import "./style.scss";
import { logoutAction } from "../../redux/actions";

const SideBar = ({ list }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <div className="block-like-account">
      <div className="info">
        <img src={IconUser} alt="" />
        {userInfo ? (
          <>
            <div className="account">
              <p className="user">{userInfo.surname + " " + userInfo.name}</p>
            </div>
            <Button className="goto-user" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <div className="account">
              <Link to="/login" className="user">
                Đăng nhập
              </Link>
              <span className="separation">/</span>
              <Link to="/register" className="user">
                Đăng ký
              </Link>
            </div>
            <Link to="/login" className="goto-user">
              Trải nghiệm ngay bây giờ
            </Link>
          </>
        )}
      </div>

      <ul>
        {list.map((item, index) => {
          return (
            <li
              className={item.link === location.pathname ? "active" : ""}
              key={index}
            >
              <Link to={item.link}>
                <img
                  src={
                    item.link === location.pathname
                      ? item.iconActive
                      : item.icon
                  }
                  alt=""
                />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
