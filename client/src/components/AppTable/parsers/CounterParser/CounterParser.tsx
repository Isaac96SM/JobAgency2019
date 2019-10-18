import { BaseParser } from "../BaseParser"

export class CounterParser extends BaseParser<any[]> {
	render() {
		return this.state.value.length
	}
}
