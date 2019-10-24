import React from "react"
import { connect } from "react-redux"
import { Tooltip, OverlayTrigger, Modal, Button } from "react-bootstrap"

import { AppTable } from "../../../AppTable"
import { BaseParser } from "../BaseParser"
import { CounterParser } from ".."

import { User, Inscription } from "../../../../../models"
import { Headers } from "./constants"

import { State as BaseState } from "../models"
import { Props, mapStateToProps, State } from "./models"

import "./styles/InscriptionsParser.css"

class InscriptionsParserComponent extends BaseParser<Inscription[], Props, State & BaseState<Inscription[]>> {
	state: State & BaseState<Inscription[]> = {
		show: false,
		currentUser: this.props.currentUser,
		...this.baseState
	}

	getModal = this._getModal.bind(this)
	getUserData = this._getUserData.bind(this)
	showModal = this._toggleModal.bind(this, true)
	hideModal = this._toggleModal.bind(this, false)

	get user() {
		return this.state.currentUser as User
	}

	get isUser() {
		return this.user !== undefined
	}

	render() {
		const subscribed: boolean = this.isUser && this.state.value.filter(x => x.User === this.user._id).length > 0

		const counter = (
			<div className="width-25" onClick={ (!this.state.show && !this.isUser) ? this.showModal : () => null }>
				<CounterParser value={ this.state.value } />
				{ this.getModal() }
			</div>
		)

		if (!subscribed || this.state.show)
			return counter

		return (
			<OverlayTrigger
				placement="right"
				overlay={
					<Tooltip id="tooltip">
						You are already subscribed!
					</Tooltip>
				}
			>
				{ counter }
			</OverlayTrigger>
		)
	}

	// #region JSX
	private _getModal() {
		return (
			<Modal show={ this.state.show } backdrop="static">
				<Modal.Header>
					<Modal.Title>Inscriptions</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<AppTable
						headers={ Headers }
						data={ this.getUserData() }
						limit={ 0 }
					/>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={ this.hideModal }
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}
	// #endregion

	// #region Methods
	private _getUserData() {
		return this.state.value.map(v => {
			const user: User = this.props.users.find(u => u._id === v.User) as User

			return {
				...v,
				Name: `${user.LastName}, ${user.FirstName}`
			}
		})
	}
	// #endregion

	// #region Events
	private _toggleModal(newValue: boolean) {
		this.setState({
			...this.state,
			show: newValue
		})
	}
	// #endregion
}

export const InscriptionsParser = connect(mapStateToProps, {})(InscriptionsParserComponent)
