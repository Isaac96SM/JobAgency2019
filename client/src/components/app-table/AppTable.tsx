import React, { Component } from "react"
import { withRouter } from "react-router"
import { Table } from "react-bootstrap"

import { Paginator } from "./components"

import { ComponentRef } from "models"
import { Props, State, Header, Action } from "./models"
import { Props as BaseActionProps } from "./components/actions/models"

export class AppTable extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		const newState: State = { ...state }

		if (props.data && props.data !== state.data) {
			newState.data = props.data
			newState.filteredData = props.data
		}

		if (props.headers && props.headers !== state.headers)
			newState.headers = props.headers

		if (props.actions && props.actions !== state.actions)
			newState.actions = props.actions

		return newState
	}

	// #region Constructor
	state: State = {
		headers: this.props.headers || [],
		data: this.props.data || [],
		actions: this.props.actions || [],
		filteredData: this.props.data || [],
		conditions: [],
		skip: 0,
		limit: this.props.limit || 20
	}

	ref = new ComponentRef(this)

	getHeader = this._getHeader.bind(this)
	getFilters = this._getFilters.bind(this)
	getRow = this._getRow.bind(this)
	getPaginator = this._getPaginator.bind(this)
	paginate = this._paginate.bind(this)
	// #endregion

	render() {
		const body: JSX.Element[] = this.paginate().map(this.getRow)

		const filters: boolean = this.state.headers.filter(header => header.filter).length > 0
		const paginator: boolean = this.state.filteredData.length > this.state.limit

		return (
			<>
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
			</>
		)
	}

	// #region JSX
	private _getHeader() {
		return (
			<tr>
				{
					this.state.headers.map(header =>
						<th key={ header.value }>
							{ header.label || header.value }
						</th>
					)
				}
				{ this.state.actions.length > 0 && (
					<th>
						{ "Actions" }
					</th>
				) }
			</tr>
		)
	}

	private _getFilters() {
		return (
			<tr>
				{
					this.state.headers.map(header =>
						<td key={ header.value }>
							{ this._getFilterHeader(header) }
						</td>
					)
				}
				{ this.state.actions.length > 0 && (
					<td>
						{ null }
					</td>
				) }
			</tr>
		)
	}

	private _getRow(row: any) {
		return (
			<tr key={ row._id }>
				{
					this.state.headers.map(header =>
						<td key={ `${row._id}.${header.value}` }>
							{ this._getParsedValue(header, row) }
						</td>
					)
				}
				{ this.state.actions.length > 0 && (
					<td>
						{ this.state.actions
							.filter(action => action.show === undefined || action.show(row))
							.map((action, idx) => this._getActionComponent(action.action, row, idx)) }
					</td>
				) }
			</tr>
		)
	}

	private _getPaginator() {
		return (
			<Paginator
				tableRef={ this.ref }
				items={ this.state.filteredData.length }
				limit={ this.state.limit }
			/>
		)
	}
	// #endregion

	// #region Methods
	private _paginate() {
		const { skip, limit, filteredData } = this.state

		if (skip + limit > filteredData.length)
			return filteredData.slice(skip)

		return filteredData.slice(skip, limit)
	}
	// #endregion

	// #region Utils
	private _getFilterHeader(header: Header) {
		if (header.filter) {
			const FilterComponent = header.filter

			return (
				<FilterComponent
					tableRef={ this.ref }
					column={ header.value }
				/>
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

	private _getActionComponent(
		action: Action["action"],
		row: any,
		idx: number
	) {
		const ActionComponent = withRouter<BaseActionProps, any>(action)

		return <ActionComponent key={ idx } row_id={ row._id } />
	}
	// #endregion
}
