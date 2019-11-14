import React, { RefObject } from "react"
import { Button } from "react-bootstrap"
import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { AppModal } from "../../../../"

import { BaseAction } from "../BaseAction"
import { State } from "./models"
import apiService from "../../../../../services/api.service"

fontawesome.library.add(faCheckSquare, faCoffee)

export class DeleteAction extends BaseAction<State> {
	modalRef: RefObject<AppModal> = React.createRef()

	onShow = this._onShow.bind(this)
	onDelete = this._onDelete.bind(this)

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
					<FontAwesomeIcon icon="trash-alt"/>
				</Button>
				<AppModal
					ref={ this.modalRef }
					title="Delete Offer"
					onAccept={ this.onDelete }
					acceptStyle={ { label: "Delete", variant: "danger" } }
					closeStyle={ { label: "Cancel", variant: "light" } }
				>
					This offer will not be longer available
				</AppModal>
			</>
		)
	}

	private _onShow() {
		this.modal.setState({
			show: true
		})
	}

	private async _onDelete() {
		await apiService.offers.delete(this.props.row_id)
	}
}
