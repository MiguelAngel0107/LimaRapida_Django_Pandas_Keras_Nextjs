"use client";
import React, { useRef, useEffect, useState, VideoHTMLAttributes } from "react";
import Peer from "simple-peer";
import { APP_URL_WS_BACK } from "@/globals";
import Camera from "@/components/meet/camera";

const Page: React.FC = () => {
  const peerRef = useRef<Peer.Instance | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
    undefined
  );
  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(
    undefined
  );

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });

    return () => {
      peerRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`${APP_URL_WS_BACK}/ws/video/holamundo/`);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");

      const peer = new Peer({ initiator: true, stream: localStream });

      peer.on("signal", (offer) => {
        socket.send(JSON.stringify(offer));
      });

      peer.on("stream", (stream) => {
        setRemoteStream(stream);
      });

      socket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);

        if (message.type === "offer") {
          // Procesar la oferta y generar la respuesta
          const peer = new Peer({ initiator: false, stream: localStream });
          peer.on("signal", (answer) => {
            // Enviar la respuesta al participante 1 a través del WebSocket
            socket.send(JSON.stringify(answer));
          });

          // Establecer la descripción de sesión del participante 1
          peer.signal(message);
        } else if (message.type === "answer") {
          peer.signal(message);
        } else if (message.type === "candidate") {
          try {
            peer.signal(message);
          } catch (e) {
            console.log(e);
            console.log(message);
          }
        }
      });

      peerRef.current = peer;
    });

    socket.addEventListener("close", (event) => {
      console.log("Conexión WebSocket cerrada:", event.code, event.reason);
    });

    return () => {
      socket.close();
      peerRef.current?.destroy();
    };
  }, [localStream]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div>
      <h1>Next.js Webcam Example</h1>
      {/*<Camera />*/}

      {localStream && <video ref={localVideoRef} autoPlay muted />}
      {remoteStream && <video ref={remoteVideoRef} autoPlay muted />}
    </div>
  );
};

export default Page;
