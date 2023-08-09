import { combineReducers } from "redux";

import AlertReducer from "@/redux/slices/reducers/alert";
import AuthReducer from "@/redux/slices/reducers/auth";
import PerfilReducer from "@/redux/slices/reducers/perfil";

const rootReducer = combineReducers({
  Alert: AlertReducer,
  Auth: AuthReducer,
  Perfil: PerfilReducer,
});

export default rootReducer;
