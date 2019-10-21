import { connect } from "react-redux"

import { BaseParser } from "../BaseParser"

import { Props, mapStateToProps } from "./models"

class CompanyParserComponent extends BaseParser<string, Props> {
	render() {
		const company = this.props.companies.find(c => c._id === this.state.value)

		return company ? company.Name : ""
	}
}

export const CompanyParser = connect(mapStateToProps, {})(CompanyParserComponent)
