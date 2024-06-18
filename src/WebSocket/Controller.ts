import EventEmitter from '../EventEmitter'
import MODEL from './Model'

const { STATE } = MODEL

class WebSocket {
  private EventEmitter: any = EventEmitter()
  // 订阅地址
  private url: string = ''
  // 认证信息
  private auth: any = ''
  // 心跳握手信息
  private heartbeat?: any = ''
  // 心跳握手间隔
  private heartbeat_time?: any = 3000
  // 协议
  private protocol?: any
  // 连接状态
  private state = STATE.unknow
  // window.WebSocket 或 wx.connectSocket 实例
  private websocket: any;
  // 是否主动关闭
  private initiative_close: boolean = false
  // 重连次数
  private reconnect_frequency: number = 0
  // 订阅缓存
  private cache_subscribe: any = {}
  // 订阅失败列表缓存
  private cache_subscribe_fail_list: any[] = []
  // 心跳定时器实例
  private heartbeat_interval: any
  // 重连间隔
  private reconnect_step: null | number = null
  // 重连次数
  private reconnect_count: number = 0

  constructor(props: any) {
    this.url = props!.url
    this.auth = props!.auth
    this.heartbeat = props?.heartbeat
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

      const on_open = () => () => {
        if (this.websocket !== _websocket) return

        // 发送认证
        this.websocket.send(this.auth)

        this.state = STATE.connected

        this.reconnect_frequency = 0

        this.cache_subscribe_fail_list.length > 0 && this.subscribeCache()

        this.EventEmitter.emit('onOpen')

        this.heartbeatFun()
      }

      const on_close = (data: object) => {
        if (this.websocket !== _websocket) return

        this.state = STATE.disconnected

        // 若非主动关闭，则自动重连
        if (!this.initiative_close) {
          this.reconnect()
        } else {
          this.initiative_close = false
        }

        this.EventEmitter.emit('onClose', data)
      }

      const on_error = (data: object) => {
        if (this.websocket !== _websocket) return

        this.state = STATE.error

        this.reconnect()

        this.EventEmitter.emit('onError', data)
      }

      const on_message = (data: any) => {
        if (this.websocket !== _websocket) return

        try {
          const res = data.data

          this.handleMessage(res)

          this.EventEmitter.emit('onMessage', res)
        } catch (e) {
          console.log(e)
        }
      }

      if (window && window.WebSocket) {
        _websocket = new window.WebSocket(this.url)

        this.websocket = _websocket

        this.websocket.onopen = on_open

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

        this.websocket.onOpen(on_open)

        this.websocket.onClose(on_close)

        this.websocket.onError(on_error)

        this.websocket.onMessage(on_message)
      }
    })
  }

  // 重连
  reconnect(step?: number) {
    if (step) {
      this.reconnect_step = step
      return
    }

    if (this.reconnect_step === null) return

    if (this.reconnect_count++ >= this.reconnect_step) return

    setTimeout(() => this.connect(), this.reconnect_step || 1000)
  }

  /**
   * 订阅
   * @data: {
   *   key: <String> 用于缓存和退订，需保证唯一和可回溯
   *   body: <Any> 服务端需要的，订阅具体的参数
   *   stringify?: <Boolean> 是否将 body JSON.stringify，默认 true
   * }
   */
  subscribe(data: any) {
    const key = data!.key

    // 缓存订阅
    this.cache_subscribe[key] = data

    if (this.state === STATE.connected) {
      return this.send(data)
    }

    // 缓存失败订阅
    this.cache_subscribe_fail_list.push(data)

    if (this.state === STATE.before_connect) return

    return this.connect()
  }

  // 重新订阅失败订阅
  subscribeCache() {
    return this.cache_subscribe_fail_list?.map(item => {
      this.subscribe(item)
    })
  }

  /**
   * 退订
   * @data: {
   *   key: <String> 订阅时传的 key
   *   body?: <Any> 其他参数，会合并到订阅时缓存的 body 上
   * }
   */
  unsubscribe(data: any) {
    const key = data!.key

    const body = Object.assign({}, this.cache_subscribe[key], data?.body || {})

    if (!body || JSON.stringify(body) === '{}') return

    const idx = this.cache_subscribe_fail_list.findIndex((item: any) => {
      return item.key === key
    })

    if (idx >= 0) {
      this.cache_subscribe_fail_list.splice(idx, 1)
    }
  }

  // 发送
  send(data: object) {
    if (!this.websocket || this.state !== STATE.connected) return
    let params
    if (window && window.WebSocket) {
      params = data
    } else if (wx && wx.connectSocket) {
      params = { data: data }
    }
    this.websocket.send(params)
  }

  // 数据处理
  handleMessage(data: object) {
    this.EventEmitter.emit(data)
  }

  // 关闭
  close(code = 1000, reason = '') {
    this.initiative_close = true
    if (!this.websocket) return
    this.websocket.close(code, reason)
  }

  on(params: any, callback: void) {
    return this.EventEmitter.on(params, callback)
  }

  // 心跳握手
  heartbeatFun() {
    let _this = this
    if (!_this.heartbeat) return
    _this.heartbeat_interval && clearInterval(_this.heartbeat_interval)
    _this.heartbeat_interval = setInterval(function () {
      _this.websocket.send(_this.heartbeat)
    }, _this.heartbeat_time)
  }
}

export default WebSocket
