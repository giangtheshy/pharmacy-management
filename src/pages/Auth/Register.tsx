import { Col, Form, Input, Row, Typography } from "antd";
import Link from "antd/lib/typography/Link";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post } from "../../apis";
import ButtonCustom from "../../components/Custom/Template/ButtonCustom";
import { setAccount } from "../../store/actions/common.action";
import notify from "../../utils/func/notify";
import { TYPE_VERIFY } from "./VerifyAccount";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const {data} = await post("/user/register", values);
      if (data.code==="S") {
        dispatch(setAccount(values.username))
        navigate(`/verify-account?type=${TYPE_VERIFY.VERIFY_ACCOUNT}`);
        notify("success","Thông báo thành công",data.message);
      }
    } catch (error: any) {
      notify("error","Thông báo thất bại",error.response?.data?.message);
    }
  };
  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "400" }}>Đăng ký tài khoản</h3>
      <Form
        name="normal_register"
        className="register-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row gutter={[3, 3]}>
          <Col span={8}>
            <Form.Item
              name="lastName"
              label={<b>Tên</b>}
              rules={[{ required: true, message: "Please input your Tên!" }]}
            >
              <Input  placeholder="Tên" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="firstName"
              label={<b>Họ</b>}
              rules={[{ required: true, message: "Please input your Họ!" }]}
            >
              <Input   placeholder="Họ" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="phone"
          label={<b>Số điện thoại</b>}
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input  placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="email"
          label={<b>Email</b>}
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="dob"
          label={<b>Ngày sinh</b>}
          rules={[{ required: true, message: "Please input your Ngày sinh!" }]}
        >
          <Input placeholder="Ngày sinh" />
        </Form.Item>
        <Form.Item
          name="username"
          label={<b>Tài khoản</b>}
          rules={[{ required: true, message: "Please input your Tài khoản!" }]}
        >
          <Input placeholder="Tài khoản" />
        </Form.Item>
        <Form.Item
          name="password"
          label={<b>Mật khẩu</b>}
          rules={[{ required: true, message: "Please input your Mật khẩu!" }]}
        >
          <Input type="password" placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="re-password"
          label={<b>Xác nhận mật khẩu</b>}
          rules={[{ required: true, message: "Please input your Mật khẩu!" }]}
        >
          <Input type="password" placeholder="Nhập lại Mật khẩu" />
        </Form.Item>
      

        <Form.Item>
          <ButtonCustom type="primary" htmlType="submit" className="register-form-button">
            Đăng ký
          </ButtonCustom>
          <Typography style={{ textAlign: "center", marginTop: "1rem" }}>
            Bạn đã có tài khoản?{" "}
            <Link style={{ fontWeight: "bold" }} onClick={() => navigate("/login")}>
              Đăng nhập
            </Link>
          </Typography>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
