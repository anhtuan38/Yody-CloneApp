import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Col, Row, Form, Input, Checkbox, Select, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { API_PATH } from "../../../Service/constants";

import { colors, sizes } from "../ProductManagement";
import { createProduct } from "../../../redux/actions/product.action";

function CreateProduct() {
  const { products, pagination } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [styles, setStyles] = useState([]);

  const [checkedList, setCheckedList] = useState({
    color: [],
    size: [],
  });

  useEffect(() => {
    axios.get(`${API_PATH}/styles`).then(({ data }) => setStyles(data));
  }, []);

  const submitForm = (values) => {
    dispatch(createProduct(values));
    navigate("/admin/product-management");
  };

  const renderColorCheckbox = (items) => {
    return (
      <Checkbox.Group>
        <Row gutter={[0, 8]}>
          {items.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <Checkbox value={item.color}>
                  <i
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      marginRight: 5,
                      backgroundColor: `${item.colorCode}`,
                    }}
                  ></i>
                  {item.color}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    );
  };

  const renderSizeCheckbox = (items) => {
    return (
      <Checkbox.Group>
        <Row gutter={[0, 8]}>
          {items.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <Checkbox value={item}>{item}</Checkbox>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    );
  };
  const renderOptionCategory = (styles) => {
    return (
      <Select>
        {styles.map((item, index) => (
          <Select.Option value={item} key={index}>
            {item}
          </Select.Option>
        ))}
      </Select>
    );
  };

  return (
    <>
      <h2>Tạo sản phẩm mới</h2>
      <Form
        name="createProduct"
        onFinish={(values) => submitForm(values)}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="image"
          rules={[
            {
              required: true,
              message: "Requied!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: "Requied!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input your category!",
            },
          ]}
        >
          {styles.length > 0 && renderOptionCategory(styles)}
        </Form.Item>
        <Form.Item
          label="Giá bán"
          name="price"
          rules={[
            {
              required: true,
              message: "Requied!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Color"
          name="colorsName"
          rules={[
            {
              required: true,
              message: "Please select color!",
            },
          ]}
        >
          {renderColorCheckbox(colors)}
        </Form.Item>

        <Form.Item
          name="sizes"
          label="Size"
          rules={[
            {
              required: true,
              message: "Please select size!",
            },
          ]}
        >
          {renderSizeCheckbox(sizes)}
        </Form.Item>
        <Space size="large">
          <Link to="/admin/product-management">
            <Button>Quay lại</Button>
          </Link>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Space>
      </Form>
    </>
  );
}

export default CreateProduct;
