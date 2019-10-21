export interface Condition {
	field: string
	callback: (currentValue: any) => boolean
}
