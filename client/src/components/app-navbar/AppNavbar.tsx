import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Navbar, Nav } from "react-bootstrap"

import { State, Props, mapStateToProps, mapDispatcherToProps } from "./models"

class AppNavbarComponent extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		if (props.isAuthenticated !== state.isAuthenticated) {
			return {
				isAuthenticated: props.isAuthenticated
			}
		}

		return state
	}

	// #region Constructor
	state: State = {
		isAuthenticated: this.props.isAuthenticated
	}

	home = this.toHome.bind(this)
	login = this.toLogin.bind(this)
	signin = this.toSignIn.bind(this)
	logout = this.toLogout.bind(this)
	offers = this.toOffers.bind(this)
	// #endregion

	render() {
		const authLinks = this.state.isAuthenticated
			? (<Nav.Link onClick={ this.logout }>Log Out</Nav.Link>)
			: (
				<Fragment>
					<Nav.Link onClick={ this.login }>Log In</Nav.Link>
					<Nav.Link onClick={ this.signin }>Sign In</Nav.Link>
				</Fragment>
			)

		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Brand onClick={ this.home }>Job Agency</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{
							this.state.isAuthenticated && (
								<Fragment>
									<Nav.Link onClick={ this.offers }>Offers</Nav.Link>
								</Fragment>
							)
						}
					</Nav>
					<Nav>
						{ authLinks }
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}

	// #region Routes
	private toHome() {
		this.props.history.push("/")
	}

	private toLogout() {
		this.props.logout()

		this.toLogin()
	}

	private toLogin() {
		this.props.history.push("/login")
	}

	private toSignIn() {
		this.props.history.push("signin")
	}

	private toOffers() {
		this.props.history.push("/offers")
	}
	// #endregion
}

export const AppNavbar = connect(mapStateToProps, mapDispatcherToProps)(withRouter(AppNavbarComponent))
