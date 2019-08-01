import { Offer } from "../models"
import { IOffer } from "../interfaces"
import { BaseHelper } from "./BaseHelper";

class Helper extends BaseHelper<IOffer> {
	constructor() {
		super()
		this.Schema = Offer
	}
}

export const OfferHelper = new Helper()
