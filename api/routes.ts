import express from "express"
import { UserRoutes, CompanyRoutes, OfferRoutes } from "./routes/"

class Routes {
	private userRoutes: UserRoutes = new UserRoutes()
	private companyRoutes: CompanyRoutes = new CompanyRoutes()
	private offerRoutes: OfferRoutes = new OfferRoutes()

	public register(app: express.Application): void {
		app.use("/users", this.userRoutes.router)
		app.use("/companies", this.companyRoutes.router)
		app.use("/offers", this.offerRoutes.router)
	}
}

export default Routes
