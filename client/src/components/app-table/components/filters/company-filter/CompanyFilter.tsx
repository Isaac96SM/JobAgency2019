import React from "react"
import { Form, OverlayTrigger, Popover, Button } from "react-bootstrap"

import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { BaseFilter } from "../BaseFilter"

import { State, mapStateToProps, Props } from "./models"
import { Condition } from "../../../models"
import { connect } from "react-redux"

fontawesome.library.add(faCheckSquare, faCoffee)

export class CompanyFilterComponent extends BaseFilter<State, Props> {
	state: State = {
		values: [],
		search: ""
	}

	getButton = this._getButton.bind(this)
	getPopover = this._getPopover.bind(this)
	getCheckbox = this._getCheckbox.bind(this)
	onChange = this._onChange.bind(this)
	onInput = this._onInput.bind(this)
	showCheckbox = this._showCheckbox.bind(this)

	get values(): string[] {
		return [ ...new Set(this.props.tableRef.state.data.map(row => row[this.props.column])) ]
	}

	get filtered(): boolean {
		return this.state.values.length > 0 && this.state.values.length !== this.values.length
	}

	render() {
		const popover = this.getPopover()

		return (
			<OverlayTrigger rootClose trigger="click" placement="right" overlay={ popover }>
				{ this.getButton() }
			</OverlayTrigger>
		)
	}

	// #region JSX
	private _getButton() {
		return (
			<Button
				style={ { width: "100%" } }
				variant={ this.filtered ? "secondary" : "light" }
			>
				<FontAwesomeIcon icon="filter" />
			</Button>
		)
	}

	private _getPopover() {
		return (
			<Popover id="popover-basic">
				<Popover.Title as="h3">Filter</Popover.Title>
				<Popover.Content>
					<Form>
						<Form.Group>
							<Form.Control placeholder="Search" onInput={ this.onInput } />
						</Form.Group>
						{
							this.values
								.filter(this.showCheckbox)
								.map(this.getCheckbox)
						}
					</Form>
				</Popover.Content>
			</Popover>
		)
	}

	private _getCheckbox(value: string, idx: number) {
		const company = this.props.companies.find(c => c._id === value)

		return (
			<Form.Group key={ idx.toString() } controlId={ value }>
				<Form.Check
					checked={ this.state.values.includes(value) }
					onChange={ this.onChange }
					type="checkbox"
					label={ company ? company.Name : value }
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
		}, this._apply)
	}

	private _onInput(e: React.FormEvent<HTMLInputElement>) {
		this.setState({
			...this.state,
			search: e.currentTarget.value
		})
	}
	// #endregion

	// #region Utils
	private _showCheckbox(value: string) {
		return this.state.search === "" || value.toLowerCase().includes(this.state.search.toLowerCase())
	}

	private _apply() {
		this.removeCondition(this.props.column)

		if (this.state.values.length !== 0) {
			const condition: Condition = {
				field: this.props.column,
				callback: (currentVal: string) => this.state.values.includes(currentVal)
			}

			this.addCondition(condition)
		}
	}
	// #endregion
}

export const CompanyFilter = connect(mapStateToProps, {})(CompanyFilterComponent)
