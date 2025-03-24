!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).WebEESocket={})}(this,(function(e){"use strict";var t,i=function(e){return JSON.stringify(e)},n={unknow:0,error:1,before_connect:2,connected:3,disconnected:4},s=function(){function e(e){this.EventEmitter=function(e){e||(e=new Map);var t=new Map;return{events:e,offlineEvents:t,on:function(i,n){t.size>0&&(t.forEach((function(e,t){"function"==typeof e&&e(n)})),t.clear());var s=e.get(i);s?s.push(n):e.set(i,[n])},off:function(t,i){var n=e.get(t);if(n)if(i){var s=n.indexOf(i);s>-1&&n.splice(s,1)}else e.set(t,[])},emit:function(i,n){var s=e.get(i);s?s.slice().map((function(e){e(n)})):t.set(i,[n]),(s=null==e?void 0:e.get("*"))&&s.slice().map((function(e){e(i,n)}))}}}(),this.url="",this.auth="",this.heartbeat="",this.heartbeat_time=3e4,this.state=n.unknow,this.initiative_close=!1,this.reconnect_frequency=0,this.cache_subscribe={},this.cache_subscribe_fail_list=[],this.reconnect_step=null,this.reconnect_count=0,this.url=e.url,this.auth=e.auth,this.heartbeat=null==e?void 0:e.heartbeat,this.protocol=null==e?void 0:e.auth,this.subscribe=this.subscribe.bind(this),this.unsubscribe=this.unsubscribe.bind(this),this.reSubscribe=this.reSubscribe.bind(this),this.close=this.close.bind(this),this.on=this.on.bind(this)}return e.prototype.connect=function(e){var t=this;return void 0===e&&(e=!1),new Promise((function(i,s){var o;t.state=n.before_connect;var c=function(){return function(){t.websocket===o&&(t.websocket.send(t.auth),t.state=n.connected,t.reconnect_frequency=0,t.reSubscribe(e),t.EventEmitter.emit("onOpen"),t.heartbeatFun())}},r=function(e){t.websocket===o&&(t.state=n.disconnected,t.initiative_close?t.initiative_close=!1:t.reconnect(),t.EventEmitter.emit("onClose",e))},h=function(e){t.websocket===o&&(t.state=n.error,t.reconnect(),t.EventEmitter.emit("onError",e))},u=function(e){if(t.websocket===o)try{var i=e.data;t.handleMessage(i),t.EventEmitter.emit("onMessage",i)}catch(e){console.log(e)}};window&&window.WebSocket?(o=new window.WebSocket(t.url),t.websocket=o,t.websocket.onopen=c,t.websocket.onclose=r,t.websocket.onerror=h,t.websocket.onmessage=u):wx&&wx.connectSocket&&(o=wx.connectSocket({url:t.url,protocols:[t.protocol],success:i,fail:s}),t.websocket=o,t.websocket.onOpen(c),t.websocket.onClose(r),t.websocket.onError(h),t.websocket.onMessage(u))}))},e.prototype.reconnect=function(e){var t=this;e?this.reconnect_step=e:null!==this.reconnect_step&&this.reconnect_count++<this.reconnect_step&&setTimeout((function(){return t.connect()}),this.reconnect_step||1e3)},e.prototype.subscribe=function(e){var t=e.key;return this.cache_subscribe[t]=e,this.state===n.connected?this.send((null==e?void 0:e.not_stringify)?e:i(e)):(this.cache_subscribe_fail_list[t]=e,this.state!==n.before_connect?this.connect():void 0)},e.prototype.reSubscribe=function(e){if(void 0===e&&(e=!1),e){if(Object.keys(this.cache_subscribe).length>0)for(var t in this.cache_subscribe){(i=this.cache_subscribe[t])&&this.subscribe(i)}}else if(Object.keys(this.cache_subscribe_fail_list).length>0)for(var t in this.cache_subscribe_fail_list){var i;(i=this.cache_subscribe_fail_list[t])&&this.subscribe(i)}},e.prototype.unsubscribe=function(e){var t=e.key;e.body=Object.assign({},this.cache_subscribe[t],(null==e?void 0:e.body)||{}),e.body&&"{}"!==i(e.body)&&(this.send((null==e?void 0:e.not_stringify)?e:i(e)),delete this.cache_subscribe[t],delete this.cache_subscribe_fail_list[t])},e.prototype.send=function(e){if(this.websocket&&this.state===n.connected){var t=void 0;window&&window.WebSocket?t=e:wx&&wx.connectSocket&&(t={data:e}),this.websocket.send(t)}},e.prototype.handleMessage=function(e){this.EventEmitter.emit(e)},e.prototype.close=function(e,t){void 0===e&&(e=1e3),void 0===t&&(t=""),this.initiative_close=!0,this.websocket&&this.websocket.close(e,t)},e.prototype.on=function(e,t){return this.EventEmitter.on(e,t)},e.prototype.heartbeatFun=function(){var e=this;e.state===n.connected&&e.heartbeat&&(e.heartbeat_interval&&clearInterval(e.heartbeat_interval),e.heartbeat_interval=setInterval((function(){e.websocket.send(e.heartbeat)}),e.heartbeat_time))},e}();if("undefined"==typeof window||null===typeof window){var o=new(0,require("jsdom").JSDOM)("");window=null==o?void 0:o.window,document=null===(t=null==o?void 0:o.window)||void 0===t?void 0:t.document,globalThis.window=window,globalThis.document=document}var c=function(e){this.socket=new s(e),-1!==(null==e?void 0:e.reconnect_step)&&this.socket.reconnect((null==e?void 0:e.reconnect_step)||1e3),this.socket.connect(),this.subscribe=this.socket.subscribe.bind(this),this.unsubscribe=this.socket.unsubscribe.bind(this),this.close=this.socket.close.bind(this),this.on=this.socket.on.bind(this)};e.WEBSOCKET=c}));