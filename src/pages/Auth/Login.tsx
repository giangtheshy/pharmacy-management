import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import Link from "antd/lib/typography/Link";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { post } from "../../apis";
import ButtonCustom from "../../components/Custom/Template/ButtonCustom";
import { setLogin } from "../../store/actions/user.action";
import notify from "../../utils/func/notify";
import "./Login.less";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const {data} = await post("/user/login", values);
      if(data.code ==="S"){

        localStorage.setItem("firstLogin", "true");
        dispatch(setLogin(true));
        navigate("/");
        notify("success","Thông báo thành công",data.message);
      }
    } catch (error: any) {
      notify("error","Thông báo thất bại",error.response?.data?.message);
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "3rem", fontWeight: "400" }}>Đăng nhập</h3>
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label={<b>Email</b>}
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label={<b>Mật khẩu</b>}
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Link style={{ display: "block", textAlign: "right", fontWeight: "bold" }} onClick={()=>navigate('/forgot-password')}>Quên mật khẩu?</Link>
        </Form.Item>

        <Form.Item>
          <ButtonCustom type="primary" htmlType="submit" className="login-form-button">
            Đăng nhập
          </ButtonCustom>
          <Typography style={{ textAlign: "center", marginTop: "1rem" }}>
            Bạn chưa có tài khoản? <Link style={{ fontWeight: "bold" }} onClick={()=>navigate('/register')}>Đăng ký</Link>
          </Typography>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
