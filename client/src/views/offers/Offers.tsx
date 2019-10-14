import React, { Component } from "react"
import { Table } from "react-bootstrap"
import { Offer } from "../../models"

import apiService from "../../services/api.service"

import { Props, State } from "./models"

export class Offers extends Component<Props, State> {
	state: State = {
		offers: []
	}

	async componentWillMount() {
		this.setState({
			offers: await apiService.offers.get()
		})
	}

	getTr(offer: Offer) {
		return (
			<tr key={offer._id}>
				<td>{ offer.Title }</td>
				<td>{ offer.Description }</td>
				<td>{ offer.Category }</td>
				<td>{ offer.Company }</td>
			</tr>
		)
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
}
