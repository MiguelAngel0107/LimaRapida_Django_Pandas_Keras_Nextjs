"use client";
import React, { useRef, useEffect } from "react";
import Peer from "simple-peer";
import { APP_URL_WS_BACK } from "@/globals";
import Camera from "@/components/meet/camera";

const Page: React.FC = () => {
  const socket = useRef<WebSocket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const peer = useRef<Peer.Instance | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Establecer la conexión WebSocket
    socket.current = new WebSocket(`${APP_URL_WS_BACK}/ws/video/holamundo/`);

    // Escuchar eventos de la conexión WebSocket
    socket.current.onopen = () => {
      console.log("Conexión WebSocket abierta");
      // Aquí puedes realizar cualquier otra lógica adicional cuando la conexión se abre
    };

    socket.current.onmessage = (event) => {
      console.log("Mensaje recibido:", event.data);
      // Aquí puedes procesar los mensajes recibidos del servidor
      const signal = JSON.parse(event.data);
      peer.current?.signal(signal);
    };

    socket.current.onclose = (event) => {
      console.log("Conexión WebSocket cerrada:", event.code, event.reason);
      // Aquí puedes realizar cualquier otra lógica adicional cuando la conexión se cierra
    };

    return () => {
      // Cerrar la conexión WebSocket al desmontar el componente
      socket.current?.close();
    };
  }, []);

  useEffect(() => {
    // Obtener el stream de video y audio del usuario
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log('Got MediaStream:', stream);
        
        // Configurar la instancia de Peer
        peer.current = new Peer({
          initiator: true, // O false dependiendo del caso
          stream: stream,
          // Otras opciones según tus necesidades
        });

        // Manejar eventos de señalización de Peer
        peer.current.on("signal", (data: any) => {
          // Enviar la señal al servidor de señalización a través del WebSocket
          // console.log(JSON.stringify(data));

          socket.current?.send(JSON.stringify(data));
        });

        // Manejar eventos de conexión y flujo de video remoto
        peer.current.on("connect", () => {
          console.log("La conexión WebRTC se ha establecido");
          // La conexión WebRTC se ha establecido
          // ...
        });

        peer.current.on("stream", (stream: any) => {
          // Obtener el stream de video remoto y establecerlo en el elemento de video HTML
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = stream;
          }
        });

        // Establecer el stream de video local en un elemento de video HTML
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    return () => {
      // Cerrar la conexión Peer al desmontar el componente
      peer.current?.destroy();
    };
  }, []);

  return (
    <div>
      <h1>Next.js Webcam Example</h1>
      {/*<Camera />*/}
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay muted />
    </div>
  );
};

export default Page;
