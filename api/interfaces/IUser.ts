import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
	FirstName: string
	LastName: string
	Email: string
	Password: string
	IsCompany: boolean
	RegisterDate: number
	comparePassword: (givenPassword: string, callback: (err: Error, isMatch: boolean) => void ) => void
}
