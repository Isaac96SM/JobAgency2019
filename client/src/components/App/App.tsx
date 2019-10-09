import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"

import { AppNavbar } from "../index"

import { State, Props, mapStateToProps, mapDispatcherToProps } from "./models"

class AppComponent extends Component<Props, State> {
	componentDidMount() {
		this.props.login("suarezmota@gmail.com", "1234")
	}

	render() {
		return (
				<Router>
					<AppNavbar />
				</Router>
		)
	}
}

export const App = connect(mapStateToProps, mapDispatcherToProps)(AppComponent)
