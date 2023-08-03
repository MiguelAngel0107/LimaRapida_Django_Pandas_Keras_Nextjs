import React, { useEffect, useRef, useState } from "react";
import { sendImageToServer } from "@/redux/slices/actions/meet";

interface WebcamCaptureProps {
  onCapture: (image: string) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | undefined>(undefined);

  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara:", error);
      });

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setCount((state) => state + 1);
      if (stream && count <= 4) {

        // await captureImageLocal();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [stream, count]);

  const captureImageLocal = async () => {
    console.log(count);
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
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
    <div className="flex">
      {stream && <video ref={videoRef} autoPlay muted />}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default WebcamCapture;
