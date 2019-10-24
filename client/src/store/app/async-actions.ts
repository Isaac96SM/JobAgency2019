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
			localStorage.setItem("isCompany", "")

			const user: User = jwt_decode(token)
			setCurrentUser(dispatch, user)
		}
	} catch (e) {
		return e.statusText
	}
}

export function setCurrentUser(dispatch: Dispatch<AppActions>, user: User) {
	dispatch(actions.setCurrentUser(user))
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
			localStorage.setItem("isCompany", "true")

			const company: Company = jwt_decode(token)
			setCurrentCompany(dispatch, company)
		}
	} catch (e) {
		return e.statusText
	}
}

export function setCurrentCompany(dispatch: Dispatch<AppActions>, company: Company) {
	dispatch(actions.setCurrentCompany(company))
}

export function logout(dispatch: Dispatch<AppActions>) {
	return dispatch(actions.logout())
}

export async function getCompanies(dispatch: Dispatch<AppActions>) {
	const companies: Company[] = await apiService.companies.get()

	dispatch(actions.setCompanies(companies))
}

export async function getUsers(dispatch: Dispatch<AppActions>) {
	const users: User[] = await apiService.users.get()

	dispatch(actions.setUsers(users))
}
