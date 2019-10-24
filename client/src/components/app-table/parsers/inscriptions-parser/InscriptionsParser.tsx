import React from "react"
import { connect } from "react-redux"
import { Tooltip, OverlayTrigger, Modal, Button } from "react-bootstrap"

import { AppTable } from "../../AppTable"
import { BaseParser } from "../BaseParser"
import { CounterParser } from ".."

import { User, Inscription } from "../../../../models"
import { Headers } from "./constants"

import { Props, mapStateToProps } from "./models"

import "./styles/InscriptionsParser.css"

class InscriptionsParserComponent extends BaseParser<Inscription[], Props> {
	getModal = this._getModal.bind(this)
	getUserData = this._getUserData.bind(this)
	showModal = this._showModal.bind(this)

	render() {
		const subscribed: boolean = this.state.value.filter(x => x.User === (this.props.currentUser as User)._id).length > 0
		const counter = (
			<div className="width-25" onClick={ this.showModal }>
				<CounterParser value={ this.state.value } />
				{ this.getModal() }
			</div>
		)

		if (!subscribed)
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
			<Modal show={ false } backdrop="static">
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
					<Button variant="secondary">Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
	// #endregion

	// #region Methods
	private _getUserData() {
		return this.props.users
			.filter(u => this.state.value.map(v => v.User).includes(u._id as string))
			.map(u => ({ Name: `${u.LastName}, ${u.FirstName}` }))
	}
	// #endregion

	// #region Events
	private _showModal() {
		return
	}
	// #endregion
}

export const InscriptionsParser = connect(mapStateToProps, {})(InscriptionsParserComponent)
