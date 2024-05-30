import WebSocket from './WebSocket/Controller'

class Socket {
  private socket: WebSocket

  constructor(props: any) {
    this.socket = new WebSocket(props)

    this.socket.reconnect()

    this.socket.connect()
  }
}

export const WEBSOCKET = Socket
