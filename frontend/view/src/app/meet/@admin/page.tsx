"use client";
import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faPhoneSlash,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { APP_URL_WS_BACK } from "@/globals";

interface Conexion {
  id: string;
  RTCconexion: RTCPeerConnection;
}

export default function Page() {
  const [openChat, setOpenChat] = useState(false);
  const [onAudio, setOnAudio] = useState(false);
  const [onVideo, setOnVideo] = useState(false);

  const socket = useRef<WebSocket>();
  const PeerConnectionRefs = useRef<Conexion[]>([]);
  const idUserWebSocket = useRef<string>("");

  const globalRef = useRef<MediaStream>();
  const [globalStream, setGlobalStream] = useState<MediaStream | undefined>(
    undefined
  );

  useEffect(() => {
    console.log("Streams Globales:", globalStream);
  }, [globalStream]);

  useEffect(() => {
    socket.current = new WebSocket(
      `${APP_URL_WS_BACK}/ws/video-test/${generateRandomCode()}/`
    );

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        globalRef.current = stream;
        setGlobalStream(stream);
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    return () => {
      console.log("Me desmonte");
      socket.current?.close();
    };
  }, []);

  useEffect(() => {
    socket.current?.addEventListener("open", () => {
      console.log("WebSocket connection established Instance");
    });

    socket.current?.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;
      const idUser = data["idUser"];
      delete data["idUser"];

      // console.log("Recibido del Servidor:", data);

      if (type === "offer") {
        const offerSdp = data; //payload.sdp;

        const newConnection = new RTCPeerConnection();

        addTracksToLocalConnection(newConnection, globalRef.current);
        newConnection.setRemoteDescription(new RTCSessionDescription(offerSdp));

        const answerSdp = await newConnection.createAnswer();
        await controlDescriptionLocal(newConnection, answerSdp);

        socket.current?.send(
          JSON.stringify({ type: "send_answer", sdp: answerSdp })
        );

        newConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.current?.send(
              JSON.stringify({
                type: "send_ice_candidate",
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex,
              })
            );
          }
        };

        newConnection.ontrack = (event) => {
          console.log("Cambie el estado de los Streams ");
          console.log("Streams:", event.streams);

          const receivedStreams = event.streams;

          receivedStreams.forEach((receivedStream) => {

            // Obtener las pistas individuales de audio y video
            const audioTracks = receivedStream.getAudioTracks();
            const videoTracks = receivedStream.getVideoTracks();

            audioTracks.forEach((audioTrack) => {
              globalStream?.addTrack(audioTrack);
            });

            videoTracks.forEach((videoTrack) => {
              globalStream?.addTrack(videoTrack);
            });
          });
        };

        PeerConnectionRefs.current.push({
          id: idUser,
          RTCconexion: newConnection,
        });

        //console.log(PeerConnectionRefs);
      } else if (type === "candidate") {
        const candidate = data; //payload.candidate;

        const ConexionRef = findConnectionByUserId(idUser);
        //console.log("Conexion Encontrada:", ConexionRef);

        const iceCandidate = new RTCIceCandidate(candidate);

        if (ConexionRef) {
          ConexionRef.RTCconexion.addIceCandidate(
            new RTCIceCandidate(iceCandidate)
          )
            .then(() => {
              console.log("Candidato ICE agregado correctamente a la conexión");
            })
            .catch((error) => {
              console.error("Error al agregar el candidato ICE:", error);
            });
        }
      } else if (type === "connected") {
        idUserWebSocket.current = idUser;
      }
    });

    socket.current?.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      // connections.forEach((connection) => connection.close());
      // socket.close();
    };
  }, []);

  const addTracksToLocalConnection = (
    peerConnection: RTCPeerConnection,
    stream: MediaStream | undefined
  ) => {
    console.log("Agregar", stream);
    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // // Verificar si el MediaStream se agregó correctamente
      // const senders = peerConnection.getSenders();
      // const isStreamAdded = senders.some(
      //   (sender) =>
      //     sender.track && sender.track.kind === stream.getTracks()[0].kind
      // );

      // if (isStreamAdded) {
      //   console.log("Agregué correctamente el MediaStream a WebRTC", stream);
      // } else {
      //   console.log("Error al agregar el MediaStream a WebRTC");
      // }
    }
  };

  const controlDescriptionLocal = async (
    peerConnection: RTCPeerConnection,
    sdp: RTCSessionDescriptionInit
  ) => {
    peerConnection.setLocalDescription(sdp);
  };

  const findConnectionByUserId = (userId: string | undefined) => {
    return PeerConnectionRefs.current?.find((conn) => conn.id === userId);
  };

  function generateRandomCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Letras posibles
    let code = "";

    // Generar cada grupo de 3 letras aleatorias y unirlos con '-'
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Elegir una letra aleatoria
        const randomIndex = Math.floor(Math.random() * letters.length);
        const randomLetter = letters[randomIndex];

        // Agregar la letra al código
        code += randomLetter;
      }

      // Agregar el guión '-' después de cada grupo de 3 letras
      if (i < 2) {
        code += "-";
      }
    }

    return code;
  }

  return (
    <div className="grid grid-cols-10 gap-4 m-10">
      <div
        className={`${
          openChat ? "col-span-8" : "col-span-10"
        } bg-gradient-to-t from-purple-950/60 to-gray-950 rounded-3xl`}
      >
        <div>
          <div className="w-full bg-purple-900 rounded-t-3xl p-2">options</div>

          {/* Participantes */}
          <div className="grid grid-cols-4 justify-items-center my-4 gap-x-0 gap-y-6">
            {globalStream?.getVideoTracks().map((person, index) => {
              const mediaStream = new MediaStream();
              mediaStream.addTrack(person);
              return (
                <div
                  key={index}
                  className={`w-full col-span-4 h-[80vh] bg-gray-950 rounded-2xl flex justify-center items-center border border-purple-950/30`}
                >
                  <video
                    ref={(ref) => {
                      if (ref) {
                        ref.srcObject = mediaStream;
                      }
                    }}
                    className="rounded-2xl"
                    autoPlay
                    playsInline
                  />
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 p-2">
            <div
              onClick={() => setOnAudio((onAudio) => !onAudio)}
              className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
            >
              {onAudio ? (
                <FontAwesomeIcon icon={faMicrophone} />
              ) : (
                <FontAwesomeIcon icon={faMicrophoneSlash} />
              )}
            </div>

            <div
              onClick={() => setOnVideo((onVideo) => !onVideo)}
              className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
            >
              {onVideo ? (
                <FontAwesomeIcon icon={faVideo} />
              ) : (
                <FontAwesomeIcon icon={faVideoSlash} />
              )}
            </div>

            <div className="flex p-2 h-12 w-12 justify-center items-center bg-red-900 rounded-full hover:bg-red-800">
              <FontAwesomeIcon icon={faPhoneSlash} />
            </div>

            <div
              onClick={() => setOpenChat((chat) => !chat)}
              className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
            >
              <FontAwesomeIcon icon={faMessage} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          openChat ? "col-span-2" : "hidden"
        } bg-gradient-to-b from-purple-950/60 to-gray-950 rounded-3xl`}
      >
        Chat
      </div>
    </div>
  );
}
