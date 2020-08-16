import apiService from "services/api.service"

import { BaseAction } from "../BaseAction"
import { ModalData } from "../models"

export class SubscribeAction extends BaseAction {
	callback = apiService.offers.inscriptions.put

	modalData: ModalData = {
		buttonVariant: "success",
		buttonIcon: "sign-in-alt",
		modalTitle: "Subscribe to Offer",
		acceptStyle: { label: "Subscribe", variant: "success" },
		closeStyle: { label: "Cancel", variant: "light" },
		modalBody: "You'll subscribe to this offer"
	}
}
