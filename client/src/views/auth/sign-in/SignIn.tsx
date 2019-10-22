import React, { Component } from "react"

import { AuthForm } from "../components"
import { Mode, Form } from "../components/auth-form/models"

import { Props, State } from "./models"


export class SignIn extends Component<Props, State> {
	// #region Constructor
	signIn = this._signIn.bind(this)
	// #endregion

	render() {
		return <AuthForm error="" mode={ Mode.signin } onSubmit={ this.signIn } />
	}

	// #region Methods
	private _signIn(form: Form) {
		return true
	}
	// #endregion
}
