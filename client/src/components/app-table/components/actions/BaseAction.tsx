import React, { Component, RefObject } from "react"
import { Redirect } from "react-router"
import { Button } from "react-bootstrap"

import fontawesome from "@fortawesome/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid"

import { AppModal } from "../../../"

import { Props as BaseProps, State as BaseState, ModalData } from "./models"

fontawesome.library.add(faCheckSquare, faCoffee)

export abstract class BaseAction extends Component<BaseProps, BaseState> {
	state: BaseState = {
		complete: false
	}

	protected abstract callback: (row_id: string) => void
	protected abstract modalData: ModalData

	private onShow = this._onShow.bind(this)
	private onConfirm = this._onConfirm.bind(this)
	private modalRef: RefObject<AppModal> = React.createRef()

	private get modal() {
		return this.modalRef.current as AppModal
	}

	render() {
		if (this.state.complete) return <Redirect to={ `/refresh#${this.props.location.pathname}` } />

		return (
			<>
				<Button
					variant={ this.modalData.buttonVariant }
					onClick={ this.onShow }
				>
					<FontAwesomeIcon icon="sign-in-alt" />
				</Button>
				<AppModal
					ref={ this.modalRef }
					title={ this.modalData.modalTitle }
					onAccept={ this.onConfirm }
					acceptStyle={ this.modalData.acceptStyle }
					closeStyle={ this.modalData.closeStyle }
				>
					{ this.modalData.modalBody }
				</AppModal>
			</>
		)
	}

	private _onConfirm() {
		this.callback(this.props.row_id)

		this.setState({
			complete: true
		})
	}

	private _onShow() {
		this.modal.setState({
			show: true
		})
	}
}
