import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean | null;
  user: dataUserProps | null;
  isMetaMask: boolean | null;
}
interface dataUserProps {
  name: string;
  email: string;
  id: number;
}

const initialState: AuthState = {
  access: typeof window !== "undefined" ? localStorage.getItem("access") : null,
  refresh:
    typeof window !== "undefined" ? localStorage.getItem("refresh") : null,
  isAuthenticated: null,
  user: null,
  isMetaMask: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    AUTHENTICATED_SUCCESS(state) {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    AUTHENTICATED_FAIL(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    },
    SIGNUP_SUCCESS() {},
    SIGNUP_FAIL(state) {},
    LOGIN_SUCCESS(
      state,
      action: PayloadAction<{ access: string; refresh: string }>
    ) {
      let payload = action.payload;
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      console.log("Exito");
      return {
        ...state,
        isAuthenticated: true,
        access: localStorage.getItem("access"),
        refresh: localStorage.getItem("refresh"),
      };
    },
    LOGIN_FAIL(state) {},
    REFRESH_SUCCESS(state, action: PayloadAction<{ access: string }>) {
      let payload = action.payload;
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        access: localStorage.getItem("access"),
      };
    },
    REFRESH_FAIL(state) {},
    LOGOUT(state) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
      };
    },
    USER_LOADED_SUCCESS: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    USER_LOADED_FAIL: (state) => {
      state.user = null;
    },
    METAMASK_SUCCESS(state, action: PayloadAction<boolean>) {
      let payload = action.payload;
      return {
        ...state,
        isMetaMask: payload,
      };
    },
  },
});

export const {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  METAMASK_SUCCESS,
} = authSlice.actions;
export default authSlice.reducer;
