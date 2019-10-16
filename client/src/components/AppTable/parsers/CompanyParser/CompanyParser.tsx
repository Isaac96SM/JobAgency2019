import { Component } from "react"
import { connect } from "react-redux"

import { Props, State, mapStateToProps } from "./models"

class CompanyParserComponent extends Component<Props, State> {
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
		const company = this.props.companies.find(c => c._id === this.state.value)

		return company ? company.Name : ""
	}
}

export const CompanyParser = connect(mapStateToProps, {})(CompanyParserComponent)
