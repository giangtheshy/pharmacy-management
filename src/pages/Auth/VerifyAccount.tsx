import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { get } from "../../apis";
import VerifyCode from "../../components/Custom/Func/VerifyCode";
import { setToken } from "../../store/actions/user.action";
import { RootState } from "../../store/reducers";
import notify from "../../utils/func/notify";
import "./Login.less";

export enum TYPE_VERIFY {
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
}
const VerifyAccount: React.FC = () => {
  const account = useSelector((state: RootState)=> state.common.account);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const onFinish = async (values: any) => {
    try {
      switch (type) {
        case TYPE_VERIFY.CHANGE_PASSWORD: {
          const {  data } = await get(`/user/verify_code?username=${account}&code=${values['verify-code']}`);
          if (data.code === "S") {
            dispatch(setToken(data.token));
            notify('success','Thông báo thành công',data.message);
            navigate('/change-password');
          }
          break;
        }
        case TYPE_VERIFY.VERIFY_ACCOUNT: {
          const {  data } = await get(`/user/verify_code?username=${account}&code=${values['verify-code']}`);
          if (data.code === "S") {
            dispatch(setToken(data.token));
            const res =await get(`/user/activate_account`)
            if(res.data.code ==="S"){
              navigate('/register-success');
              notify('success','Thông báo thành công',res.data.message);
            }else{
              notify('error','Thông báo thất bạ',res.data.message);
            }
          }else{
            notify('error','Thông báo thất bạ',data.message);
          }
          break;
        }
      }
     
    } catch (error: any) {
      notify('error','Thông báo thất bại',error.response?.data?.message);
    }
  };

  return <VerifyCode onFinish={onFinish} />;
};

export default VerifyAccount;
