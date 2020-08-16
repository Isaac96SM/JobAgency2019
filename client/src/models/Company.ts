import { Offer, Account } from "models"

export class Company extends Account {
	constructor(
		public Name: string = "",
		public Offers?: Offer[]
	) { super() }
}
