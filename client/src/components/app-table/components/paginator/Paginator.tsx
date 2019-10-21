import React, { Component } from "react"
import { Pagination } from "react-bootstrap"

import { Props, State } from "./models"

import "./styles/Paginator.css"

export class Paginator extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		const newState: State = { ...state }

		if (props.items !== state.items) {
			newState.items = props.items
			newState.currentPage = 1
		}

		return newState
	}

	// #region Constructor
	state: State = {
		currentPage: 1,
		items: this.props.items,
	}

	getPaginationItem = this._getPaginationItem.bind(this)
	getPages = this._getPages.bind(this)
	paginate = this._paginate.bind(this)
	// #endregion

	get table() {
		return this.props.tableRef
	}

	render() {
		const items: JSX.Element[] = this.getPages().map(this.getPaginationItem)

		return(
			<Pagination>
				{ items }
			</Pagination>
		)
	}

	// #region JSX
	private _getPaginationItem(index: number) {
		const isCurrent: boolean = index === this.state.currentPage

		return (
			<Pagination.Item
				onClick={ !isCurrent ? this.paginate : null }
				key={ index }
				id={ index }
				active={ isCurrent }
			>
				{ index }
			</Pagination.Item>
		)
	}
	// #endregion

	// #region Methods
	private _paginate(e: React.FormEvent<any>) {
		const newPage: number = parseInt((e.target as HTMLElement).id)

		this.setState({
			...this.state,
			currentPage: newPage
		})

		const skip: number = this.props.limit * (newPage - 1)
		const limit: number = this.props.limit

		this.table.setState({
			...this.table.state,
			skip,
			limit
		})
	}
	// #endregion

	// #region Utils
	private _getPages() {
		const pages: number = parseInt((this.state.items / this.props.limit).toString()) + 1
		const array: any[] = Array(pages)

		return [ ...array.keys() ].map(i => i + 1)
	}
	// #endregion
}
