import React, { Component } from "react"
import { Form } from "react-bootstrap"

import { Props, State } from "./models"

export class FormGroup extends Component<Props, State> {
	state: State = {

	}

	render() {
		return (
			<Form.Group controlId={ this.props.id }>
			<Form.Label>{ this.props.label }</Form.Label>
				<Form.Control
					onInput={ this.props.onInput }
					value={ this.props.value }
					type={ this.props.type }
					placeholder={ this.props.label }
				/>
			</Form.Group>
		)
	}
}
