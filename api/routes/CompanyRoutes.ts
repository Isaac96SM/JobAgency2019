import { Router } from "express"
import passport from "passport"
import { CompanyController } from "../controllers"

export class CompanyRoutes {
	private companyController: CompanyController = new CompanyController()
	public readonly router: Router = Router()

	constructor() {
		this.router.route("/test")
			// Private route test
			.get(this.companyController.test)

		this.router.route("/")
			// Get all companies
			.get(this.companyController.get)
			// Create company
			.post(this.companyController.post)

		this.router.route("/:id")
			// Get company
			.get(this.companyController.get)
			// Update company
			.put(passport.authenticate("jwt", { session: false }), this.companyController.put)
			// Delete company
			.delete(passport.authenticate("jwt", { session: false }), this.companyController.delete)

		this.router.route("/login")
			// Create JWT for given company
			.post(this.companyController.login)

		this.router.route("/:id/offers")
			.get(this.companyController.getOffers)
	}
}
