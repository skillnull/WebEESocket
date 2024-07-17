declare class WebSocket {
    private EventEmitter;
    private url;
    private auth;
    private heartbeat?;
    private heartbeat_time?;
    private protocol?;
    private state;
    private websocket;
    private initiative_close;
    private reconnect_frequency;
    private cache_subscribe;
    private cache_subscribe_fail_list;
    private heartbeat_interval;
    private reconnect_step;
    private reconnect_count;
    constructor(props: any);
    connect(isReconnect?: any): Promise<unknown>;
    reconnect(step?: number): void;
    subscribe(data: any): void | Promise<unknown>;
    reSubscribe(isReconnect?: any): void;
    unsubscribe(data: any): void;
    send(data: object): void;
    handleMessage(data: object): void;
    close(code?: number, reason?: string): void;
    on(params: any, callback: void): any;
    heartbeatFun(): void;
}
export default WebSocket;
