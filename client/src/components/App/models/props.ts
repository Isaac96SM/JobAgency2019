import { Dispatch } from "redux"

import { IRootState } from "@/store"
import * as asyncactions from "@/store/app/async-actions"
import { AppActions } from "@/store/app/types"

export const mapStateToProps = ({ app }: IRootState) => {
	const { isAuthenticated, user, company } = app

	return { isAuthenticated, user, company }
}

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		login: (email: string, password: string) => asyncactions.loginUser(dispatch, email, password)
	}
}

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>
