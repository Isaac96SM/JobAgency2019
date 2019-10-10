import { Dispatch } from "redux"

import { IRootState } from "../../../store"
import * as asyncactions from "../../../store/app/async-actions"
import { AppActions } from "../../../store/app/types"

import { User } from "../../../models"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated } = app

	return { isAuthenticated }
}

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		setUser: (user: User) => asyncactions.setUser(dispatch, user),
	}
}

export type Props = ReturnType<typeof mapStateToProps>
	& ReturnType<typeof mapDispatcherToProps>
