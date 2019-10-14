import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Navbar, Nav, NavDropdown } from "react-bootstrap"

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

	state: State = {
		isAuthenticated: this.props.isAuthenticated
	}

	home = this.toHome.bind(this)
	login = this.toLogin.bind(this)
	signin = this.toSignIn.bind(this)
	logout = this.toLogout.bind(this)
	offers = this.toOffers.bind(this)

	render() {
		const authLinks = this.state.isAuthenticated
			? (<Nav.Link onClick={this.logout}>Log Out</Nav.Link>)
			: (
				<Fragment>
					<Nav.Link onClick={this.login}>Log In</Nav.Link>
					<Nav.Link onClick={this.signin}>Sign In</Nav.Link>
				</Fragment>
			)

		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Brand onClick={this.home}>Job Agency</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{this.state.isAuthenticated && (
							<Fragment>
								<Nav.Link onClick={this.offers}>Offers</Nav.Link>
								<Nav.Link href="#pricing">Pricing</Nav.Link>
								<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
								</NavDropdown>
							</Fragment>
						)}
					</Nav>
					<Nav>
						{authLinks}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}

	private toHome() {
		this.props.history.push("/")
	}

	private toLogout() {
		this.props.logout()

		// this.toLogin()
		this.props.history.push("/login")
	}

	private toLogin() {
		this.props.login("suarezmota@gmail.com", "1234")
		// this.props.history.push("/login")
	}

	private toSignIn() {
		this.props.history.push("signin")
	}

	private toOffers() {
		this.props.history.push("/offers")
	}
}

export const AppNavbar = connect(mapStateToProps, mapDispatcherToProps)(withRouter(AppNavbarComponent))