import * as HttpStatus from "http-status-codes"
import * as jwt from "jsonwebtoken"
import { Company } from "../models"
import { Request, Response } from "express"
import { ICompany } from "../interfaces"
import { keys } from "../config"
import { CompanyHelper } from "../helpers"

export class CompanyController {
	public test(req: Request, res: Response) {
		res.status(HttpStatus.OK).send()
	}

	public async get(req: Request, res: Response) {
		if (req.params.id) {
			const company: ICompany = await CompanyHelper.findById(req.params.id)

			if (!company)
				res.status(HttpStatus.NOT_FOUND).send(null)

			delete company.Password
			await company.populate("Offers").execPopulate()

			res.json(company)
		} else {
			const companies: Array<ICompany> = await CompanyHelper.find()

			if (!companies)
				res.status(HttpStatus.NOT_FOUND).send([])

			companies.forEach((company: ICompany) => delete company.Password)

			res.json(companies)
		}
	}

	public async post(req: Request, res: Response) {
		const newCompany = new Company(req.body) as ICompany

		const result: ICompany = await CompanyHelper.save(newCompany)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send(false)

		res.status(HttpStatus.OK).send(true)
	}

	public async put(req: Request, res: Response) {
		const company: ICompany = await CompanyHelper.findByIdAndUpdate(req.params.id, req.body)

		if (!company)
			res.status(HttpStatus.BAD_REQUEST).send(null)

		res.json(company)
	}

	public async delete(req: Request, res: Response) {
		const result: boolean = await CompanyHelper.removeById(req.params.id)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send(false)

		res.status(HttpStatus.OK).send(true)
	}

	public async login(req: Request, res: Response) {
		const { email, password } = req.body

		const company: ICompany = await CompanyHelper.findByEmail(email)

		if (company === null) {
			res.statusMessage = "User not found"
			res.status(HttpStatus.BAD_REQUEST).send()
		}

		if (!company) {
			res.statusMessage = "User not found"
			res.status(HttpStatus.NOT_FOUND).send()
		}

		const isMatch: boolean = await company.comparePassword(password)

		if (isMatch) {
			const payload = {
				_id: company._id,
				Name: company.Name,
				Email: company.Email,
				RegisterDate: company.RegisterDate
			}

			jwt.sign(payload,
				keys.secretOrKey,
				{ expiresIn: 3600 },
				(err: Error, token: string) => {
					res.json(`Bearer ${token}`)
				})
		} else {
			res.statusMessage = "Incorrect password"
			res.status(HttpStatus.BAD_REQUEST).send()
		}
	}

	public async getOffers(req: Request, res: Response) {
		const company: ICompany = await CompanyHelper.findById(req.params.id)

		if (!company)
			res.status(HttpStatus.NOT_FOUND).send([])

		res.json((await company.populate("Offers").execPopulate()).Offers)
	}
}
