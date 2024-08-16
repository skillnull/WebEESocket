import WebSocket from './WebSocket/Controller';
declare class Socket {
    socket: WebSocket;
    subscribe: OmitThisParameter<(data: object) => void>;
    unsubscribe: OmitThisParameter<(data: object) => void>;
    close: OmitThisParameter<() => void>;
    on: OmitThisParameter<(params: any, callback: void) => any>;
    constructor(props: any);
}
export declare const WEBSOCKET: typeof Socket;
export {};
