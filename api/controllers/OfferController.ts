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

	public async post(req: Request, res: Response) {
		const newOffer = new Offer(req.body) as IOffer

		const result: IOffer = await OfferHelper.save(newOffer)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send()

		res.status(HttpStatus.OK).send()
	}

	public async put(req: Request, res: Response) {
		const offer: IOffer = await OfferHelper.findByIdAndUpdate(req.params.id, req.body)

		if (!offer)
			res.status(HttpStatus.BAD_REQUEST).send()

		res.json(offer)
	}

	public async delete(req: Request, res: Response) {
		const result: boolean = await OfferHelper.removeById(req.params.id)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send()

		res.status(HttpStatus.OK).send()
	}
}
