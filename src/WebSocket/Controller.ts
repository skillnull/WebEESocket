import EventEmitter from '../EventEmitter'

class WebSocket {
  private EventEmitter: any = EventEmitter()
  // 订阅地址
  private url: string = ''
  // 认证信息
  private auth: string = ''

  constructor(props: any) {
    this.url = props!.url
    this.auth = props!.auth

    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.close = this.close.bind(this)
    this.on = this.on.bind(this)
  }

  // 连接
  connect() {

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
