import React, { Component, Fragment } from "react"
import { Form, Button, Alert } from "react-bootstrap"

import { Props, State, Form as FormModel, FormKeys, Mode } from "./models"

export class AuthForm extends Component<Props, State> {
	// #region Constructor
	initForm = this._initForm.bind(this)
	getSignInControlsUp = this._getSignInControlsUp.bind(this)
	getSignInControlsDown = this._getSignInControlsDown.bind(this)
	getAlert = this._getAlert.bind(this)
	onSubmit = this._onSubmit.bind(this)
	onChange = this._onChange.bind(this)
	onInput = this._onInput.bind(this)
	onDismiss = this._onDismiss.bind(this)

	state: State = {
		isCompany: false,
		form: this.initForm(false)
	}
	// #endregion

	get isLogin() {
		return this.props.mode === Mode.login
	}

	get parent() {
		return this.props.parentRef
	}

	render() {
		return (
			<Form>
				{this.parent.state.error && this.getAlert() }
				{ !this.isLogin && this.getSignInControlsUp() }

				<Form.Group controlId={ FormKeys.email }>
					<Form.Label>Email</Form.Label>
					<Form.Control
						onInput= { this.onInput }
						value={ this.state.form.email }
						type="email"
						placeholder="Email"
					/>
				</Form.Group>

				<Form.Group controlId={ FormKeys.password }>
					<Form.Label>Password</Form.Label>
					<Form.Control
						onInput= { this.onInput }
						value={ this.state.form.password }
						type="password"
						placeholder="Password"
					/>
				</Form.Group>

				{ !this.isLogin && this.getSignInControlsDown() }

				<Form.Group controlId="isCompany">
					<Form.Check
						onChange={this.onChange}
						value={this.state.isCompany.toString()}
						type="checkbox"
						label="Are you a company?"
					/>
				</Form.Group>

				<Button variant="primary" type="button" onClick={this.onSubmit}>
					{ this.isLogin ? "Log In" : "Sign In" }
				</Button>
			</Form>
		)
	}

	// #region JSX
	private _getSignInControlsUp() {
		if (this.state.isCompany) {
			return (
				<Form.Group controlId={ FormKeys.name }>
					<Form.Label>Name</Form.Label>
					<Form.Control
						onInput= { this.onInput }
						value={ this.state.form.name }
						type="text"
						placeholder="Name"
					/>
				</Form.Group>
			)
		}

		return (
			<Fragment>
				<Form.Group controlId={ FormKeys.firstName }>
					<Form.Label>First Name</Form.Label>
					<Form.Control
						onInput= { this.onInput }
						value={ this.state.form.firstName }
						type="text"
						placeholder="First Name"
					/>
				</Form.Group>

				<Form.Group controlId={ FormKeys.lastName }>
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						onInput= { this.onInput }
						value={ this.state.form.lastName }
						type="text"
						placeholder="Last Name"
					/>
				</Form.Group>
			</Fragment>
		)
	}

	private _getSignInControlsDown() {
		return (
			<Form.Group controlId={ FormKeys.repeatPassword }>
				<Form.Label>Repeat Password</Form.Label>
				<Form.Control
					onInput= { this.onInput }
					value={ this.state.form.repeatPassword }
					type="password"
					placeholder="Repeat Password"
				/>
			</Form.Group>
		)
	}

	private _getAlert() {
		return (
			<Alert variant="danger" onClose={ this.onDismiss } dismissible>
				{this.parent.state.error}
			</Alert>
		)
	}
	// #endregion

	// #region Methods
	private _initForm(isCompany: boolean = this.state.isCompany): FormModel {
		if (this.isLogin) {
			return this._getForm()
		} else {
			if (isCompany) {
				return this._getForm([FormKeys.name, FormKeys.repeatPassword])
			} else {
				return this._getForm([FormKeys.firstName, FormKeys.lastName, FormKeys.repeatPassword])
			}
		}
	}
	// #endregion

	// #region Events
	private _onSubmit() {
		this.props.onSubmit(this.state.form, this.state.isCompany)
	}

	private _onChange() {
		this.setState({
			...this.state,
			isCompany: !this.state.isCompany
		})
	}

	private _onInput(e: React.FormEvent<HTMLInputElement>) {
		const form: FormModel = { ...this.state.form }

		form[((e.target as HTMLInputElement).id as FormKeys)] = (e.target as HTMLInputElement).value

		this.setState({
			...this.state,
			form
		})
	}

	private _onDismiss() {
		this.parent.setState({
			...this.parent.state,
			error: ""
		})
	}
	// #endregion

	// #region Utils
	private _getForm(fields: FormKeys[] = []): FormModel {
		const state: FormModel = {
			[FormKeys.email]: this._getFormvalue(FormKeys.email),
			[FormKeys.password]: this._getFormvalue(FormKeys.password)
		}

		fields.filter(f => f !== FormKeys.email && FormKeys.password).forEach(f => state[f] = this._getFormvalue(f))

		return state
	}

	private _getFormvalue(field: FormKeys): string {
		return (this.state && this.state.form[field]) || ""
	}
	// #endregion
}
