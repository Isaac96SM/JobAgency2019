import React, { Component, Fragment } from "react"

import { AppTable } from "../../components"

import apiService from "../../services/api.service"

import { Headers } from "./constants"
import { Props, State } from "./models"

export class Offers extends Component<Props, State> {
	state: State = {
		offers: []
	}

	async componentDidMount() {
		this.setState({
			offers: await apiService.offers.get()
		})
	}

	render() {
		return (
			<Fragment>
				<div>
					<h3>Offers</h3>
				</div>
				<AppTable
					headers={ Headers }
					data={ this.state.offers }
				/>
			</Fragment>
		)
	}
}
