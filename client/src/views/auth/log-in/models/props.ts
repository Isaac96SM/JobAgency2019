import { Dispatch } from "redux"

import * as asyncactions from "store/app/async-actions"
import { AppActions } from "store/app/types"

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		loginUser: async (email: string, password: string) => await asyncactions.loginUser(dispatch, email, password),
		loginCompany: async (email: string, password: string) => await asyncactions.loginCompany(dispatch, email, password)
	}
}

export type Props = ReturnType<typeof mapDispatcherToProps>
