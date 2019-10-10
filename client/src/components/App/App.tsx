import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import jwt_decode from "jwt-decode"

import { Offers } from "../../views"
import { AppNavbar, PrivateRoute } from "../"

import { State, Props, mapStateToProps, mapDispatcherToProps } from "./models"

class AppComponent extends Component<Props, State> {
	render() {
		if (!this.props.isAuthenticated) {
			const token: string | null = localStorage.getItem("jwtToken")

			if (token)
				this.props.setUser(jwt_decode(token as string))
		}

		return (
				<Router>
					<AppNavbar />
					<PrivateRoute exact path={"/offers"} component={Offers} />
				</Router>
		)
	}
}

export const App = connect(mapStateToProps, mapDispatcherToProps)(AppComponent)
