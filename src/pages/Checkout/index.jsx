import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Space,
  Col,
  Row,
  Form,
  Radio,
  Input,
  Select,
  Button,
  Badge,
  Spin,
  notification,
} from "antd";
import { formatNumber } from "../../helper";
import { urlImgs } from "./data.checkout";
import Image from "../../assets/product.webp";

import "./style.scss";
import {
  getCities,
  getDistricts,
  getWards,
  changeUserInfo,
  pushCartToServer,
} from "../../redux/actions/";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.locationReducer
  );
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState(urlImgs[0].title);

  const renderChecklist = () => {
    return urlImgs.map((item) => (
      <Radio value={item.title} key={item.id}>
        <Col>
          <Row span={24}>
            <img src={item.url} alt="icon" style={{ marginRight: "10px" }} />
            <h4>{item.title}</h4>
          </Row>
          <Row>
            <p>{item.description}</p>
          </Row>
        </Col>
      </Radio>
    ));
  };

  useEffect(() => {
    form.resetFields();
    dispatch(getCities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const renderCityOptions = () => {
    return cityList.data.map((cityItem) => {
      return (
        <Select.Option key={cityItem.id} value={cityItem.code}>
          {cityItem.name}
        </Select.Option>
      );
    });
  };

  const renderDistrictOptions = () => {
    return districtList.data.map((districtItem) => {
      return (
        <Select.Option key={districtItem.id} value={districtItem.code}>
          {districtItem.name}
        </Select.Option>
      );
    });
  };

  const renderWardOptions = () => {
    return wardList.data.map((wardItem) => {
      return (
        <Select.Option key={wardItem.id} value={wardItem.code}>
          {wardItem.name}
        </Select.Option>
      );
    });
  };

  const submitForm = ({ city, district, ward, address }) => {
    dispatch(
      pushCartToServer({
        userInfo,
        total,
        cart,
        callback: () => navigate("/complete"),
      })
    );

    if (!userInfo.location) {
      const cityName = cityList.data.find(
        (cityItem) => cityItem.code === city
      ).name;

      const districtName = districtList.data.find(
        (districtItem) => districtItem.code === district
      ).name;

      const wardName = wardList.data.find(
        (wardItem) => wardItem.code === ward
      ).name;

      const location = {
        city: {
          code: city,
          name: cityName,
        },
        district: {
          code: district,
          name: districtName,
        },
        ward: {
          code: ward,
          name: wardName,
        },
        address,
      };

      dispatch(
        changeUserInfo({
          userID: userInfo.id,
          paymentMethod,
          location,
        })
      );
    }
  };

  let total = 0;
  const renderProduct = () => {
    return cart.map((item, index) => {
      total += item.amount * item.price;
      return (
        <Row gutter={16} align="middle" key={index}>
          <Col span={3}>
            <Badge count={item.amount}>
              <img src={item.image} style={{ width: "100%" }} alt="product" />
            </Badge>
          </Col>
          <Col span={14}>
            <Row>
              <Col>{item.name}</Col>
              <Col className="text-secondary">{`${item.colorName} / ${item.size}`}</Col>
            </Row>
          </Col>
          <Col span={7}>{formatNumber(item.price * item.amount)}</Col>
        </Row>
      );
    });
  };

  const renderLocation = () => {
    return (
      <Row gutter={[16, 16]}>
        <Col span={10}>Thành phố/ Tỉnh:</Col>
        <Col span={14}>{userInfo.location.city.name}</Col>
        <Col span={10}>Quận/ Huyện:</Col>
        <Col span={14}>{userInfo.location.district.name}</Col>
        <Col span={10}>Phường/ Xã:</Col>
        <Col span={14}>{userInfo.location.ward.name}</Col>
        <Col span={10}>Địa chỉ cụ thể:</Col>
        <Col span={14}>{userInfo.location.address}</Col>
        <Link to="/my-address">
          <Button type="primary">Chỉnh sửa địa chỉ</Button>
        </Link>
      </Row>
    );
  };

  const renderOptionLocation = () => {
    return (
      <>
        {cityList.loading ? (
          <Spin />
        ) : (
          <Form.Item
            label="Tỉnh/Thành phố"
            name="city"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn Tỉnh/Thành phố của bạn",
              },
            ]}
          >
            <Select
              allowClear
              onChange={(value) => {
                dispatch(getDistricts({ cityCode: value }));
                form.setFieldsValue({ district: undefined });
                form.setFieldsValue({ ward: undefined });
              }}
            >
              {renderCityOptions()}
            </Select>
          </Form.Item>
        )}

        {districtList.loading ? (
          <Spin />
        ) : (
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn Quận/Huyện của bạn",
              },
            ]}
          >
            <Select
              allowClear
              onChange={(value) => {
                dispatch(getWards({ districtCode: value }));
                form.setFieldsValue({ ward: undefined });
              }}
            >
              {renderDistrictOptions()}
            </Select>
          </Form.Item>
        )}
        {wardList.loading ? (
          <Spin />
        ) : (
          <Form.Item
            label="Phường/Xã"
            name="ward"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn Phường/Xã của bạn",
              },
            ]}
          >
            <Select allowClear>{renderWardOptions()}</Select>
          </Form.Item>
        )}

        <Form.Item
          label="Địa chỉ cụ thể"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ cụ thể của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  return (
    <>
      <div className="container cart-container">
        <Row gutter={32}>
          <Col span={8}>
            <h3>Thông tin giao hàng</h3>
            <Form
              name="my-form"
              layout="vertical"
              form={form}
              initialValues={{
                name: userInfo.name,
                phone: userInfo.phone,
              }}
              onFinish={submitForm}
            >
              <Form.Item
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
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
                    message: "Vui lòng nhập số điên thoại",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {userInfo.location ? renderLocation() : renderOptionLocation()}
            </Form>
          </Col>
          <Col span={8}>
            <h3>Thanh Toán</h3>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            >
              <Space direction="vertical">{renderChecklist()}</Space>
            </Radio.Group>
          </Col>
          <Col span={8}>
            <h3>Đơn hàng &#x276A;{cart.length} sản phẩm&#x276B;</h3>
            {cart.length > 0 && renderProduct()}
            <Row gutter={32} justify="space-between" className="border-bottom">
              <Col span={18}>
                <Input placeholder="Nhập mã giảm giá" defaultValue={null} />
              </Col>
              <Col span={6}>
                <Button type="primary">Áp dụng</Button>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <p>Tạm tính</p>
              </Col>
              <Col>
                <p>{formatNumber(total)}</p>
              </Col>
              <Col span={24} className="border-bottom">
                <p>Phí vận chuyển</p>
              </Col>
            </Row>
            <Row justify="space-between" className="border-bottom">
              <Col>
                <h3>Tổng cộng</h3>
              </Col>
              <Col>
                <p className="price-product">{formatNumber(total)}</p>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Link to="/cart">
                  <Button type="link">
                    <i className="fa-solid fa-chevron-left"></i>
                    Quay về giỏ hàng
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button form="my-form" htmlType="submit">
                  Đặt hàng
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Cart;
