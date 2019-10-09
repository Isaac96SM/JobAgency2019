export class Offer {
	constructor(
		public _id?: string,
		public Title: string = "",
		public Category: string = "",
		public Description: string = "",
		public Company?: string,
		public Inscriptions?: string[],
		public Date?: Date
	) { }
}
