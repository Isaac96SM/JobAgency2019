import React, { Component } from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"
import { Container } from "react-bootstrap"
import jwt_decode from "jwt-decode"

import { Offers } from "../../views"
import { AppNavbar, PrivateRoute } from "../"

import { State, Props, mapStateToProps, mapDispatcherToProps } from "./models"

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
						<PrivateRoute exact path={"/offers"} component={Offers} />
					</Container>
				</Router>
		)
	}
}

export const App = connect(mapStateToProps, mapDispatcherToProps)(AppComponent)
