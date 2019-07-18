import express, { Router } from "express"
import { UserController } from "../controllers"

export class UserRoutes {
	private userController: UserController = new UserController()
	public readonly router: Router = Router();

	constructor() {
		this.router.route("/")
			// Get all users
			.get(this.userController.get)
			// Create user
			.post(this.userController.post)

		this.router.route("/:id")
			// Get user
			.get(this.userController.get)
			// Update user
			.put(this.userController.put)
			// Delete user
			.delete(this.userController.delete)
	}
}
