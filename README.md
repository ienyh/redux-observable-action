# redux-observable-action

A RxJS-based Redux middleware that flow out actions for easy side-effect processing

Inspired by [redux-observable](https://github.com/redux-observable/redux-observable)

## Usage

```js
import { test, expect } from 'vitest'
import { Action, applyMiddleware, legacy_createStore } from 'redux'
import { Observable } from 'rxjs'
import { createMiddleware } from 'redux-observable-action'

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const streamerMiddleware = createMiddleware()
const store = legacy_createStore(reducer, applyMiddleware(streamerMiddleware))

function rootStreamer(action$: Observable<Action>) {
  return action$.subscribe(action => {
    if (action.type === 'INCREMENT') {
      // do something
    }
  })
}

streamerMiddleware.run(rootStreamer)
```

## More

- [observable-duck](https://github.com/ienyh/observable): In-depth combination of redux use, complete types
