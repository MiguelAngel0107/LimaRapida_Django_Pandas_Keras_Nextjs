import {
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  LOGOUT,
} from "../reducers/auth";
import { setAlert } from "./alert";
import axios from "axios";
import { APP_URL_HTTP_BACK } from "@/globals";
import { AppDispatch } from "@/redux/store";

export const load_user = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${APP_URL_HTTP_BACK}/auth/users/me/`,
        config
      );
      dispatch(USER_LOADED_SUCCESS(res.data));
    } catch (err) {
      dispatch(USER_LOADED_FAIL());
    }
  } else {
    dispatch(USER_LOADED_FAIL());
  }
};

export const check_authenticated = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(
        `${APP_URL_HTTP_BACK}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch(AUTHENTICATED_SUCCESS());
      } else {
        dispatch(AUTHENTICATED_FAIL());
      }
    } catch (err) {
      dispatch(AUTHENTICATED_FAIL());
    }
  } else {
    dispatch(AUTHENTICATED_FAIL());
  }
};

export const signup =
  (
    name: string,
    email: string,
    password: string,
    re_password: string,
    wallet_address: string
  ) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password,
      wallet_address,
    });
    //console.log(body);
    try {
      const res = await axios.post(
        `${APP_URL_HTTP_BACK}/auth/users/`,
        body,
        config
      );

      if (res.status === 201) {
        dispatch(SIGNUP_SUCCESS(res.data));
        dispatch(
          setAlert("Te enviamos un correo, porfavor activa tu cuenta", "green")
        );
      } else {
        dispatch(SIGNUP_FAIL());
        dispatch(setAlert("Error al crear cuenta", "red"));
      }
    } catch (err) {
      dispatch(SIGNUP_FAIL());
      dispatch(setAlert("Error con el servidor, intenta mas tarde", "red"));
    }
  };

export const login =
  (email: string, password: string, wallet_address: string) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
      wallet_address,
    });
    console.log(body);
    try {
      const res = await axios.post(
        `${APP_URL_HTTP_BACK}/auth/jwt/create/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch(LOGIN_SUCCESS(res.data));
        dispatch(setAlert("Inicio de sesión con éxito", "green"));
        console.log(res.data);
      } else {
        dispatch(LOGIN_FAIL());
        console.log(res.data);
        dispatch(setAlert("Error al iniciar sesion", "red"));
      }
    } catch (err) {
      dispatch(LOGIN_FAIL());
      console.log(err);
      dispatch(setAlert("Error al iniciar sesion. Intenta mas tarde", "red"));
    }
  };

export const refresh = () => async (dispatch: AppDispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });

    try {
      const res = await axios.post(
        `${APP_URL_HTTP_BACK}/auth/jwt/refresh/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch(REFRESH_SUCCESS(res.data));
      } else {
        dispatch(REFRESH_FAIL());
      }
    } catch (err) {
      dispatch(REFRESH_FAIL());
    }
  } else {
    dispatch(REFRESH_FAIL());
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  console.log("cerrado actions");
  dispatch(LOGOUT());
  dispatch(setAlert("Succesfully logged out", "green"));
};
