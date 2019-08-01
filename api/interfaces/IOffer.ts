import { Document } from "mongoose"
import { ICompany } from "./";
import { IUser } from "./IUser";

export interface IOffer extends Document {
	Company: ICompany,
	Title: string,
	Category: string,
	Description: string,
	Inscriptions: IUser[],
	Date: Date
}