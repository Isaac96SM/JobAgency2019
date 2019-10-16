import React, { Component } from "react"
import { connect } from "react-redux"
import { Tooltip, OverlayTrigger } from "react-bootstrap"

import { CounterParser } from "../CounterParser/CounterParser"

import { User } from "../../../../models"

import { Props, State, mapStateToProps } from "./models"

import "./styles/InscriptionsParser.css"

class InscriptionsParserComponent extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		if (props.value !== state.value)
			return {
				value: props.value
			}

		return state
	}

	state: State = {
		value: this.props.value
	}

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
