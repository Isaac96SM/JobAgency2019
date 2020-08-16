import { OffersComponent } from "../Offers"
import { FormKeys } from "../models"

export function newOffer(this: OffersComponent) {
	return [
		{
			id: FormKeys.Title,
			label: "Title",
			value: this.state.form.Title,
			type: "text",
			onInput: this.onInput
		},
		{
			id: FormKeys.Category,
			label: "Category",
			value: this.state.form.Category,
			type: "text",
			onInput: this.onInput
		},
		{
			id: FormKeys.Description,
			label: "Description",
			value: this.state.form.Description,
			type: "text",
			onInput: this.onInput
		}
	]
}
