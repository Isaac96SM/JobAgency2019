import { Document } from "mongoose"

export interface IOffer extends Document {
	Title: string,
	Category: string,
	Description: string,
	Company: string,
	Inscriptions: { User: string }[],
	Date: Date
}