import React, { RefObject } from "react"
import { withRouter, Redirect } from "react-router"
import { Button } from "react-bootstrap"

import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { AppModal } from "../../../../"

import apiService from "../../../../../services/api.service"

import { BaseAction } from "../BaseAction"
import { State, Props } from "./models"

fontawesome.library.add(faCheckSquare, faCoffee)

class SubscribeActionComponent extends BaseAction<State, Props> {
	state: State = {
		complete: false
	}

	modalRef: RefObject<AppModal> = React.createRef()

	onShow = this._onShow.bind(this)
	onHide = this._onHide.bind(this)
	onSubscribe = this._onSubscribe.bind(this)

	get modal() {
		return this.modalRef.current as AppModal
	}

	render() {
		if (this.state.complete) return <Redirect to={ `/refresh#${this.props.location.pathname}` } />

		return (
			<>
				<Button
					variant="success"
					onClick={ this.onShow }
				>
					<FontAwesomeIcon icon="sign-in-alt"/>
				</Button>
				<AppModal
					ref={ this.modalRef }
					title="Subscribe to Offer"
					onAccept={ this.onSubscribe }
					acceptStyle={ { label: "Subscribe", variant: "success" } }
					closeStyle={ { label: "Cancel", variant: "light" } }
					onHide={ this.onHide }
				>
					You'll subscribe to this offer
				</AppModal>
			</>
		)
	}

	private _onShow() {
		this.modal.setState({
			show: true
		})
	}

	private _onHide() {
		this.setState({
			complete: true
		})
	}

	private async _onSubscribe() {
		await apiService.offers.inscriptions.put(this.props.row_id)
	}
}

export const SubscribeAction = withRouter(SubscribeActionComponent)
