import { UserHelper } from "./";
import { User } from "../models";

class Helper extends UserHelper {
	constructor() {
		super()
		this.Schema = User
	}
}

export const IndividualUserHelper = new Helper()
