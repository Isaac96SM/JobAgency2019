import React, { Component } from "react"
import { connect } from "react-redux"

import { ComponentRef } from "models"

import { AuthForm } from "../components"
import { Mode, Form } from "../components/auth-form/models"

import { Props, State, mapDispatcherToProps } from "./models"

class LogInComponent extends Component<Props, State> {
	// #region Constructor
	state: State = {
		error: ""
	}

	ref = new ComponentRef(this)

	logIn = this._logIn.bind(this)
	// #endregion

	render() {
		return (
			<AuthForm
				parentRef={ this.ref }
				mode={ Mode.login }
				onSubmit={ this.logIn }
				error={ this.state.error }
			/>
		)
	}

	// #region Methods
	private async _logIn(form: Form, isCompany: boolean) {
		const error = isCompany
			? await this.props.loginCompany(form.email, form.password)
			: await this.props.loginUser(form.email, form.password)

		if (error)
			this.setState({
				...this.state,
				error
			})
	}
	// #endregion
}

export const LogIn = connect(null, mapDispatcherToProps)(LogInComponent)
