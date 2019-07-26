import { model } from "mongoose"
import { UserModel } from "."

const IndividualUserSchema = new UserModel()

IndividualUserSchema.add({
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	}
})

export const User = model("users", IndividualUserSchema)
