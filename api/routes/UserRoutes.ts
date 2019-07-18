import express from "express"
import { UserController } from "../controllers"

export class UserRoutes {
	public userController: UserController = new UserController()

	public routes(app: express.Application): void {
		app.route("/user")
			// Get all users
			.get(this.userController.get)
			// Create user
			.post(this.userController.post)

		app.route("user/:id")
			// Get user
			.get(this.userController.get)
			// Update user
			.put(this.userController.put)
			// Delete user
			.delete(this.userController.delete)
	}
}
