import { Component } from "react"

import { Props as BaseProps } from "./models"

export abstract class BaseAction<State, Props> extends Component<Props & BaseProps, State> {

}
