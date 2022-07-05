import React from "react";

import { Form, Input, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions/user.action";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  const [form] = Form.useForm();

  const handleChangePassword = (values) => {
    dispatch(
      changePassword({
        userId: userInfo.id,
        email: userInfo.email,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        callback: () => form.resetFields(),
      })
    );
  };

  return (
    <div className="container-profile">
      <Row justify="space-between">
        <Col className="title">Đổi mật khẩu</Col>
      </Row>
      <div className="profile-content">
        <Form
          name="changePassword"
          layout={"vertical"}
          onFinish={handleChangePassword}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Password!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Password!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ChangePassword;
