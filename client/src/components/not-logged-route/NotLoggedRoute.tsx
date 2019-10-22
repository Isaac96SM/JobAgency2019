import React, { Component } from "react"
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom"
import { connect } from "react-redux"

import { State, Props, mapStateToProps } from "./models"

class NotLoggedRouteComponent extends Component<Props, State> {
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

	render() {
		const routeProps: RouteProps = {
			location: this.props.location,
			children: this.props.children,
			path: this.props.path,
			exact: this.props.exact,
			sensitive: this.props.sensitive,
			strict: this.props.strict
		}

		routeProps.render = (props: RouteComponentProps) => {
			if (!this.state.isAuthenticated) {
				const ReturnComponent = this.props.component as any
				return <ReturnComponent />
			} else {
				return <Redirect to="/"/>
			}
		}

		return (
			<Route
				{ ...routeProps }
			/>
		)
	}
}

export const NotLoggedRoute = connect(mapStateToProps)(NotLoggedRouteComponent)
