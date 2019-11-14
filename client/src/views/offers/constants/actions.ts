import { Action } from "../../../components/app-table/models"
import { DeleteAction, SubscribeAction, UnsubscribeAction } from "../../../components/app-table/components/actions"

import { OffersComponent } from "../Offers"
import { Offer, Inscription } from "../../../models"

export const Actions = (component: OffersComponent): Action[] => {
	if (component.isCompany) {
		return [
			{
				action: DeleteAction
			}
		]
	} else {
		const isSubscribed = (row: Offer): boolean =>
			(row.Inscriptions as Inscription[])
			.some(ins => ins.User === component.user._id)

		return [
			{
				action: SubscribeAction,
				show: (row: Offer) => !isSubscribed(row)
			},
			{
				action: UnsubscribeAction,
				show: isSubscribed
			}
		]
	}
}
