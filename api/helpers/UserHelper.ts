import { IUser } from "../interfaces";
import { User } from "../models";

export class UserHelper {
	public static async findById(id: string): Promise<IUser> {
		try {
			return await User.findById(id) as IUser
		} catch {
			return null
		}
	}

	public static async find(): Promise<Array<IUser>> {
		try {
			return await User.find() as Array<IUser>
		} catch {
			return []
		}
	}

	public static async save(user: IUser): Promise<boolean> {
		try {
			await user.save()
			return true
		} catch {
			return false
		}
	}
}
