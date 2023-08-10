import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./chatInput";
import { APP_URL_WS_BACK, APP_URL_HTTP_BACK } from "@/globals";
import { useAppSelector } from "@/redux/hooks";
import axios from "axios";

interface listMessageProps {
  username: string;
  message: string;
  timestamp: string;
}

interface MessageProps {
  unique_code: string;
  id_chat: number;
  name_chat: string;
}

function ChatMessages(props: MessageProps) {
  const dataUser = useAppSelector((state) => state.Auth.user);

  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);

  const [text, setText] = useState("");
  const [listMessage, setListMessage] = useState<listMessageProps[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const socket = new WebSocket(`${APP_URL_WS_BACK}/ws/${props.unique_code}/`);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established.");
    });

    socket.addEventListener("message", (event) => {
      const newData = JSON.parse(event.data);
      setListMessage((prevState) => [...prevState, newData]);
      console.log("Recibi ese Mensaje", newData);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed.");
    });

    setChatSocket(socket);

    return () => {
      socket.close();
    };
  }, [props.id_chat]);

  useEffect(() => {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
      },
    };
    axios
      .get(`${APP_URL_HTTP_BACK}/chat/${props.id_chat}/messages/`, config)
      .then((response) => {
        if (response.status == 200) {
          setListMessage(response.data);
        }
      });

    return setListMessage([]);
  }, [props.id_chat]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [listMessage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("Paso el InputChange");
    setText(event.target.value);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Message sent: ${text}`);
    if (!text.trim()) return;

    chatSocket?.send(
      JSON.stringify({
        message: text,
        username: dataUser?.email,
        room: props.unique_code,
      })
    );

    setText("");
  };

  function formatTimeAgo(dateString: string): string {
    const currentTime = new Date();
    const pastTime = new Date(dateString);
    const timeDifference = currentTime.getTime() - pastTime.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `hace ${days} día${days !== 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    } else {
      return "hace unos segundos";
    }
  }

  return (
    <div className="flex-col w-full bg-purple-950/20 text-white rounded-3xl">
      <div className="flex justify-between text-lg font-medium mb-4 bg-purple-950 rounded-t-3xl p-3">
        <p>{props.name_chat}</p>
      </div>

      <div className="relative w-full h-[62vh] overflow-hidden p-3">
        <ul
          className={`h-full w-full relative overflow-y-auto flex flex-col gap-2 ${
            listMessage.length < 14 ? " justify-end" : ""
          }`}
          ref={containerRef}
        >
          {listMessage &&
            listMessage.map((message, index) => (
              <li
                key={index}
                className={`flex flex-col ${
                  message.username === dataUser?.email
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.username === dataUser?.email
                      ? "bg-violet-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                {
                  <span className="text-xs text-gray-400 mt-1">
                    {formatTimeAgo(message.timestamp)}
                  </span>
                }
              </li>
            ))}
        </ul>
      </div>
      <ChatInput
        text={text}
        handleInputChange={handleInputChange}
        toggleEmojiPicker={toggleEmojiPicker}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default ChatMessages;
