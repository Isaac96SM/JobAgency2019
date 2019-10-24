import { ActionType } from "typesafe-actions"
import * as actions from "./actions"

import { User, Company } from "../../models"

export type AppActions = ActionType<typeof actions>

export interface IAppState {
	currentUser?: User,
	currentCompany?: Company,
	isAuthenticated: boolean,
	companies: Company[],
	users: User[]
}

export enum Constants {
	SET_CURRENT_USER = "SET_CURRENT_USER",
	SET_CURRENT_COMPANY = "SET_CURRENT_COMPANY",
	SET_COMPANIES = "SET_COMPANIES",
	SET_USERS = "SET_USERS",
	LOG_OUT = "LOG_OUT"
}
