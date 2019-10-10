import { Dispatch } from "redux"
import { RouteComponentProps } from "react-router-dom"

import { IRootState } from "../../../store"
import * as asyncactions from "../../../store/app/async-actions"
import { AppActions } from "../../../store/app/types"

import { User } from "../../../models"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated, user, company } = app

	return { isAuthenticated, user, company }
}

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		setUser: (user: User) => asyncactions.setUser(dispatch, user),
		login: (email: string, password: string) => asyncactions.loginUser(dispatch, email, password),
		logout: () => asyncactions.logout(dispatch)
	}
}

export type Props = ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatcherToProps>
	& RouteComponentProps
