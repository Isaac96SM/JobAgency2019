import { Dispatch } from "redux"
import { RouteComponentProps } from "react-router-dom"

import { IRootState } from "../../../store"
import * as asyncactions from "../../../store/app/async-actions"
import { AppActions } from "../../../store/app/types"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated, currentUser, currentCompany } = app

	return { isAuthenticated, currentUser, currentCompany }
}

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		logout: () => asyncactions.logout(dispatch)
	}
}

export type Props = ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatcherToProps>
	& RouteComponentProps
