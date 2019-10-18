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
		const offers = await apiService.offers.get()

		for (let i: number = 0; i < 8; i++) {
			const offer = { ...offers[0] }

			offer._id = `${offer._id}-${i}`
			offer.Title = `${offer.Title} ${i}`

			offers.push(offer)
		}

		this.setState({
			offers
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
