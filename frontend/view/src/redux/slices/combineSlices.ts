import { combineReducers } from "redux";

import AlertReducer from "@/redux/slices/reducers/alert";
import AuthReducer from "@/redux/slices/reducers/auth";
import PerfilReducer from "@/redux/slices/reducers/perfil";
import ChatsReducer from "@/redux/slices/reducers/chat";

const rootReducer = combineReducers({
  Alert: AlertReducer,
  Auth: AuthReducer,
  Perfil: PerfilReducer,
  Chats: ChatsReducer,
});

export default rootReducer;
