import React, { Component } from "react"
import { Table, Form } from "react-bootstrap"

import { Props, State, Header } from "./models"

export class AppTable extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		const newState: State = { ...state }

		if (props.data && props.data !== state.data)
			newState.data = props.data

		if (props.headers && props.headers !== state.headers)
			newState.headers = props.headers

		return newState
	}

	state: State = {
		headers: this.props.headers || [],
		data: this.props.data || [],
		conditions: []
	}

	getHeader = this.getHeaderMethod.bind(this)
	getTr = this.getTrMethod.bind(this)
	getFilters = this.getFiltersMethod.bind(this)
	filterRow = this.filterRowMethod.bind(this)
	onChange = this.onChangeMethod.bind(this)

	get filteredData() {
		return this.state.data.filter(this.filterRow)
	}

	render() {
		const body: any[] = this.filteredData.map(this.getTr)

		let filters: any = null

		if (this.state.headers.filter(header => header.filter).length > 0)
			filters = this.getFilters()

		return (
			<Table>
				<thead>
						{ this.getHeader() }
				</thead>
				<tbody>
					{ filters }
					{ body }
				</tbody>
			</Table>
		)
	}

	private filterRowMethod(row: any) {
		let result: boolean = true

		this.state.conditions.forEach(condition => {
			if (!condition.callback(row)) result = false
		})

		return result
	}

	private getHeaderMethod() {
		return (
			<tr>
				{ this.state.headers.map(header => <th key={ header.value }>{ header.label || header.value }</th>) }
			</tr>
		)
	}

	private getTrMethod(row: any) {
		return (
			<tr key={ row._id }>
				{
					this.state.headers.map(header => (
						<td key={ `${row._id}.${header.value}` }>
							{ this.getParsedValue(header, row) }
						</td>
					))
				}
			</tr>
		)
	}

	private getParsedValue(header: Header, row: any) {
		if (header.parser) {
			const ParserComponent = header.parser

			return <ParserComponent value={ row[header.value] } />
		}

		return row[header.value]
	}

	private getFiltersMethod() {
		return (
			<tr>
				{
					this.state.headers.map(header => (
						<td key={ header.value }>
							{ this.getFilterHeader(header) }
						</td>
					))
				}
			</tr>
		)
	}

	private getFilterHeader(header: Header) {
		if (header.filter) {
			return (
				<Form.Control id={ header.value } onChange={this.onChange} />
			)
		}

		return null
	}

	private onChangeMethod(e: React.FormEvent<any>) {
		const field: string = (e.target as HTMLInputElement).id
		const newValue: string = (e.target as HTMLInputElement).value

		const idx: number = this.state.conditions.map(x => x.field).indexOf(field)

		if (!newValue && idx !== -1)
			this.setState({
				
			})
	}
}
