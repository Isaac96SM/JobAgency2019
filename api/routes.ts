import express from "express"
import { UserRoutes, CompanyRoutes } from "./routes/"

class Routes {
	private userRoutes: UserRoutes = new UserRoutes()
	private companyRoutes: CompanyRoutes = new CompanyRoutes()

	public register(app: express.Application): void {
		app.use("/users", this.userRoutes.router)
		app.use("/companies", this.companyRoutes.router)
	}
}

export default Routes
