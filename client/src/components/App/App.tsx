import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Container } from "react-bootstrap"
import jwt_decode from "jwt-decode"

import { Offers, LogIn, SignIn, Refresh } from "views"
import { AppNavbar, PrivateRoute, PublicRoute } from "components"

import { Props, mapStateToProps, mapDispatcherToProps } from "./models"

import "./styles/App.css"

class AppComponent extends Component<Props> {
	componentDidMount() {
		this.props.init()
	}

	render() {
		if (!this.props.isAuthenticated) {
			const token: string | null = localStorage.getItem("jwtToken")

			if (token) {
					const decoded: any = jwt_decode(token as string)

					if (!!localStorage.getItem("isCompany") && decoded.exp > (Date.now() / 1000))
						this.props.setCurrentCompany(jwt_decode(token as string))
					else if (decoded.exp > (Date.now() / 1000))
						this.props.setCurrentUser(jwt_decode(token as string))
					else
						this.props.logOut()
				}
		}

		return (
				<Router>
					<AppNavbar />
					<Container>
						<PrivateRoute exact path="/refresh" component={ Refresh } />
						<PrivateRoute exact path="/offers" component={ Offers } />
						<PublicRoute exact path="/login" component={ LogIn } />
						<PublicRoute exact path="/signin" component={ SignIn } />
					</Container>
				</Router>
		)
	}
}

export const App = connect(mapStateToProps, mapDispatcherToProps)(AppComponent)
