import { Component } from "react"

import { Mode, Form } from "."

export interface Props {
	mode: Mode,
	onSubmit: (form: Form, isCompany: boolean) => void,
	wrapper: Component<{ error: string } & any, any>
}
