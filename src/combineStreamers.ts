import { Action } from 'redux'
import { Observable, Subscription } from 'rxjs'
import { Streamer } from '..'

export default function combineStreamers<A extends Action = Action>(...streamers: Streamer[]) {
  const combinedStreamer = (observable$: Observable<A>) => {
    const subscription = new Subscription()
    for (let i = 0; i < streamers.length; i++) {
      subscription.add(streamers[i](observable$))
    }
    return subscription
  }
  try {
    Object.defineProperty(combineStreamers, 'name', {
      value: `combineStreamers(${streamers.map((s) => s?.name || '<anonymous>').join(', ')})`,
    })
  } catch {}
  return combinedStreamer
}
