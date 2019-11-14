import { BaseAction } from "../components/actions/BaseAction"

export interface Action {
	show?: (row: any) => boolean,
	action: typeof BaseAction
}