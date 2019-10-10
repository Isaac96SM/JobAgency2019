export abstract class Account {
	constructor(
		public _id?: string,
		public Email: string = "",
		public Password?: string,
		public RegisterDate?: Date
	) { }
}
