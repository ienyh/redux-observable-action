import { Action } from 'redux'
import { Subject, Subscription, observeOn, queueScheduler } from 'rxjs'
import { Streamer, StreamMiddleware } from '..'

export default function createMiddleware<A extends Action = Action, S = any>() {
  const actionSubject$ = new Subject<A>()
  const action$ = actionSubject$.asObservable().pipe(observeOn(queueScheduler))
  let subscription: Subscription
  const middleware = store => next => action => {
    next(action)
    // flow to streamer
    actionSubject$.next(action)
  }
  /**
   * register the streamer
   */
  middleware.run = (streamer: Streamer) => {
    if (subscription) {
      return subscription.unsubscribe()
    }
    subscription = streamer(action$)
  }
  middleware.close = () => {
    if (!subscription) return
    subscription.unsubscribe()
  }
  return middleware as StreamMiddleware<A, S>
}
