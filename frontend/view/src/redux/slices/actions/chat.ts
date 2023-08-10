import { GET_CHATS_SUCCESS, GET_CHATS_FAIL } from "../reducers/chat";
import axios from "axios";
import { APP_URL_HTTP_BACK } from "@/globals";
import { AppDispatch } from "@/redux/store";

export const get_chats_to_user = () => async (dispatch: AppDispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  try {
    const res = await axios.get(`${APP_URL_HTTP_BACK}/chat/chats/`, config);

    if (res.status === 200) {
      dispatch(GET_CHATS_SUCCESS(res.data));
    } else {
      dispatch(GET_CHATS_FAIL());
    }
  } catch (error) {
    dispatch(GET_CHATS_FAIL());
    console.error("Error en el Servidor", error);
  }
};
