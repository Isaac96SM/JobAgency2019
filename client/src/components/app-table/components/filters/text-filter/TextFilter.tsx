import React from "react"
import { Form } from "react-bootstrap"

import { BaseFilter } from "../BaseFilter"

import { Condition } from "../../../models"

export class TextFilter extends BaseFilter {
	onChange = this._onChange.bind(this)

	render() {
		return <Form.Control id={ this.props.column } onInput={ this.onChange } />
	}

	private _onChange(e: React.FormEvent<HTMLInputElement>) {
		const field: string = e.currentTarget.id
		const newValue: string = e.currentTarget.value

		if (!newValue)
			return this.removeCondition(field)

		const condition: Condition = {
			field,
			callback: (currentVal: string) => currentVal.toLowerCase().includes(newValue.toLowerCase())
		}

		this.addCondition(condition)
	}
}
