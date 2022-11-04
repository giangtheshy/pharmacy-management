import { Theme } from "../../config/constant/enum";
import { SET_ACCOUNT, SET_THEME } from "../types";

export const setTheme = (theme:Theme) =>({type:SET_THEME,payload: theme})
export const setAccount = (acc:string) =>({type:SET_ACCOUNT,payload: acc})