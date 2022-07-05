import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { loginAction } from "../../redux/actions";

import "./style.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);

  useEffect(() => {
    token.length && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (data) => {
    dispatch(
      loginAction({
        data,
        callback: (page) => navigate(page),
      })
    );
  };

  return (
    <div className="login-content">
      <div className="form-login-register">
        <h2 className="header">ĐĂNG NHẬP</h2>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <p className="forgot">
            <Link to="#">Quên mật khẩu?</Link>
            <Link to="/register">Đăng ký</Link>
          </p>
          <Form.Item>
            <Button htmlType="submit" className="btn-login">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="social-login-register">
          <p>--- Hoặc ---</p>
          <a href="#!">
            <img
              src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"
              alt="social"
            />
          </a>
          <a href="#!">
            <img
              src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"
              alt="social"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
