import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Container } from "react-bootstrap"
import jwt_decode from "jwt-decode"

import { Offers, LogIn, SignIn } from "../../views"
import { AppNavbar, PrivateRoute, NotLoggedRoute } from ".."

import { State, Props, mapStateToProps, mapDispatcherToProps } from "./models"

import "./styles/App.css"

class AppComponent extends Component<Props, State> {
	componentDidMount() {
		this.props.getCompanies()
	}

	render() {
		if (!this.props.isAuthenticated) {
			const token: string | null = localStorage.getItem("jwtToken")

			if (token)
				this.props.setUser(jwt_decode(token as string))
		}

		return (
				<Router>
					<AppNavbar />
					<Container>
						<PrivateRoute exact path="/offers" component={ Offers } />
						<NotLoggedRoute exact path="/login" component={ LogIn } />
						<NotLoggedRoute exact path="/signin" component={ SignIn } />
					</Container>
				</Router>
		)
	}
}

export const App = connect(mapStateToProps, mapDispatcherToProps)(AppComponent)
