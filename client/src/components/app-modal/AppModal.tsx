import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap"

import { Props, State } from "./models"

export class AppModal extends Component<Props, State> {
	state: State = {
		show: false
	}

	getAcceptButton = this._getAcceptButton.bind(this)
	onAccept = this._onAccept.bind(this)
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
					{ this.props.children }
				</Modal.Body>

				<Modal.Footer>
					{ this.showAccept && this.getAcceptButton() }
					<Button
						variant="danger"
						onClick={ this.hide }
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	// #region JSX
	private _getAcceptButton() {
		return (
			<Button
				variant="success"
				onClick={ this.onAccept }
			>
				Accept
			</Button>
		)
	}
	// #endregion

	// #region Events
	private _onAccept() {
		(this.props.onAccept as any)()

		this.hide()
	}

	private _setVisibility(state: boolean) {
		this.setState({
			show: state
		})
	}
	// #endregion
}
