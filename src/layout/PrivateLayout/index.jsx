import React, { useEffect, useState } from "react";

import {
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Col, Button, Dropdown } from "antd";
import "./style.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFromServer, logoutAction } from "../../redux/actions";

const { Header, Content, Sider } = Layout;

function PrivateLayout() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (userInfo?.role === "admin") {
      dispatch(getAllUserFromServer());
      navigate("/admin/product-management");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.role]);

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${location.pathname}`]}
          items={[
            {
              key: "/admin/product-management",
              icon: <VideoCameraOutlined />,
              label: "Quản lí sản phẩm",
              onClick: () => navigate("/admin/product-management"),
            },
            {
              key: "/admin/user-management",
              icon: <UserOutlined />,
              label: "Quản lý user",
              onClick: () => navigate("/admin/user-management"),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 2rem",
          }}
        >
          <Row justify="space-between">
            <Col>
              <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu triggerSubMenuAction>
                    <Menu.Item
                      icon={<UserOutlined />}
                      onClick={() => {
                        dispatch(logoutAction());
                        navigate("/login");
                      }}
                    >
                      Đăng xuất
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button>Xin chào Admin</Button>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrivateLayout;
