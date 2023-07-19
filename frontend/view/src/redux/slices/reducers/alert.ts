import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  alert: any | null;
}

const initialState: AlertState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    SET_ALERT(state, action: PayloadAction<any>) {
      let payload = action.payload;
      return {
        ...state,
        alert: payload,
      };
    },
    REMOVE_ALERT(state) {
      return {
        ...state,
        alert: null,
      };
    },
  },
});

export const { SET_ALERT, REMOVE_ALERT } = alertSlice.actions;
export default alertSlice.reducer;
