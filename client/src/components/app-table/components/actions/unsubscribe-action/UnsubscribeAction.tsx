import apiService from "services/api.service"

import { BaseAction } from "../BaseAction"
import { ModalData } from "../models"

export class UnsubscribeAction extends BaseAction {
	callback = apiService.offers.inscriptions.delete

	modalData: ModalData = {
		buttonVariant: "danger",
		buttonIcon: "sign-out-alt",
		modalTitle: "Unsubscribe to Offer",
		acceptStyle: { label: "Unsubscribe", variant: "danger" },
		closeStyle: { label: "Cancel", variant: "light" },
		modalBody: "You'll remove your subscription from this offer"
	}
}
