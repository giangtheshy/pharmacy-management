import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Grid, Input, Layout, Row } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { post } from "../../apis";
import theme from "../../config/theme";
import { setLogin } from "../../store/actions/user.action";
import "./Login.less";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const res = await post("/user/login", values);
      localStorage.setItem("firstLogin", "true");
      navigate("/");
      dispatch(setLogin(true));
      navigate("/");
      // alert(res.data.message);
    } catch (error: any) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <section className="login-page">
      <Row justify="center" align="middle" style={{ height: "90vh" }}>
        <Row className="form-container" data-theme={theme}>
          <Col className="form" xs={24} sm={24} md={24} lg={12}>
            <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
              <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Col>
          <Col className="banner" xs={24} sm={24} md={24} lg={12}></Col>
        </Row>
      </Row>
    </section>
  );
};

export default Login;
