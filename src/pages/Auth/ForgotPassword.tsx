import { Form, Input, Typography } from "antd";
import Link from "antd/lib/typography/Link";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { get } from "../../apis";
import ButtonCustom from "../../components/Custom/Template/ButtonCustom";
import iconProtect from "../../images/forgot-password.png";
import notify from "../../utils/func/notify";
import "./Login.less";
import { TYPE_VERIFY } from "./VerifyAccount";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const { data } = await get(`/user/generate_code?account=${values.account}`);
      if (data.code === "S") {
        navigate(`/verify-account?type=${TYPE_VERIFY.CHANGE_PASSWORD}`);
        notify("success","Thông báo thành công",data.message);
      }
    } catch (error: any) {
      notify("error","Thông báo thất bại",error.response?.data?.message);
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "400", marginTop: "2rem" }}>Quên mật khẩu</h3>
      <div className="icon-protect" style={{ textAlign: "center", margin: "1rem 0" }}>
        <img src={iconProtect} alt="icon-protect" style={{ width: "9rem", height: "7rem" }} />
      </div>
      <Form
        name="normal_verify"
        className="verify-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="account" label={<b>Nhập Email hoặc SDT để lấy mã xác thực</b>}>
          <Input placeholder="Nhập Email hoặc SDT " />
        </Form.Item>
        <div style={{ textAlign: "right", fontWeight: "bold", margin: "2rem 0" }}></div>

        <Form.Item>
          <ButtonCustom type="primary" htmlType="submit" className="verify-form-button">
            Xác nhận
          </ButtonCustom>
          <Typography style={{ textAlign: "center", marginTop: "2rem" }}>
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

export default ForgotPassword;
