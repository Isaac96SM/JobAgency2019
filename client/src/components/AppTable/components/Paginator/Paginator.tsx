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

	state: State = {
		currentPage: 1,
		items: this.props.items
	}

	getPages = this.getPagesMethod.bind(this)
	emit = this.emitMethod.bind(this)

	render() {
		const items: any[] = []

		for (let i: number = 1; i <= this.getPages(); i++) {
			const isCurrent: boolean = i === this.state.currentPage

			items.push(
				<Pagination.Item
					onClick={ !isCurrent ? this.emit : null }
					key={ i }
					id={ i }
					active={ isCurrent }
				>
					{ i }
				</Pagination.Item>)
		}

		if (this.state.items <= this.props.itemsPerPage)
			return null

		return(
			<Pagination>
				{ items }
			</Pagination>
		)
	}

	private emitMethod(e: React.FormEvent<any>) {
		const newPage: number = parseInt((e.target as HTMLElement).id)

		this.setState({
			...this.state,
			currentPage: newPage
		})

		const skip: number = this.props.itemsPerPage * (newPage - 1)
		const limit: number = this.props.itemsPerPage

		this.props.emit(skip, limit)
	}

	private getPagesMethod() {
		return parseInt((this.state.items / this.props.itemsPerPage).toString()) + 1
	}
}
