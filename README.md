<div align="center" >
  <h1>WebEESocket</h1>
  <br>
  <a href="http://www.skillnull.com"><img src="http://skillnull.com/others/images/brand/MIT.svg" alt="License MIT"></a>
</div>

通过事件驱动机制 EventEmitter 对 Websocket 和微信 connectSocket 进行集成封装

> #### CDN

```html
使用 UMD 格式
<script src="https://www.unpkg.com/@skillnull/webeesocket@0.0.7/dist/WebEESocket.js"></script>
# or
<script src="https://cdn.jsdelivr.net/npm/@skillnull/webeesocket@0.0.7/dist/WebEESocket.js"></script>

使用 ES 格式
<script src="https://www.unpkg.com/@skillnull/webeesocket@0.0.7/dist/WebEESocket.es.js"></script>
# or
<script src="https://cdn.jsdelivr.net/npm/@skillnull/webeesocket@0.0.7/dist/WebEESocket.es.js"></script>
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

this.WEBSOCKET = new WEBSOCKET({
  env: 'development'
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
