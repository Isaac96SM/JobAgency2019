import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { AuthForm } from "../components"
import { Mode, Form } from "../components/auth-form/models"

import { Props, State, mapStateToProps, mapDispatcherToProps } from "./models"

class LogInComponent extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		if (props.isAuthenticated !== state.isAuthenticated) {
			return {
				...state,
				isAuthenticated: props.isAuthenticated
			}
		}

		return state
	}

	// #region Constructor
	state: State = {
		error: "",
		isAuthenticated: this.props.isAuthenticated
	}

	logIn = this._logIn.bind(this)
	// #endregion

	// #region LifeCycle
	shouldComponentUpdate(nextProps: Props, nextState: State) {
		if (nextProps.isAuthenticated)
			this.props.history.push("/")

		return true
	}

	render() {
		return <AuthForm mode={ Mode.login } onSubmit={ this.logIn } wrapper={ this } />
	}
	// #endregion

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

export const LogIn = connect(mapStateToProps, mapDispatcherToProps)(withRouter(LogInComponent))
