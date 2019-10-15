import { Header, Condition } from "./"

export interface State {
	headers: Header[]
	data: any[]
	filteredData: any[]
	conditions: Condition[]
}
