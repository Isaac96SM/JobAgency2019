import { action } from "typesafe-actions"
import { Constants } from "./types"
import { User, Company } from "../../models"

export function setUser(user: User) {
	return action(Constants.SET_USER, {
		user
	})
}

export function setCompany(company: Company) {
	return action(Constants.SET_COMPANY, {
		company
	})
}

export function logout() {
	localStorage.removeItem("jwtToken")

	return action(Constants.LOG_OUT, {})
}

export function setCompanies(companies: Company[]) {
	return action(Constants.SET_COMPANIES, {
		companies
	})
}
