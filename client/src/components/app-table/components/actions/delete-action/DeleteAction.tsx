import apiService from "../../../../../services/api.service"

import { BaseAction } from "../BaseAction"
import { ModalData } from "../models"

export class DeleteAction extends BaseAction {
	callback = apiService.offers.delete

	modalData: ModalData = {
		buttonVariant: "danger",
		buttonIcon: "trash-alt",
		modalTitle: "Delete Offer",
		acceptStyle: { label: "Delete", variant: "danger" },
		closeStyle: { label: "Cancel", variant: "light" },
		modalBody: "This offer will not be longer available"
	}
}
