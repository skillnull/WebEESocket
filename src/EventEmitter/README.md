### Usage

```javascript
import EventEmitte from './EventEmitte'

const emmiter = EventEmitte()

// listen to an event
emitter.on('foo', e => console.log('foo', e))

// listen to all events
emitter.on('*', (type, e) => console.log(type, e))

// trigger an event
emitter.emit('foo', { a: 'b' })

// clearing all events
emitter.all.clear()

// working with handler references:
function onFoo() {}

emitter.on('foo', onFoo)   // listen
emitter.off('foo', onFoo)  // unlisten

```

### Typescript

```ts
import EventEmitte from './EventEmitte'

type Events = {
  foo: string;
  bar?: number;
}

const emitter = EventEmitte<Events>(); // inferred as Emitter<Events>

emitter.on('foo', (e) => {}); // 'e' has inferred type 'string'

emitter.emit('foo', 42); // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)

```

```ts
import EventEmitte, { Emitter } from './EventEmitte'

type Events = {
  foo: string;
  bar?: number;
}

const emitter: Emitter<Events> = mitt<Events>()
```
