import React, { Component, RefObject } from "react"
import { connect } from "react-redux"
import { Button, Row, Col } from "react-bootstrap"

import { AppTable, AppModal } from "../../components"

import apiService from "../../services/api.service"

import { Headers } from "./constants"
import { Props, State, mapStateToProps } from "./models"
import { Company } from "../../models"

class OffersComponent extends Component<Props, State> {
	state: State = {
		offers: []
	}

	modalRef: RefObject<AppModal> = React.createRef()

	getNewButton = this._getNewButton.bind(this)
	showModal = this._showModal.bind(this)
	onNewOffer = this._onNewOffer.bind(this)

	get company() {
		return this.props.currentCompany as Company
	}

	get isCompany() {
		return this.company !== undefined
	}

	get modal() {
		return this.modalRef.current as AppModal
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
			<>
				<Row>
					<Col xs="10">
						<h3>Offers</h3>
					</Col>
					<Col xs="2">
						{ this.isCompany && this.getNewButton() }
					</Col>
				</Row>
				<AppTable
					headers={ Headers }
					data={ this.state.offers }
					limit={ 5 }
				/>
			</>
		)
	}

	// #region JSX
	private _getNewButton() {
		return (
			<>
				<Button
					className="action-button"
					variant="success"
					onClick={ this.showModal }
				>
					New Offer
				</Button>
				<AppModal
					ref={ this.modalRef }
					title="New Offer"
					onAccept={ this.onNewOffer }
				>
					{ /* new offer form */ }
				</AppModal>
			</>
		)
	}
	// #endregion

	// #region Events
	private _onNewOffer() {
		// Api offer.post
	}

	private _showModal() {
		this.modal.setState({
			show: true
		})
	}
	// #endregion
}

export const Offers = connect(mapStateToProps, {})(OffersComponent)
