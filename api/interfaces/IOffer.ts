import { Schema } from "mongoose"

export interface IOffer extends Schema {
	Title: string,
	Category: string,
	Description: string,
	Inscriptions: string[],
	Date: Date
}