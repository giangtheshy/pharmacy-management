import { Theme } from "../../config/constant/enum";
import { ActionRedux } from "../../types/redux.type";
import { SET_THEME } from "../types";

interface StateCommonInterface {
  theme: Theme;
}
const initStateCommon: StateCommonInterface = {
  theme: localStorage.theme as Theme
};
export default (state = initStateCommon, { payload, type }: ActionRedux) => {
  switch (type) {
    case SET_THEME:
      return { ...state, theme: payload };
    default:
      return state;
  }
};
