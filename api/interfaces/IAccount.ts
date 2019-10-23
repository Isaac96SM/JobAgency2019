import { Document } from "mongoose"

export interface IAccount extends Document {
	Email: string
	Password: string
	RegisterDate: number
	comparePassword: (givenPassword: string) => Promise<boolean>
	cleanPassword: (this: IAccount, flag: boolean) => IAccount
}
