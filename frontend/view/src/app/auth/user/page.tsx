"use client";
import React, { useEffect, useState } from "react";
import { APP_URL_HTTP_BACK } from "@/globals";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { get_perfil_user } from "@/redux/slices/actions/perfil";
import { SubMenu1, SubMenu2 } from "@/components/auth/user/navs";
import RequestsFriends from "@/components/auth/user/sections/requestsFriends";

export default function Page() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(get_perfil_user());
  }, []);

  const data = useAppSelector((state) => state.Perfil.profile);
  const fullNameUser = useAppSelector((state) => state.Auth.user?.name);

  const [hover, setHover] = useState([true, false, false, false]);

  const ChangeElements = (e:boolean[]) => {
    if (e[0]) {
      return <RequestsFriends />;
    }
    if (e[1]) {
      return <></>;
    }
    if (e[2]) {
      return <></>;
    }
    if (e[3]) {
      return <></>;
    }
  };

  return (
    <>
      <div className="w-full max-w-screen-lg mx-auto rounded-md overflow-hidden shadow-lg">
        <div className="relative h-72 md:h-96 bg-indigo-800">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={`${APP_URL_HTTP_BACK}${String(data?.banner)}`}
            alt="Banner"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 flex items-center">
            <div className="mr-4 lg:mr-8">
              <img
                className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white"
                src={`${APP_URL_HTTP_BACK}${data?.picture}`}
                alt="Profile picture"
              />
            </div>
            <div className="text-white">
              <p className="text-2xl md:text-4xl font-bold leading-tight">
                {fullNameUser}
              </p>
              <p className="text-base md:text-lg">@{fullNameUser}</p>
            </div>
          </div>
        </div>
        {data?.bio && (
          <div className="p-4 md:p-2">
            <div className="mt-2">
              <p className="text-gray-200 font-semibold text-lg md:text-xl">
                Biografia:
              </p>
              <p className="text-gray-400 mt-2 text-base md:text-lg">
                {String(data?.bio)}s
              </p>
            </div>
          </div>
        )}
        {data?.birthday && (
          <div className="p-4 md:p-2">
            <div className="mt-2">
              <p className="text-gray-200 font-semibold text-lg md:text-xl">
                Birthday:
              </p>
              <p className="text-gray-400 mt-2 text-base md:text-lg">
                {String(data?.birthday)}s
              </p>
            </div>
          </div>
        )}
        {data?.url && (
          <div className="p-4 md:p-2">
            <div className="mt-2">
              <p className="text-gray-200 font-semibold text-lg md:text-xl">
                My Page:
              </p>
              <p className="text-gray-400 mt-2 text-base md:text-lg hover:text-blue-500">
                <a href={`${String(data?.url)}`}>{String(data?.url)}</a>
              </p>
            </div>
          </div>
        )}
      </div>

      {window.innerWidth >= 500 ? (
        <SubMenu1 setHover={setHover} hover={hover} />
      ) : (
        <SubMenu2 setHover={setHover} hover={hover} />
      )}
      {ChangeElements(hover)}
    </>
  );
}
