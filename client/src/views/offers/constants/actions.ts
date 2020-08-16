import { Action } from "components/app-table/models"
import { DeleteAction, SubscribeAction, UnsubscribeAction } from "components/app-table/components/actions"

import { OffersComponent } from "views"
import { Offer, Inscription } from "models"

export function actions(this: OffersComponent): Action[] {
	if (this.isCompany) {
		return [
			{
				action: DeleteAction
			}
		]
	} else {
		const isSubscribed = (row: Offer): boolean =>
			(row.Inscriptions as Inscription[])
			.some(ins => ins.User === this.user._id)

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
