import { Constants, AppActions, IAppState } from "./types"
import { User, Company } from "@/models"

const init: IAppState = {
	isAuthenticated: false
}

export function appReducer(state: IAppState = init, action: AppActions): IAppState {
	switch (action.type) {
		case Constants.SET_USER:
			return {
				...state,
				isAuthenticated: action.payload.user._id !== "",
				user: {
					_id: action.payload.user._id,
					Email: action.payload.user.Email,
					FirstName: action.payload.user.FirstName,
					LastName: action.payload.user.LastName,
					RegisterDate: action.payload.user.RegisterDate
				} as User
			}
		case Constants.SET_COMPANY:
			return {
				...state,
				isAuthenticated: action.payload.company._id !== "",
				company: {
					_id: action.payload.company._id,
					Email: action.payload.company.Email,
					Name: action.payload.company.Name,
					RegisterDate: action.payload.company.RegisterDate
				} as Company
			}
		case Constants.LOG_OUT:
			return init
		default:
			return state
	}
}
