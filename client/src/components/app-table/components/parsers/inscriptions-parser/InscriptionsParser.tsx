import React, { RefObject } from "react"
import { connect } from "react-redux"
import { Tooltip, OverlayTrigger } from "react-bootstrap"

import { AppTable, AppModal } from "../../../.."
import { BaseParser } from "../BaseParser"
import { CounterParser } from ".."

import { User, Inscription } from "../../../../../models"
import { Headers } from "./constants"

import { State as BaseState } from "../models"
import { Props, mapStateToProps, State } from "./models"

import "./styles/InscriptionsParser.css"

class InscriptionsParserComponent extends BaseParser<Inscription[], Props, State & BaseState<Inscription[]>> {
	state: State & BaseState<Inscription[]> = {
		currentUser: this.props.currentUser,
		...this.baseState
	}

	modalRef: RefObject<AppModal> = React.createRef()

	getModal = this._getModal.bind(this)
	getUserData = this._getUserData.bind(this)
	showModal = this._showModal.bind(this)

	get user() {
		return this.state.currentUser as User
	}

	get isUser() {
		return this.user !== undefined
	}

	get modal() {
		return this.modalRef.current as AppModal
	}

	get modalShow() {
		return this.modal && this.modal.state.show
	}

	render() {
		const subscribed: boolean = this.isUser && this.state.value.filter(x => x.User === this.user._id).length > 0

		const counter = (
			<div
				className={ `width-25 ${!this.isUser ? "clickable" : ""}` }
				onClick={ (!this.modalShow && !this.isUser) ? this.showModal : () => null }
			>
				<CounterParser value={ this.state.value } />
				{ this.getModal() }
			</div>
		)

		if (!subscribed || this.modalShow)
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
			<AppModal
				ref={ this.modalRef }
				title="Inscriptions"
			>
				<AppTable
					headers={ Headers }
					data={ this.getUserData() }
					limit={ 0 }
				/>
			</AppModal>
		)
	}
	// #endregion

	// #region Methods
	private _getUserData() {
		return this.state.value.map(v => {
			const user: User | undefined = this.props.users.find(u => u._id === v.User)

			return {
				...v,
				Name: user ? `${user.LastName}, ${user.FirstName}` : v.User
			}
		})
	}
	// #endregion

	// #region Events
	private _showModal() {
		if (this.modalShow) return

		this.modal.setState({
			show: true
		})
	}
	// #endregion
}

export const InscriptionsParser = connect(mapStateToProps, {})(InscriptionsParserComponent)
