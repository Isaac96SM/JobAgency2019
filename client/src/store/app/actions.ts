import { action } from "typesafe-actions"
import { Constants } from "./types"
import { User, Company } from "../../models"

export function setCurrentUser(currentUser: User) {
	return action(Constants.SET_CURRENT_USER, {
		currentUser
	})
}

export function setCurrentCompany(currentCompany: Company) {
	return action(Constants.SET_CURRENT_COMPANY, {
		currentCompany
	})
}

export function logout() {
	localStorage.removeItem("jwtToken")
	localStorage.removeItem("isCompany")

	return action(Constants.LOG_OUT, {})
}

export function setCompanies(companies: Company[]) {
	return action(Constants.SET_COMPANIES, {
		companies
	})
}

export function setUsers(users: User[]) {
	return action(Constants.SET_USERS, {
		users
	})
}
