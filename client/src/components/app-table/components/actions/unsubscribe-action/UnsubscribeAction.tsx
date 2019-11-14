import React, { RefObject } from "react"
import { Button } from "react-bootstrap"
import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { AppModal } from "../../../../"

import apiService from "../../../../../services/api.service"

import { BaseAction } from "../BaseAction"
import { State } from "./models"

fontawesome.library.add(faCheckSquare, faCoffee)

export class UnsubscribeAction extends BaseAction<State> {
	modalRef: RefObject<AppModal> = React.createRef()

	onShow = this._onShow.bind(this)
	onUnsubscribe = this._onUnsubscribe.bind(this)

	get modal() {
		return this.modalRef.current as AppModal
	}

	render() {
		return (
			<>
				<Button
					variant="danger"
					onClick={ this.onShow }
				>
					<FontAwesomeIcon icon="sign-out-alt"/>
				</Button>
				<AppModal
					ref={ this.modalRef }
					title="Unsubscribe to Offer"
					onAccept={ this.onUnsubscribe }
					acceptStyle={ { label: "Unsubscribe", variant: "danger" } }
					closeStyle={ { label: "Cancel", variant: "light" } }
				>
					You'll remove your subscription
				</AppModal>
			</>
		)
	}

	private _onShow() {
		this.modal.setState({
			show: true
		})
	}

	private async _onUnsubscribe() {
		await apiService.offers.inscriptions.delete(this.props.row_id)
	}
}
