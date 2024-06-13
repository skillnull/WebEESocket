import WebSocket from './WebSocket/Controller'

class Socket {
  private socket: WebSocket
  private subscribe: OmitThisParameter<(data: object) => void>
  private unsubscribe: OmitThisParameter<(data: object) => void>
  private close: OmitThisParameter<() => void>
  private on: OmitThisParameter<(params: any, callback: void) => any>

  constructor(props: any) {
    this.socket = new WebSocket(props)

    this.socket.reconnect()

    this.socket.connect()

    this.subscribe = this.socket.subscribe.bind(this)

    this.unsubscribe = this.socket.unsubscribe.bind(this)

    this.close = this.socket.close.bind(this)

    this.on = this.socket.on.bind(this)
  }
}

/**
 * @params: {
 *   url: <String> 服务器连接地址
 *   auth: <Any> 服务器认证信息
 *   protocol?: <String | String[]> 协议
 * }
 */
export const WEBSOCKET = Socket
