import { Component } from "react"

import { Props as BaseProps, State as BaseState } from "./models"

export abstract class BaseParser<Type, Props = BaseProps<Type>, State = BaseState<Type>>
	extends Component<Props & BaseProps<Type>, State & BaseState<Type>> {

	static getDerivedStateFromProps(props: any & BaseProps<any>, state: any & BaseState<any>)
		: any & BaseState<any> {
		if (props.value !== state.value)
			return {
				...state,
				value: props.value
			}

		return state
	}

	baseState: BaseState<Type> = {
		value: this.props.value
	}
}
