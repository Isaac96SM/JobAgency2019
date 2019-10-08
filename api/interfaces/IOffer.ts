import { Document } from "mongoose"

export interface IOffer extends Document {
	Title: string,
	Category: string,
	Description: string,
	Inscriptions: { user: string }[],
	Date: Date
}