import { Schema, model, Model } from "mongoose"
import { IOffer } from "../interfaces"

// Ceate Schema
const OfferSchema = new Schema({
	Title: {
		type: String,
		required: true
	},
	Category: {
		type: String,
		required: true
	},
	Description: {
		type: String,
		required: true
	},
	Inscriptions: [
		{
			User: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	Date: {
		type: Date,
		default: Date.now
	}
});

export const Offer = model("offers", OfferSchema) as Model<IOffer, {}>;