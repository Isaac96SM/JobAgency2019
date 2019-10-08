import { IAccount } from "./IAccount"

export interface ICompany extends IAccount {
	Name: string,
	Offers: string[]
}
