import { model } from "mongoose"
import { UserModel } from "."

const CompanyUserSchema = new UserModel()

CompanyUserSchema.add({
	Name: {
		type: String,
		required: true
	}
})

export const Company = model("companies", CompanyUserSchema)
