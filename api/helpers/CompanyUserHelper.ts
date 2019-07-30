import { UserHelper } from "./";
import { Company } from "../models";

class Helper extends UserHelper {
	constructor() {
		super()
		this.Schema = Company
	}
}

export const CompanyUserHelper = new Helper()
