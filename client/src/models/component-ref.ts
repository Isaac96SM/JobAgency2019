import { Component } from "react"

export class ComponentRef<Props, State> {
	state: State
	setState: (
		state: ((prevState: Readonly<State>, props: Readonly<Props>) => (State | null)) | (State | null),
		callback?: () => void
	) => void

	constructor(component: Component<Props, State>) {
		this.state = component.state
		this.setState = component.setState.bind(component)
	}
}
