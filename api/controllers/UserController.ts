import * as HttpStatus from "http-status-codes"
import * as jwt from "jsonwebtoken"
import { User } from "../models";
import { Request, Response } from "express"
import { IUser } from "../interfaces"
import { keys } from "../config";
import { UserHelper } from "../helpers";

export class UserController {
	public test(req: Request, res: Response) {
		res.status(HttpStatus.OK).send()
	}

	public async get(req: Request, res: Response) {
		if (req.params.id) {
				const user: IUser = await UserHelper.findById(req.params.id)

				if (!user)
					res.status(HttpStatus.NOT_FOUND).send()

				delete user.Password

				res.json(user)
		} else {
				const users: Array<IUser> = await UserHelper.find()

				users.forEach((user: IUser) => delete user.Password)

				res.json(users)
		}
	}

	public async post(req: Request, res: Response) {
		const newUser = new User(req.body) as IUser

		const result: boolean = await UserHelper.save(newUser)

		if (!result)
			res.status(HttpStatus.BAD_REQUEST).send()

		res.status(HttpStatus.OK).send()
	}

	public put(req: Request, res: Response) {
		User.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err: Error, user: IUser) => {
			if (err)
				res.status(HttpStatus.BAD_REQUEST).send(err)

			res.json(user)
		})
	}

	public delete(req: Request, res: Response) {
		User.remove({ _id: req.params.id }, (err: Error) => {
			if (err)
				res.status(HttpStatus.NOT_FOUND).send(err)
			
			res.status(HttpStatus.OK)
				.send(HttpStatus.getStatusText(HttpStatus.OK))
		})
	}

	public login(req: Request, res: Response) {
		const { Email, Password } = req.body

		User.findOne({ Email }, (err: Error, user: IUser) => {
			if (err)
				res.status(HttpStatus.BAD_REQUEST).send(err)

			if (!user)
				res.status(HttpStatus.BAD_REQUEST).send("User not found")

			user.comparePassword(Password, (err: Error, isMatch: boolean) => {
				if (err)
					res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR))

				if (isMatch) {
					const payload = {
						id: user._id,
						FirstName: user.FirstName,
						LastName: user.LastName,
						Email: user.Email,
						IsCompany: user.IsCompany,
						RegisterDate: user.RegisterDate
					}

					jwt.sign(payload,
						keys.secretOrKey,
						{ expiresIn: 3600 },
						(err: Error, token: string) => {
							res.json({ token: `Bearer ${token}` })
						})
				} else {
					res.status(HttpStatus.BAD_REQUEST).send("Incorrect password")
				}
			})
		})
	}
}
