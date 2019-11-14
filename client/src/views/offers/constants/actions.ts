import { Action } from "../../../components/app-table/models"
import { DeleteAction, SubscribeAction } from "../../../components/app-table/components/actions"

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
		return [
			{
				action: SubscribeAction,
				show: (row: Offer): boolean => !(row.Inscriptions as Inscription[]).some(ins => ins.User === component.user._id)
			}
		]
	}
}
