import EventEmitter from '../EventEmitter'
import MODEL from './Model'

const { STATE } = MODEL

class WebSocket {
  private EventEmitter: any = EventEmitter()
  // 订阅地址
  private url: string = ''
  // 认证信息
  private auth: string = ''
  // 协议
  private protocol?: any
  // 连接状态
  private state = STATE.unknow
  // websocket 或 connectSocket 实例
  private websocket: any;

  constructor(props: any) {
    this.url = props!.url
    this.auth = props!.auth
    this.protocol = props?.auth

    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.close = this.close.bind(this)
    this.on = this.on.bind(this)
  }

  // 连接
  connect() {
    return new Promise((resolve, reject) => {
      this.state = STATE.before_connect
      let _websocket: any

      const on_close = (data: object) => {
      }

      const on_error = (data: object) => {
      }

      const on_message = (data: any) => {
      }

      if (window && window.WebSocket) {
        _websocket = new window.WebSocket(this.url)
        this.websocket = _websocket

        this.websocket.onopen = () => {
        }

        this.websocket.onclose = on_close

        this.websocket.onerror = on_error

        this.websocket.onmessage = on_message

      } else if (wx && wx.connectSocket) {
        _websocket = wx.connectSocket({
          url: this.url,
          protocols: [this.protocol],
          success: resolve,
          fail: reject
        })
        this.websocket = _websocket

        this.websocket.onOpen(() => {
        })

        this.websocket.onClose(on_close)

        this.websocket.onError(on_error)

        this.websocket.onMessage(on_message)
      }

    })
  }

  // 重连
  reconnect() {

  }

  // 订阅
  subscribe(data: object) {

  }

  // 退订
  unsubscribe(data: object) {

  }

  // 发送
  send(data: object) {

  }

  // 数据处理
  handleMessage(data: object) {

  }

  // 关闭
  close() {

  }

  on(params: any, callback: void) {
    return this.EventEmitter.on(params, callback)
  }
}

export default WebSocket
