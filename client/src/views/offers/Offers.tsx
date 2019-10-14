import React, { Component } from "react"
import { connect } from "react-redux"

import { Table } from "react-bootstrap"
import { Offer, Company } from "../../models"

import apiService from "../../services/api.service"

import { Props, State, mapStateToProps } from "./models"

class OffersComponent extends Component<Props, State> {
	state: State = {
		offers: []
	}

	getTr = this.getTrMethod.bind(this)
	getCompanyNameById = this.getCompanyNameByIdMethod.bind(this)

	async componentDidMount() {
		this.setState({
			offers: await apiService.offers.get()
		})
	}

	render() {
		const body: any[] = this.state.offers.map(this.getTr)

		return (
			<Table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Category</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>
					{body}
				</tbody>
			</Table>
		)
	}

	private getTrMethod(offer: Offer) {
		return (
			<tr key={offer._id}>
				<td>{offer.Title}</td>
				<td>{offer.Description}</td>
				<td>{offer.Category}</td>
				<td>{this.getCompanyNameById(offer.Company as string)}</td>
			</tr>
		)
	}

	private getCompanyNameByIdMethod(company_id: string): string {
		return (this.props.companies.find(c => c._id === company_id) as Company).Name
	}
}

export const Offers = connect(mapStateToProps, {})(OffersComponent)
