import { Component } from "react"

export class ComponentRef<Props, State> {
	get state(): State {
		return this.component.state
	}
	setState: <K extends keyof State>(
		state: ((prevState: Readonly<State>, props: Readonly<Props>) =>
			(Pick<State, K> | State | null)) | (Pick<State, K> | State | null),
		callback?: () => void
	) => void

	private component: Component<Props, State>

	constructor(component: Component<Props, State>) {
		this.component = component
		this.setState = component.setState.bind(component)
	}
}
