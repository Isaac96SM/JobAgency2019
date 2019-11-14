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

class DeleteActionComponent extends BaseAction<State, Props> {
	state: State = {
		complete: false
	}

	modalRef: RefObject<AppModal> = React.createRef()

	onShow = this._onShow.bind(this)
	onHide = this._onHide.bind(this)
	onDelete = this._onDelete.bind(this)

	get modal() {
		return this.modalRef.current as AppModal
	}

	render() {
		if (this.state.complete) return <Redirect to={ `/refresh#${this.props.location.pathname}` } />

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
					onHide={ this.onHide }
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

	private _onHide() {
		this.setState({
			complete: true
		})
	}

	private async _onDelete() {
		await apiService.offers.delete(this.props.row_id)
	}
}

export const DeleteAction = withRouter(DeleteActionComponent)
