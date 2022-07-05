import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  Space,
  notification,
} from "antd";

import "../style.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../../../redux/actions";
import { PHONE_REGEX_VALIDATION } from "../../../constant";

function MyProfile() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const renderUserInfo = () => (
    <Space direction="vertical" size="large">
      <Row gutter={[16, 16]} justify="start">
        <Col span={8}>
          <label>Họ và tên:</label>
        </Col>
        <Col span={16}>{`${userInfo.surname} ${userInfo.name}`}</Col>
        <Col span={8}>
          <label>Email:</label>
        </Col>
        <Col span={16}>{userInfo.email}</Col>
        <Col span={8}>
          <label>Số điện thoại:</label>
        </Col>
        <Col span={16}>{userInfo.phone}</Col>
      </Row>
      <Button type="primary" size="large" onClick={() => setIsEdit(true)}>
        Sửa
      </Button>
    </Space>
  );

  const renderEditUserInfo = () => (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      labelAlign="left"
      initialValues={{
        name: userInfo.name,
        email: userInfo.email,
        surname: userInfo.surname,
        phone: userInfo.phone,
      }}
      onFinish={(data) => handleChangeUserInfo(data)}
      autoComplete="off"
    >
      <Form.Item
        label="Họ"
        name="surname"
        rules={[
          {
            min: 2,
            message: "Tên quá ngắn",
          },
          {
            max: 20,
            message: "Tên quá dài",
          },
          {
            required: true,
            message: "Vui lòng nhập trường này!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="name"
        rules={[
          {
            min: 2,
            message: "Tên quá ngắn",
          },
          {
            max: 20,
            message: "Tên quá dài",
          },
          {
            required: true,
            message: "Vui lòng nhập trường này!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Số Điện Thoại!",
          },
          {
            pattern: new RegExp(PHONE_REGEX_VALIDATION),
            message: "Số điện thoại không hợp lệ",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button htmlType="submit" type="primary">
          Thay đổi
        </Button>
        <Button
          htmlType="button"
          style={{ margin: "0 8px" }}
          onClick={() => setIsEdit(false)}
        >
          Hủy bỏ
        </Button>
      </Form.Item>
    </Form>
  );

  const handleChangeUserInfo = ({ surname, name, email, phone }) => {
    dispatch(
      changeUserInfo({
        userID: userInfo.id,
        surname,
        name,
        email,
        phone,
      })
    );
    notification.success({
      message: "Thay đổi thành công",
      description: "Thông tin của bạn đã được thay đổi",
    });

    setIsEdit(false);
  };

  return (
    <div className="container-profile">
      <Row justify="space-between">
        <Col className="title">Thông tin cá nhân</Col>
      </Row>
      <div className="profile-content">
        <Row justify="start">
          <Col span={24}>
            {isEdit ? renderEditUserInfo() : renderUserInfo()}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MyProfile;
