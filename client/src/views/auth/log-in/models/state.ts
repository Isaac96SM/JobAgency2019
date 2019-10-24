import { State as BaseState } from "../../models"

export interface State extends BaseState {
	isAuthenticated: boolean
}
