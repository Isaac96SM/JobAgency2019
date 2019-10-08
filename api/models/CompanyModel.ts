import { Schema, model, Model } from "mongoose"
import { AccountModel } from "./AccountModel"
import { ICompany } from "../interfaces"

const CompanySchema = new AccountModel()

CompanySchema.add({
	Name: {
		type: String,
		required: true
	},
	Offers: [
		{
			Offer: {
				type: Schema.Types.ObjectId,
				ref: 'offers'
			}
		}
	]
})

export const Company = model("companies", CompanySchema) as Model<ICompany, {}>
