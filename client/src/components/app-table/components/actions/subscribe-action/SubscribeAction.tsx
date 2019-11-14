import React, { RefObject } from "react"
import { Button } from "react-bootstrap"
import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { AppModal } from "../../../../"

import { BaseAction } from "../BaseAction"
import { State } from "./models"

fontawesome.library.add(faCheckSquare, faCoffee)

export class SubscribeAction extends BaseAction<State> {
	modalRef: RefObject<AppModal> = React.createRef()

	onShow = this._onShow.bind(this)
	onSubscribe = this._onSubscribe.bind(this)

	get modal() {
		return this.modalRef.current as AppModal
	}

	render() {
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

	private _onSubscribe() {
		
	}
}
