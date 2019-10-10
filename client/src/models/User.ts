import { Account } from "./"

export class User extends Account {
	constructor(
		public FirstName: string = "",
		public LastName: string = ""
	) { super() }
}
