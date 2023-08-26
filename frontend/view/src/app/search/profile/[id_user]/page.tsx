"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { APP_URL_HTTP_BACK } from "@/globals";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  get_perfil_public_user,
  send_request_friend,
} from "@/redux/slices/actions/perfil";

export default function Page() {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(get_perfil_public_user(params.id_user));
  }, []);

  const UserPublic = useAppSelector((state) => state.Perfil.profile_public);
  const userSession = useAppSelector((state) => state.Auth.user?.id);

  const sendFriendRequest = async (toUserId: number) => {
    dispatch(send_request_friend(toUserId));
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto rounded-md overflow-hidden shadow-lg">
      <div className="relative h-72 md:h-96 bg-violet-800">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={`${APP_URL_HTTP_BACK}${String(UserPublic?.banner)}`}
          alt="Banner"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 flex items-center">
          <div className="mr-4 lg:mr-8">
            <img
              className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white"
              src={`${APP_URL_HTTP_BACK}${UserPublic?.picture}`}
              alt="Profile picture"
            />
          </div>
          <div className="text-white">
            <p className="text-2xl md:text-4xl font-bold leading-tight">
              {UserPublic?.name}
            </p>
            <p className="text-base md:text-lg">@{UserPublic?.name}</p>
          </div>
          {UserPublic?.id != userSession && UserPublic?.id != undefined && (
            <button
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
              onClick={() => sendFriendRequest(UserPublic.id)}
            >
              Enviar solicitud de amistad
            </button>
          )}
        </div>
      </div>
      {UserPublic?.bio && (
        <div className="p-4 md:p-2">
          <div className="mt-2">
            <p className="text-gray-200 font-semibold text-lg md:text-xl">
              Biografia:
            </p>
            <p className="text-gray-400 mt-2 text-base md:text-lg">
              {String(UserPublic.bio)}s
            </p>
          </div>
        </div>
      )}
      {UserPublic?.birthday && (
        <div className="p-4 md:p-2">
          <div className="mt-2">
            <p className="text-gray-200 font-semibold text-lg md:text-xl">
              Birthday:
            </p>
            <p className="text-gray-400 mt-2 text-base md:text-lg">
              {String(UserPublic.birthday)}s
            </p>
          </div>
        </div>
      )}
      {UserPublic?.url && (
        <div className="p-4 md:p-2">
          <div className="mt-2">
            <p className="text-gray-200 font-semibold text-lg md:text-xl">
              My Page:
            </p>
            <p className="text-gray-400 mt-2 text-base md:text-lg hover:text-blue-500">
              <a href={`${String(UserPublic.url)}`}>{String(UserPublic.url)}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
