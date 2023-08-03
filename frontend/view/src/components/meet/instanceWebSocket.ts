import { APP_URL_WS_BACK } from "@/globals";

class WebSocketInstance {
  private static instance: WebSocketInstance | null = null;
  private socket: WebSocket | null = null;
  private socketFree: WebSocket | null = null;

  private constructor() {
    //if (!WebSocketInstance.instance) {
    //  WebSocketInstance.instance = this;
    //}
    //return WebSocketInstance.instance;
  }

  static getInstance(): WebSocketInstance {
    if (!WebSocketInstance.instance) {
      WebSocketInstance.instance = new WebSocketInstance();
    }

    return WebSocketInstance.instance;
  }

  get_socket(roomName: string): WebSocket | null {
    this.socketFree = new WebSocket(
      `${APP_URL_WS_BACK}/ws/video-test/${roomName}/`
    );
    return this.socketFree;
  }

  connect(roomName: string): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(
        `${APP_URL_WS_BACK}/ws/video-test/${roomName}/`
      );
      this.socket.addEventListener("open", () => {
        console.log("WebSocket connection established");
      });

      this.socket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
      });
    }
  }

  send(data: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export function InstanceWebSocket(): WebSocket {
  console.log("Se Creo una Instancia de WebSocket");
  return new WebSocket(`${APP_URL_WS_BACK}/ws/video-test/testing/`);
}

export default WebSocketInstance;
