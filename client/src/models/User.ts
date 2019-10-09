import Account from "./Account"

export class User extends Account {
	constructor(
		public FirstName: string = "",
		public LastName: string = ""
	) { super() }
}
