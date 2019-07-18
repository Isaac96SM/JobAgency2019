import mongoose from "mongoose"
import * as HttpStatus from "http-status-codes"
import { User } from "../models";
import { Request, Response } from "express"

export class UserController {
	public get(req: Request, res: Response) {
		const query = this.getMethodByRequestParams(req.params.id)

		query.method(query.param, (err: Error, docs: Array<mongoose.Document> | mongoose.Document) => {
			if (err)
				res.status(HttpStatus.NOT_FOUND).send(err)
			
			res.json(docs)
		})
	}

	public post(req: Request, res: Response) {
		const newUser = new User(req.body)

		newUser.save((err: Error, user: mongoose.Document) => {
			if (err)
				res.status(HttpStatus.BAD_REQUEST).send(err)

			res.json(user)
		})
	}

	public put(req: Request, res: Response) {
		User.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err: Error, user: mongoose.Document) => {
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

	private getMethodByRequestParams(id: any) {
		return id 
		? { method: User.findById, param: id }
		: { method: User.find, param: {} }
	}
}
