import React, { Component } from "react"
import { withRouter } from "react-router"
import { Redirect } from "react-router-dom"

import { Props } from "./models"

class RefreshComponent extends Component<Props> {
	render() {
		return (
			<Redirect to={ this.props.location.hash.slice(1) } />
		)
	}
}

export const Refresh = withRouter(RefreshComponent)
