"use client";
import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition, Popover } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faPhoneSlash,
  faMessage,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { APP_URL_WS_BACK } from "@/globals";
import Link from "next/link";

interface Conexion {
  id: string;
  RTCconexion: RTCPeerConnection;
}

export default function Page() {
  const [openChat, setOpenChat] = useState(false);
  const [onAudio, setOnAudio] = useState(false);
  const [onVideo, setOnVideo] = useState(false);
  const [onInfo, setOnInfo] = useState(false);

  const socket = useRef<WebSocket>();
  const PeerConnectionRefs = useRef<Conexion[]>([]);
  const idUserWebSocket = useRef<string[]>([]);

  const globalArrayMedia = useRef<MediaStream[]>([]);
  const [globalArrayState, setGlobalArrayState] = useState<MediaStream[]>([]);

  useEffect(() => {
    socket.current = new WebSocket(
      `${APP_URL_WS_BACK}/ws/video-test/${generateRandomCode()}/`
    );

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        globalArrayMedia.current.push(stream);
        setGlobalArrayState(globalArrayMedia.current);
        // console.log("ESTE es mi MediaStream LOCAL", stream);
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    return () => {
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

        newConnection.setRemoteDescription(new RTCSessionDescription(offerSdp));

        onTrackAlone(newConnection);

        const answerSdp = await newConnection.createAnswer();
        await controlDescriptionLocal(newConnection, answerSdp);

        socket.current?.send(
          JSON.stringify({ type: "send_answer", sdp: answerSdp })
        );

        addTracksToLocalConnection(newConnection, globalArrayMedia.current);

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
            console.log("Me envie desde el evento onicecandidate");
          }
        };

        PeerConnectionRefs.current.push({
          id: idUser,
          RTCconexion: newConnection,
        });

        reNegotiationRTC(PeerConnectionRefs.current);
      } else if (type === "candidate") {
        const candidate = data; //payload.candidate;

        const ConexionRef = findConnectionByUserId(idUser);

        const iceCandidate = new RTCIceCandidate(candidate);

        if (ConexionRef) {
          ConexionRef.RTCconexion.addIceCandidate(
            new RTCIceCandidate(iceCandidate)
          )
            .then(() => {
              //console.log("Candidato ICE agregado correctamente a la conexión");
            })
            .catch((error) => {
              console.error("Error al agregar el candidato ICE:", error);
            });
        }
      } else if (type === "connected") {
        idUserWebSocket.current[0] = idUser;
        idUserWebSocket.current[1] = data.name;
      } else if (type === "re_answer") {
        const answerSdp = data["sdp"]; //payload.sdp;
        const ConexionRef = findConnectionByUserId(idUser);
        if (ConexionRef) {
          ConexionRef.RTCconexion.setRemoteDescription(
            new RTCSessionDescription(answerSdp)
          );
        }
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

  function onTrackAlone(RTC: RTCPeerConnection) {
    RTC.ontrack = (event) => {
      const receivedStreams = event.streams;

      receivedStreams.forEach((receivedStream) => {
        globalArrayMedia.current?.push(receivedStream);
      });

      concatArrayMediaStreamNow(globalArrayMedia, setGlobalArrayState);
    };

    // RTC.onnegotiationneeded = (event) => {
    //   console.log("ON NEREGOTIATION", event);
    //   RTC.createOffer()
    //     .then((offer) => {
    //       return RTC.setLocalDescription(offer);
    //     })
    //     .then(() =>
    //       socket.current?.send(
    //         JSON.stringify({
    //           type: "renegotiation_offer",
    //           sdp: RTC.localDescription,
    //           msg: idUser,
    //         })
    //       )
    //     )
    //     .catch((err) => {
    //       console.log("ERR:", err);
    //     });
    // };
  }

  function reNegotiationRTC(ConexionesRTC: Conexion[]) {
    ConexionesRTC.forEach((conexionObj) => {
      conexionObj.RTCconexion.createOffer()
        .then((offer) => {
          return conexionObj.RTCconexion.setLocalDescription(offer);
        })
        .then(() =>
          socket.current?.send(
            JSON.stringify({
              type: "renegotiation_offer",
              sdp: conexionObj.RTCconexion.localDescription,
              msg: conexionObj.id,
            })
          )
        )
        .catch((err) => {
          console.log("ERR:", err);
        });
    });
  }

  const addTracksToLocalConnection = (
    peerConnection: RTCPeerConnection,
    streams: MediaStream[]
  ) => {
    console.log("--------------------------------------------------------");
    console.log(
      "Esta es la Lista CONEXIONES que voy a iterar:",
      PeerConnectionRefs.current
    );
    console.log("Esta es la Lista MediaStream que voy a iterar:", streams);

    const copiaListaMediaStreams = streams.slice();

    if (copiaListaMediaStreams.length > 0) {
      copiaListaMediaStreams.forEach((mediaStream) => {
        mediaStream.getTracks().forEach((track) => {
          peerConnection.addTransceiver(track, {
            streams: [mediaStream],
          });
        });
      });

      if (PeerConnectionRefs.current.length > 0) {
        PeerConnectionRefs.current.forEach((Conexion) => {
          console.log("Conexion:", Conexion);
          console.log(
            "RECEPTORES INIT:",
            Conexion.RTCconexion.getTransceivers()
          );
          copiaListaMediaStreams.forEach((mediaStream) => {
            console.log("mediaStream:", mediaStream);
            mediaStream.getTracks().forEach((track) => {
              console.log("track:", track);
              Conexion.RTCconexion.addTransceiver(track, {
                streams: [mediaStream],
              });
            });
          });
          console.log(
            "RECEPTORES END:",
            Conexion.RTCconexion.getTransceivers()
          );
        });
      }
    }

    console.log("--------------------------------------------------------");
  };

  function concatArrayMediaStreamNow(
    ref: React.MutableRefObject<MediaStream[]>,
    setState: React.Dispatch<React.SetStateAction<MediaStream[]>>
  ) {

    const arraySinDuplicados = ref.current.filter(
      (elemento, indice, arreglo) => {
        return (
          arreglo.findIndex((mediaStream) => mediaStream.id === elemento.id) ===
          indice
        );
      }
    );

    setState(arraySinDuplicados);
    ref.current = arraySinDuplicados;
  }

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

  function styleGrid(size: number, index: number): [string, string] {
    console.log(size, index);
    switch (size) {
      case 1:
        return ["col-span-4", "h-[88vh]"];
      case 2:
        return ["col-span-2", "h-[44vh]"];
      case 3:
        return ["col-span-2", "h-[44vh]"];
      case 4:
        return ["col-span-2", "h-[44vh]"];
      default:
        return ["", ""];
    }
  }

  return (
    <div className="grid grid-cols-10 gap-4 m-10">
      <div
        className={`${
          openChat ? "col-span-8" : "col-span-10"
        } bg-gradient-to-y from-purple-950/60 to-gray-950 rounded-3xl`}
      >
        <div className="flex-col h-screen">
          {/*        <div className="w-full bg-purple-900 rounded-t-3xl p-2">options</div>*/}
          {/* Participantes */}
          <div className="grid grid-cols-4 justify-items-center my-4 h-[88vh]">
            {globalArrayState.map((person, index) => {
              // const mediaStream = new MediaStream();
              // mediaStream.addTrack(person);
              const [span, height] = styleGrid(globalArrayState.length, index);
              return (
                <div
                  key={index}
                  className={`${span} bg-gray-950 rounded-2xl flex justify-center items-center border border-purple-950/30`}
                >
                  <video
                    ref={(ref) => {
                      if (ref) {
                        ref.srcObject = person;
                      }
                    }}
                    className={`rounded-2xl w-full ${height}`}
                    autoPlay
                    playsInline
                    muted
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
            <Popover>
              <Popover.Button>
                <div className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950">
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div>
              </Popover.Button>
              <Popover.Panel className="flex flex-col justify-center text-center absolute -bottom-24 bg-white p-4 rounded-3xl text-black border-2 border-purple-600 ">
                Este es el link de la Reunion:
                <Link
                  href="/reunion"
                  className="text-purple-600 hover:underline"
                >
                  https://www.owndark.com/meet?code={idUserWebSocket.current[1]}
                </Link>
              </Popover.Panel>
            </Popover>
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
