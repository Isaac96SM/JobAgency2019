import { ConnectedComponent } from "react-redux"

import { BaseFilter } from "../filters/BaseFilter"
import { BaseParser } from "../parsers/BaseParser"

export interface Header {
	label?: string
	value: string
	parser?: typeof BaseParser | ConnectedComponent<any, any>
	filter?: typeof BaseFilter
}
