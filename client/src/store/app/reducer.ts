import { Constants, AppActions, IAppState } from "./types"
import { User, Company } from "../../models"

const init: IAppState = {
	isAuthenticated: false,
	companies: [],
	users: []
}

const resetState = (state: IAppState): IAppState => {
	return {
		isAuthenticated: false,
		companies: state.companies,
		users: state.users
	}
}

export function appReducer(state: IAppState = init, action: AppActions): IAppState {
	switch (action.type) {
		case Constants.SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: action.payload.currentUser._id !== "",
				currentUser: {
					_id: action.payload.currentUser._id,
					Email: action.payload.currentUser.Email,
					FirstName: action.payload.currentUser.FirstName,
					LastName: action.payload.currentUser.LastName,
					RegisterDate: action.payload.currentUser.RegisterDate
				} as User
			}
		case Constants.SET_CURRENT_COMPANY:
			return {
				...state,
				isAuthenticated: action.payload.currentCompany._id !== "",
				currentCompany: {
					_id: action.payload.currentCompany._id,
					Email: action.payload.currentCompany.Email,
					Name: action.payload.currentCompany.Name,
					RegisterDate: action.payload.currentCompany.RegisterDate
				} as Company
			}
		case Constants.LOG_OUT:
			return resetState(state)
		case Constants.SET_COMPANIES:
			return {
				...state,
				companies: action.payload.companies
			}
		case Constants.SET_USERS:
			return {
				...state,
				users: action.payload.users
			}
		default:
			return state
	}
}
