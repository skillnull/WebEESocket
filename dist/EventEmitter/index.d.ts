export type EventType = string | symbol | number;
export type Event<T = unknown> = (event: T) => void;
export type AllEvent<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void;
export type EventList<T = unknown> = Array<Event<T>>;
export type AllEventList<T = Record<string, unknown>> = Array<AllEvent<T>>;
export type EventMap<Events extends Record<EventType, unknown>> = Map<keyof Events | '*', EventList<Events[keyof Events]> | AllEventList<Events>>;
export interface Emmiter<Events extends Record<EventType, unknown>> {
    events: EventMap<Events>;
    offlineEvents: EventMap<Events>;
    on<Key extends keyof Events>(type: Key, event: Event<Events[Key]>): void;
    on(type: '*', event: AllEvent<Events>): void;
    off<Key extends keyof Events>(type: Key, event?: Event<Events[Key]>): void;
    off(type: '*', event: AllEvent<Events>): void;
    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
    emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}
export default function EventEmitte<Events extends Record<EventType, unknown>>(events?: EventMap<Events>): Emmiter<Events>;
