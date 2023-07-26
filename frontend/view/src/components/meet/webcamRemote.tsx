import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { APP_URL_WS_BACK } from "@/globals";

interface WebRTCConnectionProps {
  localStream: MediaStream | undefined;
}

const WebRTCConnection: React.FC<WebRTCConnectionProps> = ({ localStream }) => {
  const peerRef = useRef<Peer.Instance | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const [remoteStream, setRemoteStream] = useState<MediaStream | undefined>(undefined);

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
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div className="flex">
      {remoteStream && <video ref={remoteVideoRef} autoPlay />}
    </div>
  );
};

export default WebRTCConnection;
