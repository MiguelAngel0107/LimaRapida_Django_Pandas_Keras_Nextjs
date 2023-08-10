import {
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  GET_PUBLIC_PROFILE_SUCCESS,
  GET_PUBLIC_PROFILE_FAIL,
  GET_REQUEST_FRIENDS_SUCCESS,
  GET_REQUEST_FRIENDS_FAIL,
} from "../reducers/perfil";

import axios from "axios";
import { APP_URL_HTTP_BACK } from "@/globals";
import { AppDispatch } from "@/redux/store";

export const get_perfil_user = () => async (dispatch: AppDispatch) => {
  const config = {
    headers: {
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(`${APP_URL_HTTP_BACK}/profile/view/`, config);

    if (res.status === 200) {
      dispatch(GET_DATA_SUCCESS(res.data));
    } else {
      dispatch(GET_DATA_FAIL());
    }
  } catch (err) {
    dispatch(GET_DATA_FAIL());
  }
};

export const get_perfil_public_user =
  (idUser: string) => async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${APP_URL_HTTP_BACK}/profile/public-profile/${idUser}/`,
        config
      );

      if (res.status === 200) {
        dispatch(GET_PUBLIC_PROFILE_SUCCESS(res.data));
      } else {
        dispatch(GET_PUBLIC_PROFILE_FAIL());
      }
    } catch (err) {
      dispatch(GET_PUBLIC_PROFILE_FAIL());
    }
  };

export const send_request_friend = async (toUserId: number) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };
  const body = JSON.stringify({ to_user: toUserId });
  try {
    const res = await axios.post(
      `${APP_URL_HTTP_BACK}/profile/send-friend-request/`,
      body,
      config
    );

    if (res.status === 201) {
      // Actualizar el estado del componente o mostrar un mensaje de éxito
      console.log("Solicitud de amistad enviada con éxito");
    } else {
      // Manejar errores de solicitud
      console.error("Error al enviar la solicitud de amistad");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

export const get_requests_friends = () => async (dispatch: AppDispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
    },
  };

  try {
    const res = await axios.get(
      `${APP_URL_HTTP_BACK}/profile/friend-requests/`,
      config
    );

    if (res.status === 200) {
      dispatch(GET_REQUEST_FRIENDS_SUCCESS(res.data));
    } else {
      dispatch(GET_REQUEST_FRIENDS_FAIL());
    }
  } catch (error) {
    dispatch(GET_REQUEST_FRIENDS_FAIL());
    console.error("Error en la solicitud:", error);
  }
};

export const put_request_friend =
  (friendRequestId: number, action: string) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    try {
      const res = await axios.post(
        `${APP_URL_HTTP_BACK}/profile/friend-requests/`,
        {
          friend_request_id: friendRequestId,
          action: action,
        },
        config
      );

      if (res.status === 200) {
        console.log(res.data);
        dispatch(get_requests_friends());
      } else {
        console.log(res.data);
        dispatch(get_requests_friends());
      }
    } catch (error) {
      // Manejar errores, como mostrar un mensaje de error
      console.error("Error al procesar la solicitud de amistad:", error);
    }
  };
