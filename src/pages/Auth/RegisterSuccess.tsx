import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ButtonCustom from "../../components/Custom/Template/ButtonCustom";
import badge from "../../images/badge.png";
import { setLogin } from "../../store/actions/user.action";
import "./Login.less";

const RegisterSuccess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("firstLogin", "true");
    dispatch(setLogin(true));
    navigate("/");
  }, []);

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "400", marginTop: "2rem" }}>
        Đăng ký thành công
      </h3>
      <div className="icon-protect" style={{ textAlign: "center", margin: "3rem 0" }}>
        <img src={badge} alt="icon-protect" style={{ width: "10rem", height: "10rem" }} />
      </div>

      <ButtonCustom type="primary" className="verify-form-button" onClick={() => navigate("/login")}>
        Đăng nhập
      </ButtonCustom>
    </>
  );
};

export default RegisterSuccess;
