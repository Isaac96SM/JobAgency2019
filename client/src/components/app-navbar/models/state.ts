import { Company, User } from "../../../models"

export interface State {
	isAuthenticated: boolean
	currentCompany?: Company,
	currentUser?: User
}