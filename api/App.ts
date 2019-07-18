import express from "express"
import bodyParser from "body-parser"
import Routes from "./routes"
import mongoose from "mongoose"
import passport from "passport"

import { keys, middleware } from "./config"

class App {
	public app: express.Application
	public routeProvider: Routes = new Routes()
	public mongoUrl: string = keys.mongoURI

	constructor() {
		this.app = express()
		this.config()

		this.routeProvider.register(this.app)
		this.mongoSetup()
	}

	private config(): void {
		// Support application/json type post data
		this.app.use(bodyParser.json())
		// Support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }))

		// Passport middleware
		this.app.use(passport.initialize())

		// Passport Config
		middleware(passport)
	}

	private mongoSetup(): void {
		mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
			.catch(err => console.log("connection failed."))
	}
}

export default new App().app
