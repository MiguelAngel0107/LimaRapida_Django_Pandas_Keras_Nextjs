"use client";
import React, { useEffect, useState } from "react";
import ListContacts from "@/components/chat/listContacts";
import ChatMessages from "@/components/chat/chatMessages";
import SideSettings from "@/components/chat/sideSettings";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { get_chats_to_user } from "@/redux/slices/actions/chat";
import type { chatProps } from "@/redux/slices/reducers/chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Switch, Transition, Dialog } from "@headlessui/react";
import Link from "next/link";

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const ChatsUser = useAppSelector((state) => state.Chats.chats);
  const [selectChat, setSelectChat] = useState<chatProps>({
    id_chat: 0,
    nombre_chat: "",
    participants: [],
    unique_code: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(get_chats_to_user());
  }, []);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="grid grid-cols-10 bg-gray-950 mb-8 mt-0 md:mt-4">
      <div className="md:hidden col-span-10 text-white flex items-center gap-4 mx-6 mb-6">
        <div className="w-full flex justify-center bg-purple-700 hover:bg-purple-900 py-1.5 rounded-full shadow-nav shadow-white hover:shadow-white transition duration-300 hover:shadow-nav_hover transform hover:translate-y-1">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon
              icon={faUserGroup}
              className="w-7 h-7 text-white"
            />
          </button>
        </div>
      </div>
      <div className="hidden md:block col-span-2 bg-gradient-to-t from-purple-950/60 to-gray-950 rounded-3xl mx-4">
        <ListContacts
          list={ChatsUser}
          setState={setSelectChat}
          state={selectChat}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
      <div className="w-full md:col-span-6 col-span-10 px-4 md:px-0">
        {selectChat.id_chat === 0 ? (
          <div className="w-full h-screen bg-purple-950/20 text-white rounded-3xl"></div>
        ) : (
          <ChatMessages
            unique_code={selectChat.unique_code}
            id_chat={selectChat.id_chat}
            name_chat={selectChat.nombre_chat}
          />
        )}
      </div>
      <div className="hidden md:block col-span-2 bg-gradient-to-t from-purple-950/60 to-gray-950 rounded-3xl mx-4">
        <SideSettings />
      </div>
      
    </div>
  );
};

export default Chat;
