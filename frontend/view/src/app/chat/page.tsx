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
    <div className="flex h-screen bg-gray-100">
      <ListContacts />
      <ChatMessages />
      <SideSettings />
    </div>
  );
};

export default Chat;
