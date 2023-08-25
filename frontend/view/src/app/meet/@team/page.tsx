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
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { APP_URL_WS_BACK } from "@/globals";
import ChatMeet from "@/components/meet/chatMeet";

export default function Page() {
  const [openChat, setOpenChat] = useState(false);
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("code_meet") ? false : true
  );
  const [onAudio, setOnAudio] = useState(true);
  const [onVideo, setOnVideo] = useState(true);

  const [ticketCode, setTicketCode] = useState("");
  const socket = useRef<WebSocket>();
  const PeerConnection = useRef<RTCPeerConnection>(new RTCPeerConnection());
  const idUserWebSocket = useRef<string>("");

  const [localStream, setLocalStream] = useState<MediaStream | undefined>(
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

        globalArrayMedia.current.push(stream);
        setGlobalArrayState(globalArrayMedia.current);
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara y el micrófono:", error);
      });

    const code = localStorage.getItem("code_meet");

    if (code) {
      setTicketCode(code);
      if (socket.current == undefined) {
        socket.current = new WebSocket(
          `${APP_URL_WS_BACK}/ws/video-test/${code}/`
        );
      }
      setTimeout(() => handleStartCall(), 2000);
      console.log("Me ejecute osea prendi el websocket");
      localStorage.removeItem("code_meet");
    }

    return () => {
      // if (code) {
      //   localStorage.removeItem("code_meet");
      // }
      PeerConnection.current.close();
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

      //console.log("Recibido del Servidor:", data);

      if (
        type === "answer" &&
        PeerConnection.current &&
        CountICE.current <= 3
      ) {
        console.log("Entre a Answer");
        const answerSdp = data; //payload.sdp;
        PeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answerSdp)
        );
      } else if (type === "candidate" && PeerConnection.current) {
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
        console.log("Entre a ReOffer");
        const offerSdp = data["sdp"]; //payload.sdp;
        console.log("ME HA LLEGADO UNA RENEGOCIACION");

        PeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offerSdp)
        );

        const answerSdp = await PeerConnection.current.createAnswer();
        await PeerConnection.current.setLocalDescription(answerSdp);

        socket.current?.send(
          JSON.stringify({ type: "renegotiation_answer", sdp: answerSdp })
        );
      } else if (
        type === "re_answer" &&
        PeerConnection.current &&
        data["receiver"] == idUserWebSocket.current
      ) {
        console.log("Entre a ReAnswer");
        const answerSdp = data["sdp"]; //payload.sdp;

        PeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answerSdp)
        );
      }
    });

    socket.current?.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });
  }, [isOpen]);

  function closeModal() {
    socket.current = new WebSocket(
      `${APP_URL_WS_BACK}/ws/video-test/${ticketCode}/`
    );
    setTimeout(() => handleStartCall(), 2000);
    setIsOpen(false);
  }

  const addTracksToLocalConnection = (
    peerConnection: RTCPeerConnection,
    stream: MediaStream | undefined
  ) => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        peerConnection.addTransceiver(track, {
          streams: [stream],
          direction: "sendonly",
        });
      });
    }
  };

  function setAudioRTC() {
    if (onAudio && PeerConnection.current) {
      // Suponiendo que 'peerConnection' es tu conexión WebRTC ya establecida
      const audioTransceiver = PeerConnection.current
        .getTransceivers()
        .find((transceiver) => transceiver.sender.track?.kind === "audio");

      if (audioTransceiver) {
        const audioTrack = audioTransceiver.sender.track;

        if (audioTrack) {
          audioTrack.enabled = false; // o true para desmutear
        }
      }
      setOnAudio((onAudio) => !onAudio);

      reNegotiationRTC(PeerConnection.current);
    } else {
      // Suponiendo que 'peerConnection' es tu conexión WebRTC ya establecida
      const audioTransceiver = PeerConnection.current
        .getTransceivers()
        .find((transceiver) => transceiver.sender.track?.kind === "audio");

      if (audioTransceiver) {
        const audioTrack = audioTransceiver.sender.track;

        if (audioTrack) {
          audioTrack.enabled = true; // o true para desmutear
        }
      }
      setOnAudio((onAudio) => !onAudio);

      reNegotiationRTC(PeerConnection.current);
    }
  }

  function setVideoRTC() {
    if (onVideo && PeerConnection.current) {
      // Suponiendo que 'peerConnection' es tu conexión WebRTC ya establecida
      const videoTransceiver = PeerConnection.current
        .getTransceivers()
        .find((transceiver) => transceiver.sender.track?.kind === "video");

      if (videoTransceiver) {
        const videoTrack = videoTransceiver.sender.track;

        if (videoTrack) {
          videoTrack.enabled = false; // o true para desmutear
        }
      }
      setOnVideo((onVideo) => !onVideo);

      reNegotiationRTC(PeerConnection.current);
    } else {
      // Suponiendo que 'peerConnection' es tu conexión WebRTC ya establecida
      const videoTransceiver = PeerConnection.current
        .getTransceivers()
        .find((transceiver) => transceiver.sender.track?.kind === "video");

      if (videoTransceiver) {
        const videoTrack = videoTransceiver.sender.track;

        if (videoTrack) {
          videoTrack.enabled = true; // o true para desmutear
        }
      }
      setOnVideo((onVideo) => !onVideo);

      reNegotiationRTC(PeerConnection.current);
    }
  }

  const controlDescriptionLocal = async (
    peerConnection: RTCPeerConnection,
    sdp: RTCSessionDescriptionInit
  ) => {
    peerConnection.setLocalDescription(sdp);
  };

  const handleStartCall = async () => {
    if (globalArrayMedia.current[0] && PeerConnection.current) {
      console.log("Se estableció peerconectionRtc");
      addTracksToLocalConnection(
        PeerConnection.current,
        globalArrayMedia.current[0]
      );
      const offerSdp = await PeerConnection.current.createOffer();
      await controlDescriptionLocal(PeerConnection.current, offerSdp);
      socket.current?.send(
        JSON.stringify({
          type: "send_offer",
          sdp: offerSdp,
          msg: "Envio Recibido",
        })
      );
      console.log("envie un mensaje al servidor de websocket");
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

  function reNegotiationRTC(peerConection: RTCPeerConnection) {
    // console.log("Entre A la funcion de Renegocicacioon");
    peerConection
      .createOffer()
      .then((offer) => {
        return peerConection.setLocalDescription(offer);
      })

      .then(() => {
        // console.log("Voy a enviar la offerta");
        // console.log(socket.current);
        socket.current?.send(
          JSON.stringify({
            type: "renegotiation_offer",
            sdp: peerConection.localDescription,
            msg: "host",
          })
        );
      })
      .catch((err) => {
        console.log("ERR:", err);
      });
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
      console.log("Receiver Track", event.receiver);
      console.log("tRANCEPTOR Track", event.transceiver);
      const receivedStreams = event.streams;

      receivedStreams.forEach((receivedStream) => {
        console.log("Añadi un elemento");
        console.log(receivedStream);
        globalArrayMedia.current.push(receivedStream);
      });
      concatArrayMediaStreamNow(globalArrayMedia, setGlobalArrayState);
      console.log("------------------------------------------------");
    };
  }

  function styleGrid(size: number, index: number): [string, string] {
    //console.log(size, index);
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
        return ["col-span-1", "h-[22vh]"];
    }
  }

  const handleInputChange = (event: any) => {
    const newValue = event.target.value.toUpperCase();
    setTicketCode(newValue);
  };

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
          } bg-gradient-to-y from-purple-950/60 to-gray-950 rounded-3xl`}
        >
          <div className="flex-col h-screen">
            {/*        <div className="w-full bg-purple-900 rounded-t-3xl p-2">options</div>*/}

            {/* Participantes */}
            <div className="grid grid-cols-4 justify-items-center my-4 h-[88vh]">
              {globalArrayState.map((person, index) => {
                // const mediaStream = new MediaStream();
                // mediaStream.addTrack(person);
                const [span, height] = styleGrid(
                  globalArrayState.length,
                  index
                );
                return (
                  <div
                    key={index}
                    className={`${span} bg-gray-950 rounded-2xl flex justify-center items-center border border-purple-950/30`}
                  >
                    <video
                      ref={(ref) => {
                        if (ref && index == 0) {
                          const clonedStream = new MediaStream();
                          person.getTracks().forEach((track) => {
                            clonedStream.addTrack(track.clone());
                          });
                          const audioTracks = clonedStream.getAudioTracks();

                          if (audioTracks.length > 0) {
                            const trackToRemove = audioTracks[0];
                            clonedStream.removeTrack(trackToRemove);
                          }
                          ref.srcObject = clonedStream;
                        } else if (ref) {
                          ref.srcObject = person;
                        }
                      }}
                      className={`rounded-2xl w-full ${height}`}
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
                onClick={() => setAudioRTC()}
                className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
              >
                {onAudio ? (
                  <FontAwesomeIcon icon={faMicrophone} className="text-white" />
                ) : (
                  <FontAwesomeIcon
                    icon={faMicrophoneSlash}
                    className="text-white"
                  />
                )}
              </div>

              <div
                onClick={() => setVideoRTC()}
                className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
              >
                {onVideo ? (
                  <FontAwesomeIcon icon={faVideo} className="text-white" />
                ) : (
                  <FontAwesomeIcon icon={faVideoSlash} className="text-white" />
                )}
              </div>

              <div className="flex p-2 h-12 w-12 justify-center items-center bg-red-900 rounded-full hover:bg-red-800">
                <FontAwesomeIcon icon={faPhoneSlash} className="text-white" />
              </div>

              <div
                onClick={() => setOpenChat((chat) => !chat)}
                className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
              >
                <FontAwesomeIcon icon={faMessage} className="text-white" />
              </div>

              {/*<div
                onClick={() => {
                  console.log(PeerConnection.current.getTransceivers());
                }}
                className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
              >
                GET
              </div>
              <div
                onClick={() => {
                  console.log("List Array Ref:", globalArrayMedia.current);
                  console.log("List Array State:", globalArrayState);
                }}
                className="flex p-2 h-12 w-12 justify-center items-center bg-gray-950 rounded-full hover:bg-purple-950"
              >
                STATE
              </div>*/}
            </div>
          </div>
        </div>
        <div
          className={`${
            openChat ? "col-span-2" : "hidden"
          } bg-gradient-to-b from-purple-950/60 to-gray-950 rounded-3xl`}
        >
          {ticketCode.length == 11 ? (
            <div
              className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-1/4 bg-gray-950 ${
                openChat ? "translate-x-0" : "translate-x-full"
              } transition-transform ease-in-out duration-300`}
            >
              <div
                className="absolute top-2 left-2 text-white z-50 bg-purple-900 hover:bg-purple-800 p-1 rounded-full cursor-pointer"
                onClick={() => setOpenChat((state) => !state)}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-white w-6 h-6 mt-1 px-1"
                />
              </div>

              <div className="bg-gradient-to-b from-purple-950 to-gray-950 rounded-l-lg">
              <ChatMeet unique_code={ticketCode} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
