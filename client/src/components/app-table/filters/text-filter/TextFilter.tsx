import React from "react"
import { Form } from "react-bootstrap"

import { BaseFilter } from "../BaseFilter"

import { State } from "./models"
import { Condition } from "../../models"

export class TextFilter extends BaseFilter<State> {
	onChange = this._onChange.bind(this)

	render() {
		return <Form.Control id={ this.props.column } onInput={ this.onChange } />
	}

	private _onChange(e: React.FormEvent<any>) {
		const field: string = (e.target as HTMLInputElement).id
		const newValue: string = (e.target as HTMLInputElement).value

		if (!newValue)
			return this.removeCondition(field)

		const condition: Condition = {
			field,
			callback: (currentVal: string) => currentVal.toLowerCase().includes(newValue.toLowerCase())
		}

		this.addCondition(condition)
	}
}
