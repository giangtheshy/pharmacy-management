import { Form, Input, Typography } from "antd";
import Link from "antd/lib/typography/Link";
import React, { FC } from "react";
import ButtonCustom from "../Template/ButtonCustom";
import iconProtect from "../../../images/protection.png";
import { useNavigate } from "react-router-dom";

const VerifyCode:FC<{onFinish:(val:any)=>void}> = ({onFinish}) => {
  const navigate = useNavigate();
  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "400" }}>Nhập mã xác thực</h3>
      <div className="icon-protect" style={{ textAlign: "center", margin: "2rem 0" }}>
        <img src={iconProtect} alt="icon-protect" style={{ width: "5rem", height: "5rem" }} />
      </div>
      <Form
        name="normal_verify"
        className="verify-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="verify-code" label={<b>Mã xác thực</b>}>
          <Input placeholder="Mã xác thực" />
        </Form.Item>
        <div style={{ textAlign: "right", fontWeight: "bold", margin: "1rem 0" }}>
          <b>
            Thời gian còn lại <span style={{ color: "#36A693" }}>00:59</span> .{" "}
          </b>
          <Link type="danger">Gửi lại?</Link>
        </div>

        <Form.Item>
          <ButtonCustom type="primary" htmlType="submit" className="verify-form-button">
            Xác nhận
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

export default VerifyCode;
