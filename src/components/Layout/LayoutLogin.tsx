import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import React, { FC, ReactNode } from "react";
import theme from "../../config/theme";
import "./Layout.less";
import logo from "../../images/logo-with-name.png";
import LayoutCommon from "./LayoutCommon";
const LayoutLogin: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LayoutCommon>
      <section className="auth-page">
        <Row justify="center" align="middle">
          <Row className="form-container" data-theme={theme}>
            <Col className="banner" xs={24} sm={24} md={24} lg={12}>
              <img className="logo-image" src={logo} alt="logo" />
            </Col>
            <Col
              className="form"
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              lg={12}
            >
              {children}
            </Col>
          </Row>
        </Row>
      </section>
    </LayoutCommon>
  );
};

export default LayoutLogin;
