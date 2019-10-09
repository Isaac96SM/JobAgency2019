import { Offer } from "../models"
import { IOffer } from "../interfaces"
import { BaseHelper } from "./BaseHelper"
import * as HttpStatus from "http-status-codes"

class Helper extends BaseHelper<IOffer> {
	constructor() {
		super()
		this.Schema = Offer
	}

	public async updateInscriptions(id: string, user_id: string, add: boolean): Promise<{ status: number, inscriptions: any[] }> {
		const offer: IOffer = await this.findById(id)

		const isAlreadySubscribed: any = offer.Inscriptions.find(inscription => inscription.User.toString() === user_id)

		if (add && isAlreadySubscribed)
			return { status: HttpStatus.BAD_REQUEST, inscriptions: offer.Inscriptions }
		else if (!add && !isAlreadySubscribed)
			return { status: HttpStatus.NOT_FOUND, inscriptions: offer.Inscriptions }

		if (add)
			offer.Inscriptions.unshift({ User: user_id })
		else {
			const removeIndex: number = offer.Inscriptions
				.map(item => item.User.toString())
				.indexOf(user_id)

			offer.Inscriptions.splice(removeIndex, 1)
		}

		await this.findByIdAndUpdate(id, offer)

		return { status: HttpStatus.OK, inscriptions: offer.Inscriptions}
	}
}

export const OfferHelper = new Helper()
