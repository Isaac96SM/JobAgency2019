import * as HttpStatus from "http-status-codes"
import { Offer } from "../models"
import { Request, Response } from "express"
import { IOffer, IUser, ICompany } from "../interfaces"
import { OfferHelper, UserHelper, CompanyHelper } from "../helpers"

export class OfferController {
	public test(req: Request, res: Response) {
		res.status(HttpStatus.OK).send()
	}

	public async get(req: Request, res: Response) {
		if (req.params.id) {
			const offer: IOffer = await OfferHelper.findById(req.params.id)

			if (!offer)
				res.status(HttpStatus.NOT_FOUND).send(null)

			res.json(offer)
		} else {
			const offers: Array<IOffer> = await OfferHelper.find()

			if (!offers)
				res.status(HttpStatus.NOT_FOUND).send([])

			res.json(offers)
		}
	}

	public async post(req: Request, res: Response) {
		const company: ICompany = await CompanyHelper.findById(req.user.id)

		if (!company) res.status(HttpStatus.UNAUTHORIZED).send(HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED))

		const newOffer = new Offer({ ...req.body, Company: req.user.id }) as IOffer

		const result: IOffer = await OfferHelper.save(newOffer)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send("Something went wrong")

		res.status(HttpStatus.OK).send(true)
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
			res.status(HttpStatus.BAD_REQUEST).send(false)

		res.status(HttpStatus.OK).send(true)
	}

	public async getInscriptions(req: Request, res: Response) {
		const offer: IOffer = await OfferHelper.findById(req.params.id)

		if (!offer)
			res.status(HttpStatus.NOT_FOUND).send([])

		res.json(offer.Inscriptions)
	}

	public async updateSubscription(req: Request, res: Response) {
		const user: IUser = await UserHelper.findById(req.user.id)

		if (!user) res.status(HttpStatus.UNAUTHORIZED).send([])

		const result: { status: number, inscriptions: any[] } =
			await OfferHelper.updateInscriptions(req.params.id, req.user.id, req.method.toLocaleLowerCase() === "put")

		res.status(result.status).send(result.inscriptions)
	}
}
