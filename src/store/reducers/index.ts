import { combineReducers } from "redux";
import user from "./user.reducer";
import common from "./common.reducer";

export const reducers = combineReducers({ user,common });

export type RootState = ReturnType<typeof reducers>;
