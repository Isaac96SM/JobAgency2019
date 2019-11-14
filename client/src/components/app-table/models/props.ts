import { Header, Action } from "."

export interface Props {
	headers?: Header[]
	actions?: Action[]
	data?: any[]
	limit?: number
}
