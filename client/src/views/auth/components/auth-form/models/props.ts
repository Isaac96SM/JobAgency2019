import { ComponentRef } from "../../../../../models"

import { State as LogInState } from "../../../log-in/models"
import { State as SignInState } from "../../../sign-in/models"

import { Mode, Form } from "."

export interface Props {
	mode: Mode,
	onSubmit: (form: Form, isCompany: boolean) => void,
	parentRef: ComponentRef<LogInState> | ComponentRef<SignInState>
}
