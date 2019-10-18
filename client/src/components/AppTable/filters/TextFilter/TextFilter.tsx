import React, { Component } from "react"
import { Form } from "react-bootstrap"

import { Props, State } from "./models"
import { Condition } from "../../models"

export class TextFilter extends Component<Props, State> {

	onChange = this._onChange.bind(this)

	get table() {
		return this.props.tableRef
	}

	render() {
		return <Form.Control id={this.props.column} onInput={this.onChange} />
	}

	// #region Events
	private _onChange(e: React.FormEvent<any>) {
		const field: string = (e.target as HTMLInputElement).id
		const newValue: string = (e.target as HTMLInputElement).value

		const idx: number = this.table.state.conditions.map(x => x.field).indexOf(field)
		const newConditions: Condition[] = [...this.table.state.conditions]

		if (!newValue && idx !== -1) {
			newConditions.splice(idx, 1)
		} else if (idx !== -1) {
			newConditions[idx].callback = (currentVal: string) => currentVal.toLowerCase().includes(newValue.toLowerCase())
		} else if (newValue) {
			newConditions.push({
				field,
				callback: (currentVal: string) => currentVal.toLowerCase().includes(newValue.toLowerCase())
			})
		} else return

		this.table.setState({
			conditions: newConditions,
			filteredData: this.table.state.data.filter(row => this.table.filter(row, newConditions))
		})
	}
	// #endregion
}
