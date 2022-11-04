import { Theme } from "../../config/constant/enum";
import { ActionRedux } from "../../types/redux.type";
import { SET_ACCOUNT, SET_THEME } from "../types";

interface StateCommonInterface {
  theme: Theme;
  account:string;
}
const initStateCommon: StateCommonInterface = {
  theme: localStorage.theme as Theme,
  account:""
};
export default (state = initStateCommon, { payload, type }: ActionRedux) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: payload };
    case SET_ACCOUNT:
      return { ...state, account: payload };
    default:
      return state;
  }
};
