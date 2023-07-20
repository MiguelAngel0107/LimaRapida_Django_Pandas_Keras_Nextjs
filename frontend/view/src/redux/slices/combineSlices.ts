import { combineReducers } from "redux";

import AlertReducer from "@/redux/slices/reducers/alert";
import AuthReducer from '@/redux/slices/reducers/auth'

const rootReducer = combineReducers({
  Alert: AlertReducer,
  Auth: AuthReducer
});

export default rootReducer;
