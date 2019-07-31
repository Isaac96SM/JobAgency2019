import { model, Model } from "mongoose"
import { AccountModel } from "./AccountModel"
import { IUser } from "../interfaces";

const UserSchema = new AccountModel()

UserSchema.add({
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	}
})

export const User = model("users", UserSchema) as Model<IUser, {}>
