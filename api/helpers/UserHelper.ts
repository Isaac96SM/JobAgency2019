import { IUser } from "../interfaces";
import { User } from "../models";
import { BaseHelper } from "./"

export abstract class UserHelper extends BaseHelper {
	public async _findById(id: string, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await this.findById(id) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}

	public async findByEmail(Email: string, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await User.findOne({ Email }) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}

	public async _find(cleanPassword: boolean = false): Promise<Array<IUser>> {
		try {
			return (await this.find() as Array<IUser>).map(user => user.cleanPassword(cleanPassword))
		} catch {
			return null
		}
	}

	public async _findByIdAndUpdate(id: string, userUpdated: object, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await this.findByIdAndUpdate(id, userUpdated) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}

	public async _save(user: IUser, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await this.save(user) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}
}
