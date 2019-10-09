export default abstract class Account {
	constructor(
		public _id?: string,
		public Email: string = "",
		public RegisterDate?: Date
	) { }
}
