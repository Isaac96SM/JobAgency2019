import * as HttpStatus from "http-status-codes"
import * as jwt from "jsonwebtoken"
import { User } from "../models"
import { Request, Response } from "express"
import { IUser } from "../interfaces"
import { keys } from "../config"
import { UserHelper } from "../helpers"

export class UserController {
	public test(req: Request, res: Response) {
		res.status(HttpStatus.OK).send()
	}

	public async get(req: Request, res: Response) {
		if (req.params.id) {
			const user: IUser = await UserHelper.findById(req.params.id)

				if (!user)
					res.status(HttpStatus.NOT_FOUND).send(null)

				delete user.Password

				res.json(user)
		} else {
			const users: Array<IUser> = await UserHelper.find()

				if (!users)
					res.status(HttpStatus.NOT_FOUND).send([])

				users.forEach((user: IUser) => delete user.Password)

				res.json(users)
		}
	}

	public async post(req: Request, res: Response) {
		const newUser = new User(req.body) as IUser

		const result: IUser = await UserHelper.save(newUser)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send(false)

		res.status(HttpStatus.OK).send(true)
	}

	public async put(req: Request, res: Response) {
		const user: IUser = await UserHelper.findByIdAndUpdate(req.params.id, req.body)

		if (!user)
			res.status(HttpStatus.BAD_REQUEST).send(null)

		res.json(user)
	}

	public async delete(req: Request, res: Response) {
		const result: boolean = await UserHelper.removeById(req.params.id)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send(false)

		res.status(HttpStatus.OK).send(true)
	}

	public async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user: IUser = await UserHelper.findByEmail(email)

		if (user === null)
			res.status(HttpStatus.BAD_REQUEST).send("")

		if (!user)
			res.status(HttpStatus.NOT_FOUND).send("")

		const isMatch: boolean = user.comparePassword(password)

		if (isMatch) {
			const payload = {
				_id: user._id,
				FirstName: user.FirstName,
				LastName: user.LastName,
				Email: user.Email,
				RegisterDate: user.RegisterDate
			}

			jwt.sign(payload,
				keys.secretOrKey,
				{ expiresIn: 3600 },
				(err: Error, token: string) => {
					res.json(`Bearer ${token}`)
				})
		} else {
			res.status(HttpStatus.BAD_REQUEST).send("")
		}
	}
}
