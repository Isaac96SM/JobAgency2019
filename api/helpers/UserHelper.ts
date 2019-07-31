import { AccountHelper } from "./AccountHelper";
import { User } from "../models";
import { IUser } from "../interfaces";

class Helper extends AccountHelper<IUser> {
	constructor() {
		super()
		this.Schema = User
	}
}

export const UserHelper = new Helper()
