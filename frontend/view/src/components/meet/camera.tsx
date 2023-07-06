'use client'
import React, { useRef, useEffect } from 'react';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Solicitar permiso para acceder a la cámara web
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Asignar el flujo de la cámara al elemento de video
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara web:', error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Cámara web</h1>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default Camera;
