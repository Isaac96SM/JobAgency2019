import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"

import { AppNavbar } from "../index"

import { State, Props } from "./models"

export class App extends Component<Props, State> {
	render() {
		return (
				<Router>
					<AppNavbar />
				</Router>
		)
	}
}
