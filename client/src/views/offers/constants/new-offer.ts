import { OffersComponent } from "../Offers"
import { FormKeys } from "../models"

export const NewOffer = (component: OffersComponent) => {
	return [
		{
			id: FormKeys.Title,
			label: "Title",
			value: component.state.form.Title,
			type: "text",
			onInput: component.onInput
		},
		{
			id: FormKeys.Category,
			label: "Category",
			value: component.state.form.Category,
			type: "text",
			onInput: component.onInput
		},
		{
			id: FormKeys.Description,
			label: "Description",
			value: component.state.form.Description,
			type: "text",
			onInput: component.onInput
		}
	]
}
