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
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket(`${APP_URL_WS_BACK}/ws/video/holamundo/`);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");

      if (localStream) {
        peerRef.current = new Peer({ initiator: true, stream: localStream });

        peerRef.current.on("signal", (offer) => {
          socket.send(JSON.stringify(offer));
        });

        peerRef.current.on("stream", (stream) => {
          setRemoteStream(stream);
        });
      }
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "offer") {
        if (!peerRef.current && localStream) {
          peerRef.current = new Peer({ initiator: false, stream: localStream });

          peerRef.current.on("signal", (answer) => {
            socket.send(JSON.stringify(answer));
          });

          peerRef.current.on("stream", (stream) => {
            setRemoteStream(stream);
          });
        }

        if (peerRef.current) {
          peerRef.current.signal(message);
        }
      } else if (message.type === "answer" && peerRef.current) {
        peerRef.current.signal(message);
      } else if (message.type === "candidate" && peerRef.current) {
        try {
          peerRef.current.signal(message);
        } catch (e) {
          console.error("Error al procesar el candidato de ICE:", e);
        }
      }
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      socket.close();
      if (peerRef.current) {
        peerRef.current.destroy();
      }
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
      <div >
        {localStream && <video ref={localVideoRef} autoPlay muted />}
        {remoteStream && <video ref={remoteVideoRef} autoPlay muted />}
      </div>
    </div>
  );
};

export default Page;
