import { Component } from "react"

import { Props as BaseProps, State } from "./models"

export abstract class BaseParser<Type, Props = BaseProps<Type>>
	extends Component<Props & BaseProps<Type>, State<Type>> {

	static getDerivedStateFromProps(props: any & BaseProps<any>, state: State<any>)
		: State<any> {
		if (props.value !== state.value)
			return {
				value: props.value
			}

		return state
	}

	state: State<Type> = {
		value: this.props.value
	}
}
