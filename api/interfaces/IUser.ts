import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
	FirstName: string
	LastName: string
	Email: string
	Password: string
	IsCompany: boolean
	RegisterDate: number
	comparePassword: (givenPassword: string) => boolean
	cleanPassword: (this: IUser, flag: boolean) => IUser
}
