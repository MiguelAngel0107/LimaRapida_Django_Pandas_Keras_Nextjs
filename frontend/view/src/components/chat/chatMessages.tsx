import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./chatInput";
import { APP_URL_WS_BACK } from "@/globals";
import { useAppSelector } from "@/redux/hooks";

interface listMessageProps {
  username: string;
  message: string;
}

function ChatMessages() {
  const dataUser = useAppSelector((state) => state.Auth.user);

  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  const [listMessage, setListMessage] = useState<listMessageProps[]>([]);

  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const containerRef = useRef<HTMLUListElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPositionX, setLastPositionX] = useState(0);
  const [lastPositionY, setLastPositionY] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(`${APP_URL_WS_BACK}/ws/holamundo/`);

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
  }, []);

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

  const handleEmojiSelect = (emoji: string) => {
    setText(text + emoji);
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
        username: dataUser?.name,
        room: "holamundo",
      })
    );

    setText("");
  };

  const messages = [
    {
      id: 1,
      content: "Hola, ¿cómo estás?",
      sender: "Juan Perez",
      timestamp: "Hace 5 minutos",
    },
  ];

  //let MessagesFilters;
  //listMessage ? (MessagesFilters = listMessage) : (MessagesFilters = messages);
  //let MessagesBackennd;
  //ListMessages
  //  ? (MessagesBackennd = ListMessages)
  //  : (MessagesBackennd = messages);

  return (
    <div className="flex-col w-full bg-purple-950/20 text-white rounded-3xl">
      <div className="flex justify-between text-lg font-medium mb-4 bg-purple-950 rounded-t-3xl p-3">
        <p>Barra Informacion</p>
        <button>Retroceder</button>
      </div>

      <div className="relative w-full h-[62vh] overflow-hidden p-3">
        <ul
          className={`h-full w-full relative overflow-y-auto flex flex-col gap-2 ${
            listMessage.length < 14 ? " justify-end" : ""
          }`}
          ref={containerRef}
        >
          <>
            {/*MessagesBackennd.map((message, index) => (
          <li
            key={index}
            className={`flex flex-col ${
              message.username === idUser ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.username === idUser
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.message}</p>
            </div>
            <span className="text-xs text-gray-400 mt-1">Undefined</span>
          </li>
        ))}
        {MessagesFilters.map((message, index) => (
          <li
            key={index}
            className={`flex flex-col ${
              message.username === idUser ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.username === idUser
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.message}</p>
            </div>
            <span className="text-xs text-gray-400 mt-1">Undefined</span>
          </li>
            ))*/}
          </>

          {listMessage &&
            listMessage.map((message, index) => (
              <li
                key={index}
                className={`flex flex-col ${
                  message.username === dataUser?.name
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.username === dataUser?.name
                      ? "bg-violet-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
                {/*<span className="text-xs text-gray-400 mt-1">{dataUser?.name}</span>*/}
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
