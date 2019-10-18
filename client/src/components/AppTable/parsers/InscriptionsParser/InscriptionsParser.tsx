import React from "react"
import { connect } from "react-redux"
import { Tooltip, OverlayTrigger } from "react-bootstrap"

import { BaseParser } from "../BaseParser"
import { CounterParser } from "../CounterParser/CounterParser"

import { User, Inscription } from "../../../../models"

import { Props, mapStateToProps } from "./models"

import "./styles/InscriptionsParser.css"

class InscriptionsParserComponent extends BaseParser<Inscription[], Props> {
	render() {
		const subscribed: boolean = this.state.value.filter(x => x.User === (this.props.user as User)._id).length > 0

		if (!subscribed)
			return <CounterParser value={ this.state.value } />

		return (
			<OverlayTrigger
				placement="right"
				overlay={
					<Tooltip id="tooltip">
						You are already subscribed!
					</Tooltip>
				}
			>
				<div className="width-25">
					<CounterParser value={ this.state.value } />
				</div>
			</OverlayTrigger>
		)
	}
}

export const InscriptionsParser = connect(mapStateToProps, {})(InscriptionsParserComponent)
