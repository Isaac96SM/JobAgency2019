import { Component } from "react"

import { Props, State } from "./models"

export class CounterParser extends Component<Props, State> {
	static getDerivedStateFromProps(props: Props, state: State): State {
		if (props.value.length !== state.value)
			return {
				value: props.value.length
			}

		return state
	}

	state: State = {
		value: this.props.value.length
	}

	render() {
		return this.state.value
	}
}
