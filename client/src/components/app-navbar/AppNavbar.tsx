import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Navbar, Nav } from "react-bootstrap"

import { State, Props, mapStateToProps, mapDispatcherToProps } from "./models"
import { Company, User } from "../../models"

import "./styles/AppNavbar.css"

class AppNavbarComponent extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		if (props.isAuthenticated !== state.isAuthenticated) {
			return {
				currentCompany: props.currentCompany,
				currentUser: props.currentUser,
				isAuthenticated: props.isAuthenticated
			}
		}

		return state
	}

	// #region Constructor
	state: State = {
		isAuthenticated: this.props.isAuthenticated,
		currentCompany: this.props.currentCompany,
		currentUser: this.props.currentUser
	}

	home = this.toHome.bind(this)
	profile = this.toProfile.bind(this)
	login = this.toLogin.bind(this)
	signin = this.toSignIn.bind(this)
	logout = this.toLogout.bind(this)
	offers = this.toOffers.bind(this)
	// #endregion

	get isCompany() {
		return this.state.currentCompany !== undefined
	}

	get name() {
		return this.isCompany
			? (this.state.currentCompany as Company).Name
			: `${(this.state.currentUser as User).LastName}, ${(this.state.currentUser as User).FirstName}`
	}

	render() {
		const authLinks = this.state.isAuthenticated
			? (
				<>
					<div className="display-inline-flex">
						<Navbar.Text className="margin-right-4">
							Signed in as:
						</Navbar.Text>
						<Nav.Link onClick={this.profile}>{this.name}</Nav.Link>
					</div>
					<Nav.Link onClick={this.logout}>Log Out</Nav.Link>
				</>
			)
			: (
				<>
					<Nav.Link onClick={ this.login }>Log In</Nav.Link>
					<Nav.Link onClick={ this.signin }>Sign In</Nav.Link>
				</>
			)

		return (
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
				<Navbar.Brand onClick={ this.home }>Job Agency</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						{
							this.state.isAuthenticated && (
									<Nav.Link onClick={ this.offers }>Offers</Nav.Link>
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

	private toProfile() {
		this.props.history.push("/profile")
	}

	private toLogout() {
		this.props.logout()
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
