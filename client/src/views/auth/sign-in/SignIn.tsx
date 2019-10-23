import React, { Component } from "react"

import { ComponentRef } from "../../../models"

import { AuthForm } from "../components"
import { Mode, Form } from "../components/auth-form/models"

import { Props, State } from "./models"


export class SignIn extends Component<Props, State> {
	// #region Constructor

	ref = new ComponentRef(this)

	signIn = this._signIn.bind(this)
	// #endregion

	render() {
		return <AuthForm parentRef={ this.ref } mode={ Mode.signin } onSubmit={ this.signIn } />
	}

	// #region Methods
	private _signIn(form: Form, isCompany: boolean) {
		return true
	}
	// #endregion
}
