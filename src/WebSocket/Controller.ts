class WebSocket {
  // 订阅地址
  private url: string = ''
  // 认证信息
  private auth: string = ''

  constructor(props: any) {
    this.url = props!.url
    this.auth = props!.auth
  }

  // 连接
  connect() {
  }

  // 重连
  reconnect() {

  }

  // 订阅
  subscrice(data: object) {

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

}

export default WebSocket
