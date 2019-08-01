import { Router } from "express";
import passport from "passport"
import { OfferController } from "../controllers";

export class OfferRoutes {
	private offerController: OfferController = new OfferController()
	public readonly router: Router = Router()

	constructor() {
		this.router.route("/test")
			// Private route test
			.get(passport.authenticate("jwt", { session: false }), this.offerController.test)

		this.router.route("/")
			// Get all offers
			.get(this.offerController.get)
	}
}
