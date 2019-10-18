import { AppTable } from "../AppTable"

export interface Header {
	label?: string
	value: string
	parser?: React.ComponentType<any> | React.ComponentType<{ value: any[] }>
	filter?: React.ComponentType<{ tableRef: AppTable, column: string }>
}
