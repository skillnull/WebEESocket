!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(((e="undefined"!=typeof globalThis?globalThis:e||self)["@skillnull/webeesocket"]=e["@skillnull/webeesocket"]||{},e["@skillnull/webeesocket"].js={}))}(this,(function(e){"use strict";var t=function(e){return JSON.stringify(e)},n={unknow:0,error:1,before_connect:2,connected:3,disconnected:4},i=function(){function e(e){this.EventEmitter=function(e){e||(e=new Map);var t=new Map;return{events:e,offlineEvents:t,on:function(n,i){t.size>0&&(t.forEach((function(e,t){"function"==typeof e&&e(i)})),t.clear());var s=e.get(n);s?s.push(i):e.set(n,[i])},off:function(t,n){var i=e.get(t);if(i)if(n){var s=i.indexOf(n);s>-1&&i.splice(s,1)}else e.set(t,[])},emit:function(n,i){var s=e.get(n);s?s.slice().map((function(e){e(i)})):t.set(n,[i]),(s=null==e?void 0:e.get("*"))&&s.slice().map((function(e){e(n,i)}))}}}(),this.url="",this.auth="",this.heartbeat="",this.heartbeat_time=3e3,this.state=n.unknow,this.initiative_close=!1,this.reconnect_frequency=0,this.cache_subscribe={},this.cache_subscribe_fail_list=[],this.reconnect_step=null,this.reconnect_count=0,this.url=e.url,this.auth=e.auth,this.heartbeat=null==e?void 0:e.heartbeat,this.protocol=null==e?void 0:e.auth,this.subscribe=this.subscribe.bind(this),this.unsubscribe=this.unsubscribe.bind(this),this.close=this.close.bind(this),this.on=this.on.bind(this)}return e.prototype.connect=function(){var e=this;return new Promise((function(t,i){var s;e.state=n.before_connect;var o=function(){return function(){e.websocket===s&&(e.websocket.send(e.auth),e.state=n.connected,e.reconnect_frequency=0,e.cache_subscribe_fail_list.length>0&&e.subscribeCache(),e.EventEmitter.emit("onOpen"),e.heartbeatFun())}},c=function(t){e.websocket===s&&(e.state=n.disconnected,e.initiative_close?e.initiative_close=!1:e.reconnect(),e.EventEmitter.emit("onClose",t))},r=function(t){e.websocket===s&&(e.state=n.error,e.reconnect(),e.EventEmitter.emit("onError",t))},u=function(t){if(e.websocket===s)try{var n=t.data;e.handleMessage(n),e.EventEmitter.emit("onMessage",n)}catch(e){console.log(e)}};window&&window.WebSocket?(s=new window.WebSocket(e.url),e.websocket=s,e.websocket.onopen=o,e.websocket.onclose=c,e.websocket.onerror=r,e.websocket.onmessage=u):wx&&wx.connectSocket&&(s=wx.connectSocket({url:e.url,protocols:[e.protocol],success:t,fail:i}),e.websocket=s,e.websocket.onOpen(o),e.websocket.onClose(c),e.websocket.onError(r),e.websocket.onMessage(u))}))},e.prototype.reconnect=function(e){var t=this;e?this.reconnect_step=e:null!==this.reconnect_step&&(this.reconnect_count++>=this.reconnect_step||setTimeout((function(){return t.connect()}),this.reconnect_step||1e3))},e.prototype.subscribe=function(e){var i=e.key;return this.cache_subscribe[i]=e,this.state===n.connected?this.send((null==e?void 0:e.not_stringify)?e:t(e)):(this.cache_subscribe_fail_list.push(e),this.state!==n.before_connect?this.connect():void 0)},e.prototype.subscribeCache=function(){var e,t=this;return null===(e=this.cache_subscribe_fail_list)||void 0===e?void 0:e.map((function(e){t.subscribe(e)}))},e.prototype.unsubscribe=function(e){var n=e.key;if(e.body=Object.assign({},this.cache_subscribe[n],(null==e?void 0:e.body)||{}),e.body&&"{}"!==t(e.body)){this.send((null==e?void 0:e.not_stringify)?e:t(e));var i=this.cache_subscribe_fail_list.findIndex((function(e){return e.key===n}));i>=0&&this.cache_subscribe_fail_list.splice(i,1)}},e.prototype.send=function(e){var t;this.websocket&&this.state===n.connected&&(window&&window.WebSocket?t=e:wx&&wx.connectSocket&&(t={data:e}),this.websocket.send(t))},e.prototype.handleMessage=function(e){this.EventEmitter.emit(e)},e.prototype.close=function(e,t){void 0===e&&(e=1e3),void 0===t&&(t=""),this.initiative_close=!0,this.websocket&&this.websocket.close(e,t)},e.prototype.on=function(e,t){return this.EventEmitter.on(e,t)},e.prototype.heartbeatFun=function(){var e=this;e.heartbeat&&(e.heartbeat_interval&&clearInterval(e.heartbeat_interval),e.heartbeat_interval=setInterval((function(){e.websocket.send(e.heartbeat)}),e.heartbeat_time))},e}(),s=function(e){this.socket=new i(e),-1!==(null==e?void 0:e.reconnect_step)&&this.socket.reconnect((null==e?void 0:e.reconnect_step)||1e3),this.socket.connect(),this.subscribe=this.socket.subscribe.bind(this),this.unsubscribe=this.socket.unsubscribe.bind(this),this.close=this.socket.close.bind(this),this.on=this.socket.on.bind(this)};e.WEBSOCKET=s}));