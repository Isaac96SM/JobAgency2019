import { AccountHelper } from "./AccountHelper";
import { Company } from "../models";
import { ICompany } from "../interfaces";

class Helper extends AccountHelper<ICompany> {
	constructor() {
		super()
		this.Schema = Company
	}
}

export const CompanyHelper = new Helper()
