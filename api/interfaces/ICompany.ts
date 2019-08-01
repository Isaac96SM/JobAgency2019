import { IAccount } from "./IAccount"
import { IOffer } from "./";

export interface ICompany extends IAccount {
	Name: string,
	Offers: IOffer[]
}
