import { Document } from "mongoose"

export interface IUser extends Document {
	Email: string
	Password: string
	RegisterDate: number
	comparePassword: (givenPassword: string) => boolean
	cleanPassword: (this: IUser, flag: boolean) => IUser
}
