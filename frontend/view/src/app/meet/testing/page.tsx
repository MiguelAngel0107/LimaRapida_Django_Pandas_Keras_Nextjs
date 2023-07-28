"use client";
import React, { useRef, useEffect, useState, VideoHTMLAttributes } from "react";
import { APP_URL_WS_BACK } from "@/globals";
import Camera from "@/components/meet/camera";
import { sendImageToServer } from "@/redux/slices/actions/meet";
import { useAppSelector } from "@/redux/hooks";
import { Stream } from "stream";
import VideosRemotes from "@/components/meet/videosRemotes";

interface Connection {
  id: string | undefined;
  name: string;
  peerConnection: RTCPeerConnection;
}

const Page: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
    undefined
  );
  const localStreamRef = useRef<MediaStream>();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const [connections, setConnections] = useState<Connection[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const createPeerConnection = useRef<RTCPeerConnection>();

  useEffect(() => {
    console.log("Conexiones:", connections);
    console.log("remoteStreams:", remoteStreams);
  }, [connections, remoteStreams]);

  useEffect(() => {
    connectionsRef.current = connections;
  }, [connections]);

  useEffect(() => {
    if (socket != null) {
      const peerConnection = createPeerConnectionFuntion();
      createPeerConnection.current = peerConnection;
    }
  }, [socket]);

  useEffect(() => {
    setSocket(new WebSocket(`${APP_URL_WS_BACK}/ws/video-test/testing/`));

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          console.log("cambie el estado de video ");
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    return () => {
      console.log("Me desmonte");
      socket?.close();
    };
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      console.log(localStream);
      localStreamRef.current = localStream;
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    console.log("EjecuteUseEffect -------------");

    socket?.addEventListener("open", () => {
      console.log("WebSocket connection established Instance");
    });

    socket?.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;
      const idUser = data["idUser"];
      delete data["idUser"];

      // console.log("Recibido del Servidor:", data);

      if (type === "offer" && createPeerConnection.current) {
        const offerSdp = data; //payload.sdp;
        // const peerConnection = createPeerConnection.current;
        addTracksToLocalConnection(
          createPeerConnection.current,
          localStreamRef.current
        );

        createPeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offerSdp)
        );

        const answerSdp = await createPeerConnection.current.createAnswer();
        // console.log("Tengo una respuesta:", answerSdp);
        await controlDescriptionLocal(createPeerConnection.current, answerSdp);
        //await peerConnection.setLocalDescription(answerSdp);

        socket?.send(JSON.stringify({ type: "send_answer", sdp: answerSdp }));

        addConnection(createPeerConnection.current, idUser);
      } else if (type === "answer" && createPeerConnection.current) {
        const answerSdp = data; //payload.sdp;
        const connection = findConnectionByUserId(idUser, type);
        if (connection) {
          console.log("Estado de Conexion para Answer:", connection);
          console.log("Estado de sdp para Answer:", answerSdp);
          connection.peerConnection.setRemoteDescription(
            new RTCSessionDescription(answerSdp)
          );
        }
        addConnection(createPeerConnection.current, idUser);
      } else if (type === "candidate") {
        const candidate = data; //payload.candidate;
        const connection = findConnectionByUserId(idUser, type);
        console.log("Estado FUERA de Conexion para Answer:", connection);
        const iceCandidate = new RTCIceCandidate(candidate);
        console.log("ICE generado", iceCandidate);
        if (connection) {
          connection.peerConnection.addIceCandidate(
            new RTCIceCandidate(iceCandidate)
          );
        }
      }
    });

    socket?.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      // connections.forEach((connection) => connection.close());
      // socket.close();
    };
  }, [socket]); // localstream

  const addTracksToLocalConnection = (
    peerConnection: RTCPeerConnection,
    stream: MediaStream | undefined
  ) => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Verificar si el MediaStream se agregó correctamente
      const senders = peerConnection.getSenders();
      const isStreamAdded = senders.some(
        (sender) =>
          sender.track && sender.track.kind === stream.getTracks()[0].kind
      );

      if (isStreamAdded) {
        console.log("Agregué correctamente el MediaStream a WebRTC", stream);
      } else {
        console.log("Error al agregar el MediaStream a WebRTC");
      }
    }
  };

  const addConnection = (
    peerConnection: RTCPeerConnection,
    idConexion: string
  ) => {
    setConnections((prevConnections) => [
      ...prevConnections,
      {
        id: idConexion,
        name: "Peer " + (prevConnections.length + 1),
        peerConnection,
      },
    ]);
  };

  const findConnectionByUserId = (userId: string | undefined, type: string) => {
    // console.log(
    //   "Busque Conexiones para:",
    //   type,
    //   " Estas Encontre",
    //   connectionsRef.current
    // );
    return connectionsRef.current.find((conn) => conn.id === userId);
  };

  const controlDescriptionLocal = async (
    peerConnection: RTCPeerConnection,
    sdp: RTCSessionDescriptionInit
  ) => {
    peerConnection.setLocalDescription(sdp);
  };

  const handleStartCall = async () => {
    if (localStream && createPeerConnection.current) {
      // const peerConnection = createPeerConnection.current;
      addTracksToLocalConnection(createPeerConnection.current, localStream);

      const offerSdp = await createPeerConnection.current.createOffer();
      await controlDescriptionLocal(createPeerConnection.current, offerSdp);
      //await peerConnection.setLocalDescription(offerSdp);

      socket?.send(
        JSON.stringify({
          type: "send_offer",
          sdp: offerSdp,
          msg: "Envio Recibido",
        })
      );

      // addConnection(createPeerConnection.current, "Local");
    }
  };

  const createPeerConnectionFuntion = () => {
    console.log("Se creo una instancia RTC");
    return new RTCPeerConnection();
  };

  

  if (createPeerConnection.current) {
    createPeerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({
            type: "send_ice_candidate",
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          })
        );
      }
    };

    createPeerConnection.current.ontrack = (event) => {
      console.log("Cambie el estado de los Streams");
      setRemoteStreams((prevStreams) => [...prevStreams, ...event.streams]);
    };
  }

  return (
    <div>
      <h1>Next.js Webcam Example</h1>
      <div>
        {localStream != undefined && (
          <div className="flex text-zinc-50">
            <video ref={localVideoRef} autoPlay muted />
          </div>
        )}
        {remoteStreams.map((stream, index) => {
          // console.log("Ref Html:", stream); //(parameter) stream: MediaStream
          return (
            <div key={index} className="flex" id={`remote_${index}`}>
              {/* <video ref={(ref) => (remoteVideoRefs.current[index] = ref)} srcObject={stream} autoPlay />*/}
              <VideosRemotes stream={stream} id={index} />
            </div>
          );
        })}
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
