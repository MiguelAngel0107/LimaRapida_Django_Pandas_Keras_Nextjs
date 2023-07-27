"use client";
import React, { useRef, useEffect, useState, VideoHTMLAttributes } from "react";
import { APP_URL_WS_BACK } from "@/globals";
import Camera from "@/components/meet/camera";
import { sendImageToServer } from "@/redux/slices/actions/meet";
import WebSocketInstance, {
  InstanceWebSocket,
} from "@/components/meet/instanceWebSocket";
import { useAppSelector } from "@/redux/hooks";

interface Connection {
  id: string | undefined;
  name: string;
  stream: MediaStream | undefined;
  peerConnection: RTCPeerConnection;
}

const Page: React.FC = () => {
  const dataUserId = useAppSelector((state) => state.Auth.user?.id);

  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
    undefined
  );
  const [connections, setConnections] = useState<Connection[]>([]);
  // En el estado del componente, inicializa un arreglo para almacenar los streams remotos
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [socket, setSocket] = useState<WebSocket>(InstanceWebSocket());

  useEffect(() => {
    console.log(connections);
  }, [connections]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        // if (localVideoRef.current) {
        //   console.log("cambie el estado de video ");
        //   localVideoRef.current.srcObject = stream;
        // }
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    return () => {
      console.log("Me desmonte");
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    socket?.addEventListener("open", () => {
      console.log("WebSocket connection established Instance");
    });

    socket?.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;

      // console.log(data);

      if (type === "offer") {
        // Aquí recibimos una oferta de otro participante
        const offerSdp = data; //payload.sdp;

        // Crear una nueva conexión RTCPeerConnection
        const peerConnection = new RTCPeerConnection();

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket?.send(
              JSON.stringify({
                type: "send_ice_candidate",
                candidate: event.candidate,
                msg: "Me envie desde | onicecandidate |",
              })
            );
          }
        };

        // Configurar la conexión con la descripción de la oferta recibida
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(offerSdp)
        );

        peerConnection.ontrack = (event) => {
          // event.streams contiene un arreglo de MediaStream que contiene los streams de medios recibidos
          const receivedStreams = event.streams;

          // Actualiza el estado con los nuevos streams remotos recibidos
          setRemoteStreams((prevRemoteStreams) => [
            ...prevRemoteStreams,
            ...receivedStreams,
          ]);

          console.log(
            "Streams Remotes -------------------------------------------------"
          );
          console.log(receivedStreams);
        };

        // Crear una respuesta (answer) basada en la descripción de la oferta recibida
        const answerSdp = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answerSdp);

        // Enviar la respuesta al servidor para que sea reenviada al otro participante
        socket?.send(JSON.stringify({ type: "send_answer", sdp: answerSdp }));

        // console.log(JSON.stringify({ type: "send_answer", sdp: answerSdp }));

        setConnections((prevConnections) => [
          ...prevConnections,
          {
            id: String(dataUserId),
            name: "Peer " + (prevConnections.length + 1),
            stream: undefined,
            peerConnection, // Store the RTCPeerConnection object in the Connection
          },
        ]);
      } else if (type === "answer") {
        const answerSdp = data; //payload.sdp;
        const connection = connections.find(
          (conn) => conn.id === String(dataUserId)
        );
        if (connection) {
          connection.peerConnection.setRemoteDescription(
            new RTCSessionDescription(answerSdp)
          );
        }
      } else if (type === "ice_candidate") {
        const candidate = data; //payload.candidate;
        const connection = connections.find(
          (conn) => conn.id === String(dataUserId)
        );
        if (connection) {
          connection.peerConnection.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        }
      }
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      // connections.forEach((connection) => connection.close());
      // socket.close();
    };
  }, [localStream]);

  const handleStartCall = async () => {
    if (localStream) {
      const peerConnection = new RTCPeerConnection();

      // Establecer el evento de recepción de candidatos ICE
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket?.send(
            JSON.stringify({
              type: "send_ice_candidate",
              candidate: event.candidate,
            })
          );

          //   console.log(
          //     JSON.stringify({
          //       type: "send_ice_candidate",
          //       candidate: event.candidate,
          //     })
          //   );
        }
      };

      // Añadir el stream local a la conexión
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // Crear una oferta (offer) para la conexión
      const offerSdp = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offerSdp);

      // Enviar la oferta al servidor de señalización para que se la reenvíe al otro participante
      socket?.send(
        JSON.stringify({
          type: "send_offer",
          sdp: offerSdp,
          msg: "Envio Recibido",
        })
      );

      //   console.log(
      //     JSON.stringify({
      //       type: "send_offer",
      //       sdp: offerSdp,
      //       msg: "Envio Recibido",
      //     })
      //   );

      // Agregar la nueva conexión a la lista de conexiones
      // setConnections((prevConnections) => [
      //   ...prevConnections,
      //   {
      //     id: "local",
      //     name: "Local",
      //     stream: localStream,
      //     peerConnection, // Store the RTCPeerConnection object in the Connection
      //   },
      // ]);
    }
  };

  return (
    <div>
      <h1>Next.js Webcam Example</h1>
      <div>
        {localStream != undefined && (
          <div className="flex text-zinc-50">
            <video ref={localVideoRef} autoPlay muted />
          </div>
        )}
        {connections.map((conn, index) => (
          <div key={index} className="flex" id={`${index}`}>
            {conn.stream ? (
              <video
                ref={(ref) => {
                  if (ref && conn.stream) {
                    ref.srcObject = conn.stream;
                  }
                }}
                autoPlay
                muted={conn.id === dataUserId} // Mute local video
              />
            ) : (
              <span>Loading...</span>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleStartCall}
        className=" bg-violet-600 p-2 rounded-3xl m-5 text-white"
      >
        Start Call
      </button>
    </div>
  );
};

export default Page;
