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
        <Col span={10}>Th??nh ph???/ T???nh:</Col>
        <Col span={14}>{userInfo.location.city.name}</Col>
        <Col span={10}>Qu???n/ Huy???n:</Col>
        <Col span={14}>{userInfo.location.district.name}</Col>
        <Col span={10}>Ph?????ng/ X??:</Col>
        <Col span={14}>{userInfo.location.ward.name}</Col>
        <Col span={10}>?????a ch??? c??? th???:</Col>
        <Col span={14}>{userInfo.location.address}</Col>
        <Link to="/my-address">
          <Button type="primary">Ch???nh s???a ?????a ch???</Button>
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
            label="T???nh/Th??nh ph???"
            name="city"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n T???nh/Th??nh ph??? c???a b???n",
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
            label="Qu???n/Huy???n"
            name="district"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n Qu???n/Huy???n c???a b???n",
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
            label="Ph?????ng/X??"
            name="ward"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n Ph?????ng/X?? c???a b???n",
              },
            ]}
          >
            <Select allowClear>{renderWardOptions()}</Select>
          </Form.Item>
        )}

        <Form.Item
          label="?????a ch??? c??? th???"
          name="address"
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p ?????a ch??? c??? th??? c???a b???n!",
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
            <h3>Th??ng tin giao h??ng</h3>
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
                label="T??n"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t??n",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="S??? ??i???n tho???i"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p s??? ??i??n tho???i",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              {userInfo.location ? renderLocation() : renderOptionLocation()}
            </Form>
          </Col>
          <Col span={8}>
            <h3>Thanh To??n</h3>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            >
              <Space direction="vertical">{renderChecklist()}</Space>
            </Radio.Group>
          </Col>
          <Col span={8}>
            <h3>????n h??ng &#x276A;{cart.length} s???n ph???m&#x276B;</h3>
            {cart.length > 0 && renderProduct()}
            <Row gutter={32} justify="space-between" className="border-bottom">
              <Col span={18}>
                <Input placeholder="Nh???p m?? gi???m gi??" defaultValue={null} />
              </Col>
              <Col span={6}>
                <Button type="primary">??p d???ng</Button>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <p>T???m t??nh</p>
              </Col>
              <Col>
                <p>{formatNumber(total)}</p>
              </Col>
              <Col span={24} className="border-bottom">
                <p>Ph?? v???n chuy???n</p>
              </Col>
            </Row>
            <Row justify="space-between" className="border-bottom">
              <Col>
                <h3>T???ng c???ng</h3>
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
                    Quay v??? gi??? h??ng
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button form="my-form" htmlType="submit">
                  ?????t h??ng
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
