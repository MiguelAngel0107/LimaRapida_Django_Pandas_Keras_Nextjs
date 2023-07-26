"use client";
import React, { useRef, useEffect, useState, VideoHTMLAttributes } from "react";
import Peer from "simple-peer";
import { APP_URL_WS_BACK } from "@/globals";
import Camera from "@/components/meet/camera";
import { sendImageToServer } from "@/redux/slices/actions/meet";

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
  const canvasRefLocal = useRef<HTMLCanvasElement | null>(null);

  const [count, setCount] = useState<number>(0);

  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const peersRef = useRef<Peer.Instance[]>([]);

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
      //if (peerRef.current) {
      //  peerRef.current.destroy();
      //}
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
      //if (peerRef.current) {
      //  peerRef.current.destroy();
      //}
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setCount((state) => state + 1);
      if (localStream && count <= 4) {
        //await captureImageLocal();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [localStream, count]);

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
      // setCapturedImage(imageUrl);
    }
  };

  const captureImageLocal = async () => {
    console.log(count);
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
      // console.log("Imagen capturada:", imageUrl);
      // setCapturedImageLocal(imageUrl);

      // Crear un objeto FormData para enviar la imagen como multipart/form-data
      const formData = new FormData();
      formData.append("imagen", dataURItoBlob(imageUrl));

      await sendImageToServer(formData, setCount);
    }
  };

  // Función para convertir la imagen en formato base64 a Blob
  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([intArray], { type: mimeString });
  };

  return (
    <div>
      <h1>Next.js Webcam Example</h1>
      <div>
        {localStream && (
          <div className="flex">
            <video ref={localVideoRef} autoPlay muted />
            <canvas ref={canvasRefLocal} style={{ display: "none" }} />
          </div>
        )}
        {remoteStream && (
          <div className="flex">
            <video ref={remoteVideoRef} autoPlay muted />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
