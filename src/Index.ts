import WebSocket from './WebSocket/Controller'

if (typeof window === "undefined" || typeof window === null) {
  const jsdom = require("jsdom")
  const {JSDOM} = jsdom
  const DOM = new JSDOM(``)
  window = DOM?.window
  document = DOM?.window?.document
  globalThis.window = window
  globalThis.document = document
}

class Socket {
  public socket: WebSocket
  public subscribe: OmitThisParameter<(data: object) => void>
  public unsubscribe: OmitThisParameter<(data: object) => void>
  public close: OmitThisParameter<() => void>
  public on: OmitThisParameter<(params: any, callback: void) => any>

  constructor(props: any) {
    this.socket = new WebSocket(props)

    if (props?.reconnect_step !== -1) {
      // 打开自动重连，若连接失败或断开，将进行自动重连
      this.socket.reconnect(props?.reconnect_step || 1000)
    }

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
 *   heartbeat?: <Any> 心跳握手内容
 *   heartbeat_time?: <Any> 心跳握手间隔，默认30000ms，heartbeat 传值此项才会生效
 *   protocol?: <String | String[]> 协议
 *   reconnect_step?: <Number> 重连间隔，不传默认 1000，传 -1 表示不重连
 * }
 */
export const WEBSOCKET = Socket
