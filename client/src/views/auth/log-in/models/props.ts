import { Dispatch } from "redux"
import { RouteComponentProps } from "react-router-dom"

import { IRootState } from "../../../../store"
import * as asyncactions from "../../../../store/app/async-actions"
import { AppActions } from "../../../../store/app/types"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated } = app

	return { isAuthenticated }
}

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		loginUser: async (email: string, password: string) => await asyncactions.loginUser(dispatch, email, password),
		loginCompany: async (email: string, password: string) => await asyncactions.loginCompany(dispatch, email, password)
	}
}

export type Props = ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatcherToProps>
	& RouteComponentProps
