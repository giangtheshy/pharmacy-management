import { Theme } from "../../config/constant/enum";
import { SET_THEME } from "../types";

export const setTheme = (theme:Theme) =>({type:SET_THEME,payload: theme})