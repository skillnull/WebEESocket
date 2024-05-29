export type EventType = string | symbol | number

// type for an event
export type Event<T = unknown> = (event: T) => void

// type for '*' as all event
export type AllEvent<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void

// type for event list
export type EventList<T = unknown> = Array<Event<T>>

// type for '*' as all event list
export type AllEventList<T = Record<string, unknown>> = Array<AllEvent<T>>

// set event list to Map. can delete or clear event.
export type EventMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventList<Events[keyof Events]> | AllEventList<Events>
>

export interface Emmiter<Events extends Record<EventType, unknown>> {
  // events Map
  events: EventMap<Events>

  // listen an event
  on<Key extends keyof Events>(type: Key, event: Event<Events[Key]>): void

  // similar onAll. listen all event
  on(type: '*', event: AllEvent<Events>): void

  // unlisten an event
  off<Key extends keyof Events>(type: Key, event?: Event<Events[Key]>): void

  // similar offAll. unlisten all event
  off(type: '*', event: AllEvent<Events>): void

  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void

  emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}

export default function EventEmitte<Events extends Record<EventType, unknown>>(
  events?: EventMap<Events>
): Emmiter<Events> {
  type InitEvent = Event<Events[keyof Events]> | AllEvent<Events>

  if (!events) events = new Map()

  return {
    events,
    on<Key extends keyof Events>(type: Key, event: InitEvent) {
      const _events: Array<InitEvent> | undefined = events!.get(type)
      if (_events) {
        _events.push(event)
      } else {
        events!.set(type, [event] as EventList<Events[keyof Events]>)
      }
    },
    off<Key extends keyof Events>(type: Key, event?: InitEvent) {
      const _events: Array<InitEvent> | undefined = events!.get(type)
      if (_events) {
        if (event) {
          const position = _events.indexOf(event)
          position > -1 && _events.splice(position, 1)
        } else {
          events!.set(type, [])
        }
      }
    },
    emit<Key extends keyof Events>(type: Key, event?: Events[Key]) {
      let _events = events!.get(type)
      if (_events) {
        (_events as EventList<Events[keyof Events]>).slice().map(handler => {
          handler(event!)
        })
      }
      _events = events?.get('*')
      if (_events) {
        (_events as AllEventList<Events>).slice().map(handler => {
          handler(type, event!)
        })
      }
    }
  }
}
