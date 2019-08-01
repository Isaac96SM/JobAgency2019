import { model, Model } from "mongoose"
import { AccountModel } from "./AccountModel"
import { ICompany } from "../interfaces"
import { Offer } from "./"

const CompanySchema = new AccountModel()

CompanySchema.add({
	Name: {
		type: String,
		required: true
	},
	Offers: [
		Offer
	]
})

export const Company = model("companies", CompanySchema) as Model<ICompany, {}>
