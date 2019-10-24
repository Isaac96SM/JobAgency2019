import { ComponentRef } from "../../../../../models"

import { State } from "../../../models"

import { Mode, Form } from "."

export interface Props {
	error: string,
	mode: Mode,
	onSubmit: (form: Form, isCompany: boolean) => void,
	parentRef: ComponentRef<any, any & State>
}
