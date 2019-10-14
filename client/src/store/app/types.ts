import { ActionType } from "typesafe-actions"
import * as actions from "./actions"

import { User, Company } from "../../models"

export type AppActions = ActionType<typeof actions>

export interface IAppState {
	user?: User,
	company?: Company,
	isAuthenticated: boolean,
	companies: Company[]
}

export enum Constants {
	SET_USER = "SET_USER",
	SET_COMPANY = "SET_COMPANY",
	SET_COMPANIES = "SET_COMPANIES",
	LOG_OUT = "LOG_OUT"
}
