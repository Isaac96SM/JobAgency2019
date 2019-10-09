import { combineReducers, createStore } from "redux"
import { appReducer } from "./app/reducer"
import { IAppState } from "./app/types"

export interface IRootState {
	app: IAppState
}

const store = createStore<IRootState, any, any, any>(
	combineReducers({
		app: appReducer
	})
)

export default store
