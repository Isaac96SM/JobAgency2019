import { BaseParser } from "../BaseParser"

import { State as BaseState } from "../models"

export class CounterParser extends BaseParser<any[]> {
	state: BaseState<any[]> = this.baseState

	render() {
		return this.state.value.length
	}
}
