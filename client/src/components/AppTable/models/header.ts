import { AppTable } from "../AppTable"
import { BaseFilter } from "../filters/BaseFilter"

export interface Header {
	label?: string
	value: string
	parser?: React.ComponentType<any> | React.ComponentType<{ value: any[] }>
	filter?: typeof BaseFilter
}
