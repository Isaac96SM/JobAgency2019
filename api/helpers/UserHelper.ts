import { IUser } from "../interfaces";
import { User } from "../models";

export class UserHelper {
	public static async findById(id: string, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await User.findById(id) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}

	public static async findByEmail(Email: string, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await User.findOne({ Email }) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}

	public static async find(cleanPassword: boolean = false): Promise<Array<IUser>> {
		try {
			return (await User.find() as Array<IUser>).map(user => user.cleanPassword(cleanPassword))
		} catch {
			return null
		}
	}

	public static async findByIdAndUpdate(id: string, userUpdated: object, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await User.findByIdAndUpdate(id, userUpdated, { new: true }) as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}

	public static async removeById(id: string): Promise<boolean> {
		try {
			return !!(await User.remove({ _id: id })).ok
		} catch {
			return null
		}
	}

	public static async save(user: IUser, cleanPassword: boolean = false): Promise<IUser> {
		try {
			return (await user.save() as IUser).cleanPassword(cleanPassword)
		} catch {
			return null
		}
	}
}
