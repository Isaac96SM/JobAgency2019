import { Component, SetStateAction } from "react"

export class ComponentRef<State> {
	state: State
	setState: SetStateAction<State>

	constructor(component: Component<any, State>) {
		this.state = component.state
		this.setState = component.setState.bind(component)
	}
}
