import React from "react"
import { connect } from "react-redux"
import { Tooltip, OverlayTrigger, Modal, Button } from "react-bootstrap"

import { AppTable } from "../../AppTable"
import { BaseParser } from "../BaseParser"
import { CounterParser } from ".."

import { User, Inscription } from "../../../../models"
import { Headers } from "./constants"

import { State as BaseState } from "../models"
import { Props, mapStateToProps, State } from "./models"

import "./styles/InscriptionsParser.css"

class InscriptionsParserComponent extends BaseParser<Inscription[], Props, State & BaseState<Inscription[]>> {
	state: State & BaseState<Inscription[]> = {
		show: false,
		...this.baseState
	}

	getModal = this._getModal.bind(this)
	getUserData = this._getUserData.bind(this)
	showModal = this._toggleModal.bind(this, true)
	hideModal = this._toggleModal.bind(this, false)

	render() {
		const subscribed: boolean = this.state.value.filter(x => x.User === (this.props.currentUser as User)._id).length > 0
		const counter = (
			<div className="width-25" onClick={ !this.state.show ? this.showModal : () => null }>
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
		return this.props.users
			.filter(u => this.state.value.map(v => v.User).includes(u._id as string))
			.map(u => ({ _id: u._id, Name: `${u.LastName}, ${u.FirstName}` }))
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
