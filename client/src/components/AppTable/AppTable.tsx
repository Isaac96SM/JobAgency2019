import React, { Component, Fragment } from "react"
import { Table, Form } from "react-bootstrap"

import { Props, State, Header, Condition } from "./models"
import { Paginator } from "./components"

export class AppTable extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		const newState: State = { ...state }

		if (props.data && props.data !== state.data) {
			newState.data = props.data
			newState.filteredData = props.data
		}

		if (props.headers && props.headers !== state.headers)
			newState.headers = props.headers

		return newState
	}

	// #region Constructor
	state: State = {
		headers: this.props.headers || [],
		data: this.props.data || [],
		filteredData: this.props.data || [],
		conditions: [],
		skip: 0,
		limit: this.props.limit || 20
	}

	getHeader = this._getHeader.bind(this)
	getFilters = this._getFilters.bind(this)
	getRow = this._getRow.bind(this)
	getPaginator = this._getPaginator.bind(this)
	paginate = this._paginate.bind(this)
	filter = this._filter.bind(this)
	onChange = this._onChange.bind(this)
	// #endregion

	render() {
		const body: any[] = this.paginate().map(this.getRow)

		const filters: boolean = this.state.headers.filter(header => header.filter).length > 0
		const paginator: boolean = this.state.filteredData.length > this.state.limit

		return (
			<Fragment>
				<Table>
					<thead>
							{ this.getHeader() }
					</thead>
					<tbody>
						{ filters && this.getFilters() }
						{ body }
					</tbody>
				</Table>
				{ paginator && this.getPaginator() }
			</Fragment>
		)
	}

	// #region JSX
	private _getHeader() {
		return (
			<tr>
				{this.state.headers.map(header => <th key={header.value}>{header.label || header.value}</th>)}
			</tr>
		)
	}

	private _getFilters() {
		return (
			<tr>
				{
					this.state.headers.map(header => (
						<td key={header.value}>
							{this._getFilterHeader(header)}
						</td>
					))
				}
			</tr>
		)
	}

	private _getRow(row: any) {
		return (
			<tr key={row._id}>
				{
					this.state.headers.map(header => (
						<td key={`${row._id}.${header.value}`}>
							{this._getParsedValue(header, row)}
						</td>
					))
				}
			</tr>
		)
	}

	private _getPaginator() {
		return (
			<Paginator
				tableRef={this}
				items={this.state.filteredData.length}
				limit={this.state.limit}
			/>
		)
	}
	// #endregion

	// #region Methods
	private _filter(row: any, conditions: Condition[] = this.state.conditions) {
		let result: boolean = true

		conditions.forEach(condition => {
			if (!condition.callback(row[condition.field])) result = false
		})

		return result
	}

	private _paginate() {
		const { skip, limit, filteredData } = this.state

		if (skip + limit > filteredData.length)
			return filteredData.slice(skip)

		return filteredData.slice(skip, limit)
	}
	// #endregion

	// #region Events
	private _onChange(e: React.FormEvent<any>) {
		const field: string = (e.target as HTMLInputElement).id
		const newValue: string = (e.target as HTMLInputElement).value

		const idx: number = this.state.conditions.map(x => x.field).indexOf(field)
		const newConditions: Condition[] = [...this.state.conditions]

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

		this.setState({
			conditions: newConditions,
			filteredData: this.state.data.filter(row => this.filter(row, newConditions))
		})
	}
	// #endregion

	// #region Utils
	private _getFilterHeader(header: Header) {
		if (header.filter) {
			return (
				<Form.Control id={header.value} onInput={this.onChange} />
			)
		}

		return null
	}

	private _getParsedValue(header: Header, row: any) {
		if (header.parser) {
			const ParserComponent = header.parser

			return <ParserComponent value={row[header.value]} />
		}

		return row[header.value]
	}
	// #endregion
}
