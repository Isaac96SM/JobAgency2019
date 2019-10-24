import { Dispatch } from "redux"
import { RouteComponentProps } from "react-router-dom"

import * as asyncactions from "../../../../store/app/async-actions"
import { AppActions } from "../../../../store/app/types"

import { Form } from "../../components/auth-form/models"
import { User, Company } from "../../../../models"

export const mapDispatcherToProps = (dispatch: Dispatch<AppActions>) => {
	return {
		signinUser: async (form: Form) => {
			const user: User = {
				FirstName: form.firstName as string,
				LastName: form.lastName as string,
				Email: form.email,
				Password: form.password
			}

			return await asyncactions.signinUser(dispatch, user)
		},
		signinCompany: async (form: Form) => {
			const company: Company = {
				Name: form.name as string,
				Email: form.email,
				Password: form.password
			}

			return await asyncactions.signinCompany(dispatch, company)
		}
	}
}

export type Props = ReturnType<typeof mapDispatcherToProps>
	& RouteComponentProps
