import { Action, Middleware, Dispatch } from 'redux'
import { Observable, Subscription } from 'rxjs'

declare interface Streamer<A extends Action = Action> {
  (action$: Observable<A>): Subscription
}

declare interface StreamMiddleware<A extends Action, S extends any>
  extends Middleware<{}, S, Dispatch<Action>> {
  run(root: Streamer<A>): void
  close(): void
}

declare function combineStreamers<A extends Action = Action>(...streamers: Streamer[]): Streamer<A>

declare function createMiddleware<A extends Action, S extends any>(): StreamMiddleware<A, S>
