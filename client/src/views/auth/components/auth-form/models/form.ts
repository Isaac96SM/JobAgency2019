export enum FormKeys {
	name = "name",
	firstName = "firstName",
	lastName = "lastName",
	email = "email",
	password = "password",
	repeatPassword = "repeatPassword"
}

export interface Form {
	[FormKeys.name]?: string
	[FormKeys.firstName]?: string
	[FormKeys.lastName]?: string
	[FormKeys.email]: string,
	[FormKeys.password]: string,
	[FormKeys.repeatPassword]?: string
}
