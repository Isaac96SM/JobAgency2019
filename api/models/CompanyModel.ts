import { Schema, model, Model } from "mongoose"
import { AccountModel } from "./AccountModel"
import { ICompany } from "../interfaces"

const CompanySchema: Schema = new AccountModel()

CompanySchema.add({
	Name: {
		type: String,
		required: true
	}
})

CompanySchema.set('toObject', { virtuals: true })
CompanySchema.set('toJSON', { virtuals: true })

CompanySchema.virtual("Offers", {
	ref: "offers",
	localField: "_id",
	foreignField: "Company"
})

export const Company = model("companies", CompanySchema) as Model<ICompany, {}>
