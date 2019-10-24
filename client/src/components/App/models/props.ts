import { Dispatch } from "redux"

import { IRootState } from "../../../store"
import * as asyncactions from "../../../store/app/async-actions"
import { AppActions } from "../../../store/app/types"

import { User, Company } from "../../../models"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated } = app

	return { isAuthenticated }
}

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		setCurrentUser: (user: User) => asyncactions.setCurrentUser(dispatch, user),
		setCurrentCompany: (company: Company) => asyncactions.setCurrentCompany(dispatch, company),
		init: () => {
			asyncactions.getCompanies(dispatch)
			asyncactions.getUsers(dispatch)
		}
	}
}

export type Props = ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatcherToProps>
