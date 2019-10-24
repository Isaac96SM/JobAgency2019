import { Component } from "react"

export class ComponentRef<Props, State> {
	state: State
	setState: <K extends keyof State>(
		state: ((prevState: Readonly<State>, props: Readonly<Props>) =>
			(Pick<State, K> | State | null)) | (Pick<State, K> | State | null),
		callback?: () => void
	) => void

	constructor(component: Component<Props, State>) {
		this.state = component.state
		this.setState = component.setState.bind(component)
	}
}
