import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
	UserName: string
	Email: string
	Password: string
	IsCompany: boolean
	RegisterDate: number
}