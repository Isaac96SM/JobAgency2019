import { Mode, Form } from "."

export interface Props {
	mode: Mode,
	onSubmit: (form: Form) => void,
	error: string
}
