import Account from "./account"
import { Offer } from "./"

export class Company extends Account {
	constructor(
		public Name: string = "",
		public Offers?: Offer[]
	) { super() }
}
