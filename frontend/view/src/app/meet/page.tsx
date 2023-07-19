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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | undefined>(
    undefined
  );

  const canvasRefLocal = useRef<HTMLCanvasElement | null>(null);
  const [capturedImageLocal, setCapturedImageLocal] = useState<
    string | undefined
  >(undefined);

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

  const captureImage = () => {
    if (canvasRef.current && remoteVideoRef.current) {
      const canvas = canvasRef.current;
      const video = remoteVideoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      // Aquí puedes enviar la imagen al servidor Django para su procesamiento con IA
      console.log("Imagen capturada:", imageUrl);
      setCapturedImage(imageUrl);
    }
  };

  const captureImageLocal = () => {
    if (canvasRefLocal.current && localVideoRef.current) {
      const canvas = canvasRefLocal.current;
      const video = localVideoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        ?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      // Aquí puedes enviar la imagen al servidor Django para su procesamiento con IA
      console.log("Imagen capturada:", imageUrl);
      setCapturedImageLocal(imageUrl);
    }
  };

  return (
    <div>
      <h1>Next.js Webcam Example</h1>
      {/*<Camera />*/}
      <div>
        {/*localStream && <video ref={localVideoRef} autoPlay muted />*/}
        {/*remoteStream && <video ref={remoteVideoRef} autoPlay muted />*/}

        {localStream && (
          <div className="flex">
            <div>
              <video ref={localVideoRef} autoPlay muted />
              <button
                onClick={captureImageLocal}
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Capturar imagen Local
              </button>
            </div>
            {localStream && (
              <>
                <h2>Previsualización de la imagen capturada:</h2>
                <canvas ref={canvasRefLocal} />
                {/*capturedImageLocal && (
            <div>
              <img src={capturedImageLocal} alt="Captured" />
            </div>
          )*/}
              </>
            )}
          </div>
        )}
        {remoteStream && (
          <div className="flex">
            <div>
              <video ref={remoteVideoRef} autoPlay muted />
              <button
                onClick={captureImage}
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
              >
                Capturar imagen Remota
              </button>
            </div>
            {remoteStream && (
              <>
                <h2>Previsualización de la imagen capturada:</h2>
                <canvas ref={canvasRef} />
                {/*capturedImage && (
            <div>
              <img src={capturedImage} alt="Captured" />
            </div>
          )*/}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
