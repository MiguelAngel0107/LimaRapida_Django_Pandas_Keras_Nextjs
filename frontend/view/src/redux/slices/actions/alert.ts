import { SET_ALERT, REMOVE_ALERT } from "../reducers/alert";
import { AppDispatch } from "@/redux/store";

export const setAlert = (msg: string, alertType: string, timeout = 5000) => {
  return (dispatch: AppDispatch) => {
    dispatch(SET_ALERT({ msg, alertType }));
    setTimeout(() => dispatch(REMOVE_ALERT()), timeout);
  };
};
