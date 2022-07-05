import React, { useEffect, useState } from "react";
import { Table, Tag, Row, Col, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../../../redux/actions";

function UserManagement() {
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const handleAccount = ({ id, type }) => {
    if (type === "block")
      dispatch(
        changeUserInfo({
          userID: id,
          status: "block",
        })
      );
    if (type === "unblock")
      dispatch(
        changeUserInfo({
          userID: id,
          status: "active",
        })
      );
    notification.success({
      message: `${type} thành công!`,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render(index) {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SurName",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, { location }) => {
        return location ? (
          <Row>
            <Col span={24}>{location.address}</Col>
            <Col span={24}>{location.ward.name}</Col>
            <Col span={24}>{location.district.name}</Col>
            <Col span={24}>{location.city.name}</Col>
          </Row>
        ) : (
          <span>Chưa cập nhật địa chỉ</span>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        const color = status === "active" ? "success" : "error";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, { id, status }) => {
        return status === "block" ? (
          <Button
            type="link"
            onClick={() => handleAccount({ id, type: "unblock" })}
          >
            UnBlock
          </Button>
        ) : (
          <Button
            type="link"
            danger
            onClick={() => handleAccount({ id, type: "block" })}
          >
            Block
          </Button>
        );
      },
    },
  ];

  const dataSource = () => {
    return users.map((item, index) => {
      return {
        key: index,
        ...item,
      };
    });
  };

  return <Table columns={columns} dataSource={dataSource()} />;
}

export default UserManagement;
