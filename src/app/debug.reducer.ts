import { ActionReducer } from '@ngrx/store'
import AppState from '@app/app.reducers'

export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state, action) {
    const newState = reducer(state, action)

    console.log(`[DEBUG] action: ${action.type}`, {
      payload: (<any>action).payload,
      oldState: state,
      newState,
    })

    return newState
  }
}
