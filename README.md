<div align="center">
  <img src="http://skillnull.com/others/images/WebEESocket.png" width="300px" alt="WebEESocket">
</div>
<br>
<div align="center" >
  <a href="http://www.skillnull.com"><img src="http://skillnull.com/others/images/brand/MIT.svg" alt="License MIT"></a>
</div>


#### 通过事件驱动机制 EventEmitter 对 Websocket 和微信 connectSocket 进行集成封装


> #### CDN

```html
使用 UMD 格式
<script src="https://www.unpkg.com/@skillnull/webeesocket@0.1.7/dist/WebEESocket.js"></script>
# or
<script src="https://cdn.jsdelivr.net/npm/@skillnull/webeesocket@0.1.7/dist/WebEESocket.js"></script>

使用 ES 格式
<script src="https://www.unpkg.com/@skillnull/webeesocket@0.1.7/dist/WebEESocket.es.js"></script>
# or
<script src="https://cdn.jsdelivr.net/npm/@skillnull/webeesocket@0.1.7/dist/WebEESocket.es.js"></script>
```


> #### 安装

```bash
yarn add @skillnull/webeesocket

# or with npm

npm install @skillnull/webeesocket
```

### 使用
```js
// 使用 CDN 引用时，无需 import 
import { WEBSOCKET } from '@skillnull/webeesocket'

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
this.WEBSOCKET = new WEBSOCKET({ 
  url: "your socket server url",
  auth: {
    // server need auth info
  },
  heartbeat: {
    // heartbeat need info
  },
  heartbeat_time: 30000,
  protocol: "protocol for websocket",
  reconnect_step: 1000
})

/**
 * code: 与服务端约定的用于监听的 code
 */
this.WEBSOCKET.on(code, (data) => {
  // handler data
})

/**
 * 订阅
 * @data: {
 *   key: <String> 用于缓存和退订，需保证唯一和可回溯
 *   body: <Any> 服务端需要的，订阅的具体参数，默认将进行 JSON.stringify
 *   not_stringify?: <Boolean> 是否取消将参数 body 进行 JSON.stringify，默认 false
 * }
 */
this.WEBSOCKET.subscribe({
  key: "require",
  body: "require",
  not_stringify: "not require"
})

/**
 * 退订
 * @data: {
 *   key: <String> 订阅时传的 key
 *   body?: <Any> 其他参数，会合并到订阅时缓存的 body 上，默认将合并后的 body 进行 JSON.stringify
 *   not_stringify?: <Boolean> 是否取消将合并后的参数 body 进行 JSON.stringify，默认 false
 * }
 */
this.WEBSOCKET.unsubscribe({
  key: "require", 
  body: "require", 
  not_stringify: "not require"
})
```
