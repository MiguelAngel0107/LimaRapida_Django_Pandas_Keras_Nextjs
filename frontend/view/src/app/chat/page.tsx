"use client";
import React, { useState } from "react";
import ListContacts from "@/components/chat/listContacts";
import ChatMessages from "@/components/chat/chatMessages";
import SideSettings from "@/components/chat/sideSettings";

interface Message {
  id: number;
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  return (
    <div className="grid grid-cols-10 bg-gray-950 mb-8 mt-4">
      <div className="hidden md:block col-span-2 bg-gradient-to-t from-purple-950/60 to-gray-950 rounded-3xl mx-4">
        <ListContacts />
      </div>
      <div className="w-full md:col-span-6 col-span-10 px-4 md:px-0">
        <ChatMessages />
      </div>
      <div className="hidden md:block col-span-2 bg-gradient-to-t from-purple-950/60 to-gray-950 rounded-3xl mx-4">
        <SideSettings />
      </div>
    </div>
  );
};

export default Chat;
