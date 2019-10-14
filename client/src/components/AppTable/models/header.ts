export interface Header {
	label?: string
	value: string
	parser?: React.ComponentType<any> | React.ComponentType<{ value: any[] }>
}
