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

export default function Page() {
  const [openChat, setOpenChat] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [onAudio, setOnAudio] = useState(false);
  const [onVideo, setOnVideo] = useState(false);

  const [ticketCode, setTicketCode] = useState("");
  const socket = useRef<WebSocket>();
  const PeerConnection = useRef<RTCPeerConnection>(new RTCPeerConnection());
  const idUserWebSocket = useRef<string>("");

  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
    undefined
  );
  const [globalStream, setGlobalStream] = useState<MediaStream | undefined>(
    undefined
  );
  const globalArrayMedia = useRef<MediaStream[]>([]);
  const [globalArrayState, setGlobalArrayState] = useState<MediaStream[]>([]);

  const CountICE = useRef<number>(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        setGlobalStream(stream);

        globalArrayMedia.current.push(stream);
        setGlobalArrayState(globalArrayMedia.current);
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

      if (
        type === "answer" &&
        PeerConnection.current &&
        CountICE.current <= 3
      ) {
        const answerSdp = data; //payload.sdp;
        PeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answerSdp)
        );
      } else if (
        type === "candidate" &&
        PeerConnection.current &&
        CountICE.current <= 3
      ) {
        const candidate = data; //payload.candidate;
        const iceCandidate = new RTCIceCandidate(candidate);
        PeerConnection.current
          .addIceCandidate(new RTCIceCandidate(iceCandidate))
          .then(() => {
            CountICE.current = CountICE.current + 1;
            // console.log(CountICE.current);
            // console.log("Candidato ICE agregado correctamente a la conexión");
          })
          .catch((error) => {
            console.error("Error al agregar el candidato ICE:", error);
          });
      } else if (type === "connected") {
        idUserWebSocket.current = idUser;
      } else if (
        type === "re_offer" &&
        PeerConnection.current &&
        data["receiver"] == idUserWebSocket.current
      ) {
        const offerSdp = data["sdp"]; //payload.sdp;

        PeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offerSdp)
        );

        const answerSdp = await PeerConnection.current.createAnswer();
        await PeerConnection.current.setLocalDescription(answerSdp);

        socket.current?.send(
          JSON.stringify({ type: "renegotiation_answer", sdp: answerSdp })
        );
      }
    });

    socket.current?.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    return () => {
      // connections.forEach((connection) => connection.close());
      // socket.close();
    };
  }, [isOpen]);

  useEffect(() => {
    console.log("Streams Globales:", globalStream);
  }, [globalStream]);

  function closeModal() {
    socket.current = new WebSocket(
      `${APP_URL_WS_BACK}/ws/video-test/${ticketCode}/`
    );
    setTimeout(() => handleStartCall(), 2000);
    setIsOpen(false);
  }

  const handleInputChange = (event: any) => {
    const newValue = event.target.value.toUpperCase();
    setTicketCode(newValue);
  };

  const addTracksToLocalConnection = (
    peerConnection: RTCPeerConnection,
    stream: MediaStream | undefined
  ) => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTransceiver(track, {
          streams: [stream],
        });
      });
    }
  };

  const controlDescriptionLocal = async (
    peerConnection: RTCPeerConnection,
    sdp: RTCSessionDescriptionInit
  ) => {
    peerConnection.setLocalDescription(sdp);
  };

  const handleStartCall = async () => {
    if (localStream && PeerConnection.current) {
      addTracksToLocalConnection(PeerConnection.current, localStream);
      const offerSdp = await PeerConnection.current.createOffer();
      await controlDescriptionLocal(PeerConnection.current, offerSdp);
      socket.current?.send(
        JSON.stringify({
          type: "send_offer",
          sdp: offerSdp,
          msg: "Envio Recibido",
        })
      );
    }
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

  if (PeerConnection.current) {
    PeerConnection.current.onicecandidate = (event) => {
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

    PeerConnection.current.ontrack = (event) => {
      console.log("------------------------------------------------");
      const receivedStreams = event.streams;
      const receivedTransceptor = event.transceiver.receiver.track;

      console.log("Trannceptor supuestamente recibido:", receivedTransceptor);

      console.log("Lista Recibida:", receivedStreams);

      // Clonar el globalStream para tener una copia modificable
      // console.log("Stream Antiguo:", globalStream);

      receivedStreams.forEach((receivedStream) => {
        globalArrayMedia.current?.push(receivedStream);
        console.log(
          "El Media Se LLAMA:",
          receivedStream.id,
          "y tiene :",
          receivedStream.getTracks().length
        );
      });
      concatArrayMediaStreamNow(globalArrayMedia, setGlobalArrayState);

      // const updatedStream = globalStream
      //   ? globalStream.clone()
      //   : new MediaStream();

      // receivedStreams.forEach((receivedStream) => {
      //   console.log("MediaStream Recibido", receivedStream);
      //   console.log(
      //     "Numero de Tracks recibidos:",
      //     receivedStream.getTracks().length
      //   );

      //   // Obtener las pistas individuales de audio y video
      //   const audioTracks = receivedStream.getAudioTracks();
      //   const videoTracks = receivedStream.getVideoTracks();

      //   audioTracks.forEach((audioTrack) => {
      //     //console.log('Tracks Recibidos Audio:', audioTrack)
      //     updatedStream.addTrack(audioTrack);
      //   });

      //   videoTracks.forEach((videoTrack) => {
      //     //console.log('Tracks Recibidos Audio:', videoTrack)
      //     updatedStream.addTrack(videoTrack);
      //   });
      // });

      console.log("------------------------------------------------");

      // setGlobalStream(updatedStream);
    };

    PeerConnection.current.onnegotiationneeded = (event) => {
      console.log("ON NEgociation", event);
    };
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}} static>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-purple-800"
                  >
                    Ingrese el codigo de la reunion
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="relative ">
                      <input
                        type="text"
                        value={ticketCode}
                        onChange={handleInputChange}
                        className="block font-semibold px-2.5 pb-1.5 pt-3 w-full text-sm rounded-lg border-2 border-gray-900 appearance-none text-purple-800 dark:border-gray-900 dark:focus:border-purple-700 focus:outline-none focus:ring-0 focus:border-purple-800 peer"
                        placeholder=" "
                      />
                      <label className="absolute font-medium text-sm text-black duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-purple-800 peer-focus:dark:text-purple-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Codigo
                      </label>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-800 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-800 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Entrar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="grid grid-cols-10 gap-4 m-10">
        <div
          className={`${
            openChat ? "col-span-8" : "col-span-10"
          } bg-gradient-to-t from-purple-950/60 to-gray-950 rounded-3xl`}
        >
          <div>
            <div className="w-full bg-purple-900 rounded-t-3xl p-2">
              options
            </div>

            {/* Participantes */}
            <div className="grid grid-cols-4 justify-items-center my-4 gap-x-0 gap-y-6">
              {globalArrayState.map((person, index) => {
                // const mediaStream = new MediaStream();
                // mediaStream.addTrack(person);
                return (
                  <div
                    key={index}
                    className={`w-full col-span-1 h-[80vh] bg-gray-950 rounded-2xl flex justify-center items-center border border-purple-950/30`}
                  >
                    <video
                      ref={(ref) => {
                        if (ref) {
                          ref.srcObject = person;
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

              <div
                onClick={() => {
                  const transceivers = PeerConnection.current.getTransceivers();
                  console.log("TRANSCEPTORES:", transceivers);
                }}
                className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
              >
                GET
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
    </>
  );
}
