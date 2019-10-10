import { Dispatch } from "redux"
import jwt_decode from "jwt-decode"

import * as actions from "./actions"
import { AppActions } from "./types"

import apiService from "../../services/api.service"
import { User, Company } from "../../models"

export async function loginUser(dispatch: Dispatch<AppActions>, email: string, password: string) {
	const token: string = await apiService.users.login(email, password)

	if (token) {
		localStorage.setItem("jwtToken", token)

		const user: User = jwt_decode(token)
		dispatch(actions.setUser(user))
	}
}

export async function loginCompany(dispatch: Dispatch<AppActions>, email: string, password: string) {
	const token: string = await apiService.companies.login(email, password)

	if (token) {
		localStorage.setItem("jwtToken", token)

		const company: Company = jwt_decode(token)
		dispatch(actions.setCompany(company))
	}
}
