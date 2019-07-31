import { Model, Document } from "mongoose"

export abstract class BaseHelper<T extends Document> {
	public Schema: Model<T, {}>

	public async save(document: T): Promise<T> {
		try {
			return await document.save()
		} catch {
			return null
		}
	}

	public async findById(id: string): Promise<T> {
		try {
			return await this.Schema.findById(id)
		} catch {
			return null
		}
	}

	public async findByIdAndUpdate(id: string, document: object): Promise<T> {
		try {
			return await this.Schema.findByIdAndUpdate(id, document, { new: true })
		} catch {
			return null
		}
	}

	public async removeById(id: string): Promise<boolean> {
		try {
			return !!(await this.Schema.remove({ _id: id })).ok
		} catch {
			return null
		}
	}

	public async find(): Promise<Array<T>> {
		try {
			return await this.Schema.find()
		} catch {
			return null
		}
	}
}
