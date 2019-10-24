import React, { Component, Fragment } from "react"
import { connect } from "react-redux"

import { AppTable } from "../../components"

import apiService from "../../services/api.service"

import { Headers } from "./constants"
import { Props, State, mapStateToProps } from "./models"
import { Company } from "../../models"

class OffersComponent extends Component<Props, State> {
	state: State = {
		offers: []
	}

	get company() {
		return this.props.currentCompany as Company
	}

	get isCompany() {
		return this.company !== undefined
	}

	async componentDidMount() {
		const offers = !this.isCompany
			? await apiService.offers.get()
			: await apiService.companies.offers.get(this.company._id as string)

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
					limit={ 5 }
				/>
			</Fragment>
		)
	}
}

export const Offers = connect(mapStateToProps, {})(OffersComponent)
