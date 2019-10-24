import { connect } from "react-redux"

import { BaseParser } from "../BaseParser"

import { State as BaseState } from "../models"
import { Props, mapStateToProps } from "./models"

class CompanyParserComponent extends BaseParser<string, Props> {
	state: BaseState<string> = this.baseState

	render() {
		const company = this.props.companies.find(c => c._id === this.state.value)

		return company ? company.Name : ""
	}
}

export const CompanyParser = connect(mapStateToProps, {})(CompanyParserComponent)
