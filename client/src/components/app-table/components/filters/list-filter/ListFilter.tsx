import React from "react"
import { Form, OverlayTrigger, Popover, Button } from "react-bootstrap"

import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { BaseFilter } from "../BaseFilter"

import { State } from "./models"
import { Condition } from "../../../models"

fontawesome.library.add(faCheckSquare, faCoffee)

export class ListFilter extends BaseFilter<State> {
	state: State = {
		values: []
	}

	getPopover = this._getPopover.bind(this)
	getCheckbox = this._getCheckbox.bind(this)
	onChange = this._onChange.bind(this)
	onApply = this._onApply.bind(this)

	get values() {
		return [ ...new Set(this.props.tableRef.state.data.map(row => row[this.props.column])) ]
	}

	render() {
		const popover = this.getPopover()

		return (
			<>
				<Form.Label>
					Selected: { this.state.values.length }
				</Form.Label>
				<OverlayTrigger rootClose trigger="click" placement="right" overlay={ popover }>
					<FontAwesomeIcon icon="filter" />
				</OverlayTrigger>
			</>
		)
	}

	// #region JSX
	private _getPopover() {
		return (
			<Popover id="popover-basic">
				<Popover.Title as="h3">Filter</Popover.Title>
				<Popover.Content>
					<Form>
						{ this.values.map(this.getCheckbox) }
						<Button
							variant="primary"
							onClick={ this.onApply }
						>
							Apply
						</Button>
					</Form>
				</Popover.Content>
			</Popover>
		)
	}

	private _getCheckbox(value: string, idx: number) {
		return (
			<Form.Group key={ idx.toString() } controlId={ value }>
				<Form.Check
					checked={ this.state.values.includes(value) }
					onChange={ this.onChange }
					type="checkbox"
					label={ value }
				/>
			</Form.Group>
		)
	}
	// #endregion

	// #region Events
	private _onChange(e: React.FormEvent<HTMLInputElement>) {
		let values: string[] = []

		if (e.currentTarget.checked) {
			values = [ ...this.state.values, e.currentTarget.id ]
		} else {
			values = this.state.values.filter(v => v !== e.currentTarget.id)
		}

		this.setState({
			values
		})
	}

	private _onApply() {
		this.removeCondition(this.props.column)

		if (this.state.values.length !== 0) {
			const condition: Condition = {
				field: this.props.column,
				callback: (currentVal: string) => this.state.values.includes(currentVal)
			}

			this.addCondition(condition)
		}

		document.body.click()
	}
	// #endregion
}
