import React, { Component } from "react"
import { Table } from "react-bootstrap"

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
		data: this.props.data || []
	}

	getHeader = this.getHeaderMethod.bind(this)
	getTr = this.getTrMethod.bind(this)

	render() {
		const body: any[] = this.state.data.map(this.getTr)

		return (
			<Table>
				<thead>
						{ this.getHeader() }
				</thead>
				<tbody>
					{ body }
				</tbody>
			</Table>
		)
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
}
