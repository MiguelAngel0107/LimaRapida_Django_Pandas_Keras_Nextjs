"use client";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  get_requests_friends,
  put_request_friend,
} from "@/redux/slices/actions/perfil";

export default function RequestsFriends() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get_requests_friends());
  }, []);

  const friendRequests = useAppSelector(
    (state) => state.Perfil.request_friends
  );

  function handleRequest(id: number, answer: string) {
    switch (answer) {
      case "si":
        dispatch(put_request_friend(id, "accept"));
        break;
      case "no":
        dispatch(put_request_friend(id, "reject"));
        break;
      default:
        break;
    }
  }

  return (
    <div className="p-10">
      {friendRequests?.map((request, index) => (
        <div
          key={index}
          className="bg-purple-950/50 p-4 rounded-md shadow-md mb-4 border border-white flex flex-col sm:flex-row items-center justify-between"
        >
          <div className="text-white font-semibold flex items-center">
            <Image src={""} width={50} height={50} alt="" />
            <h5 className="px-4">{request.from_user}</h5>
          </div>
          <div className="">
            <button
              onClick={() => handleRequest(request.id_request, "si")}
              className="bg-green-950 hover:bg-green-800 text-white py-2 px-4 rounded-full mr-2"
            >
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
            <button
              onClick={() => handleRequest(request.id_request, "no")}
              className="bg-red-950 hover:bg-red-800 text-white py-2 px-4 rounded-full"
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
