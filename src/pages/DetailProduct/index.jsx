import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import CommentAndRating from "./CommentAndRating";

import {
  Radio,
  Spin,
  Button,
  Row,
  Col,
  Breadcrumb,
  Rate,
  Form,
  InputNumber,
  Input,
  Card,
} from "antd";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { formatNumber, openNotificationWithIcon } from "../../helper";

import { getProductDetail } from "../../redux/actions/product.action";
import { addToCart } from "../../redux/actions/cart.action";
import "./style.scss";
import { getCommentListAction, sendCommentAction } from "../../redux/actions";

function DetailProduct() {
  const { productDetails, loading } = useSelector(
    (state) => state.productReducer
  );
  const { userInfo } = useSelector((state) => state.userReducer);
  const { commentList } = useSelector((state) => state.commentReducer);
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState(0);
  const [formComment] = Form.useForm();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll({ left: 0, top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getProductDetail({ id }));
    dispatch(getCommentListAction({ productID: parseInt(id) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitForm = (values) => {
    openNotificationWithIcon({
      type: "success",
      message: "Thêm vào giỏ hàng thành công",
      description: `Sản phẩm ${productDetails.name} đã được thêm vào giỏ hàng`,
    });

    dispatch(
      addToCart({
        id: uuidv4(),
        productID: parseInt(id),
        name: productDetails.name,
        image: productDetails.images[productDetails.colors[values.color]],
        price: productDetails.price,
        amount: values.amount,
        size: productDetails.sizes[values.size],
        colorName: productDetails.colorsName[values.color],
      })
    );
  };

  const renderColor = ({ images }) => {
    return (
      <Radio.Group
        className="radio-custom option-view"
        value={imageIndex}
        onChange={(e) => setImageIndex(e.target.value)}
      >
        {Object.values(images).map((value, index) => {
          return (
            <Radio value={index} key={index} className="view-color">
              <img alt="radio" src={value} />
            </Radio>
          );
        })}
      </Radio.Group>
    );
  };

  const getListImages = ({ images }) => {
    return Object.entries(images).map(([_, value]) => {
      return {
        original: value,
        thumbnail: value,
      };
    });
  };

  const renderSizes = ({ sizes }) => {
    return (
      <Radio.Group
        className="option-view"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        {sizes.map((item, index) => {
          return (
            <Radio key={index} value={index} checked={index === 0}>
              {item}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  };

  const handleSendComentAndRating = (comment) => {
    if (userInfo.id) {
      dispatch(
        sendCommentAction({
          comment,
          productID: parseInt(id),
          email: userInfo.email,
        })
      );
      formComment.resetFields();
    } else {
      openNotificationWithIcon({
        type: "error",
        message: "Bạn phải đăng nhập mới sử dụng được tính năng này",
      });
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="spin">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="description-sub-title-light">
                {productDetails?.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row gutter={32}>
            <Col lg={12}>
              <ImageGallery
                items={
                  (productDetails.images && getListImages(productDetails)) || []
                }
                showFullscreenButton={false}
                thumbnailPosition="left"
                showPlayButton={false}
                showNav={false}
                onBeforeSlide={(nextIndex) => {
                  console.log(nextIndex);
                  setImageIndex(nextIndex);
                }}
                startIndex={imageIndex}
              />
            </Col>
            <Col lg={12}>
              <h3 className="detail-title">{productDetails.name}</h3>
              <Row align="middle">
                <Rate value={5} />
                <span>&#x276A;30 Nhận xét&#x276B;</span>
              </Row>
              <h2 className="detail-price">
                {productDetails.price && formatNumber(productDetails.price)}
              </h2>
              <p>{productDetails.description}</p>
              <Form
                onFinish={submitForm}
                name="form-size"
                layout="vertical"
                initialValues={{
                  color: imageIndex,
                  size: size,
                  amount: 1,
                }}
              >
                <Form.Item
                  name="color"
                  label="Màu sắc:"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn màu!",
                    },
                  ]}
                >
                  {productDetails.images && renderColor(productDetails)}
                </Form.Item>
                <Form.Item
                  name="size"
                  label="Size:"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn size!",
                    },
                  ]}
                >
                  {productDetails.sizes && renderSizes(productDetails)}
                </Form.Item>
                <div className="quantity">
                  <Form.Item
                    name="amount"
                    label="Số lượng:"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn số lượng!",
                      },
                    ]}
                  >
                    <InputNumber
                      type={"number"}
                      className="quantity-input"
                      min={1}
                    />
                  </Form.Item>
                </div>
                <Row gutter={32}>
                  <Col span={16}>
                    <Button className="buy-now">Mua Ngay</Button>
                  </Col>
                  <Col span={8}>
                    <Button
                      icon={<ShoppingCartOutlined />}
                      className="add-to-cart"
                      htmlType="submit"
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={24}>
              <Row gutter={[32, 32]}>
                <Col span={24}>
                  <h3 className="my-5 title">Nhận xét và đánh giá: </h3>
                  {commentList?.data?.length > 0 ? (
                    <Row gutter={[16, 16]}>
                      <CommentAndRating commentList={commentList} />
                    </Row>
                  ) : (
                    <p>Chưa có bình luận và đánh giá nào hết!</p>
                  )}
                </Col>
                <Col>
                  <p>Để lại bình luận và nhân xét:</p>
                  <Card>
                    <Form
                      form={formComment}
                      layout="vertical"
                      onFinish={handleSendComentAndRating}
                    >
                      <Form.Item label="Thêm nhận xét:" name="description">
                        <Input.TextArea />
                      </Form.Item>
                      <Form.Item label="Đánh giá" name="rate">
                        <Rate value={3} />
                      </Form.Item>
                      <Button htmlType="submit">Gửi</Button>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default DetailProduct;
