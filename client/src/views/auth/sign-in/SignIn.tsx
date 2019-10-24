import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"

import { ComponentRef } from "../../../models"

import { AuthForm } from "../components"
import { Mode, Form } from "../components/auth-form/models"

import { Props, State, mapDispatcherToProps } from "./models"

class SignInComponent extends Component<Props, State> {
	// #region Constructor
	state: State = {
		error: ""
	}

	ref = new ComponentRef(this)

	signIn = this._signIn.bind(this)
	// #endregion

	render() {
		return (
			<AuthForm
				parentRef={ this.ref }
				mode={ Mode.signin }
				onSubmit={ this.signIn }
				error={ this.state.error }
			/>
		)
	}

	// #region Methods
	private async _signIn(form: Form, isCompany: boolean) {
		const error = isCompany
			? await this.props.signinCompany(form)
			: await this.props.signinUser(form)

		if (error)
			this.setState({
				...this.state,
				error
			})
		else
			this.props.history.push("/login")
	}
	// #endregion
}

export const SignIn = connect(null, mapDispatcherToProps)(withRouter(SignInComponent))
