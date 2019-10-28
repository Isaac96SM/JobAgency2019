export enum FormKeys {
	Title = "Title",
	Category = "Category",
	Description = "Description"
}

export interface Form {
	[FormKeys.Title]: string
	[FormKeys.Category]: string
	[FormKeys.Description]: string
}
