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
			// Create offer
			.post(this.offerController.post)

		this.router.route("/:id")
			// Get offer
			.get(this.offerController.get)
			// Update offer
			.put(this.offerController.put)
			// Delete offer
			.delete(this.offerController.delete)
	}
}
