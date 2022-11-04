import { Form, Input, Typography } from "antd";
import Link from "antd/lib/typography/Link";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { get } from "../../apis";
import ButtonCustom from "../../components/Custom/Template/ButtonCustom";
import iconProtect from "../../images/password.png";
import { setLogin } from "../../store/actions/user.action";
import notify from "../../utils/func/notify";
import "./Login.less";

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const {data} = await get(`/user/change_password?password=${values.password}`);
      if(data.code ==="S"){
        localStorage.setItem("firstLogin", "true");
        dispatch(setLogin(true));
        notify("success","Thông báo thành công",data.message);
        navigate("/");
      }
    } catch (error: any) {
      notify("error","Thông báo thất bại",error.response?.data?.message);
    }
  };

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "400",marginTop:"1rem" }}>Thay đổi mật khẩu</h3>
      <div className="icon-protect" style={{ textAlign: "center", margin: "1rem 0" }}>
        <img src={iconProtect} alt="icon-protect" style={{ width: "6rem", height: "6rem" }} />
      </div>
      <Form
        name="normal_verify"
        className="verify-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="password" label={<b>Mật khẩu mới</b>}>
          <Input type="password" placeholder="Nhập mật khẩu " />
        </Form.Item>
        <Form.Item name="account-confirm" label={<b>Xác nhận mật khẩu</b>}>
          <Input  type="password"placeholder="Nhập lại mật khẩu " />
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

export default ChangePassword;
