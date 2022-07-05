import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Table,
  Button,
  Col,
  Row,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
} from "antd";
import { formatNumber } from "../../../helper";

import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAll } from "../../../redux/actions/product.action";
import { API_PATH } from "../../../Service/constants";

export const colors = [
  {
    color: "Xanh navy",
    colorCode: "#03204C",
  },
  {
    color: "Đen",
    colorCode: "#000000",
  },
  {
    color: "Xanh lá",
    colorCode: "#62BF5E",
  },
  {
    color: "Nâu",
    colorCode: "#613B0D",
  },
  {
    color: "Mint",
    colorCode: "#8CD6C4",
  },
  {
    color: "Xám",
    colorCode: "#C1C5C0",
  },
  {
    color: "Đỏ ",
    colorCode: "#F10008",
  },
  {
    color: "Xanh",
    colorCode: "#6BBBDD",
  },
  {
    color: "Tím than",
    colorCode: "#321B3B",
  },
  {
    color: "Vàng",
    colorCode: "#EFE159",
  },
  {
    color: "Trắng",
    colorCode: "#FFFFFF",
  },
  {
    color: "Hồng",
    colorCode: "#DC85AC",
  },
  {
    color: "Be",
    colorCode: "#E3CCB5",
  },
  {
    color: "Cam",
    colorCode: "#F19F00",
  },
  {
    color: "Tím ",
    colorCode: "#C48FE2",
  },
  {
    color: "Xanh cổ vịt",
    colorCode: "#00867D",
  },
];

export const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];

function ProductManagement() {
  const { products, pagination } = useSelector((state) => state.productReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createProductForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [styles, setStyles] = useState([]);

  const [checkedList, setCheckedList] = useState({
    color: [],
    size: [],
  });

  useEffect(() => {
    axios.get(`${API_PATH}/styles`).then(({ data }) => setStyles(data));
    dispatch(getAll());
  }, []);

  const handleSubmitForm = (values) => {
    // console.log(values);
  };

  const columns = [
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
      render: (_, { colorsName, sizes }) => {
        return (
          <>
            <div>Màu: {colorsName.join("-")}</div>
            <div>Size: {sizes.join("-")}</div>
          </>
        );
      },
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (_, { price }) => (
        <span className="price-product">{formatNumber(price)}</span>
      ),
    },
    {
      align: "center",
      title: "Action",
      key: "action",
      render: (_, { id }) => (
        <>
          <Button type="link" onClick={() => setIsModalVisible(true)}>
            Chỉnh sửa
          </Button>
          <Button danger type="link" onClick={() => handleDeleteProduct(id)}>
            <i
              className="fa-solid fa-trash-can"
              style={{ marginRight: "5px" }}
            ></i>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  const onChange = (list, type) => {
    if (type === "color") setCheckedList(...checkedList.size, list);
    if (type === "size") setCheckedList(...checkedList.color, list);
  };

  const renderColorCheckbox = (items) => {
    return (
      <Checkbox.Group>
        <Row gutter={[0, 8]}>
          {items.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <Checkbox value={item.colorCode}>
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

  const dataSource = () => {
    return products.map((item, index) => {
      return {
        key: index,
        ...item,
      };
    });
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
  const handleDeleteProduct = (id) => {
    const indexProductDelete = products.findIndex((item) => item.id === id);
    Modal.confirm({
      title: "Xoá sản phẩm!",
      content: `Xoá vĩnh viễn sản phẩm ${products[indexProductDelete].name}. Thao tác này sẽ không khôi phục lại được!`,
      okButtonProps: { danger: true },
      okText: "Xoá vĩnh viễn",
      onOk() {
        dispatch(deleteProduct(id));
      },
    });
  };

  return (
    <>
      <Table
        bordered
        columns={columns}
        title={() => (
          <Row justify="space-between">
            <Col>Bảng sản phẩm</Col>
            <Col>
              <Button
                type="primary"
                onClick={() => navigate("/admin/product-management/create")}
              >
                Thêm sản phẩm mới
              </Button>
            </Col>
          </Row>
        )}
        pagination={{
          position: ["bottomRight"],
          pageSize: 4,
          onClick: (value) => console.log(value),
        }}
        dataSource={dataSource()}
      />
      <Modal
        title="Chỉnh sửa sản phẩm "
        visible={isModalVisible}
        onOk={() => {
          createProductForm.submit();
          setIsModalVisible(false);
        }}
        onCancel={() => {
          setIsModalVisible(false);
          createProductForm.resetFields();
        }}
      >
        <Form
          name="editProduct"
          form={createProductForm}
          onFinish={(values) => handleSubmitForm(values)}
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
          <Form.Item label="Category" name="category">
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
            name="colors"
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
        </Form>
      </Modal>
    </>
  );
}

export default ProductManagement;
