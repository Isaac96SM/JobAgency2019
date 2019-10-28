import React, { Component, RefObject } from "react"
import { connect } from "react-redux"
import { Button, Row, Col, Form } from "react-bootstrap"

import { AppTable, AppModal } from "../../components"

import apiService from "../../services/api.service"

import { Headers } from "./constants"
import { Props, State, mapStateToProps, FormKeys, Form as FormModel } from "./models"
import { Company, Offer } from "../../models"

class OffersComponent extends Component<Props, State> {
	state: State = {
		offers: [],
		form: {
			[FormKeys.Title]: "",
			[FormKeys.Category]: "",
			[FormKeys.Description]: ""
		}
	}

	modalRef: RefObject<AppModal> = React.createRef()

	getNewOffer = this._getNewOffer.bind(this)
	getOffers = this._getOffers.bind(this)
	showModal = this._showModal.bind(this)
	onNewOffer = this._onNewOffer.bind(this)
	onInput = this._onInput.bind(this)

	get company() {
		return this.props.currentCompany as Company
	}

	get isCompany() {
		return this.company !== undefined
	}

	get modal() {
		return this.modalRef.current as AppModal
	}

	componentDidMount() {
		this.getOffers()
	}

	render() {
		return (
			<>
				<Row>
					<Col xs="10">
						<h3>Offers</h3>
					</Col>
					<Col xs="2">
						{ this.isCompany && this.getNewOffer() }
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
	private _getNewOffer() {
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
					<Form>
						<Form.Group controlId={ FormKeys.Title }>
							<Form.Label>Title</Form.Label>
							<Form.Control
								onInput={ this.onInput }
								value={ this.state.form.Title }
								type="text"
								placeholder="Title"
							/>
						</Form.Group>

						<Form.Group controlId={ FormKeys.Category }>
							<Form.Label>Category</Form.Label>
							<Form.Control
								onInput={ this.onInput }
								value={ this.state.form.Category }
								type="text"
								placeholder="Category"
							/>
						</Form.Group>

						<Form.Group controlId={ FormKeys.Description }>
							<Form.Label>Description</Form.Label>
							<Form.Control
								onInput={ this.onInput }
								value={ this.state.form.Description }
								type="text"
								placeholder="Description"
							/>
						</Form.Group>
					</Form>
				</AppModal>
			</>
		)
	}
	// #endregion

	// #region Methods
	private async _getOffers() {
		const offers = !this.isCompany
			? await apiService.offers.get()
			: await apiService.companies.offers.get(this.company._id as string)

		this.setState({
			offers
		})
	}
	// #endregion

	// #region Events
	private async _onNewOffer() {
		// Api offer.post
		try {
			await apiService.offers.post(this.state.form as Offer)

			this.getOffers()
		} catch (e) {
			return e.statusText
		}
	}

	private _showModal() {
		this.modal.setState({
			show: true
		})
	}

	private _onInput(e: React.FormEvent<HTMLInputElement>) {
		const form: FormModel = { ...this.state.form }

		form[((e.target as HTMLInputElement).id as FormKeys)] = (e.target as HTMLInputElement).value

		this.setState({
			...this.state,
			form
		})
	}
	// #endregion
}

export const Offers = connect(mapStateToProps, {})(OffersComponent)
