import React, { useRef, useEffect, useState, VideoHTMLAttributes } from "react";

interface VideoRemoteProps {
  id: number;
  stream: MediaStream;
}

function VideosRemotes(props: VideoRemoteProps) {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
    props.stream
  );

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      console.log("Iniciado Remoto:", localStream);
      // Verificar si hay al menos una pista en el MediaStream
      if (localStream.getTracks().length === 0) {
        console.log("No hay pistas disponibles en el MediaStream.");
        // Puedes tomar alguna acción aquí en caso de que el stream no tenga pistas.
      } else {
        // Mostrar información sobre las pistas de video
        const videoTracks = localStream.getVideoTracks();
        if (videoTracks.length > 0) {
          console.log("Pistas de video disponibles en el MediaStream:");
          videoTracks.forEach((track) => {
            console.log("Id de la pista:", track.id);
            console.log("Etiqueta de la pista:", track.label);
            console.log("Tipo de la pista:", track.kind);
          });
        } else {
          console.log("No hay pistas de video en el MediaStream.");
        }

        // Mostrar información sobre las pistas de audio
        const audioTracks = localStream.getAudioTracks();
        if (audioTracks.length > 0) {
          console.log("Pistas de audio disponibles en el MediaStream:");
          audioTracks.forEach((track) => {
            console.log("Id de la pista:", track.id);
            console.log("Etiqueta de la pista:", track.label);
            console.log("Tipo de la pista:", track.kind);
          });
        } else {
          console.log("No hay pistas de audio en el MediaStream.");
        }
      }

      
      localVideoRef.current.srcObject = localStream;
    }
    console.log("Ref:", localVideoRef.current?.srcObject);
  }, [localStream]);

  return (
    <video
      ref={localVideoRef}
      autoPlay
      muted
      onLoadedMetadata={() => localVideoRef.current?.play()}
    />
  );
}

export default VideosRemotes;
