import { Dispatch } from "redux"
import jwt_decode from "jwt-decode"

import * as actions from "./actions"
import { AppActions } from "./types"

import apiService from "../../services/api.service"
import { User, Company } from "../../models"

export async function signinUser(dispatch: Dispatch<AppActions>, user: User) {
	try {
		await apiService.users.post(user)
	} catch (e) {
		return e.statusText
	}
}

export async function loginUser(dispatch: Dispatch<AppActions>, email: string, password: string) {
	try {
		const token: string = await apiService.users.login(email, password)

		if (token) {
			localStorage.setItem("jwtToken", token)

			const user: User = jwt_decode(token)
			setUser(dispatch, user)
		}
	} catch (e) {
		return e.statusText
	}
}

export function setUser(dispatch: Dispatch<AppActions>, user: User) {
	dispatch(actions.setUser(user))
}

export async function signinCompany(dispatch: Dispatch<AppActions>, company: Company) {
	try {
		await apiService.companies.post(company)
	} catch (e) {
		return e.statusText
	}
}

export async function loginCompany(dispatch: Dispatch<AppActions>, email: string, password: string) {
	try {
		const token: string = await apiService.companies.login(email, password)

		if (token) {
			localStorage.setItem("jwtToken", token)

			const company: Company = jwt_decode(token)
			setCompany(dispatch, company)
		}
	} catch (e) {
		return e.statusText
	}
}

export function setCompany(dispatch: Dispatch<AppActions>, company: Company) {
	dispatch(actions.setCompany(company))
}

export function logout(dispatch: Dispatch<AppActions>) {
	localStorage.removeItem("jwtToken")

	return dispatch(actions.logout())
}

export async function getCompanies(dispatch: Dispatch<AppActions>) {
	const companies: Company[] = await apiService.companies.get()

	dispatch(actions.setCompanies(companies))
}
