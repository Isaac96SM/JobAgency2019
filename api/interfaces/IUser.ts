import { IAccount } from "./IAccount"

export interface IUser extends IAccount {
	FirstName: string
	LastName: string
}
