import { Header, Condition, Action } from "./"

export interface State {
	headers: Header[]
	actions: Action[]
	data: any[]
	filteredData: any[]
	conditions: Condition[]
	skip: number
	limit: number
}
