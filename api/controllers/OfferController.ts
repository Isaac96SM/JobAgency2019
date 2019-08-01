import * as HttpStatus from "http-status-codes"
import * as jwt from "jsonwebtoken"
import { Offer } from "../models"
import { Request, Response } from "express"
import { IOffer } from "../interfaces"
import { keys } from "../config"
import { OfferHelper } from "../helpers"

export class OfferController {
	public test(req: Request, res: Response) {
		res.status(HttpStatus.OK).send()
	}

	public async get(req: Request, res: Response) {
		if (req.params.id) {
			const offer: IOffer = await OfferHelper.findById(req.params.id)

			if (!offer)
				res.status(HttpStatus.NOT_FOUND).send()

			res.json(offer)
		} else {
			const offers: Array<IOffer> = await OfferHelper.find()

			if (!offers)
				res.status(HttpStatus.NOT_FOUND).send()

			res.json(offers)
		}
	}
}
