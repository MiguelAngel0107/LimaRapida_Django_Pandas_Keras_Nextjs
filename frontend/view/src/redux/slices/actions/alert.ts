import { SET_ALERT, REMOVE_ALERT } from "../reducers/alert";
import { Dispatch, Action, AnyAction } from "redux";

export const setAlert = (msg: string, alertType: string, timeout = 5000) => {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(SET_ALERT({ msg, alertType }));
    setTimeout(() => dispatch(REMOVE_ALERT()), timeout);
  };
};
