export interface ModelType {
  STATE: {
    [key: string]: number
  }
}

export default {
  // 连接状态
  STATE: {
    unknow: 0,
    error: 1,
    before_connect: 2,
    connected: 3,
    disconnected: 4
  }
}
