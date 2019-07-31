import { model, Model } from "mongoose"
import { AccountModel } from "./AccountModel"
import { ICompany } from "../interfaces";

const CompanySchema = new AccountModel()

CompanySchema.add({
	Name: {
		type: String,
		required: true
	}
})

export const Company = model("companies", CompanySchema) as Model<ICompany, {}>
