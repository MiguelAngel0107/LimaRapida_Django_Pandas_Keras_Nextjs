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
    <div className="flex h-screen bg-gray-500">
      <div className="hidden h-96 sm:block">
        <ListContacts />
      </div>
      <div className="w-full sm:flex-1">
        <ChatMessages />
      </div>
      <div className="hidden sm:block">
        <SideSettings />
      </div>
    </div>
  );
};

export default Chat;
