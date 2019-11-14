import React, { Component } from "react"
import { Modal, Button, Alert } from "react-bootstrap"

import { Props, State } from "./models"

export class AppModal extends Component<Props, State> {
	state: State = {
		show: false,
		error: ""
	}

	getAcceptButton = this._getAcceptButton.bind(this)
	getAlert = this._getAlert.bind(this)
	onAccept = this._onAccept.bind(this)
	onDismiss = this._onDismiss.bind(this)
	show = this._setVisibility.bind(this, true)
	hide = this._setVisibility.bind(this, false)

	get showAccept() {
		return this.props.onAccept !== undefined
	}

	render() {
		return (
			<Modal show={ this.state.show } backdrop="static">
				<Modal.Header>
					<Modal.Title>{ this.props.title }</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{ this.state.error && this.getAlert() }
					{ this.props.children }
				</Modal.Body>

				<Modal.Footer>
					{ this.showAccept && this.getAcceptButton() }
					<Button
						variant={ this.props.closeStyle ? this.props.closeStyle.variant : "danger" }
						onClick={ this.hide }
					>
						{ this.props.closeStyle ? this.props.closeStyle.label : "Close" }
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	// #region JSX
	private _getAcceptButton() {
		return (
			<Button
				variant={ this.props.acceptStyle ? this.props.acceptStyle.variant : "success" }
				onClick={ this.onAccept }
			>
				{ this.props.acceptStyle ? this.props.acceptStyle.label : "Accept" }
			</Button>
		)
	}

	private _getAlert() {
		return (
			<Alert variant="danger" onClose={this.onDismiss} dismissible>
				{this.state.error}
			</Alert>
		)
	}
	// #endregion

	// #region Events
	private async _onAccept() {
		const error = await (this.props.onAccept as any)()

		if (!error) {
			this.hide()

			return
		}

		this.setState({
			error
		})
	}

	private _setVisibility(state: boolean) {
		this.setState({
			show: state
		}, () => { if (!this.state.show && this.props.onHide) this.props.onHide() })
	}

	private _onDismiss() {
		this.setState({
			...this.state,
			error: ""
		})
	}
	// #endregion
}
