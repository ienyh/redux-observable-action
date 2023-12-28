import { test, expect } from 'vitest'
import { createMiddleware } from '../src'
import { Action, applyMiddleware, legacy_createStore } from 'redux'
import { Observable } from 'rxjs'

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

let external = 0
function rootStreamer(action$: Observable<Action>) {
  return action$.subscribe(action => {
    if (action.type === 'INCREMENT') {
      external += 1
    }
    if (action.type === 'DECREMENT') {
      external -= 1
    }
  })
}

streamerMiddleware.run(rootStreamer)

test('redux-observable-action', () => {
  const { dispatch, getState } = store
  dispatch({ type: 'INCREMENT' })
  expect(getState()).toBe(1)
  expect(external).toBe(1)
  dispatch({ type: 'DECREMENT' })
  expect(getState()).toBe(0)
  expect(external).toBe(0)
})
