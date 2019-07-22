import express from "express"
import { UserRoutes } from "./routes/"

class Routes {
	private userRoutes: UserRoutes = new UserRoutes()

	public register(app: express.Application): void {
		app.use("/users", this.userRoutes.router)
	}
}

export default Routes
