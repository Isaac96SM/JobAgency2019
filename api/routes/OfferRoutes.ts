import { Router } from "express";
import passport from "passport"
import { OfferController } from "../controllers";

export class OfferRoutes {
	private offerController: OfferController = new OfferController()
	public readonly router: Router = Router()

	constructor() {
		this.router.route("/test")
			// Private route test
			.get(this.offerController.test)

		this.router.route("/")
			// Get all offers
			.get(this.offerController.get)
			// Create offer
			.post(passport.authenticate("jwt", { session: false }), this.offerController.post)

		this.router.route("/:id")
			// Get offer
			.get(this.offerController.get)
			// Update offer
			.put(passport.authenticate("jwt", { session: false }), this.offerController.put)
			// Delete offer
			.delete(passport.authenticate("jwt", { session: false }), this.offerController.delete)

		this.router.route("/:id/inscriptions")
			// Get Inscriptions
			.get(this.offerController.getInscriptions)
			// Subscribe to offer
			.put(passport.authenticate("jwt", { session: false }), this.offerController.updateSubscription)
			// Unsubscribe of offer
			.delete(passport.authenticate("jwt", { session: false }), this.offerController.updateSubscription)
	}
}
